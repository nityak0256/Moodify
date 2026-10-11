import React, { useState } from 'react';
import { Radio, Cpu, Compass, Sparkles, ArrowDown, Check, Layers, Moon, Heart, Activity } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: 'STEP 1',
      title: 'COLLECT',
      subtitle: 'Continuous Multi-Modal Ingestion',
      icon: Radio,
      color: 'from-blue-500 to-cyan-400',
      borderColor: 'border-cyan-500/30',
      badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-500/30',
      signals: ['Heart Rate (PPG)', '3-Axis Accelerometer', 'Sleep Architecture', 'Heart Rate Variability', 'Movement Dynamics'],
      description: 'Collects diverse physiological and behavioral streams in real-time instead of isolating a single biometric metric.',
      detail: 'Sensors feed time-series vectors including inter-beat intervals (RR), kinetic jerk, sleep staging, and circadian rhythm signals.'
    },
    {
      number: 'STEP 2',
      title: 'ANALYZE',
      subtitle: 'Cross-Modal Vector Processing',
      icon: Cpu,
      color: 'from-purple-500 to-indigo-400',
      borderColor: 'border-purple-500/30',
      badgeColor: 'text-purple-400 bg-purple-950/60 border-purple-500/30',
      signals: ['Feature Extraction', 'Autonomic Balance (SNS vs PNS)', 'Cross-Signal Correlation', 'Noise Filtering'],
      description: 'AI analyzes signals in tandem, seeking corroborating physiological patterns rather than single-threshold spikes.',
      detail: 'A high pulse is cross-referenced with metabolic energy expenditure to calculate genuine autonomic activation ratios.'
    },
    {
      number: 'STEP 3',
      title: 'CONTEXTUALIZE',
      subtitle: 'Environmental & Behavioral Grounding',
      icon: Compass,
      color: 'from-amber-500 to-orange-400',
      borderColor: 'border-amber-500/30',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
      signals: ['Time of Day & Circadian Phase', 'Sedentary Duration', 'Scheduled Exam / Meeting Context', 'Recent Workout History'],
      description: 'Considers whether the user is running, studying for a midterm, giving a pitch, or winding down for bed.',
      detail: 'Context provides the missing lens that turns raw telemetry into meaningful human emotional comprehension.'
    },
    {
      number: 'STEP 4',
      title: 'UNDERSTAND',
      subtitle: 'Confidence-Scored Mood Synthesis',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-400',
      borderColor: 'border-emerald-500/30',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      signals: ['Estimated State (Calm, Active, Stressed)', 'Explicit Confidence %', 'Feature Attribution Matrix', 'Actionable Micro-Tips'],
      description: 'Produces an estimated emotional/stress state along with an transparent confidence score.',
      detail: 'Never provides clinical diagnosis; delivers empowering, calibrated insights that help people understand their bodies.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#08090E] relative overflow-hidden border-t border-white/5">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>The 4-Step Pipeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How MOODIFY Works
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            By analyzing multiple signals concurrently and applying contextual awareness, MOODIFY turns raw biometrics into meaningful emotional intelligence.
          </p>
        </div>

        {/* Visual Flow Architecture Banner as specified */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-[#0F111D] border border-white/10 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              End-to-End Processing Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center relative">
            
            {/* Flow Stage 1 */}
            <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/30 text-center relative group">
              <span className="text-[10px] font-mono text-cyan-400 block mb-1">INPUT VECTORS</span>
              <span className="text-base font-extrabold text-white tracking-wider font-mono">
                MULTIPLE SIGNALS
              </span>
              <p className="text-xs text-slate-400 mt-1">HR + Movement + Sleep</p>
            </div>

            {/* Connector */}
            <div className="hidden lg:flex items-center justify-center -mx-4 z-10">
              <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 font-mono text-xs">
                →
              </div>
            </div>

            {/* Flow Stage 2 */}
            <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/30 text-center relative">
              <span className="text-[10px] font-mono text-purple-400 block mb-1">CORRELATION</span>
              <span className="text-base font-extrabold text-white tracking-wider font-mono">
                AI ANALYSIS
              </span>
              <p className="text-xs text-slate-400 mt-1">Cross-modal fusion</p>
            </div>

            {/* Connector */}
            <div className="hidden lg:flex items-center justify-center -mx-4 z-10">
              <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 font-mono text-xs">
                →
              </div>
            </div>

            {/* Flow Stage 3 */}
            <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 text-center relative">
              <span className="text-[10px] font-mono text-amber-400 block mb-1">GROUNDING</span>
              <span className="text-base font-extrabold text-white tracking-wider font-mono">
                CONTEXT
              </span>
              <p className="text-xs text-slate-400 mt-1">Exercise, rest, study</p>
            </div>

            {/* Connector */}
            <div className="hidden lg:flex items-center justify-center -mx-4 z-10">
              <div className="w-8 h-8 rounded-full bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 font-mono text-xs">
                →
              </div>
            </div>

            {/* Flow Stage 4 */}
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 text-center relative">
              <span className="text-[10px] font-mono text-emerald-400 block mb-1">SYNTHESIS</span>
              <span className="text-base font-extrabold text-white tracking-wider font-mono">
                MOOD INSIGHT
              </span>
              <p className="text-xs text-slate-400 mt-1">State + Confidence %</p>
            </div>

          </div>
        </div>

        {/* 4 Animated Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `bg-[#131627] border-2 ${step.borderColor} shadow-xl shadow-purple-950/40 -translate-y-1`
                    : 'bg-[#0E101B]/80 hover:bg-[#121424] border border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${step.badgeColor}`}>
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} p-[1px]`}>
                      <div className="w-full h-full bg-[#0E101B] rounded-[11px] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mb-3">
                    {step.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Signal list */}
                  <div className="space-y-1.5 pt-3 border-t border-white/10">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-1">
                      Signal Vectors:
                    </span>
                    {step.signals.map((sig, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                        <span>{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-slate-400 italic">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
