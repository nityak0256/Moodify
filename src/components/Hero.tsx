import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Activity, Heart, Shield, Cpu, Play, CheckCircle2, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onHowItWorksClick }) => {
  const [pulseBeat, setPulseBeat] = useState(false);
  const [currentBpm, setCurrentBpm] = useState(72);

  // Live gentle pulse simulation for visual authenticity
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseBeat(true);
      setTimeout(() => setPulseBeat(false), 300);
      // Small realistic jitter around 72 BPM
      setCurrentBpm(prev => 70 + Math.floor(Math.sin(Date.now() / 1500) * 3));
    }, 850);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission, Typography & CTA */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Project Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Next-Gen Autonomic Health Intelligence</span>
              <span className="text-white/20">|</span>
              <span className="text-purple-200">Research & Hackathon Prototype</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                  MOODIFY
                </span>
                <span className="block mt-2 text-3xl sm:text-5xl xl:text-6xl text-slate-100 font-semibold">
                  "Your mood is more than a number."
                </span>
              </h1>
              
              <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                An AI-powered system that combines multiple signals to understand stress and emotional states more intelligently.
              </p>
            </div>

            {/* Core Idea Banner */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-[#101322] border border-purple-500/30 shadow-inner">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                  <Zap className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300 block mb-0.5">
                    Core Philosophical Principle
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    "One signal can mislead. Multiple signals can tell the story."
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 border border-purple-400/40 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span>Try MOODIFY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onHowItWorksClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>How It Works</span>
              </button>
            </div>

            {/* Quick trust / feature hints */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400 pt-2 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Multi-Modal Sensor Fusion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Contextual Discrimination</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero False Stress Alarms</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual AI Dashboard / Mockup */}
          <div className="lg:col-span-5 relative">
            {/* Glowing animated decorative rings behind dashboard */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-purple-600/30 via-cyan-500/20 to-indigo-600/30 rounded-3xl blur-2xl opacity-70 animate-signal-pulse -z-10" />
            
            {/* Main AI Dashboard Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl shadow-purple-950/50 relative overflow-hidden">
              
              {/* Header inside mockup */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute inset-0 opacity-75" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400 relative" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-medium uppercase tracking-wider text-slate-200">
                      Live Telemetry Stream
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono">Simulated Biometric Node #01</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                    REAL-TIME FUSION
                  </span>
                </div>
              </div>

              {/* Central Mood & State Highlight */}
              <div className="my-6 p-4 rounded-2xl bg-gradient-to-br from-purple-900/30 via-[#131626] to-[#0D0F1A] border border-purple-500/30 text-center relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                  Synthesized State
                </span>
                <div className="flex items-center justify-center gap-3 my-1">
                  <span className="text-3xl">😌</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
                    CALM
                  </span>
                </div>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Physiological baseline is stable. Autonomic parasympathetic tone is dominant.
                </p>
              </div>

              {/* 5 Core Metric Cards requested */}
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                
                {/* 1. Heart Rate */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-rose-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium">Heart Rate</span>
                    <Heart className={`w-4 h-4 text-rose-400 transition-transform duration-300 ${pulseBeat ? 'scale-125' : 'scale-100'}`} />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-mono text-white">{currentBpm}</span>
                    <span className="text-xs text-rose-400 font-mono">BPM</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Resting zone</span>
                  </div>
                </div>

                {/* 2. Stress Level */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium">Stress Level</span>
                    <Shield className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-mono text-purple-300">32%</span>
                    <span className="text-xs text-slate-400 font-mono">Index</span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-400 to-purple-400 h-full w-[32%]" />
                  </div>
                </div>

                {/* 3. Activity */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium">Activity</span>
                    <Activity className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-cyan-300">Low</span>
                    <span className="text-[11px] text-slate-400 font-mono">(Sedentary)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Accelerometry: 38 cpm</p>
                </div>

                {/* 4. AI Confidence */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium">AI Confidence</span>
                    <Cpu className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold font-mono text-indigo-300">87%</span>
                    <span className="text-xs text-emerald-400 font-mono">High</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Cross-modal agreement</p>
                </div>

              </div>

              {/* Animated Live ECG Graphic Wave */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>Continuous ECG Waveform</span>
                  <span className="text-cyan-400">0.84s R-R Interval</span>
                </div>
                <div className="h-10 w-full bg-[#07080E] rounded-lg border border-white/5 relative overflow-hidden flex items-center">
                  <svg className="w-full h-8 stroke-cyan-400 fill-none" viewBox="0 0 300 40" preserveAspectRatio="none">
                    <path
                      d="M0,20 L40,20 L50,18 L55,22 L60,20 L75,20 L80,10 L85,35 L90,5 L95,24 L100,20 L120,20 L135,16 L145,20 L180,20 L190,18 L195,22 L200,20 L215,20 L220,10 L225,35 L230,5 L235,24 L240,20 L260,20 L275,16 L285,20 L300,20"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {/* Scanning line */}
                  <div className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-pulse" />
                </div>
              </div>

              {/* Simulated Notice */}
              <div className="mt-3 text-center">
                <span className="text-[10px] text-slate-500 font-mono">
                  [DEMO PREVIEW · MULTI-SIGNAL SENSOR INTEGRATION]
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
