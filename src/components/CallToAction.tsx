import React from 'react';
import { ArrowRight, Sliders, Sparkles } from 'lucide-react';

interface CallToActionProps {
  onExploreClick: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onExploreClick }) => {
  return (
    <section className="py-24 bg-[#090A12] relative overflow-hidden border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-purple-500/30 shadow-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Interactive Biometric Intelligence</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Understand the signals.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 block sm:inline">
              Understand the mood.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            MOODIFY brings multiple signals together to create a more meaningful picture of emotional state.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 border border-purple-400/40 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <Sliders className="w-5 h-5 text-cyan-300" />
              <span>Explore MOODIFY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-8 text-xs text-slate-400 font-mono">
            Interactive Live Sandbox · Instant Heuristic & Cross-Modal Evaluation
          </div>
        </div>
      </div>
    </section>
  );
};
