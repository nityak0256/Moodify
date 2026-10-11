import React, { useState } from 'react';
import { Sparkles, Brain, Cpu, ShieldCheck, RefreshCw, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { MoodifyResult, SensorInputs } from '../types/moodify';

interface AiInsightsSectionProps {
  result: MoodifyResult;
  inputs: SensorInputs;
  onJumpToSimulator: () => void;
}

export const AiInsightsSection: React.FC<AiInsightsSectionProps> = ({
  result,
  inputs,
  onJumpToSimulator
}) => {
  const [analyzingState, setAnalyzingState] = useState(false);

  const handleSimulateReanalysis = () => {
    setAnalyzingState(true);
    setTimeout(() => {
      setAnalyzingState(false);
    }, 600);
  };

  return (
    <section id="ai-insights" className="py-20 bg-[#0A0C16] relative border-t border-white/5 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Real-Time Neural Inference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Assistant Signal Synthesis
          </h2>
          <p className="text-sm text-slate-400">
            Automated contextual interpretation generated from live multi-modal biometric vectors.
          </p>
        </div>

        {/* Central Card: "MOODIFY INSIGHT" */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-purple-500/30 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-[#0D0F1B] rounded-[15px] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-cyan-300" />
                </div>
              </div>
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block">
                  INTELLIGENT REASONING ENGINE
                </span>
                <h3 className="text-2xl font-black text-white font-mono tracking-tight">
                  MOODIFY INSIGHT
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateReanalysis}
                disabled={analyzingState}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${analyzingState ? 'animate-spin text-purple-400' : ''}`} />
                <span>{analyzingState ? 'Re-correlating...' : 'Re-verify Signals'}</span>
              </button>

              <button
                onClick={onJumpToSimulator}
                className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-xs text-purple-200 flex items-center gap-1 transition-colors"
              >
                <span>Edit Vectors</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI Synthesis Speech bubble */}
          <div className="my-8 p-6 sm:p-7 rounded-2xl bg-[#080911]/90 border border-white/10 relative">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Contextual Neural Analysis
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Confidence: {result.confidenceScore}%
                  </span>
                </div>

                <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                  "{result.insightAnalysis}"
                </p>

                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 leading-relaxed">
                  <strong className="text-cyan-300 font-mono block mb-1">
                    Why Single-Signal Failed Here:
                  </strong>
                  {result.whySingleSignalFails}
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Meter & Factor Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/10 items-center">
            
            {/* Confidence Meter (5 cols) */}
            <div className="md:col-span-5 bg-black/40 p-5 rounded-2xl border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-slate-400">AI Confidence Score</span>
                <span className="text-2xl font-mono font-bold text-cyan-300">{result.confidenceScore}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${result.confidenceScore}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0% Ambiguity</span>
                <span className="text-emerald-400">Robust Cross-Match</span>
                <span>100% Deterministic</span>
              </div>
            </div>

            {/* Signal Weights Attribution (7 cols) */}
            <div className="md:col-span-7 space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Multi-Signal Contribution Weights:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {result.signalWeights.map((w, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium block">{w.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{w.value}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-300">
                      {w.weight}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Supportive Recommendation */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-slate-300">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <strong className="text-white">Actionable Suggestion: </strong>
              <span>{result.actionRecommendation}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
