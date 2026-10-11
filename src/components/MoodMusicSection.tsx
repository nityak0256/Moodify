import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart, 
  Sparkles, 
  Sliders, 
  Headphones, 
  RefreshCw,
  AlertCircle,
  Radio,
  Lock
} from 'lucide-react';
import { 
  MusicTrack, 
  MoodRecommendationPackage, 
  getMusicRecommendation, 
  streamAudioPlayer,
  MOOD_MUSIC_CATALOG 
} from '../services/moodMusicService';
import { BollywoodRecommendations } from './BollywoodRecommendations';

interface MoodMusicSectionProps {
  stressScore: number;
  facialExpression: string;
  isScanComplete?: boolean;
  onStartScan?: () => void;
}

export const MoodMusicSection: React.FC<MoodMusicSectionProps> = ({
  stressScore,
  facialExpression,
  isScanComplete = true,
  onStartScan
}) => {
  const [musicTab, setMusicTab] = useState<'bollywood' | 'ambient'>('bollywood');
  const [selectedMoodOverride, setSelectedMoodOverride] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<MoodRecommendationPackage>(() => 
    getMusicRecommendation(stressScore, facialExpression)
  );

  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(() => recommendation.recommendedTracks[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [trackDuration, setTrackDuration] = useState<number>(() => recommendation.recommendedTracks[0]?.durationSeconds || 180);
  const [audioError, setAudioError] = useState<string | null>(null);

  // Hook into stream audio player lifecycle
  useEffect(() => {
    streamAudioPlayer.registerCallbacks({
      onStateChange: (playing) => {
        setIsPlaying(playing);
      },
      onTimeUpdate: (cur, dur) => {
        setPlaybackSeconds(cur);
        if (dur && Number.isFinite(dur) && dur > 0) {
          setTrackDuration(dur);
        }
      },
      onTrackEnded: () => {
        handleNextTrack();
      },
      onError: (msg) => {
        setAudioError(msg || null);
      }
    });

    return () => {
      // Don't kill audio on quick re-renders, but clear error
      setAudioError(null);
    };
  }, [recommendation, currentTrack]);

  // Update recommendations whenever stress or facial expression changes (unless user chose an override)
  useEffect(() => {
    if (!selectedMoodOverride) {
      const newRec = getMusicRecommendation(stressScore, facialExpression);
      setRecommendation(newRec);
      if (!isPlaying && newRec.recommendedTracks.length > 0) {
        setCurrentTrack(newRec.recommendedTracks[0]);
        setTrackDuration(newRec.recommendedTracks[0].durationSeconds);
      }
    }
  }, [stressScore, facialExpression, selectedMoodOverride, isPlaying]);

  // Handle manual mood override
  const handleSelectMoodOverride = (moodKey: string) => {
    setSelectedMoodOverride(moodKey);
    let syntheticScore = 20;
    let syntheticExpr = moodKey;
    if (moodKey === 'high_stress' || moodKey === 'anxious') {
      syntheticScore = 85;
      syntheticExpr = 'fear';
    } else if (moodKey === 'moderate_stress') {
      syntheticScore = 55;
      syntheticExpr = 'neutral';
    } else if (moodKey === 'calm') {
      syntheticScore = 15;
      syntheticExpr = 'neutral';
    } else if (moodKey === 'happy') {
      syntheticScore = 10;
      syntheticExpr = 'happy';
    } else if (moodKey === 'sad') {
      syntheticScore = 45;
      syntheticExpr = 'sad';
    } else if (moodKey === 'angry') {
      syntheticScore = 65;
      syntheticExpr = 'angry';
    } else if (moodKey === 'tired') {
      syntheticScore = 25;
      syntheticExpr = 'tired';
    }

    const rec = getMusicRecommendation(syntheticScore, syntheticExpr);
    setRecommendation(rec);
    if (rec.recommendedTracks.length > 0) {
      setCurrentTrack(rec.recommendedTracks[0]);
      setTrackDuration(rec.recommendedTracks[0].durationSeconds);
      if (isPlaying) {
        streamAudioPlayer.playTrack(rec.recommendedTracks[0]);
      }
    }
  };

  const handleResetToAuto = () => {
    setSelectedMoodOverride(null);
    const rec = getMusicRecommendation(stressScore, facialExpression);
    setRecommendation(rec);
    if (rec.recommendedTracks.length > 0) {
      setCurrentTrack(rec.recommendedTracks[0]);
      setTrackDuration(rec.recommendedTracks[0].durationSeconds);
    }
  };

  // Play / Pause toggle
  const togglePlayTrack = (track: MusicTrack) => {
    setAudioError(null);
    if (currentTrack.id === track.id) {
      if (isPlaying) {
        streamAudioPlayer.pause();
        setIsPlaying(false);
      } else {
        streamAudioPlayer.resume().then((started) => {
          if (!started) {
            streamAudioPlayer.playTrack(track);
          }
        });
      }
    } else {
      setCurrentTrack(track);
      setPlaybackSeconds(0);
      setTrackDuration(track.durationSeconds);
      streamAudioPlayer.playTrack(track);
    }
  };

  // Skip to next track in recommendation list
  const handleNextTrack = () => {
    setAudioError(null);
    const list = recommendation.recommendedTracks;
    const currentIndex = list.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % list.length;
    const next = list[nextIndex];
    setCurrentTrack(next);
    setPlaybackSeconds(0);
    setTrackDuration(next.durationSeconds);
    if (isPlaying) {
      streamAudioPlayer.playTrack(next);
    }
  };

  // Volume slider
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    streamAudioPlayer.setVolume(newVol);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      streamAudioPlayer.setMuted(false);
      streamAudioPlayer.setVolume(volume || 0.7);
    } else {
      setIsMuted(true);
      streamAudioPlayer.setMuted(true);
    }
  };

  // Scrubber seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSec = Number(e.target.value);
    setPlaybackSeconds(targetSec);
    streamAudioPlayer.seek(targetSec);
  };

  // Favorite toggle
  const toggleFavorite = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [trackId]: !prev[trackId] }));
  };

  const formatSecs = (sec: number) => {
    if (!Number.isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = trackDuration > 0 ? Math.min(100, (playbackSeconds / trackDuration) * 100) : 0;

  const moodButtons = [
    { key: 'happy', label: 'Happy', emoji: '😊' },
    { key: 'calm', label: 'Calm', emoji: '😌' },
    { key: 'neutral', label: 'Neutral', emoji: '😐' },
    { key: 'sad', label: 'Sad', emoji: '😔' },
    { key: 'angry', label: 'Angry', emoji: '😠' },
    { key: 'tired', label: 'Tired', emoji: '😴' },
    { key: 'high_stress', label: 'Anxious', emoji: '😨' },
  ];

  return (
    <section id="mood-music" className="py-20 bg-[#090A12] relative border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-2">
              <Headphones className="w-3.5 h-3.5 text-cyan-400" />
              <span>Bio-Responsive Audio Curation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              🎵 MUSIC FOR YOUR MOOD
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Real-time therapeutic acoustic environments tailored to your estimated emotional state and autonomic arousal.
            </p>
          </div>

          {/* Privacy & Legal Compliance Pill */}
          <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2.5 shrink-0">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-left font-mono">
              <span className="text-[11px] font-bold text-emerald-300 block uppercase">
                🔒 Privacy Protected & Royalty-Free
              </span>
              <span className="text-[10px] text-emerald-200/80">
                Streamed on-demand. Zero biometric telemetry leaves your browser.
              </span>
            </div>
          </div>
        </div>

        {/* Scan Status Notice Banner (Informative, without locking the player) */}
        {!isScanComplete && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-400/30 flex items-center justify-center shrink-0 text-cyan-300">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase font-mono">
                  Defaulting to Calm & Restorative Mode
                </p>
                <p className="text-[11px] text-slate-300">
                  Ready to play now! For personalized soundscapes tuned to your live facial micro-expressions, run the 5-second scan above.
                </p>
              </div>
            </div>
            {onStartScan && (
              <button
                onClick={onStartScan}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all shrink-0 flex items-center justify-center gap-2 shadow-md shadow-purple-900/30"
              >
                <span>🔍 Scan My Mood</span>
              </button>
            )}
          </div>
        )}

        {/* EXPERIENCE SELECTION TABS: BOLLYWOOD VS AMBIENT */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setMusicTab('bollywood')}
            className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
              musicTab === 'bollywood'
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white shadow-xl shadow-purple-950/60 border border-purple-400/50 scale-[1.02]'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            <span>🎵 Bollywood Mood Songs</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
              FEATURED
            </span>
          </button>

          <button
            onClick={() => setMusicTab('ambient')}
            className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all cursor-pointer ${
              musicTab === 'ambient'
                ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white shadow-xl shadow-purple-950/60 border border-purple-400/50 scale-[1.02]'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
            }`}
          >
            <span>🎧 Ambient & Lo-Fi Soundscapes</span>
          </button>
        </div>

        {/* BOLLYWOOD MUSIC TAB VIEW */}
        {musicTab === 'bollywood' && (
          <div className="mb-10 space-y-6 animate-in fade-in duration-300">
            <BollywoodRecommendations 
              moodId={selectedMoodOverride || facialExpression} 
            />

            {/* Mood selector inside Bollywood tab */}
            <div className="p-4 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>Explore Bollywood songs for another mood:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {moodButtons.map(mb => (
                  <button
                    key={mb.key}
                    onClick={() => handleSelectMoodOverride(mb.key)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                      (selectedMoodOverride === mb.key || (!selectedMoodOverride && facialExpression === mb.key))
                        ? 'bg-purple-600 text-white shadow-lg border border-purple-400/50'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                    }`}
                  >
                    <span>{mb.emoji}</span>
                    <span>{mb.label}</span>
                  </button>
                ))}

                {selectedMoodOverride && (
                  <button
                    onClick={handleResetToAuto}
                    className="px-2.5 py-1 rounded-xl text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors flex items-center gap-1 cursor-pointer"
                    title="Return to real-time detected mood"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Sync to AI</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* AMBIENT & LO-FI TAB VIEW */}
        {musicTab === 'ambient' && (
          <div className="animate-in fade-in duration-300">

        {/* Simple "Music unavailable" error notice when network fails */}
        {audioError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-center justify-between gap-4 text-rose-200 text-xs font-mono animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Music unavailable. Please check your internet connection.</span>
            </div>
            <button
              onClick={() => {
                setAudioError(null);
                streamAudioPlayer.playTrack(currentTrack);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-100 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* 1. CURRENT RECOMMENDATION BANNER */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-[#0F111E] border border-purple-500/30 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 block">
                Recommended for you right now
              </span>
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">{recommendation.moodEmoji}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {recommendation.themeTitle}
                </h3>
              </div>
              <p className="text-sm font-medium text-cyan-300">
                &ldquo;{recommendation.themeSubtitle}&rdquo;
              </p>
              <div className="pt-2 text-xs text-slate-300 max-w-3xl leading-relaxed">
                <strong className="text-white font-mono uppercase text-[11px] mr-1">Why this recommendation?</strong>
                {recommendation.whyExplanation}
              </div>
            </div>

            {/* Quick Action: Start Recommended Music / Pause */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
              <button
                onClick={() => togglePlayTrack(currentTrack)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-xl shadow-purple-600/30 border border-purple-400/40 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                aria-label={isPlaying ? 'Pause Music' : 'Start Recommended Music'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-cyan-300 fill-cyan-300" />
                    <span>Pause Music</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-cyan-300 fill-cyan-300" />
                    <span>🎵 Start Recommended Music</span>
                  </>
                )}
              </button>

              <span className="text-[10px] font-mono text-slate-400">
                Current: <strong className="text-slate-200">{currentTrack.title}</strong>
              </span>
            </div>
          </div>

          {/* User Override: Choose Another Mood */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>Choose another mood:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {moodButtons.map(mb => (
                <button
                  key={mb.key}
                  onClick={() => handleSelectMoodOverride(mb.key)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedMoodOverride === mb.key
                      ? 'bg-purple-600 text-white shadow-lg border border-purple-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                  }`}
                >
                  <span>{mb.emoji}</span>
                  <span>{mb.label}</span>
                </button>
              ))}

              {selectedMoodOverride && (
                <button
                  onClick={handleResetToAuto}
                  className="px-2.5 py-1 rounded-xl text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Return to real-time detected mood"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync to AI</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 2. MAIN ACTIVE AUDIO PLAYER BAR */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-[#0D0F1A] border border-white/10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            
            {/* Track Info */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px] shrink-0">
                <div className="w-full h-full bg-[#0E101B] rounded-[15px] flex items-center justify-center">
                  <Music className={`w-6 h-6 ${isPlaying ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                </div>
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0E101B] rounded-full animate-ping" />
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-purple-300 border border-white/10 uppercase">
                  {currentTrack.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-1">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  {currentTrack.artist} · Suggested for {recommendation.moodLabel}
                </p>
              </div>
            </div>

            {/* Player Controls & Scrubber */}
            <div className="flex-1 max-w-md mx-auto w-full space-y-2">
              <div className="flex items-center justify-center gap-4">
                {/* Main Play / Pause Button */}
                <button
                  onClick={() => togglePlayTrack(currentTrack)}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 transition-transform active:scale-95 cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>

                {/* Skip Next */}
                <button
                  onClick={handleNextTrack}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Next Track"
                  title="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Favorite */}
                <button
                  onClick={(e) => toggleFavorite(currentTrack.id, e)}
                  className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                    favorites[currentTrack.id]
                      ? 'bg-rose-500/20 text-rose-400'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                  }`}
                  aria-label="Favorite"
                  title="Favorite Track"
                >
                  <Heart className={`w-4 h-4 ${favorites[currentTrack.id] ? 'fill-rose-400' : ''}`} />
                </button>
              </div>

              {/* Progress bar and Scrubber */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="w-9 text-right">{formatSecs(playbackSeconds)}</span>
                <div className="flex-1 relative flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={trackDuration || 180}
                    value={playbackSeconds}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-400"
                    aria-label="Seek track"
                  />
                </div>
                <span className="w-9">{formatSecs(trackDuration)}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2.5 shrink-0 justify-end">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-20 sm:w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                aria-label="Volume slider"
              />
            </div>

          </div>
        </div>

        {/* 3. CURATED MUSIC RECOMMENDATION CARDS (4 CARDS) */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-base font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Curated Audio Selections For Your Current State</span>
            </h4>
            <span className="text-xs text-slate-400 font-mono">
              {recommendation.recommendedTracks.length} Recommendations Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendation.recommendedTracks.map((track) => {
              const isThisTrackPlaying = isPlaying && currentTrack.id === track.id;
              const isFav = !!favorites[track.id];

              return (
                <div
                  key={track.id}
                  onClick={() => togglePlayTrack(track)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    currentTrack.id === track.id
                      ? 'bg-[#131627] border-2 border-purple-500/50 shadow-2xl shadow-purple-950/40 -translate-y-1'
                      : 'bg-[#0E101B]/80 hover:bg-[#121422] border border-white/10 hover:border-purple-500/30'
                  }`}
                >
                  {/* Glowing background hint */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

                  <div>
                    {/* Top Row: Category + Favorite */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                        {track.category}
                      </span>

                      <button
                        onClick={(e) => toggleFavorite(track.id, e)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isFav ? 'text-rose-400' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title="Add to favorites"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-400' : ''}`} />
                      </button>
                    </div>

                    <h5 className="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {track.title}
                    </h5>
                    <p className="text-xs text-slate-400 font-mono mb-3">
                      {track.artist}
                    </p>

                    <p className="text-xs text-slate-300/90 leading-relaxed mb-4">
                      {track.description}
                    </p>
                  </div>

                  {/* Bottom Row: Duration + Play button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">
                      Duration: <strong className="text-slate-200">{track.duration}</strong>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayTrack(track);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isThisTrackPlaying
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-white/10 text-white hover:bg-purple-600/30 group-hover:border-purple-400/40'
                      }`}
                    >
                      {isThisTrackPlaying ? <Pause className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                      <span>{isThisTrackPlaying ? 'Pause' : 'Play'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )}

      </div>
    </section>
  );
};
