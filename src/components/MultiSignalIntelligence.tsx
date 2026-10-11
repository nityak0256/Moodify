import React, { useState } from 'react';
import { Heart, Activity, Moon, Brain, Plus, Equal, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export const MultiSignalIntelligence: React.FC = () => {
  const [selectedSignal, setSelectedSignal] = useState<string>('heart');

  const signals = [
    {
      id: 'heart',
      name: 'Heart Rate (PPG)',
      symbol: '❤️',
      icon: Heart,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30',
      role: 'Cardiovascular Tempo & Autonomic Arousal',
      misleadingWhenAlone: 'Cannot differentiate between climbing stairs, drinking strong coffee, or panicking over an exam.',
      whyItMatters: 'Provides the fundamental raw metabolic and sympathetic heartbeat frequency. Serves as the primary catalyst that triggers cross-modal interrogation.',
      biometricKey: 'Inter-Beat Interval (RR) & Beats Per Minute'
    },
    {
      id: 'activity',
      name: 'Kinetic Activity',
      symbol: '🏃',
      icon: Activity,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      role: 'Metabolic & Musculoskeletal Workload',
      misleadingWhenAlone: 'Shows body movement, but cannot reveal if movement is frantic pacing or healthy athletics.',
      whyItMatters: 'The critical differentiator. If pulse is 130 BPM while stationary, it is psychological stress. If 130 BPM during physical movement, it is normal exercise.',
      biometricKey: '3-Axis Accelerometer (G-force & CPM)'
    },
    {
      id: 'sleep',
      name: 'Sleep Architecture',
      symbol: '😴',
      icon: Moon,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      role: 'Neuro-Cognitive Resilience & Baseline Buffer',
      misleadingWhenAlone: 'Sleep score shows past night, but cannot tell what you are experiencing right at this moment.',
      whyItMatters: 'Sleep debt directly shrinks emotional regulation thresholds. An otherwise minor exam stimulus causes severe autonomic spikes if preceded by 3 hours of sleep.',
      biometricKey: 'Deep / REM Cycles & Sleep Continuity'
    },
    {
      id: 'context',
      name: 'Situational Context',
      symbol: '🧠',
      icon: Brain,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      role: 'Environmental & Behavioral Grounding',
      misleadingWhenAlone: 'Calendar entries indicate an exam or meeting, but do not capture the person\'s biological calm or panic.',
      whyItMatters: 'Anchors signals in reality. Distinguishes between desk work, high-stakes public presentations, commutes, and restorative home downtime.',
      biometricKey: 'Activity Staging & Temporal Scheduling'
    }
  ];

  return (
    <section id="multi-signal" className="py-24 bg-[#0A0C16] relative border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Multi-Signal Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Multi-Signal Equation
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Hover over or tap any signal in the formula below to explore why combining diverse data points is the only reliable way to understand human mood.
          </p>
        </div>

        {/* The Core Formula Visual */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/30 via-indigo-950/30 to-[#0F111E] border border-white/10 shadow-2xl">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-center">
            
            {/* 1. Heart Rate */}
            <button
              onClick={() => setSelectedSignal('heart')}
              onMouseEnter={() => setSelectedSignal('heart')}
              className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 min-w-[120px] ${
                selectedSignal === 'heart'
                  ? 'bg-rose-500/20 border-2 border-rose-500/60 shadow-lg shadow-rose-500/20 -translate-y-1'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="text-3xl">❤️</span>
              <span className="text-sm font-bold text-white font-mono">Heart Rate</span>
              <span className="text-[10px] text-slate-400 font-mono">Pulse / PPG</span>
            </button>

            {/* Plus */}
            <div className="text-purple-400 font-bold text-2xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>

            {/* 2. Activity */}
            <button
              onClick={() => setSelectedSignal('activity')}
              onMouseEnter={() => setSelectedSignal('activity')}
              className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 min-w-[120px] ${
                selectedSignal === 'activity'
                  ? 'bg-cyan-500/20 border-2 border-cyan-500/60 shadow-lg shadow-cyan-500/20 -translate-y-1'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="text-3xl">🏃</span>
              <span className="text-sm font-bold text-white font-mono">Activity</span>
              <span className="text-[10px] text-slate-400 font-mono">Kinetic Motion</span>
            </button>

            {/* Plus */}
            <div className="text-purple-400 font-bold text-2xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>

            {/* 3. Sleep */}
            <button
              onClick={() => setSelectedSignal('sleep')}
              onMouseEnter={() => setSelectedSignal('sleep')}
              className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 min-w-[120px] ${
                selectedSignal === 'sleep'
                  ? 'bg-purple-500/20 border-2 border-purple-500/60 shadow-lg shadow-purple-500/20 -translate-y-1'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="text-3xl">😴</span>
              <span className="text-sm font-bold text-white font-mono">Sleep</span>
              <span className="text-[10px] text-slate-400 font-mono">Circadian Base</span>
            </button>

            {/* Plus */}
            <div className="text-purple-400 font-bold text-2xl flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>

            {/* 4. Context */}
            <button
              onClick={() => setSelectedSignal('context')}
              onMouseEnter={() => setSelectedSignal('context')}
              className={`p-4 rounded-2xl transition-all duration-300 flex flex-col items-center gap-2 min-w-[120px] ${
                selectedSignal === 'context'
                  ? 'bg-amber-500/20 border-2 border-amber-500/60 shadow-lg shadow-amber-500/20 -translate-y-1'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span className="text-3xl">🧠</span>
              <span className="text-sm font-bold text-white font-mono">Context</span>
              <span className="text-[10px] text-slate-400 font-mono">Environment</span>
            </button>

            {/* Equals */}
            <div className="text-cyan-400 font-bold text-2xl flex items-center justify-center">
              <Equal className="w-7 h-7" />
            </div>

            {/* 5. Result */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-600/30 to-indigo-600/30 border-2 border-purple-400/50 shadow-xl shadow-purple-900/40 flex flex-col items-center gap-2 min-w-[140px]">
              <span className="text-3xl">🤖</span>
              <span className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 font-mono">
                Better Understanding
              </span>
              <span className="text-[10px] text-cyan-300 font-mono">High Confidence</span>
            </div>

          </div>
        </div>

        {/* Interactive Deep-Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((sig) => {
            const isHoveredOrActive = selectedSignal === sig.id;
            const Icon = sig.icon;

            return (
              <div
                key={sig.id}
                onMouseEnter={() => setSelectedSignal(sig.id)}
                onClick={() => setSelectedSignal(sig.id)}
                className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isHoveredOrActive
                    ? `bg-[#131627] border-2 ${sig.borderColor} shadow-2xl -translate-y-1.5`
                    : 'bg-[#0E101B]/80 hover:bg-[#121422] border border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{sig.symbol}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${sig.borderColor} ${sig.color}`}>
                      {sig.biometricKey}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {sig.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-4">
                    {sig.role}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                    <div>
                      <span className="text-rose-400 font-semibold flex items-center gap-1 mb-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        When Evaluated Alone:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {sig.misleadingWhenAlone}
                      </p>
                    </div>

                    <div>
                      <span className="text-cyan-400 font-semibold flex items-center gap-1 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Why MOODIFY Needs It:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {sig.whyItMatters}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Weight Factor</span>
                  <span className="text-white font-bold">20 - 35%</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
