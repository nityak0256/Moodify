import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  CameraOff, 
  RefreshCw, 
  Sliders, 
  Heart, 
  Thermometer, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Info, 
  Bluetooth, 
  Radio, 
  RotateCcw,
  Search,
  AlertTriangle,
  Wind,
  CheckCircle2,
  Headphones,
  Music,
  Play,
  Pause
} from 'lucide-react';
import { 
  loadFaceDetectionModels, 
  detectFace, 
  drawHudOverlay, 
  DetectionResult, 
  ModelLoadStatus 
} from '../services/faceDetectionService';
import { 
  connectBleHeartRate, 
  isWebBluetoothSupported, 
  BleHeartRateConnection 
} from '../services/heartRateBleService';
import { 
  computeMultiSignalStress, 
  StressFusionResult 
} from '../utils/stressFusionEngine';
import { 
  MOOD_CATALOG, 
  MoodId, 
  MoodProfile, 
  FacialObservation, 
  classifyObservationsToMood 
} from '../utils/moodCatalog';
import { GuidedReliefModal } from './GuidedReliefModal';
import { MoodMusicSection } from './MoodMusicSection';
import { BollywoodRecommendations } from './BollywoodRecommendations';
import { streamAudioPlayer, getMusicRecommendation } from '../services/moodMusicService';

type ScanPhase = 'idle' | 'scanning' | 'complete' | 'insufficient_data';

interface FinalAggregatedResult {
  dominantExpression: string;
  confidence: number;
  allAverages: Record<string, number>;
  frameCount: number;
  avgBpm: number;
  avgTemp: number;
  stressResult: StressFusionResult;
}

const SCAN_NEUTRAL_MESSAGES = [
  'Scanning your vibe... 👀',
  'Reading your expressions...',
  'Almost there...',
  'Analyzing your mood... 🧠',
  'Hold still for a sec 😭'
];

export const LiveCameraStressMonitor: React.FC = () => {
  // Video and Canvas refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const scanTickRef = useRef<number>(0);
  const isDetectingRef = useRef<boolean>(false);
  const latestDetectionResultRef = useRef<DetectionResult>({ detected: false, confidence: 0, fps: 0 });

  // 5-Second Mood Scan State & Refs (Strictly avoiding stale closures)
  const [scanPhase, setScanPhase] = useState<ScanPhase>('idle');
  const scanPhaseRef = useRef<ScanPhase>('idle');
  const isScanningRef = useRef<boolean>(false);

  const [countdownSeconds, setCountdownSeconds] = useState<number>(5);
  const [scanProgressPercent, setScanProgressPercent] = useState<number>(0);
  const [neutralScanMessage, setNeutralScanMessage] = useState<string>(SCAN_NEUTRAL_MESSAGES[0]);
  const [capturedCount, setCapturedCount] = useState<number>(0);

  const capturedObservationsRef = useRef<FacialObservation[]>([]);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);
  const scanStartTimeRef = useRef<number>(0);

  // Result state
  const [detectedMood, setDetectedMood] = useState<MoodProfile | null>(null);
  const [finalResult, setFinalResult] = useState<FinalAggregatedResult | null>(null);

  // Mini-player state for the result card soundtrack preview
  const [miniPlayerPlaying, setMiniPlayerPlaying] = useState<boolean>(false);

  // Camera & Model State
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraLoading, setCameraLoading] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [modelStatus, setModelStatus] = useState<ModelLoadStatus>({
    ssdMobileNet: 'loading',
    landmarks: 'loading',
    expressions: 'loading',
    allLoaded: false
  });
  const [modelProgressMsg, setModelProgressMsg] = useState<string>('Initializing local models...');

  // Detection & Visual Overlays
  const [showLandmarks, setShowLandmarks] = useState<boolean>(true);
  const [detectionResult, setDetectionResult] = useState<DetectionResult>({
    detected: false,
    confidence: 0,
    fps: 0
  });

  // Biometric Signals
  const [heartRateMode, setHeartRateMode] = useState<'real' | 'demo'>('demo');
  const [heartRate, setHeartRate] = useState<number>(72);
  const heartRateRef = useRef<number>(72);
  heartRateRef.current = heartRate;

  const [bleConnection, setBleConnection] = useState<BleHeartRateConnection | null>(null);
  const [bleConnecting, setBleConnecting] = useState<boolean>(false);
  const [bleError, setBleError] = useState<string | null>(null);

  const [temperature, setTemperature] = useState<number>(36.7);
  const temperatureRef = useRef<number>(36.7);
  temperatureRef.current = temperature;

  // Guided Relief Modal & Privacy Details
  const [reliefModalOpen, setReliefModalOpen] = useState<boolean>(false);
  const [privacyDetailsOpen, setPrivacyDetailsOpen] = useState<boolean>(false);

  // Keep audio player state synced for the result card preview
  useEffect(() => {
    streamAudioPlayer.registerCallbacks({
      onStateChange: (playing) => setMiniPlayerPlaying(playing)
    });
  }, []);

  // 1. Initialize Face Detection Models on Component Mount
  useEffect(() => {
    let isMounted = true;

    loadFaceDetectionModels((modelName, status) => {
      if (isMounted) {
        setModelProgressMsg(`${modelName}: ${status}...`);
      }
    })
      .then((status) => {
        if (isMounted) {
          setModelStatus(status);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setModelStatus({
            ssdMobileNet: 'failed',
            landmarks: 'failed',
            expressions: 'failed',
            allLoaded: false,
            error: err.message || 'Model loading error'
          });
        }
      });

    return () => {
      isMounted = false;
      stopCamera();
    };
  }, []);

  // 2. Camera Controls
  const startCamera = async (): Promise<boolean> => {
    setCameraError(null);
    setCameraLoading(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access API is not supported in this browser.');
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false
        });
      } catch (err: any) {
        if (err.name === 'OverconstrainedError' || err.name === 'ConstraintNotSatisfiedError') {
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        } else {
          throw err;
        }
      }

      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) {
        throw new Error('Video element is not mounted in the DOM.');
      }

      video.muted = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('autoplay', 'true');
      video.srcObject = stream;

      await new Promise<void>((resolve, reject) => {
        let isResolved = false;

        const onVideoReady = async () => {
          if (isResolved) return;
          isResolved = true;
          try {
            await video.play();
            resolve();
          } catch (playErr) {
            reject(playErr);
          }
        };

        video.onloadedmetadata = () => onVideoReady();
        video.oncanplay = () => onVideoReady();
        video.onplaying = () => onVideoReady();

        if (video.readyState >= 2) {
          onVideoReady();
        }

        setTimeout(() => {
          if (!isResolved) onVideoReady();
        }, 1000);
      });

      setCameraActive(true);
      setCameraLoading(false);
      startInferenceLoop();
      return true;
    } catch (err: any) {
      console.warn('Camera request error:', err);
      setCameraLoading(false);
      setCameraActive(false);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera access permission was denied. Please click the camera/lock icon in your browser address bar and grant permission.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('No camera hardware was detected on this device. Please connect a webcam.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setCameraError('Camera is currently busy or being used by another application. Please close other camera tabs/apps and try again.');
      } else {
        setCameraError(`Camera error: ${err.message || 'Unable to open camera'}`);
      }
      return false;
    }
  };

  const stopCamera = () => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    isDetectingRef.current = false;
    isScanningRef.current = false;

    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    setCameraActive(false);
    setDetectionResult({ detected: false, confidence: 0, fps: 0 });
    setScanPhase('idle');
  };

  // 3. Controlled Inference Loop (Executes 100% locally via SSD MobileNet v1)
  const startInferenceLoop = () => {
    let lastInferenceTime = 0;
    const INFERENCE_INTERVAL_MS = 130; // ~8 FPS for responsive 5s observation sampling

    const loop = async (timestamp: number) => {
      scanTickRef.current += 1;

      if (videoRef.current && canvasRef.current && videoRef.current.readyState >= 2) {
        if (!isDetectingRef.current && timestamp - lastInferenceTime >= INFERENCE_INTERVAL_MS) {
          isDetectingRef.current = true;
          lastInferenceTime = timestamp;

          try {
            const result = await detectFace(videoRef.current);
            latestDetectionResultRef.current = result;
            setDetectionResult(result);

            // Accumulate multiple facial-expression observations while scan is active
            if (isScanningRef.current && result.detected) {
              const scores = result.expressions?.scores || {
                [result.expressions?.dominant || 'neutral']: 80
              };

              capturedObservationsRef.current.push({
                timestamp: Date.now(),
                confidence: result.confidence,
                scores,
                dominant: result.expressions?.dominant || 'neutral',
                heartRate: heartRateRef.current,
                temperature: temperatureRef.current,
                landmarks: result.landmarks
              });

              setCapturedCount(capturedObservationsRef.current.length);
            }
          } catch (e) {
            // Silently continue loop
          } finally {
            isDetectingRef.current = false;
          }
        }

        // Draw HUD overlay using latest detection
        if (canvasRef.current && videoRef.current) {
          drawHudOverlay(canvasRef.current, videoRef.current, latestDetectionResultRef.current, {
            showLandmarks,
            scanTick: scanTickRef.current,
            mirrorWebcam: true
          });
        }
      }

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);
  };

  // 4. Web Bluetooth Heart Rate Connection
  const handleConnectBleSensor = async () => {
    setBleError(null);
    setBleConnecting(true);

    try {
      const conn = await connectBleHeartRate(
        (newBpm) => {
          setHeartRate(newBpm);
          setHeartRateMode('real');
        },
        () => {
          setBleConnection(null);
          setHeartRateMode('demo');
        }
      );
      setBleConnection(conn);
      setHeartRateMode('real');
      setBleConnecting(false);
    } catch (err: any) {
      setBleConnecting(false);
      setBleError(err.message || 'Failed to connect Bluetooth sensor');
    }
  };

  const handleDisconnectBle = () => {
    if (bleConnection) {
      bleConnection.disconnect();
      setBleConnection(null);
    }
    setHeartRateMode('demo');
  };

  // 5. 5-SECOND MOOD SCAN INITIATION & MULTI-OBSERVATION DATA AGGREGATION
  const handleStartMoodScan = async () => {
    // If camera is not active yet, initialize real camera first
    if (!cameraActive) {
      const started = await startCamera();
      if (!started) return;
    }

    // Reset all previous scan data
    capturedObservationsRef.current = [];
    setCapturedCount(0);
    setDetectedMood(null);
    setFinalResult(null);
    setCountdownSeconds(5);
    setScanProgressPercent(0);
    setNeutralScanMessage(SCAN_NEUTRAL_MESSAGES[0]);

    // Update synchronous refs immediately
    isScanningRef.current = true;
    scanPhaseRef.current = 'scanning';
    setScanPhase('scanning');

    const SCAN_DURATION_MS = 5000;
    scanStartTimeRef.current = Date.now();

    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }

    // Interval checks elapsed time for exact 5s countdown
    scanTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - scanStartTimeRef.current;
      const remaining = Math.max(1, Math.ceil((SCAN_DURATION_MS - elapsed) / 1000));
      const progress = Math.min(100, (elapsed / SCAN_DURATION_MS) * 100);

      setCountdownSeconds(remaining);
      setScanProgressPercent(progress);

      // Rotate neutral scanning messages without revealing results
      const msgIndex = Math.floor(elapsed / 1000) % SCAN_NEUTRAL_MESSAGES.length;
      setNeutralScanMessage(SCAN_NEUTRAL_MESSAGES[msgIndex]);

      // Exactly 5 seconds elapsed: finalize and calculate estimated mood
      if (elapsed >= SCAN_DURATION_MS) {
        if (scanTimerRef.current) {
          clearInterval(scanTimerRef.current);
          scanTimerRef.current = null;
        }

        isScanningRef.current = false;
        finalizeScanObservations();
      }
    }, 60);
  };

  // 6. Finalize Observations After Exactly 5 Seconds
  const finalizeScanObservations = () => {
    const observations = capturedObservationsRef.current;

    // Check if sufficient valid facial frames were observed during the 5s
    if (observations.length < 4) {
      scanPhaseRef.current = 'insufficient_data';
      setScanPhase('insufficient_data');
      return;
    }

    // Classify observations into one of the 16 moods
    const classification = classifyObservationsToMood(observations);

    // Compute multi-signal stress score with aggregated factors
    const finalStress = computeMultiSignalStress(
      classification.avgBpm,
      classification.avgTemp,
      classification.dominantExpression,
      classification.confidence
    );

    const aggResult: FinalAggregatedResult = {
      dominantExpression: classification.dominantExpression,
      confidence: classification.confidence,
      allAverages: classification.allAverages,
      frameCount: observations.length,
      avgBpm: classification.avgBpm,
      avgTemp: classification.avgTemp,
      stressResult: finalStress
    };

    setDetectedMood(classification.mood);
    setFinalResult(aggResult);
    scanPhaseRef.current = 'complete';
    setScanPhase('complete');
  };

  // Quick helper to preview soundtrack in the result card
  const handleToggleSoundtrackPreview = () => {
    if (!detectedMood) return;
    const rec = getMusicRecommendation(finalResult?.stressResult.score || 20, detectedMood.id);
    if (rec.recommendedTracks.length > 0) {
      const track = rec.recommendedTracks[0];
      if (miniPlayerPlaying) {
        streamAudioPlayer.pause();
      } else {
        streamAudioPlayer.playTrack(track);
      }
    }
  };

  return (
    <section id="live-monitor" className="py-20 bg-[#08090E] relative border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. PRIVACY-FIRST BANNER */}
        <div className="mb-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-purple-950/30 to-[#0F121E] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-xs font-mono uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>🔒 PRIVACY-FIRST CAMERA AI</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                REAL-TIME ON-DEVICE MOOD MONITOR
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                SSD MobileNet v1 face detection runs <strong className="text-emerald-300 font-semibold">100% locally in your browser WebGL</strong>.
                Zero video frames or facial biometrics are uploaded. Click <strong>Scan My Mood</strong> for an instant 5-second vibe check.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setPrivacyDetailsOpen(!privacyDetailsOpen)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Privacy Architecture</span>
              </button>
            </div>
          </div>

          {privacyDetailsOpen && (
            <div className="mt-5 pt-5 border-t border-emerald-500/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 font-mono animate-in fade-in">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-emerald-400 font-bold block">1. Local Neural Weights</span>
                <p>SSD MobileNet v1 and expression models execute client-side via TensorFlow.js WebGL tensors.</p>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-cyan-400 font-bold block">2. Zero Telemetry Outbound</span>
                <p>No images, video streams, or facial embeddings leave this browser sandbox.</p>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-purple-400 font-bold block">3. Ephemeral 5-Second Scan</span>
                <p>Observation frames are evaluated in memory for 5 seconds and wiped upon resetting.</p>
              </div>
            </div>
          )}
        </div>

        {/* 2. MAIN 2-COLUMN GRID (LEFT: CAMERA & SENSORS | RIGHT: 5-SECOND SCAN & RESULT CARD) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* LEFT: FIXED-SIZE CAMERA PREVIEW & SENSOR METRICS (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Camera Viewport Container (Fixed Aspect Ratio) */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#0E101B] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${cameraActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                    {cameraActive ? 'Live Real Camera Feed' : 'Camera Inactive'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowLandmarks(!showLandmarks)}
                    disabled={!cameraActive}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                      showLandmarks 
                        ? 'bg-purple-950/80 border-purple-400/50 text-purple-300' 
                        : 'bg-white/5 border-white/10 text-slate-400'
                    } disabled:opacity-40 cursor-pointer`}
                    title="Toggle facial geometry mesh overlay"
                  >
                    Landmarks {showLandmarks ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              {/* Viewport Box (Fixed Height: 320px) */}
              <div className="relative w-full h-[320px] rounded-2xl bg-black/90 border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Real HTML5 Video element */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover -scale-x-100"
                  playsInline
                  muted
                />

                {/* Canvas Overlay for HUD brackets and landmarks */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
                />

                {/* Overlay: Camera not active placeholder */}
                {!cameraActive && !cameraLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-[#0A0C16]/95">
                    <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center mb-3 text-cyan-400 shadow-lg">
                      <Camera className="w-8 h-8" />
                    </div>
                    <h3 className="text-base font-bold text-white font-mono">Camera Is Off</h3>
                    <p className="text-xs text-slate-400 max-w-xs mt-1 mb-4 leading-relaxed">
                      Click below to activate your browser webcam for on-device SSD MobileNet v1 face detection.
                    </p>
                    <button
                      onClick={startCamera}
                      className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg border border-purple-400/30 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Camera className="w-4 h-4 text-cyan-200" />
                      <span>Start Camera</span>
                    </button>
                  </div>
                )}

                {/* Overlay: Loading state */}
                {cameraLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-black/90 text-cyan-400 space-y-2">
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-mono font-bold text-white">Opening real webcam stream...</span>
                  </div>
                )}

                {/* Error Banner */}
                {cameraError && (
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs font-mono z-30 flex items-start gap-2 shadow-2xl">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold block">Camera Notice</span>
                      <span>{cameraError}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Bar Beneath Viewport */}
              {cameraActive && (
                <div className="mt-3 p-3 rounded-xl bg-black/50 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Detected Face:</span>
                    <span className={detectionResult.detected ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                      {detectionResult.detected ? `✓ ${detectionResult.confidence}%` : 'Searching...'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Model:</span>
                    <span className="text-cyan-300 font-bold">SSD MobileNet v1</span>
                  </div>
                  {scanPhase === 'scanning' ? (
                    <>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Scan Status:</span>
                        <span className="text-cyan-300 font-bold animate-pulse">{countdownSeconds}s Left</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Samples:</span>
                        <span className="text-purple-300 font-bold">{capturedCount} frames</span>
                      </div>
                    </>
                  ) : scanPhase === 'complete' && detectedMood ? (
                    <>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Estimated Mood:</span>
                        <span className="text-purple-300 font-bold">{detectedMood.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Confidence:</span>
                        <span className="text-slate-200 font-bold">{finalResult?.confidence || 85}%</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Scanner:</span>
                        <span className="text-slate-300 font-bold">Ready</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Mode:</span>
                        <span className="text-purple-300 font-bold">5s Vibe Check</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Start / Stop Camera Action Button */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
                {!cameraActive ? (
                  <button
                    onClick={startCamera}
                    disabled={cameraLoading}
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Start Camera</span>
                  </button>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-rose-600/80 hover:bg-rose-600 shadow-lg border border-rose-400/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <CameraOff className="w-3.5 h-3.5" />
                    <span>Stop Camera</span>
                  </button>
                )}
              </div>

            </div>

            {/* SENSORS PANEL: HEART RATE & TEMPERATURE */}
            <div className="p-4 sm:p-5 rounded-3xl bg-[#0E101B] border border-white/10 space-y-4 shadow-lg">
              
              {/* Heart Rate Sensor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-white uppercase font-mono">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    <span>Heart Rate</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    heartRateMode === 'real'
                      ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300'
                      : 'bg-amber-950/80 border-amber-400/50 text-amber-300'
                  }`}>
                    {heartRateMode === 'real' ? 'REAL BLUETOOTH' : 'SIMULATED'}
                  </span>
                </div>

                <div className="flex items-baseline justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-2xl font-black font-mono text-white">{heartRate}</span>
                    <span className="text-xs font-mono text-rose-400 ml-1 font-bold">BPM</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {heartRate > 100 ? 'Elevated' : heartRate < 60 ? 'Low' : 'Resting'}
                  </span>
                </div>

                {isWebBluetoothSupported() && (
                  <div className="pt-1">
                    {!bleConnection ? (
                      <button
                        onClick={handleConnectBleSensor}
                        disabled={bleConnecting}
                        className="w-full py-2 px-3 rounded-lg text-[11px] font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Bluetooth className={`w-3 h-3 text-cyan-400 ${bleConnecting ? 'animate-spin' : ''}`} />
                        <span>{bleConnecting ? 'Searching...' : 'Connect Bluetooth HR Sensor'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] text-emerald-300 font-mono">
                        <span>Connected: {bleConnection.device.name || 'Heart Rate'}</span>
                        <button onClick={handleDisconnectBle} className="text-rose-400 underline cursor-pointer">Disconnect</button>
                      </div>
                    )}
                  </div>
                )}

                {heartRateMode === 'demo' && (
                  <div className="space-y-1 pt-1">
                    <input
                      type="range"
                      min="45"
                      max="160"
                      value={heartRate}
                      onChange={(e) => setHeartRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                      aria-label="Heart rate slider"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>45 (Rest)</span>
                      <span>90 (Active)</span>
                      <span>160</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Body Temperature */}
              <div className="space-y-2 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-white uppercase font-mono">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Temperature</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-amber-950/80 border-amber-400/50 text-amber-300">
                    SIMULATED
                  </span>
                </div>

                <div className="flex items-baseline justify-between bg-black/40 p-3 rounded-xl border border-white/5">
                  <div>
                    <span className="text-2xl font-black font-mono text-white">{temperature.toFixed(1)}</span>
                    <span className="text-xs font-mono text-amber-400 ml-1 font-bold">°C</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {temperature > 37.3 ? 'Elevated' : 'Normal'}
                  </span>
                </div>

                <input
                  type="range"
                  min="35.5"
                  max="39.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  aria-label="Temperature slider"
                />
              </div>

            </div>

          </div>

          {/* RIGHT: 5-SECOND SCAN WORKFLOW & MOOD RESULT CARD (7 COLS) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STAGE 1: IDLE / START SCREEN */}
            {scanPhase === 'idle' && (
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121528] via-[#161A33] to-[#0E101D] border border-purple-500/30 shadow-2xl relative overflow-hidden text-center animate-in fade-in duration-300">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-xl mx-auto space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-300 text-xs font-mono uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Real-Time Biometric Analysis</span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                      🧠 MOODIFY
                    </h2>
                    <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400">
                      &ldquo;Let's see what mood you're in 👀&rdquo;
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed pt-1">
                      Click below to start a quick <strong>5-second facial mood scan</strong>. Local neural tensors will sample your facial micro-geometry across multiple frames.
                    </p>
                  </div>

                  {/* Big Primary Button: SCAN MY MOOD */}
                  <div className="pt-2">
                    <button
                      onClick={handleStartMoodScan}
                      disabled={cameraLoading}
                      className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-base uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-2xl shadow-purple-600/40 border border-purple-400/40 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 mx-auto cursor-pointer"
                    >
                      <Search className="w-5 h-5 text-cyan-300" />
                      <span>🔍 Scan My Mood</span>
                    </button>
                    <span className="text-[11px] font-mono text-slate-400 block mt-3">
                      🔒 100% Client-Side WebGL · Zero cloud uploads · Private & Secure
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs font-mono text-slate-400">
                    <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-white font-bold block text-sm">5 Sec</span>
                      <span>Quick Scan</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-cyan-300 font-bold block text-sm">SSD MobileNet</span>
                      <span>Real Local AI</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/30 border border-white/5">
                      <span className="text-purple-300 font-bold block text-sm">Multi-Signal</span>
                      <span>Continuous Sampling</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: ACTIVE 5-SECOND SCANNING (5 → 4 → 3 → 2 → 1) */}
            {scanPhase === 'scanning' && (
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121528] via-[#161A33] to-[#0E101D] border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden text-center animate-in fade-in duration-300">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-xl mx-auto space-y-6">
                  
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs font-mono uppercase tracking-wider animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>5-Second Active Observation</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-center justify-center gap-2">
                    <Search className="w-6 h-6 text-cyan-400 animate-bounce" />
                    <span>ANALYZING YOUR VIBE...</span>
                  </h3>

                  {/* Smooth Animated 5s Countdown Circle (5 → 4 → 3 → 2 → 1) */}
                  <div className="relative w-44 h-44 mx-auto flex items-center justify-center my-4">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-white/10 stroke-current"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        stroke="#06B6D4"
                        strokeDasharray={`${scanProgressPercent}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3.5"
                        fill="none"
                        className="transition-all duration-100 ease-linear"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>

                    <div className="absolute flex flex-col items-center">
                      <span className="text-6xl font-black font-mono text-white tracking-tight animate-pulse">
                        {countdownSeconds}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">Seconds</span>
                    </div>
                  </div>

                  {/* Live Face Detection Tracking Badge */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 max-w-sm mx-auto">
                    {detectionResult.detected ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-400 font-mono font-bold text-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span>🟢 Face Detected · Sampling</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-1 text-amber-300 font-mono text-xs">
                        <div className="flex items-center gap-1.5 font-bold">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                          <span>👀 &ldquo;I can't see you!&rdquo;</span>
                        </div>
                        <span className="text-slate-300 text-[11px]">Please keep your face inside the camera frame.</span>
                      </div>
                    )}
                  </div>

                  {/* Neutral Scanning Message (Strictly NO emotion leaked during 5s) */}
                  <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs font-mono text-slate-300 max-w-sm mx-auto">
                    <span className="animate-pulse">{neutralScanMessage}</span>
                  </div>

                  {/* Live Samples Counter */}
                  <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-400">
                    <span>Observation frames: <strong className="text-cyan-300">{capturedCount} samples</strong></span>
                    <span>•</span>
                    <span>AI Engine: <strong className="text-purple-300">SSD MobileNet v1</strong></span>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: FACE NOT DETECTED / INSUFFICIENT DATA */}
            {scanPhase === 'insufficient_data' && (
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121528] via-[#161A33] to-[#0E101D] border border-amber-500/40 shadow-2xl relative overflow-hidden text-center animate-in fade-in duration-300">
                <div className="max-w-md mx-auto space-y-5">
                  <div className="w-20 h-20 rounded-3xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center mx-auto text-5xl shadow-inner">
                    😶
                  </div>

                  <h3 className="text-2xl font-black text-white font-mono">
                    Couldn't read your mood
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Make sure your face is clearly visible and try again.
                  </p>

                  <button
                    onClick={handleStartMoodScan}
                    className="px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-xl border border-purple-400/40 flex items-center justify-center gap-2 mx-auto transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-cyan-300" />
                    <span>Scan Again</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: 5-SECOND SCAN COMPLETE! MOOD RESULT CARD */}
            {scanPhase === 'complete' && detectedMood && finalResult && (
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121528] via-[#161A33] to-[#0E101D] border-2 border-purple-500/40 shadow-2xl relative overflow-hidden animate-in fade-in duration-300 space-y-6">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Header row with Scan Again button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block font-bold">
                      YOUR MOOD
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      5-Second Scan ({finalResult.frameCount} frames analyzed)
                    </span>
                  </div>

                  {/* Scan Again Button */}
                  <button
                    onClick={handleStartMoodScan}
                    className="px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-xs font-mono text-purple-200 flex items-center gap-2 shrink-0 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Scan Again</span>
                  </button>
                </div>

                {/* Large Emoji & Playful Mood Display */}
                <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/50 via-indigo-950/40 to-[#0F111E] border border-purple-500/30 shadow-xl flex flex-col sm:flex-row items-center gap-6">
                  {/* Large Expressive Emoji */}
                  <div className="w-28 h-28 rounded-3xl bg-black/50 border-2 border-white/15 flex items-center justify-center text-7xl shrink-0 shadow-2xl shadow-purple-950/60 transform hover:scale-105 transition-transform animate-in zoom-in-50 duration-300">
                    {detectedMood.emoji}
                  </div>
                  
                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Mood:</span>
                      <h3 className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${detectedMood.accentColor}`}>
                        {detectedMood.name}
                      </h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${detectedMood.badgeBg}`}>
                        {finalResult.confidence}% match
                      </span>
                    </div>

                    {/* MOODIFY says message */}
                    <div className="pt-1">
                      <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold mr-1.5 block sm:inline">
                        MOODIFY says:
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white italic">
                        &ldquo;{detectedMood.message}&rdquo;
                      </span>
                    </div>
                  </div>
                </div>

                {/* 💡 MOOD TIP CARD */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#090B14] border border-cyan-500/30 relative overflow-hidden">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0 text-cyan-300">
                      💡
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold block">
                        MOOD TIP
                      </span>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                        {detectedMood.tip}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 🎵 BOLLYWOOD SONGS FOR YOUR MOOD (Directly using MOODIFY calculated mood) */}
                <BollywoodRecommendations
                  moodId={detectedMood.id}
                  moodName={detectedMood.name}
                  moodEmoji={detectedMood.emoji}
                />

                {/* 🎵 MUSIC FOR YOUR MOOD MINI PREVIEW */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-[#0F111E] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-900/40 border border-purple-400/30 flex items-center justify-center text-cyan-300 shrink-0">
                      <Music className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold block">
                        🎵 MUSIC FOR YOUR MOOD
                      </span>
                      <p className="text-xs text-slate-300">
                        Soundtrack tuned to {detectedMood.name} is ready below.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleToggleSoundtrackPreview}
                      className="px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg border border-purple-400/40 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      {miniPlayerPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                      <span>{miniPlayerPlaying ? 'Pause Soundtrack' : 'Play Mood Music'}</span>
                    </button>
                  </div>
                </div>

                {/* Stress Score & Multi-Signal Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-2">
                  
                  {/* Circular Stress Meter (5 cols) */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center bg-black/40 p-5 rounded-3xl border border-white/5 text-center">
                    <span className="text-xs font-mono uppercase text-slate-400 mb-1">Calculated Stress Score</span>
                    
                    <div className="relative w-32 h-32 flex items-center justify-center my-1">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-white/10 stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          stroke={finalResult.stressResult.categoryColor}
                          strokeDasharray={`${finalResult.stressResult.score}, 100`}
                          strokeLinecap="round"
                          strokeWidth="3.5"
                          fill="none"
                          className="transition-all duration-700 ease-out"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>

                      <div className="absolute flex flex-col items-center">
                        <span className="text-3xl font-black font-mono text-white tracking-tight">
                          {finalResult.stressResult.score}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">/ 100</span>
                      </div>
                    </div>

                    <div className="mt-1 text-xs font-mono font-bold" style={{ color: finalResult.stressResult.categoryColor }}>
                      {finalResult.stressResult.categoryLabel}
                    </div>
                  </div>

                  {/* Multi-Signal Factor Breakdown (7 cols) */}
                  <div className="md:col-span-7 space-y-2.5">
                    <span className="text-xs font-mono uppercase text-slate-300 font-bold block">
                      5-Second Observation Factors
                    </span>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">❤️ Heart Rate</span>
                        <span className="text-sm font-bold text-cyan-300 font-mono">{finalResult.avgBpm} BPM</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">🌡️ Temperature</span>
                        <span className="text-sm font-bold text-amber-300 font-mono">{finalResult.avgTemp}°C</span>
                      </div>

                      <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                        <span className="text-slate-400 block text-[10px]">😊 Expression</span>
                        <span className="text-sm font-bold text-purple-300 font-mono capitalize">{finalResult.dominantExpression}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/30 border border-white/5 text-[11px] font-mono text-slate-400">
                      <span>Multi-signal fusion: </span>
                      <strong className="text-cyan-300">{finalResult.frameCount} frames analyzed</strong>
                      <span> continuously over 5 seconds.</span>
                    </div>
                  </div>

                </div>

                {/* High Stress Guided Relief Alert Trigger */}
                {finalResult.stressResult.score >= 70 && (
                  <div className="mt-4 p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                      <div>
                        <span className="text-xs font-mono font-bold text-rose-300 uppercase block">
                          🔴 HIGH STRESS INDICATORS DETECTED
                        </span>
                        <p className="text-xs text-rose-200 mt-0.5">
                          Elevated arousal cues detected. Recommended to stabilize autonomic tone.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setReliefModalOpen(true)}
                      className="w-full sm:w-auto py-2 px-5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 shrink-0 cursor-pointer"
                    >
                      <Wind className="w-4 h-4" />
                      <span>Start Guided Relief</span>
                    </button>
                  </div>
                )}

                {/* Medical Disclaimer Note */}
                <div className="pt-3 border-t border-white/10 text-center text-[11px] text-slate-400 italic">
                  &ldquo;MOODIFY is a wellness tool for emotional awareness, not a medical diagnostic device. If you are experiencing persistent distress, consider talking to someone you trust or seeking professional support.&rdquo;
                </div>

              </div>
            )}

          </div>

        </div>

        {/* 3. MOOD-BASED MUSIC RECOMMENDATION SECTION */}
        <MoodMusicSection 
          stressScore={finalResult ? finalResult.stressResult.score : 20} 
          facialExpression={detectedMood ? detectedMood.id : 'calm'} 
          isScanComplete={scanPhase === 'complete'}
          onStartScan={handleStartMoodScan}
        />

      </div>

      {/* Guided Breathing Modal */}
      <GuidedReliefModal
        isOpen={reliefModalOpen}
        onClose={() => setReliefModalOpen(false)}
        stressScore={finalResult ? finalResult.stressResult.score : 50}
      />
    </section>
  );
};
