import React, { useState } from 'react';
import { Heart, Activity, AlertTriangle, CheckCircle, ArrowRight, Zap, Split, Sliders } from 'lucide-react';

export const TheProblemSection: React.FC = () => {
  const [selectedBpm, setSelectedBpm] = useState<number>(120);

  // Derive how a naive single-signal app evaluates versus how MOODIFY evaluates
  const naiveAssessment = selectedBpm > 100 
    ? { state: 'STRESSED / ANXIOUS!', color: 'text-rose-400', bg: 'bg-rose-950/40 border-rose-500/40', warning: 'High heart rate detected! Assumes acute distress.' }
    : { state: 'NORMAL / CALM', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-500/40', warning: 'Heart rate within baseline.' };

  return (
    <section id="problem" className="py-24 bg-[#0A0C14] relative border-t border-white/5 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs font-mono uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>The Single-Signal Blindspot</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why isn't heart rate enough?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Most generic fitness trackers rely heavily on pulse. But heart rate alone cannot distinguish between physical exertion and mental panic.
          </p>
        </div>

        {/* Side-by-Side Comparison: RUNNING vs STRESSED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: RUNNING */}
          <div className="glass-panel-interactive rounded-3xl p-7 border border-emerald-500/25 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-2xl">
                  🏃
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400 tracking-wider">Scenario A</span>
                  <h3 className="text-2xl font-bold text-white">RUNNING</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                PHYSICAL
              </span>
            </div>

            <div className="space-y-4 bg-black/30 rounded-2xl p-5 border border-white/5">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
                  <span>Heart Rate</span>
                </div>
                <span className="text-lg font-mono font-bold text-rose-300">120 BPM</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Activity</span>
                </div>
                <span className="text-sm font-semibold text-emerald-300">High (Pacing & Motion)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-base">😌</span>
                  <span>Likely State</span>
                </div>
                <span className="text-base font-bold text-emerald-400">Active / Exertion</span>
              </div>
            </div>

            <div className="mt-5 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed">
              <strong className="text-white block mb-0.5">Physiological Reality:</strong>
              The high heart rate is simply meeting muscular oxygen demand. Cortisol and distress are minimal; endorphins are active.
            </div>
          </div>

          {/* Card 2: STRESSED */}
          <div className="glass-panel-interactive rounded-3xl p-7 border border-rose-500/25 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-bl-full pointer-events-none group-hover:bg-rose-500/20 transition-colors" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-2xl">
                  😰
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-rose-400 tracking-wider">Scenario B</span>
                  <h3 className="text-2xl font-bold text-white">STRESSED</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono bg-rose-950/60 text-rose-300 border border-rose-500/30">
                COGNITIVE
              </span>
            </div>

            <div className="space-y-4 bg-black/30 rounded-2xl p-5 border border-white/5">
              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
                  <span>Heart Rate</span>
                </div>
                <span className="text-lg font-mono font-bold text-rose-300">120 BPM</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-base">🧠</span>
                  <span>Activity</span>
                </div>
                <span className="text-sm font-semibold text-rose-300">Low (Sitting at Desk)</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-slate-300 text-sm">
                  <span className="text-base">😰</span>
                  <span>Likely State</span>
                </div>
                <span className="text-base font-bold text-rose-400">Stressed / Fight-or-Flight</span>
              </div>
            </div>

            <div className="mt-5 p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200/90 leading-relaxed">
              <strong className="text-white block mb-0.5">Physiological Reality:</strong>
              The autonomic sympathetic system has fired adrenaline while stationary. Low movement + high pulse signals psychological overwhelm.
            </div>
          </div>

        </div>

        {/* The Core Explanation & Highlight Statement */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-[#121422] border border-purple-500/30 text-center relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-300">
              The Crucial Distinction
            </span>
            <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
              "Both situations can produce the same heart rate, but they represent completely different states."
            </p>
            <div className="pt-2">
              <span className="inline-block text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-cyan-300">
                MOODIFY looks beyond a single number.
              </span>
            </div>
          </div>
        </div>

        {/* Interactive "Single vs Multi-Signal" Test Drive */}
        <div className="mt-12 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-400" />
                <span>Interactive Paradox Simulator: Move the Pulse</span>
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                See how a naive single-signal tracker fails compared to MOODIFY's multi-signal engine.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-black/40 px-3.5 py-2 rounded-xl border border-white/10 shrink-0">
              <span className="text-xs text-slate-400">Current Heart Rate:</span>
              <span className="text-xl font-mono font-bold text-rose-400">{selectedBpm} BPM</span>
            </div>
          </div>

          {/* Slider */}
          <div className="space-y-3 mb-8">
            <input
              type="range"
              min="55"
              max="160"
              value={selectedBpm}
              onChange={(e) => setSelectedBpm(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              aria-label="Heart rate slider in BPM"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>55 BPM (Deep Rest)</span>
              <span>90 BPM (Resting Threshold)</span>
              <span>120 BPM (Exam or 5K Jog)</span>
              <span>160 BPM (Max Sprint)</span>
            </div>
          </div>

          {/* Comparison Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box A: Naive Tracker */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">Single-Signal Sensor</span>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                  NAIVE TRACKER
                </span>
              </div>
              <div className={`p-4 rounded-xl border ${naiveAssessment.bg} transition-all`}>
                <div className="text-xs text-slate-300 mb-1">Inferred State:</div>
                <div className={`text-lg font-bold font-mono ${naiveAssessment.color}`}>
                  {naiveAssessment.state}
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  {naiveAssessment.warning}
                </p>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                ⚠️ Cannot tell if the user is exercising or having a panic attack.
              </p>
            </div>

            {/* Box B: MOODIFY Multi-Signal */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-300 uppercase">MOODIFY Multi-Signal Engine</span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  SMART FUSION
                </span>
              </div>
              <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-400/30">
                <div className="text-xs text-purple-200 mb-1">Dual-Vector Cross Validation:</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Cross-examines Accelerometer + Sleep + HRV</span>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedBpm > 105
                    ? `At ${selectedBpm} BPM, MOODIFY queries kinetic movement. If stationary → flags cognitive stress. If moving → confirms healthy cardiovascular fitness.`
                    : `At ${selectedBpm} BPM, MOODIFY verifies vagal parasympathetic recovery (HRV) to confirm genuine restfulness.`
                  }
                </p>
              </div>
              <p className="text-[11px] text-cyan-300 font-mono">
                ✓ Zero false stress alarms during sports workouts.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
