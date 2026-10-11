import React from 'react';
import { Cpu, Waves, BarChart3, Globe, LineChart, Shield, Terminal, Zap } from 'lucide-react';

export const TechnologyStack: React.FC = () => {
  const techStack = [
    {
      title: 'AI / Machine Learning',
      subtitle: 'Multi-Modal Sensor Fusion',
      icon: Cpu,
      color: 'from-purple-500 to-indigo-500',
      description: 'Ensemble heuristics and feature classification algorithms correlating photoplethysmography (PPG) with tri-axial accelerometer vectors in real time.',
      tags: ['Feature Fusion', 'Autonomic Ratios', 'Decision Ensembles']
    },
    {
      title: 'Signal Processing',
      subtitle: 'Digital Filtering & Peak Extraction',
      icon: Waves,
      color: 'from-cyan-500 to-blue-500',
      description: 'Digital bandpass filtering (0.5 - 4.0 Hz) isolating cardiac R-peaks, computing root mean square of successive differences (RMSSD) for autonomic tone.',
      tags: ['R-Peak Detection', 'RMSSD Math', 'Bandpass Filters']
    },
    {
      title: 'Data Analysis',
      subtitle: 'Temporal Baseline Normalization',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-500',
      description: 'Circadian rhythm calibration tracking sleep deprivation and physical exhaustion to prevent false emotional stress triggers.',
      tags: ['Z-Score Scaling', 'Circadian Baselines', 'Sleep Modeling']
    },
    {
      title: 'Web Architecture',
      subtitle: 'Reactive TypeScript Runtime',
      icon: Globe,
      color: 'from-violet-500 to-purple-500',
      description: 'Responsive modular client architecture built with React 19, TypeScript, and Tailwind CSS for instant telemetry responsiveness with zero lag.',
      tags: ['React 19', 'TypeScript', 'Tailwind CSS']
    },
    {
      title: 'Real-Time Visualization',
      subtitle: '60 FPS Biometric Telemetry',
      icon: LineChart,
      color: 'from-rose-500 to-amber-500',
      description: 'Hardware-accelerated SVG and dynamic path morphing visualizing ECG waveforms, inter-beat intervals, and confidence arcs seamlessly.',
      tags: ['SVG Vector Paths', 'Parametric Rendering', 'Dynamic Gauges']
    },
    {
      title: 'Privacy & Security',
      subtitle: 'Local-First Edge Architecture',
      icon: Shield,
      color: 'from-indigo-500 to-cyan-500',
      description: 'Designed around edge processing principles where sensitive biometric streams remain on the user\'s local device without non-consensual harvesting.',
      tags: ['Edge Processing', 'Zero Telemetry Leaks', 'Data Sovereignty']
    }
  ];

  return (
    <section id="technology" className="py-24 bg-[#08090E] relative border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture & Stack</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for High-Precision Telemetry
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            MOODIFY combines physiological signal processing, contextual inference, and modern web engineering into an accessible, responsive platform.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;

            return (
              <div
                key={idx}
                className="glass-panel-interactive rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 p-[1px] mb-5 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-[#0E101B] rounded-[15px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-cyan-300" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">
                    {tech.title}
                  </h3>
                  <p className="text-xs text-purple-300 font-mono mb-3">
                    {tech.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {tech.tags.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
