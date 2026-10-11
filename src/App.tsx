/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveCameraStressMonitor } from './components/LiveCameraStressMonitor';
import { TheProblemSection } from './components/TheProblemSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { LiveDashboard } from './components/LiveDashboard';
import { MultiSignalIntelligence } from './components/MultiSignalIntelligence';
import { RealWorldScenarios } from './components/RealWorldScenarios';
import { AiInsightsSection } from './components/AiInsightsSection';
import { TechnologyStack } from './components/TechnologyStack';
import { ResponsibleAiSection } from './components/ResponsibleAiSection';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { SensorInputs, MoodifyResult } from './types/moodify';
import { analyzeMultiSignals, SCENARIO_PRESETS } from './utils/engine';

export default function App() {
  const [inputs, setInputs] = useState<SensorInputs>({
    heartRate: 72,
    activity: 'resting',
    activityCpm: 38,
    hrv: 62,
    sleepHours: 7.8,
    context: 'relaxing_leisure'
  });

  const [result, setResult] = useState<MoodifyResult>(() => analyzeMultiSignals({
    heartRate: 72,
    activity: 'resting',
    activityCpm: 38,
    hrv: 62,
    sleepHours: 7.8,
    context: 'relaxing_leisure'
  }));

  // Re-calculate results whenever inputs change
  useEffect(() => {
    setResult(analyzeMultiSignals(inputs));
  }, [inputs]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectScenario = (scenarioId: string) => {
    const preset = SCENARIO_PRESETS.find(p => p.id === scenarioId);
    if (preset) {
      setInputs({ ...preset.inputs });
    }
    scrollToSection('live-dashboard');
  };

  return (
    <div className="min-h-screen bg-[#08090E] text-[#E2E8F0] selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top sticky navigation bar */}
      <Navbar onScrollTo={scrollToSection} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          onExploreClick={() => scrollToSection('live-monitor')}
          onHowItWorksClick={() => scrollToSection('how-it-works')}
        />

        {/* 2. REAL-TIME PRIVACY-FIRST CAMERA STRESS MONITOR (Main Focus) */}
        <LiveCameraStressMonitor />

        {/* 3. The Problem Section ("Why isn't heart rate enough?") */}
        <TheProblemSection />

        {/* 4. How MOODIFY Works (4-Step Process & Pipeline Flow) */}
        <HowItWorksSection />

        {/* 5. Live Interactive MOODIFY Telemetry Dashboard */}
        <LiveDashboard 
          externalInputs={inputs}
          onInputsChange={setInputs}
        />

        {/* 6. Multi-Signal Intelligence (❤️ + 🏃 + 😴 + 🧠 = 🤖) */}
        <MultiSignalIntelligence />

        {/* 7. Real-World Examples & Scenarios */}
        <RealWorldScenarios onSelectScenario={handleSelectScenario} />

        {/* 8. AI Insights Section (MOODIFY INSIGHT Card) */}
        <AiInsightsSection 
          result={result} 
          inputs={inputs} 
          onJumpToSimulator={() => scrollToSection('live-monitor')} 
        />

        {/* 9. Technology Stack */}
        <TechnologyStack />

        {/* 10. Privacy / Responsible AI Section */}
        <ResponsibleAiSection />

        {/* 11. Call To Action ("Understand the signals. Understand the mood.") */}
        <CallToAction onExploreClick={() => scrollToSection('live-monitor')} />
      </main>

      {/* 11. Footer */}
      <Footer onScrollTo={scrollToSection} />
    </div>
  );
}
