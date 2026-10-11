export type ActivityLevel = 'resting' | 'sedentary' | 'light' | 'moderate' | 'high';

export type ContextType = 
  | 'exam_studying'
  | 'running_workout'
  | 'relaxing_leisure'
  | 'desk_work'
  | 'public_speaking'
  | 'commuting';

export interface SensorInputs {
  heartRate: number; // 40 - 180 BPM
  activity: ActivityLevel;
  activityCpm: number; // Counts per minute (accelerometer)
  hrv: number; // 15 - 110 ms RMSSD
  sleepHours: number; // 3 - 10 hours
  context: ContextType;
}

export interface SignalWeight {
  name: string;
  value: string;
  weight: number; // percentage
  status: 'normal' | 'elevated' | 'optimal' | 'low';
  roleInDiagnosis: string;
}

export interface MoodifyResult {
  stateLabel: string;
  stateEmoji: string;
  stateTone: 'calm' | 'active' | 'stressed' | 'fatigued' | 'arousal';
  stressScore: number; // 0 - 100%
  confidenceScore: number; // 0 - 100%
  summary: string;
  insightAnalysis: string;
  whySingleSignalFails: string;
  signalWeights: SignalWeight[];
  actionRecommendation: string;
}

export interface ScenarioPreset {
  id: string;
  name: string;
  tag: string;
  icon: string;
  description: string;
  inputs: SensorInputs;
  expectedState: string;
  color: string;
}
