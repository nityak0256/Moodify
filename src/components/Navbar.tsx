import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, Sliders, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollTo }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Monitor', id: 'live-monitor' },
    { label: 'Mood Music', id: 'mood-music' },
    { label: 'Insights', id: 'ai-insights' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'The Problem', id: 'problem' },
    { label: 'Privacy', id: 'responsible-ai' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onScrollTo(id);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#090A10]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0E101A] rounded-[10px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-cyan-400 group-hover:text-purple-300 transition-colors" />
            </div>
            <div className="absolute -inset-1 bg-purple-500/20 rounded-xl blur-sm -z-10 group-hover:bg-purple-500/40 transition-all" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-mono">MOODIFY</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                AI Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Multi-Signal Mood Detection</p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-xs uppercase tracking-wider text-slate-300 hover:text-white transition-colors relative py-1 hover:underline underline-offset-8 decoration-purple-500/60"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('live-monitor')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/20 border border-purple-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Activity className="w-3.5 h-3.5 text-cyan-300" />
            <span>Start Camera</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => handleNavClick('live-monitor')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white sm:hidden"
          >
            Camera
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0F19] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-2.5 px-3 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-purple-400 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleNavClick('live-monitor')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
            >
              <Activity className="w-4 h-4 text-cyan-300" />
              <span>Launch Live Camera Monitor</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
