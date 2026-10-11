/**
 * Multi-Signal Stress Fusion Algorithm
 *
 * Fuses:
 * 1. Heart Rate (BPM)
 * 2. Body Temperature (°C)
 * 3. Estimated Facial Expression (Deep Learning)
 *
 * Core Principle: "BPM > X does not equal stress."
 * Multi-signal corroboration prevents single-sensor false positives.
 */

export type StressCategory = 'LOW' | 'MODERATE' | 'HIGH';

export interface StressFusionResult {
  score: number; // 0 - 100
  category: StressCategory;
  categoryLabel: string;
  categoryColor: string;
  categoryBadgeBg: string;
  explanation: string;
  clinicalCaveat: string;
  factors: {
    heartRate: {
      points: number;
      explanation: string;
      raw: string;
    };
    temperature: {
      points: number;
      explanation: string;
      raw: string;
    };
    expression: {
      points: number;
      explanation: string;
      raw: string;
    };
  };
  recommendation: {
    title: string;
    description: string;
    actionable: string;
  };
}

export function computeMultiSignalStress(
  heartRate: number,
  temperature: number,
  expression: string = 'neutral',
  expressionConfidence: number = 80
): StressFusionResult {
  const normExpr = expression.toLowerCase();

  // Baseline base points
  let hrPoints = 0;
  let tempPoints = 0;
  let exprPoints = 0;

  // 1. Heart Rate Assessment
  // Normal resting adult: 60 - 85 BPM.
  // Elevated: 86 - 110 BPM.
  // High: 111+ BPM.
  let hrExplain = '';
  if (heartRate <= 75) {
    hrPoints = 5;
    hrExplain = 'Resting cardiovascular frequency';
  } else if (heartRate <= 95) {
    hrPoints = 14;
    hrExplain = 'Moderate operational pulse';
  } else if (heartRate <= 115) {
    hrPoints = 22;
    hrExplain = 'Elevated pulse rate';
  } else {
    hrPoints = 32;
    hrExplain = 'Significantly elevated pulse';
  }

  // 2. Temperature Assessment
  // Normal body temp: 36.5 - 37.2 °C
  let tempExplain = '';
  if (temperature <= 37.0) {
    tempPoints = 4;
    tempExplain = 'Standard metabolic thermoregulation';
  } else if (temperature <= 37.6) {
    tempPoints = 12;
    tempExplain = 'Mildly elevated thermal readout';
  } else {
    tempPoints = 20;
    tempExplain = 'Elevated peripheral temperature indicator';
  }

  // 3. Facial Expression Assessment (Local Deep-Learning Inference)
  // Expressions mapped to sympathetic distress vs parasympathetic calm
  let exprExplain = '';
  const exprWeight = Math.min(1.0, Math.max(0.4, expressionConfidence / 100));

  if (normExpr === 'fear' || normExpr === 'fearful') {
    exprPoints = Math.round(40 * exprWeight);
    exprExplain = 'Facial micro-cues consistent with acute threat or alarm';
  } else if (normExpr === 'angry') {
    exprPoints = Math.round(36 * exprWeight);
    exprExplain = 'Tension in corrugator supercilii and jaw clenching indicators';
  } else if (normExpr === 'sad') {
    exprPoints = Math.round(28 * exprWeight);
    exprExplain = 'Suppressed facial affect and lowered periorbital muscle tone';
  } else if (normExpr === 'disgust' || normExpr === 'disgusted') {
    exprPoints = Math.round(25 * exprWeight);
    exprExplain = 'Aversive facial reaction detected';
  } else if (normExpr === 'surprised') {
    exprPoints = Math.round(18 * exprWeight);
    exprExplain = 'Elevated ocular aperture, anticipatory stimulus';
  } else if (normExpr === 'happy') {
    // Crucial anti-false-positive dampening:
    // If user is smiling/happy, emotional distress is strongly negated even if HR is 120 BPM!
    exprPoints = -15; // Negative contribution = reduces stress score!
    exprExplain = 'Zygomatic major activation indicating positive valence / absence of distress';
  } else {
    // Neutral
    exprPoints = 8;
    exprExplain = 'Baseline neutral facial engagement';
  }

  // MULTI-SIGNAL CROSS-VALIDATION RULES:
  // Rule A: High HR + Happy expression -> Physical exercise or enthusiasm, NOT stress!
  const isHighHr = heartRate >= 105;
  const isHappy = normExpr === 'happy';
  const isDistressedFace = ['fear', 'fearful', 'angry', 'sad'].includes(normExpr);
  const isElevatedTemp = temperature >= 37.3;

  let rawTotal = hrPoints + tempPoints + exprPoints;

  // Cross-Signal Dampener:
  if (isHighHr && isHappy) {
    // Reduce total score by 25 points
    rawTotal = Math.min(rawTotal, 38);
  }

  // Cross-Signal Multiplier:
  if (isHighHr && isDistressedFace && isElevatedTemp) {
    // Corroborated cross-modal agreement!
    rawTotal = Math.max(rawTotal, 78);
  }

  const finalScore = Math.max(8, Math.min(96, Math.round(rawTotal)));

  // Categorize: 0-35 Low, 36-70 Moderate, 71-100 High
  let category: StressCategory = 'LOW';
  let categoryLabel = 'LOW STRESS';
  let categoryColor = '#10B981'; // emerald
  let categoryBadgeBg = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30';
  let explanation = '';

  if (finalScore <= 35) {
    category = 'LOW';
    categoryLabel = 'LOW';
    categoryColor = '#10B981';
    categoryBadgeBg = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30';
    if (isHighHr && isHappy) {
      explanation = 'Elevated heart rate detected, but facial expression indicates positive engagement rather than distress. High BPM may have other causes such as physical activity or excitement.';
    } else {
      explanation = 'Multi-signal markers indicate balanced parasympathetic recovery and calm physiological state.';
    }
  } else if (finalScore <= 70) {
    category = 'MODERATE';
    categoryLabel = 'MODERATE';
    categoryColor = '#F59E0B'; // amber
    categoryBadgeBg = 'bg-amber-950/60 text-amber-300 border-amber-500/30';
    if (isHighHr && normExpr === 'neutral') {
      explanation = 'Heart rate is elevated while facial expression remains neutral. May reflect cognitive workload, caffeine, or recent movement without acute distress.';
    } else {
      explanation = 'Moderate autonomic arousal detected across signals. Suggests focused mental engagement or mild situational load.';
    }
  } else {
    category = 'HIGH';
    categoryLabel = 'HIGH';
    categoryColor = '#F43F5E'; // rose
    categoryBadgeBg = 'bg-rose-950/60 text-rose-300 border-rose-500/30';
    explanation = 'Multiple signals are consistent with elevated stress indicators. Sympathetic activation is corroborated by facial cues and metabolic parameters.';
  }

  return {
    score: finalScore,
    category,
    categoryLabel,
    categoryColor,
    categoryBadgeBg,
    explanation,
    clinicalCaveat: 'Prototype estimation based on multi-signal indicators. Not a clinical medical diagnosis.',
    factors: {
      heartRate: {
        points: hrPoints,
        explanation: hrExplain,
        raw: `${heartRate} BPM`
      },
      temperature: {
        points: tempPoints,
        explanation: tempExplain,
        raw: `${temperature.toFixed(1)}°C`
      },
      expression: {
        points: exprPoints,
        explanation: exprExplain,
        raw: `${expression.toUpperCase()} (${expressionConfidence}%)`
      }
    },
    recommendation: {
      title: finalScore > 70 ? 'High Stress Indicators Detected' : finalScore > 35 ? 'Moderate Load Detected' : 'Optimal Calm State',
      description: finalScore > 70
        ? 'Your biometrics reflect simultaneous sympathetic nervous system activation. Immediate paced breathing or mindful grounding is advised.'
        : finalScore > 35
        ? 'Steady mental work observed. Take regular eye breaks and maintain hydration.'
        : 'Restorative baseline confirmed. Optimal state for learning, deep focus, or creative reflection.',
      actionable: finalScore > 70 ? 'Activate Guided 4-4-6 Breathing' : 'Maintain Current Rhythm'
    }
  };
}
