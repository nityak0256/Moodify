import { SensorInputs, MoodifyResult, ScenarioPreset, ActivityLevel, ContextType } from '../types/moodify';

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'exam_stress',
    name: 'Final Exam Preparation',
    tag: 'Mental Stress',
    icon: 'Brain',
    description: 'Sitting stationary at desk with racing pulse before a difficult academic exam.',
    inputs: {
      heartRate: 122,
      activity: 'sedentary',
      activityCpm: 45,
      hrv: 24,
      sleepHours: 4.5,
      context: 'exam_studying'
    },
    expectedState: 'Elevated Mental Stress',
    color: 'from-rose-500/20 to-purple-500/20'
  },
  {
    id: 'morning_run',
    name: '5K Morning Jog',
    tag: 'Physical Exertion',
    icon: 'Activity',
    description: 'Cardiovascular workout with elevated pulse and high physical kinetic motion.',
    inputs: {
      heartRate: 126,
      activity: 'high',
      activityCpm: 920,
      hrv: 38,
      sleepHours: 7.8,
      context: 'running_workout'
    },
    expectedState: 'Active Physical Exertion',
    color: 'from-emerald-500/20 to-cyan-500/20'
  },
  {
    id: 'relaxing_reading',
    name: 'Evening Book & Tea',
    tag: 'Restorative Calm',
    icon: 'Moon',
    description: 'Quiet evening wind-down with steady cardiovascular rhythm and low motion.',
    inputs: {
      heartRate: 72,
      activity: 'resting',
      activityCpm: 12,
      hrv: 68,
      sleepHours: 8.2,
      context: 'relaxing_leisure'
    },
    expectedState: 'Calm & Restorative',
    color: 'from-indigo-500/20 to-teal-500/20'
  },
  {
    id: 'speech_presentation',
    name: 'College Project Pitch',
    tag: 'Acute Arousal',
    icon: 'Users',
    description: 'Standing before judges; acute adrenaline spike with moderate movement.',
    inputs: {
      heartRate: 114,
      activity: 'light',
      activityCpm: 180,
      hrv: 30,
      sleepHours: 6.0,
      context: 'public_speaking'
    },
    expectedState: 'Heightened Anticipation',
    color: 'from-amber-500/20 to-rose-500/20'
  },
  {
    id: 'fatigued_caffeine',
    name: 'Late-Night Coding Sprint',
    tag: 'Exhaustion & Caffeine',
    icon: 'Coffee',
    description: 'Sleepless coding sprint fueled by coffee with erratic autonomic tone.',
    inputs: {
      heartRate: 98,
      activity: 'sedentary',
      activityCpm: 35,
      hrv: 21,
      sleepHours: 3.5,
      context: 'desk_work'
    },
    expectedState: 'Allostatic Strain / Overfatigue',
    color: 'from-orange-500/20 to-purple-500/20'
  }
];

export function analyzeMultiSignals(inputs: SensorInputs): MoodifyResult {
  const { heartRate, activity, activityCpm, hrv, sleepHours, context } = inputs;

  const isPhysical = activity === 'moderate' || activity === 'high' || activityCpm > 450 || context === 'running_workout';
  const isSedentary = activity === 'resting' || activity === 'sedentary' || activityCpm < 120;
  const isElevatedHR = heartRate >= 100;
  const isRestingHR = heartRate <= 80;
  const isPoorSleep = sleepHours < 6.0;
  const isLowHrv = hrv < 35; // suppressed vagal parasympathetic modulation
  const isHighHrv = hrv >= 55; // high parasympathetic recovery

  let stateLabel = 'Calm';
  let stateEmoji = '😌';
  let stateTone: MoodifyResult['stateTone'] = 'calm';
  let stressScore = 30;
  let confidenceScore = 88;
  let summary = 'Your signals currently indicate a relatively calm and balanced state.';
  let insightAnalysis = '';
  let whySingleSignalFails = '';
  let actionRecommendation = 'Maintain your steady workflow and stay hydrated.';

  if (isElevatedHR && isPhysical) {
    // Physical exertion: high HR + high movement!
    stateLabel = 'Active Exertion';
    stateEmoji = '🏃';
    stateTone = 'active';
    stressScore = 18; // low emotional stress, high physical exertion
    confidenceScore = 94;
    summary = 'Elevated heart rate driven by vigorous physical movement and muscular demand.';
    insightAnalysis = `We noticed an elevated heart rate (${heartRate} BPM), but your accelerometer registers sustained physical activity (${activityCpm} cpm). The AI confirms this is healthy cardiovascular demand, NOT psychological stress.`;
    whySingleSignalFails = `A naive sensor looking only at ${heartRate} BPM would trigger a False Positive "Extreme Stress Alert". By fusing accelerometer data (${activityCpm} cpm), MOODIFY correctly identifies exercise.`;
    actionRecommendation = 'Great cardiovascular output! Monitor hydration and allow for post-workout cool-down.';
  } else if (isElevatedHR && isSedentary) {
    // High HR + Low Movement = Emotional / Mental stress!
    stateLabel = 'Acute Mental Stress';
    stateEmoji = '😰';
    stateTone = 'stressed';
    
    // Calculate stress severity
    const hrDelta = Math.max(0, heartRate - 90);
    const hrvPenalty = Math.max(0, (40 - hrv) * 0.8);
    const sleepPenalty = Math.max(0, (7 - sleepHours) * 4);
    stressScore = Math.min(96, Math.round(55 + hrDelta * 0.5 + hrvPenalty + sleepPenalty));
    
    confidenceScore = Math.min(97, Math.round(82 + (isLowHrv ? 8 : 4) + (isPoorSleep ? 5 : 2)));
    summary = 'Autonomic sympathetic arousal detected with low physical kinetic expenditure.';
    insightAnalysis = `Your heart rate is elevated (${heartRate} BPM) despite negligible physical movement (${activityCpm} cpm). Low vagal HRV (${hrv} ms) and reduced sleep (${sleepHours}h) corroborate significant sympathetic nervous system activation, characteristic of academic or cognitive stress.`;
    whySingleSignalFails = `Here, heart rate aligns with stress, but single-signal tools cannot explain WHY or confirm whether you are panicking or merely pacing. Fusing sleep debt (${sleepHours}h) and low HRV confirms acute cognitive pressure.`;
    actionRecommendation = 'Pause for a 3-minute box breathing session (4s in, 4s hold, 4s out, 4s hold). Release jaw and shoulder tension.';
  } else if (isElevatedHR && activity === 'light') {
    // Light activity + elevated HR (e.g. public speaking, anxious pacing)
    stateLabel = 'Heightened Arousal';
    stateEmoji = '⚡';
    stateTone = 'arousal';
    stressScore = 64;
    confidenceScore = 86;
    summary = 'Moderate autonomic activation with light motor movement, indicating anticipatory readiness.';
    insightAnalysis = `Elevated pulse (${heartRate} BPM) with low-to-moderate mobility. Frequently occurs during public speaking, high-stakes presentations, or rapid task switching.`;
    whySingleSignalFails = 'Single-signal trackers mistake light movement for exercise and underestimate situational anxiety. MOODIFY calibrates against metabolic thresholds to capture anticipatory arousal.';
    actionRecommendation = 'Channel this energetic arousal into focused vocal projection and purposeful pacing.';
  } else if (isPoorSleep && heartRate > 85 && isLowHrv) {
    // Sleep-deprived fatigue & caffeine
    stateLabel = 'Allostatic Strain';
    stateEmoji = '🥱';
    stateTone = 'fatigued';
    stressScore = 58;
    confidenceScore = 91;
    summary = 'Physiological exhaustion exacerbated by sleep deficit and autonomic strain.';
    insightAnalysis = `Sub-optimal sleep (${sleepHours}h) paired with suppressed HRV (${hrv} ms) creates allostatic cardiovascular strain. Even during quiet sitting, resting pulse is higher than baseline.`;
    whySingleSignalFails = 'A heart rate of 88-95 BPM appears "normal" to standard trackers, missing the profound autonomic depletion revealed by HRV and sleep metrics.';
    actionRecommendation = 'Limit late caffeine intake. Schedule an earlier sleep window tonight to replenish parasympathetic recovery.';
  } else if (isRestingHR && isHighHrv) {
    // Optimal calm
    stateLabel = 'Restorative Calm';
    stateEmoji = '😌';
    stateTone = 'calm';
    stressScore = 14;
    confidenceScore = 93;
    summary = 'Strong parasympathetic vagal tone and balanced autonomic equilibrium.';
    insightAnalysis = `Resting heart rate (${heartRate} BPM) combined with robust HRV (${hrv} ms) and healthy sleep reserves (${sleepHours}h) demonstrates high autonomic flexibility and mental relaxation.`;
    whySingleSignalFails = 'Even if heart rate flickers slightly when laughing or breathing deeply, high HRV signals resilience, preventing false alarms.';
    actionRecommendation = 'Excellent physiological recovery state. Optimal window for deep focus, creative synthesis, or rest.';
  } else {
    // Balanced baseline
    stateLabel = 'Baseline Balanced';
    stateEmoji = '🌿';
    stateTone = 'calm';
    stressScore = Math.max(20, Math.min(48, Math.round((heartRate - 60) * 0.4 + (50 - hrv) * 0.3)));
    confidenceScore = 87;
    summary = 'Your signals currently indicate a relatively calm, operational baseline.';
    insightAnalysis = `All biological signals fall within expected reference bands. Normal resting dynamics with consistent autonomic rhythm.`;
    whySingleSignalFails = 'By maintaining ongoing multi-parameter cross-checks, MOODIFY guarantees your state is grounded in holistic biometric harmony.';
    actionRecommendation = 'Stay consistent with your current routine and take micro-breaks during prolonged desk work.';
  }

  const signalWeights: MoodifyResult['signalWeights'] = [
    {
      name: 'Heart Rate',
      value: `${heartRate} BPM`,
      weight: 30,
      status: heartRate > 105 ? 'elevated' : heartRate < 60 ? 'low' : 'normal',
      roleInDiagnosis: isPhysical ? 'Confirms metabolic cardiac output' : isElevatedHR ? 'Flags sympathetic nervous system excitation' : 'Shows calm resting baseline'
    },
    {
      name: 'Kinetic Activity',
      value: `${activity.toUpperCase()} (${activityCpm} cpm)`,
      weight: 35,
      status: activityCpm > 500 ? 'elevated' : 'normal',
      roleInDiagnosis: isPhysical ? 'Crucial discriminator: verifies physical exercise' : 'Eliminates exercise as explanation for pulse'
    },
    {
      name: 'Autonomic HRV',
      value: `${hrv} ms (RMSSD)`,
      weight: 20,
      status: hrv < 30 ? 'low' : hrv > 60 ? 'optimal' : 'normal',
      roleInDiagnosis: hrv < 30 ? 'Suppressed vagal brake indicates mental stress' : 'High variability indicates parasympathetic resilience'
    },
    {
      name: 'Sleep Architecture',
      value: `${sleepHours} hrs`,
      weight: 15,
      status: sleepHours < 6 ? 'low' : sleepHours >= 7.5 ? 'optimal' : 'normal',
      roleInDiagnosis: sleepHours < 6 ? 'Reduces stress threshold and emotional buffering' : 'Adequate restoration stabilizes cognitive baseline'
    }
  ];

  return {
    stateLabel,
    stateEmoji,
    stateTone,
    stressScore,
    confidenceScore,
    summary,
    insightAnalysis,
    whySingleSignalFails,
    signalWeights,
    actionRecommendation
  };
}

export function generateHistoricalTimeline() {
  return [
    { time: '07:00 AM', hr: 62, stress: 18, activity: 'Resting', mood: 'Waking Up', label: 'Awake & Rested' },
    { time: '08:30 AM', hr: 128, stress: 22, activity: 'Running', mood: 'Energized', label: 'Morning 5K Jog (High HR ≠ Stress)' },
    { time: '10:00 AM', hr: 74, stress: 30, activity: 'Sedentary', mood: 'Calm', label: 'Lecture Hall' },
    { time: '01:30 PM', hr: 82, stress: 45, activity: 'Light', mood: 'Focus', label: 'Study Group' },
    { time: '03:45 PM', hr: 124, stress: 84, activity: 'Sedentary', mood: 'Stressed', label: 'Midterm Exam (High HR + Low Act = Stress)' },
    { time: '05:30 PM', hr: 78, stress: 38, activity: 'Light', mood: 'Relief', label: 'Post-Exam Walk' },
    { time: '08:00 PM', hr: 68, stress: 24, activity: 'Resting', mood: 'Relaxed', label: 'Dinner & Music' },
    { time: '10:30 PM', hr: 64, stress: 16, activity: 'Resting', mood: 'Sleepy', label: 'Bedtime Preparation' },
  ];
}
