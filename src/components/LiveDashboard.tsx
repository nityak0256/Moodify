import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  ShieldAlert, 
  Cpu, 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Moon, 
  Compass, 
  TrendingUp, 
  Info,
  Zap
} from 'lucide-react';
import { SensorInputs, MoodifyResult, ActivityLevel, ContextType } from '../types/moodify';
import { analyzeMultiSignals, SCENARIO_PRESETS, generateHistoricalTimeline } from '../utils/engine';

interface LiveDashboardProps {
  externalInputs?: SensorInputs;
  onInputsChange?: (newInputs: SensorInputs) => void;
}

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ externalInputs, onInputsChange }) => {
  // Default values matching prompt exactly: 72 BPM, Low Activity, 32% Stress, Calm Mood, 87% AI Confidence
  const [inputs, setInputsState] = useState<SensorInputs>(externalInputs || {
    heartRate: 72,
    activity: 'resting',
    activityCpm: 38,
    hrv: 62,
    sleepHours: 7.8,
    context: 'relaxing_leisure'
  });

  const setInputs = (newInputs: SensorInputs) => {
    setInputsState(newInputs);
    if (onInputsChange) {
      onInputsChange(newInputs);
    }
  };

  useEffect(() => {
    if (externalInputs) {
      setInputsState(externalInputs);
    }
  }, [externalInputs]);

  const [activePresetId, setActivePresetId] = useState<string>('custom');
  const [timeline] = useState(generateHistoricalTimeline());
  const [pulseTick, setPulseTick] = useState<boolean>(false);
  const [result, setResult] = useState<MoodifyResult>(() => analyzeMultiSignals({
    heartRate: 72,
    activity: 'resting',
    activityCpm: 38,
    hrv: 62,
    sleepHours: 7.8,
    context: 'relaxing_leisure'
  }));

  // Re-run analysis whenever inputs change
  useEffect(() => {
    setResult(analyzeMultiSignals(inputs));
  }, [inputs]);

  // Heartbeat pulse animation timed according to BPM
  useEffect(() => {
    const intervalMs = Math.max(300, Math.round(60000 / inputs.heartRate));
    const interval = setInterval(() => {
      setPulseTick(true);
      setTimeout(() => setPulseTick(false), 240);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [inputs.heartRate]);

  // Preset switch handler
  const handleSelectPreset = (presetId: string) => {
    setActivePresetId(presetId);
    const preset = SCENARIO_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setInputs({ ...preset.inputs });
    }
  };

  const handleResetToDefault = () => {
    setActivePresetId('default');
    setInputs({
      heartRate: 72,
      activity: 'resting',
      activityCpm: 38,
      hrv: 62,
      sleepHours: 7.8,
      context: 'relaxing_leisure'
    });
  };

  // Stress indicator color mapping
  const getStressColor = (score: number) => {
    if (score < 35) return { stroke: '#10B981', text: 'text-emerald-400', label: 'Low / Calm' };
    if (score < 65) return { stroke: '#F59E0B', text: 'text-amber-400', label: 'Moderate Arousal' };
    return { stroke: '#F43F5E', text: 'text-rose-400', label: 'Elevated Stress' };
  };

  const stressColorInfo = getStressColor(result.stressScore);

  return (
    <section id="live-dashboard" className="py-24 bg-[#090B13] relative border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Interactive Telemetry Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Live MOODIFY Dashboard
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mt-2">
              Explore real-time multi-signal sensor synthesis. Test real-world scenarios or adjust parameters to see how signals interact.
            </p>
          </div>

          {/* Mandatory Demo Label Notice */}
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-center gap-3 shrink-0">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-left font-mono">
              <span className="text-[11px] font-bold text-amber-300 block uppercase">
                DEMO / SIMULATED DATA
              </span>
              <span className="text-[10px] text-amber-200/80">
                Academic & Hackathon Research Model
              </span>
            </div>
          </div>
        </div>

        {/* Preset Selector Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-[#0F111D] border border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Explore Scenarios:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleResetToDefault}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activePresetId === 'default' 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' 
                    : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                Default State (72 BPM)
              </button>

              {SCENARIO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activePresetId === preset.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {preset.name}
                </button>
              ))}

              <button
                onClick={handleResetToDefault}
                className="p-1.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-auto"
                title="Reset to default baseline"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. Large Central State Card (Requested: CALM 😌) */}
        <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121528] via-[#161A33] to-[#0E101D] border border-purple-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Current State Inferred by AI</span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-5xl sm:text-6xl animate-bounce" style={{ animationDuration: '3s' }}>
                  {result.stateEmoji}
                </span>
                <div>
                  <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
                    {result.stateLabel}
                  </h3>
                  <span className="text-xs font-mono text-cyan-300 font-medium">
                    Autonomic Balance: {inputs.hrv > 50 ? 'Parasympathetic Dominant' : 'Sympathetic Active'}
                  </span>
                </div>
              </div>

              <p className="text-base text-slate-300 max-w-2xl pt-1">
                "{result.summary}"
              </p>
            </div>

            {/* Quick State Metric Pill Display */}
            <div className="flex flex-row md:flex-col items-center gap-4 bg-black/40 px-6 py-4 rounded-2xl border border-white/10 shrink-0">
              <div className="text-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">AI Stress Index</span>
                <span className={`text-3xl font-extrabold font-mono ${stressColorInfo.text}`}>
                  {result.stressScore}%
                </span>
              </div>
              <div className="w-[1px] h-8 md:w-full md:h-[1px] bg-white/10" />
              <div className="text-center">
                <span className="text-[11px] font-mono uppercase text-slate-400 block">AI Confidence</span>
                <span className="text-3xl font-extrabold font-mono text-cyan-300">
                  {result.confidenceScore}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Five Core Real-Time Metric Indicators (Heart Rate, Activity, Stress, Mood, AI Confidence) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          
          {/* Card 1: Heart Rate */}
          <div className="p-5 rounded-2xl bg-[#0E101B] border border-white/10 hover:border-rose-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Heart Rate</span>
              <Heart className={`w-4 h-4 text-rose-400 transition-transform duration-200 ${pulseTick ? 'scale-125' : 'scale-100'}`} />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold font-mono text-white">{inputs.heartRate}</span>
              <span className="text-xs font-mono text-rose-400">BPM</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
              <span>R-R Rhythm:</span>
              <span className="text-slate-200">Regular</span>
            </div>
          </div>

          {/* Card 2: Activity */}
          <div className="p-5 rounded-2xl bg-[#0E101B] border border-white/10 hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Activity</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-cyan-300 capitalize">{inputs.activity}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
              <span>Accelerometer:</span>
              <span className="text-slate-200">{inputs.activityCpm} cpm</span>
            </div>
          </div>

          {/* Card 3: Stress Gauge (Animated Circular Progress) */}
          <div className="p-5 rounded-2xl bg-[#0E101B] border border-white/10 hover:border-purple-500/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">Stress Level</span>
              <ShieldAlert className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-center justify-between my-1">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke={stressColorInfo.stroke}
                    strokeDasharray={`${result.stressScore}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-mono font-bold text-white">
                  {result.stressScore}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-200 block">{stressColorInfo.label}</span>
                <span className="text-[10px] text-slate-400 font-mono">Autonomic Index</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 pt-1 border-t border-white/5 font-mono">
              Fused SNS Index
            </div>
          </div>

          {/* Card 4: Mood */}
          <div className="p-5 rounded-2xl bg-[#0E101B] border border-white/10 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Inferred Mood</span>
              <span className="text-lg">{result.stateEmoji}</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-white">{result.stateLabel}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
              <span>Tone:</span>
              <span className="text-cyan-300 capitalize">{result.stateTone}</span>
            </div>
          </div>

          {/* Card 5: AI Confidence */}
          <div className="p-5 rounded-2xl bg-[#0E101B] border border-white/10 hover:border-cyan-500/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-medium">AI Confidence</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-center justify-between my-1">
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/10 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke="#06B6D4"
                    strokeDasharray={`${result.confidenceScore}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-mono font-bold text-cyan-300">
                  {result.confidenceScore}%
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-400 block">High Accuracy</span>
                <span className="text-[10px] text-slate-400 font-mono">4 Vectors Fused</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 pt-1 border-t border-white/5 font-mono">
              Cross-Signal Match
            </div>
          </div>

        </div>

        {/* 3. Interactive Signal Adjustment Sliders (Custom Sandbox) */}
        <div className="mb-10 p-6 sm:p-7 rounded-3xl bg-[#0D0F1A] border border-white/10 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-400" />
                <span>Adjust Live Telemetry Signals (Custom Sandbox)</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Change any variable below to observe how MOODIFY reconciles conflicting sensor inputs.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-500/30">
              Live Signal Cross-Correlation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Control 1: Heart Rate */}
            <div className="space-y-2 bg-black/30 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  Heart Rate
                </span>
                <span className="font-mono font-bold text-rose-400 text-sm">{inputs.heartRate} BPM</span>
              </div>
              <input
                type="range"
                min="45"
                max="175"
                value={inputs.heartRate}
                onChange={(e) => {
                  setActivePresetId('custom');
                  setInputs({ ...inputs, heartRate: Number(e.target.value) });
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>45 (Rest)</span>
                <span>100 (Threshold)</span>
                <span>175 (Sprint)</span>
              </div>
            </div>

            {/* Control 2: Physical Activity */}
            <div className="space-y-2 bg-black/30 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  Activity Level
                </span>
                <span className="font-mono font-bold text-cyan-400 text-sm capitalize">{inputs.activity}</span>
              </div>
              <div className="grid grid-cols-4 gap-1 pt-1">
                {(['resting', 'sedentary', 'moderate', 'high'] as ActivityLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setActivePresetId('custom');
                      const cpmMap = { resting: 20, sedentary: 60, light: 200, moderate: 480, high: 890 };
                      setInputs({ ...inputs, activity: level, activityCpm: cpmMap[level] });
                    }}
                    className={`py-1.5 px-1 rounded text-[10px] font-mono uppercase transition-colors ${
                      inputs.activity === level
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {level.slice(0, 4)}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-400 font-mono pt-1">
                Kinetic motion vector
              </div>
            </div>

            {/* Control 3: Heart Rate Variability (HRV) */}
            <div className="space-y-2 bg-black/30 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                  HRV (RMSSD)
                </span>
                <span className="font-mono font-bold text-indigo-300 text-sm">{inputs.hrv} ms</span>
              </div>
              <input
                type="range"
                min="15"
                max="105"
                value={inputs.hrv}
                onChange={(e) => {
                  setActivePresetId('custom');
                  setInputs({ ...inputs, hrv: Number(e.target.value) });
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>15 (Distress)</span>
                <span>50 (Normal)</span>
                <span>105 (Resilient)</span>
              </div>
            </div>

            {/* Control 4: Sleep Architecture */}
            <div className="space-y-2 bg-black/30 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-purple-400" />
                  Sleep Duration
                </span>
                <span className="font-mono font-bold text-purple-300 text-sm">{inputs.sleepHours} hrs</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="10.0"
                step="0.5"
                value={inputs.sleepHours}
                onChange={(e) => {
                  setActivePresetId('custom');
                  setInputs({ ...inputs, sleepHours: Number(e.target.value) });
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>3h (Deprived)</span>
                <span>7.5h (Optimal)</span>
                <span>10h (Full)</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4. Live Charts: Continuous ECG Line Chart & 24h Stress/Mood Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Heart Rate / ECG Line Chart (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Live ECG & Heart-Rate Dynamics</h4>
                    <p className="text-xs text-slate-400">Real-time inter-beat intervals (RR) visualization</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                  {inputs.heartRate} BPM ACTIVE
                </span>
              </div>

              {/* Animated Waveform Display */}
              <div className="h-44 w-full bg-[#06080F] rounded-2xl border border-white/10 relative overflow-hidden flex items-center p-2">
                <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
                
                {/* SVG ECG Line */}
                <svg className="w-full h-28 stroke-cyan-400 fill-none z-10" viewBox="0 0 600 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ecgGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,50 L80,50 L95,48 L105,52 L115,50 L140,50 L150,25 L160,85 L170,12 L180,60 L190,50 L240,50 L260,42 L275,50 L340,50 L355,48 L365,52 L375,50 L400,50 L410,25 L420,85 L430,12 L440,60 L450,50 L500,50 L520,42 L535,50 L600,50"
                    stroke="url(#ecgGlow)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Sweeping laser scanner */}
                <div 
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none"
                  style={{
                    animation: `pulse ${(60 / inputs.heartRate) * 2}s cubic-bezier(0.4, 0, 0.6, 1) infinite`
                  }}
                />

                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-500">
                  Sampling Frequency: 250 Hz · Optical PPG Sensor #A1
                </div>
              </div>
            </div>

            {/* Diagnostic Metrics Under Chart */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-center font-mono text-xs">
              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-slate-400 text-[10px] block">R-R Mean</span>
                <span className="text-slate-200 font-bold">{Math.round(60000 / inputs.heartRate)} ms</span>
              </div>
              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-slate-400 text-[10px] block">SDNN</span>
                <span className="text-slate-200 font-bold">{Math.round(inputs.hrv * 1.15)} ms</span>
              </div>
              <div className="bg-black/30 p-2 rounded-xl">
                <span className="text-slate-400 text-[10px] block">Sympathetic Tone</span>
                <span className={`${inputs.heartRate > 100 && inputs.activity !== 'high' ? 'text-rose-400' : 'text-emerald-400'} font-bold`}>
                  {inputs.heartRate > 100 && inputs.activity !== 'high' ? 'Dominant' : 'Equilibrium'}
                </span>
              </div>
            </div>
          </div>

          {/* Stress & Mood 24-Hour Timeline (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Daily Stress & Mood Timeline</h4>
                    <p className="text-xs text-slate-400">Chronological signal progression</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400">24H ARCHIVE</span>
              </div>

              {/* Timeline Items */}
              <div className="space-y-3 my-2 max-h-56 overflow-y-auto pr-1">
                {timeline.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-colors flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-cyan-400">{item.time}</span>
                        <span className="text-xs font-semibold text-white">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                        <span>HR: {item.hr} BPM</span>
                        <span>·</span>
                        <span>Activity: {item.activity}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-mono font-bold ${item.stress > 60 ? 'text-rose-400' : item.stress > 35 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {item.stress}%
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">Stress</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Notice how 08:30 AM (Morning Jog) has high HR without high stress!</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
