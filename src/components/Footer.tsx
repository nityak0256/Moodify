import React from 'react';
import { Activity, ShieldCheck, Heart, Github, Sparkles } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="bg-[#06070B] border-t border-white/10 text-slate-400 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Manifesto (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#0E101A] rounded-[11px] flex items-center justify-center">
                  <Activity className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl font-bold font-mono text-white tracking-tight">MOODIFY</span>
            </div>

            <p className="text-sm text-slate-300 font-medium">
              "AI that looks beyond a single signal."
            </p>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Designed to solve the single-signal blindspot in modern biometric tracking. By synthesizing heart rate, tri-axial accelerometry, sleep quality, and situational context, MOODIFY prevents misleading stress alerts and delivers holistic emotional insights.
            </p>

            <div className="text-[11px] font-mono text-slate-400 pt-2">
              Built for college hackathons, judges, and wellness researchers.
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollTo('hero')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  About MOODIFY
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('problem')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  The Single-Signal Problem
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('how-it-works')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  How It Works (4 Steps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('live-monitor')}
                  className="hover:text-cyan-400 font-semibold text-cyan-300 transition-colors text-left"
                >
                  Live Camera Monitor (SSD MobileNet)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('live-dashboard')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Telemetry Simulator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('multi-signal')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Multi-Signal Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('scenarios')}
                  className="hover:text-purple-400 transition-colors text-left"
                >
                  Real-World Scenarios
                </button>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Responsible AI & Privacy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollTo('responsible-ai')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Privacy First Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('responsible-ai')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Non-Diagnostic Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollTo('technology')}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  Technology & Signal Stack
                </button>
              </li>
              <li>
                <span className="text-[11px] text-slate-400 font-mono block pt-2">
                  Status: Simulated Data Mode
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} MOODIFY · An AI Multi-Signal Mood Detection Project.
          </div>
          <div className="flex items-center gap-2">
            <span>One signal can mislead. Multiple signals can tell the story.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
