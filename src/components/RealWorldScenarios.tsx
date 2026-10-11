import React from 'react';
import { Heart, Activity, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface RealWorldScenariosProps {
  onSelectScenario: (id: string) => void;
}

export const RealWorldScenarios: React.FC<RealWorldScenariosProps> = ({ onSelectScenario }) => {
  const scenarios = [
    {
      id: 'morning_run',
      title: 'Scenario 1: Running',
      emoji: '🏃',
      badge: 'Physical Activity',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      borderColor: 'border-emerald-500/30 hover:border-emerald-500/60',
      glowColor: 'group-hover:bg-emerald-500/10',
      hr: 'High (126 BPM)',
      activity: 'High (920 cpm)',
      interpretation: 'Not necessarily stress',
      interpretationDetail: 'Muscular oxygen intake elevates pulse. Accelerometry confirms rigorous motion. The AI flags this as athletic exertion, avoiding false alarm stress warnings.',
      singleSignalVerdict: '❌ Naive Trackers: "High Stress Warning!"',
      moodifyVerdict: '✓ MOODIFY: "Healthy Active Exertion (18% Stress)"'
    },
    {
      id: 'exam_stress',
      title: 'Scenario 2: Exam Stress',
      emoji: '📚',
      badge: 'Cognitive Stress',
      badgeColor: 'text-rose-400 bg-rose-950/60 border-rose-500/30',
      borderColor: 'border-rose-500/30 hover:border-rose-500/60',
      glowColor: 'group-hover:bg-rose-500/10',
      hr: 'High (122 BPM)',
      activity: 'Low (45 cpm)',
      interpretation: 'Possible stress',
      interpretationDetail: 'Stationary posture at desk with a soaring pulse and suppressed HRV. The sympathetic nervous system is firing in fight-or-flight mode without physical exertion.',
      singleSignalVerdict: '⚠️ Naive Trackers: Flags high pulse, but misses context',
      moodifyVerdict: '✓ MOODIFY: "Elevated Mental Stress Detected (84% Stress)"'
    },
    {
      id: 'relaxing_reading',
      title: 'Scenario 3: Relaxing',
      emoji: '🍵',
      badge: 'Parasympathetic Rest',
      badgeColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30',
      borderColor: 'border-indigo-500/30 hover:border-indigo-500/60',
      glowColor: 'group-hover:bg-indigo-500/10',
      hr: 'Normal (72 BPM)',
      activity: 'Low (12 cpm)',
      interpretation: 'Likely calm',
      interpretationDetail: 'Resting pulse with high heart rate variability (HRV) and minimal kinetic movement. Parasympathetic vagal tone ensures restorative baseline recovery.',
      singleSignalVerdict: '✓ Naive Trackers: "Normal heart rate"',
      moodifyVerdict: '✓ MOODIFY: "Deep Restorative Calm (14% Stress)"'
    }
  ];

  return (
    <section id="scenarios" className="py-24 bg-[#08090E] relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Empirical Validation</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Real-World Scenarios
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            See how identical heart rates produce opposite interpretations when multi-signal intelligence is introduced.
          </p>
        </div>

        {/* 3 Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {scenarios.map((sc) => (
            <div
              key={sc.id}
              className={`group glass-panel rounded-3xl p-7 border ${sc.borderColor} transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-36 h-36 rounded-bl-full pointer-events-none transition-colors ${sc.glowColor}`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{sc.emoji}</span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded border ${sc.badgeColor}`}>
                    {sc.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {sc.title}
                </h3>

                <div className="space-y-3 bg-black/40 rounded-2xl p-4 border border-white/5 mb-5 text-xs font-mono">
                  <div className="flex justify-between items-center py-1 border-b border-white/10">
                    <span className="text-slate-400">Heart Rate:</span>
                    <span className="text-white font-bold">{sc.hr}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-white/10">
                    <span className="text-slate-400">Activity:</span>
                    <span className="text-cyan-300 font-bold">{sc.activity}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Stress Interpretation:</span>
                    <span className="text-white font-bold">{sc.interpretation}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {sc.interpretationDetail}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-white/10 text-[11px] font-mono">
                  <div className="text-slate-400">{sc.singleSignalVerdict}</div>
                  <div className="text-cyan-300 font-semibold">{sc.moodifyVerdict}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => onSelectScenario(sc.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all group-hover:bg-purple-600/20"
                >
                  <span>Test in Live Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Note */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center gap-3 text-center max-w-2xl mx-auto">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs text-slate-400 font-medium">
            <strong className="text-slate-200">Ethical Note:</strong> These are illustrative examples for educational and demonstration purposes, not medical diagnoses.
          </p>
        </div>

      </div>
    </section>
  );
};
