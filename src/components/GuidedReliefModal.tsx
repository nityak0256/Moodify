import React, { useState, useEffect, useRef } from 'react';
import { X, Wind, Volume2, VolumeX, Sparkles, CheckCircle2, Play, Pause, RotateCcw } from 'lucide-react';

interface GuidedReliefModalProps {
  isOpen: boolean;
  onClose: () => void;
  stressScore: number;
}

type BreathingPhase = 'IN' | 'HOLD' | 'OUT';

export const GuidedReliefModal: React.FC<GuidedReliefModalProps> = ({
  isOpen,
  onClose,
  stressScore
}) => {
  const [phase, setPhase] = useState<BreathingPhase>('IN');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(4);
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Breathing cycle timer: 4s IN -> 4s HOLD -> 6s OUT
  useEffect(() => {
    if (!isOpen || !isActive) return;

    const interval = setInterval(() => {
      setTotalSeconds(prev => prev + 1);
      setPhaseSecondsLeft(prev => {
        if (prev <= 1) {
          if (phase === 'IN') {
            setPhase('HOLD');
            return 4;
          } else if (phase === 'HOLD') {
            setPhase('OUT');
            return 6;
          } else {
            setPhase('IN');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isActive, phase]);

  // Web Audio API ambient relaxation synthesizer (pure client-side, zero network dependencies)
  const toggleRelaxationAudio = () => {
    if (audioPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setAudioPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Soft ambient chord: 136.1 Hz (Om frequency) + 432 Hz + 528 Hz gentle sines
      const frequencies = [136.1, 216.0, 324.0, 432.0];
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      frequencies.forEach(freq => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle tremolo
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });

      setAudioPlaying(true);
    } catch (e) {
      console.warn('AudioContext not allowed or supported', e);
    }
  };

  // Cleanup audio on modal close
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const phaseInstruction = {
    IN: { label: 'Breathe In Slowly', sub: 'Fill your lower diaphragm through the nose', color: 'text-cyan-300' },
    HOLD: { label: 'Hold Gently', sub: 'Retain oxygen with relaxed shoulders', color: 'text-purple-300' },
    OUT: { label: 'Breathe Out Completely', sub: 'Release all tension through parted lips', color: 'text-emerald-300' },
  }[phase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#0D0F1B] border border-purple-500/30 shadow-2xl p-6 sm:p-8 text-center overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-mono uppercase tracking-wider text-rose-300 font-bold">
              High Stress Relief Protocol
            </span>
          </div>

          <button
            onClick={() => {
              if (audioContextRef.current) {
                audioContextRef.current.close();
              }
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Breathing Ring */}
        <div className="my-8 flex flex-col items-center justify-center relative">
          
          {/* Animated Expanding/Contracting Circle */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            
            {/* Outer pulsating ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                phase === 'IN'
                  ? 'border-cyan-400 scale-100 bg-cyan-500/10 shadow-[0_0_50px_rgba(6,182,212,0.3)]'
                  : phase === 'HOLD'
                  ? 'border-purple-400 scale-100 bg-purple-500/15 shadow-[0_0_50px_rgba(168,85,247,0.3)]'
                  : 'border-emerald-400 scale-75 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              }`}
            />

            {/* Inner Ring */}
            <div
              className={`w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-700 ${
                phase === 'IN'
                  ? 'bg-cyan-950/70 border border-cyan-400/40 scale-110'
                  : phase === 'HOLD'
                  ? 'bg-purple-950/70 border border-purple-400/40 scale-105'
                  : 'bg-emerald-950/60 border border-emerald-400/40 scale-90'
              }`}
            >
              <span className="text-4xl font-extrabold font-mono text-white">
                {phaseSecondsLeft}s
              </span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-semibold mt-1">
                {phase}
              </span>
            </div>

          </div>

          {/* Phase text instruction */}
          <div className="mt-6 space-y-1">
            <h3 className={`text-xl font-bold tracking-tight ${phaseInstruction.color}`}>
              {phaseInstruction.label}
            </h3>
            <p className="text-xs text-slate-400">
              {phaseInstruction.sub}
            </p>
          </div>

          {/* Session Timer */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
            <span>Session:</span>
            <span className="text-cyan-300 font-bold">{formatTime(totalSeconds)}</span>
          </div>

        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => setIsActive(!isActive)}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 flex items-center justify-center gap-2 transition-colors"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={toggleRelaxationAudio}
            className={`py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2 transition-all ${
              audioPlaying
                ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
            }`}
          >
            {audioPlaying ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{audioPlaying ? '432Hz Sound (On)' : 'Play Calm Sound'}</span>
          </button>
        </div>

        <button
          onClick={() => {
            if (audioContextRef.current) audioContextRef.current.close();
            onClose();
          }}
          className="mt-4 w-full py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transition-transform hover:-translate-y-0.5"
        >
          Finish Breathing & Return to Monitor
        </button>

      </div>
    </div>
  );
};
