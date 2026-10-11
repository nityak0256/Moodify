import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, AlertCircle, Scale, Lock, CheckCircle2 } from 'lucide-react';

export const ResponsibleAiSection: React.FC = () => {
  const pillars = [
    {
      title: 'Non-Diagnostic Estimates',
      icon: HeartHandshake,
      description: 'Mood predictions and stress levels are physiological estimates, not clinical or medical diagnoses. The system is designed for self-reflection and personal wellness awareness, never for diagnostic substitution.',
      highlight: 'Explicitly labeled as estimates, not diagnoses'
    },
    {
      title: 'Responsible Data Ethics',
      icon: Lock,
      description: 'Biometric telemetry is intimate data. MOODIFY advocates for local-first, on-device signal processing without unauthorized persistent tracking, targeted advertising, or behavioral monetization.',
      highlight: 'Zero user surveillance or third-party ad sharing'
    },
    {
      title: 'Mitigating Single-Signal Harm',
      icon: Scale,
      description: 'Single-signal devices generate frequent false alarms—such as flagging a jogger as being in a severe panic attack. Multi-signal triangulation drastically reduces misinterpretation and emotional distress.',
      highlight: 'Cross-validation prevents unnecessary anxiety'
    },
    {
      title: 'Transparent Uncertainty & Confidence',
      icon: Eye,
      description: 'Unlike black-box systems that state guesses as absolute facts, MOODIFY explicitly communicates confidence percentages and feature attribution so users understand the reliability of every prediction.',
      highlight: 'Calibrated confidence levels on every insight'
    }
  ];

  return (
    <section id="responsible-ai" className="py-24 bg-[#0A0C16] relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ethical Standards</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed with responsible AI in mind.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Emotional states are deeply human. AI systems analyzing biometric data must be transparent, humble in their confidence, and ethically guarded.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-7 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/10 text-xs text-emerald-400 font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{pillar.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible AI Disclaimer Banner */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">
              Academic & Demonstration Notice
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              MOODIFY is a research concept and interactive hackathon demonstration showcasing multi-modal signal fusion architecture. If you or someone you know is experiencing clinical anxiety, depression, or distress, please consult a qualified healthcare professional.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
