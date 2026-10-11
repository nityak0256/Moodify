/**
 * MOODIFY Expanded 16-Mood Catalog & Multi-Signal Observation Classifier
 *
 * All tips are safe, non-medical wellness suggestions.
 */

export type MoodId =
  | 'happy'
  | 'calm'
  | 'neutral'
  | 'sad'
  | 'angry'
  | 'anxious'
  | 'tired'
  | 'excited'
  | 'lonely'
  | 'motivated'
  | 'bored'
  | 'overwhelmed'
  | 'confident'
  | 'content'
  | 'confused'
  | 'low_energy';

export interface MoodProfile {
  id: MoodId;
  name: string;
  emoji: string;
  message: string;
  tip: string;
  musicCategory: 'happy' | 'calm' | 'sad' | 'tired' | 'angry' | 'high_stress' | 'moderate_stress';
  accentColor: string;
  badgeBg: string;
  borderGlow: string;
}

export const MOOD_CATALOG: Record<MoodId, MoodProfile> = {
  happy: {
    id: 'happy',
    name: 'Happy',
    emoji: '😂',
    message: 'Main character energy detected ✨',
    tip: 'Keep the good vibes going! Listen to your favorite song, smile at someone, or share your happiness with a friend 😄',
    musicCategory: 'happy',
    accentColor: 'text-amber-400',
    badgeBg: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
    borderGlow: 'border-amber-500/40 shadow-amber-500/10'
  },
  calm: {
    id: 'calm',
    name: 'Calm',
    emoji: '😌',
    message: 'Bro is completely unbothered 😎',
    tip: 'Enjoy this peaceful moment. Take a few slow breaths, stretch a little, or listen to some relaxing music 🌿',
    musicCategory: 'calm',
    accentColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
    borderGlow: 'border-emerald-500/40 shadow-emerald-500/10'
  },
  neutral: {
    id: 'neutral',
    name: 'Neutral',
    emoji: '😐',
    message: 'Vibe status: perfectly normal 😐',
    tip: 'Feeling neutral is totally okay. Try stepping outside, drinking some water, or doing something you enjoy to change the vibe ☀️',
    musicCategory: 'calm',
    accentColor: 'text-slate-200',
    badgeBg: 'bg-slate-800/60 border-slate-500/40 text-slate-300',
    borderGlow: 'border-slate-500/40 shadow-slate-500/10'
  },
  sad: {
    id: 'sad',
    name: 'Sad',
    emoji: '😢',
    message: 'Aww... sending virtual hugs 🫂',
    tip: 'Try something comforting: have a little chocolate 🍫, talk to someone you trust, watch something funny, or listen to a song that makes you feel good.',
    musicCategory: 'sad',
    accentColor: 'text-blue-400',
    badgeBg: 'bg-blue-950/60 border-blue-500/40 text-blue-300',
    borderGlow: 'border-blue-500/40 shadow-blue-500/10'
  },
  angry: {
    id: 'angry',
    name: 'Angry',
    emoji: '😠',
    message: 'Okayyy... who made you mad? 💀',
    tip: 'Pause before reacting. Take 5 slow breaths, drink some water, walk around for a few minutes, and give yourself some space 😮💨',
    musicCategory: 'angry',
    accentColor: 'text-rose-400',
    badgeBg: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
    borderGlow: 'border-rose-500/40 shadow-rose-500/10'
  },
  anxious: {
    id: 'anxious',
    name: 'Anxious',
    emoji: '😰',
    message: 'Your brain has 37 tabs open 😭',
    tip: 'Try the 4-4 breathing trick: breathe in for 4 seconds and out for 4 seconds. Put your phone down for a minute and focus on what\'s around you 🌿',
    musicCategory: 'high_stress',
    accentColor: 'text-violet-400',
    badgeBg: 'bg-violet-950/60 border-violet-500/40 text-violet-300',
    borderGlow: 'border-violet-500/40 shadow-violet-500/10'
  },
  tired: {
    id: 'tired',
    name: 'Tired',
    emoji: '😴',
    message: 'Sleep.exe needs to be restarted 😭',
    tip: 'Drink some water, stretch your body, take a short break, and if you\'re genuinely sleepy, consider getting some proper rest 💤',
    musicCategory: 'tired',
    accentColor: 'text-purple-400',
    badgeBg: 'bg-purple-950/60 border-purple-500/40 text-purple-300',
    borderGlow: 'border-purple-500/40 shadow-purple-500/10'
  },
  excited: {
    id: 'excited',
    name: 'Excited',
    emoji: '🤪',
    message: 'OKAYYY, somebody\'s feeling it! 🔥',
    tip: 'Use that energy! Dance, work out, create something, or call your best friend and share the excitement 🚀',
    musicCategory: 'happy',
    accentColor: 'text-orange-400',
    badgeBg: 'bg-orange-950/60 border-orange-500/40 text-orange-300',
    borderGlow: 'border-orange-500/40 shadow-orange-500/10'
  },
  lonely: {
    id: 'lonely',
    name: 'Lonely',
    emoji: '😔',
    message: 'Social battery looking for a charger 🥲',
    tip: 'Send a random \'hey\' to a friend, call someone you like talking to, or spend some time around people you enjoy 🫶',
    musicCategory: 'sad',
    accentColor: 'text-indigo-400',
    badgeBg: 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300',
    borderGlow: 'border-indigo-500/40 shadow-indigo-500/10'
  },
  motivated: {
    id: 'motivated',
    name: 'Motivated',
    emoji: '🤩',
    message: 'LET\'S GOOOO! 🚀',
    tip: 'You\'ve got the energy right now. Pick one small task and start immediately — don\'t wait for perfect motivation 💪',
    musicCategory: 'happy',
    accentColor: 'text-yellow-400',
    badgeBg: 'bg-yellow-950/60 border-yellow-500/40 text-yellow-300',
    borderGlow: 'border-yellow-500/40 shadow-yellow-500/10'
  },
  bored: {
    id: 'bored',
    name: 'Bored',
    emoji: '🥱',
    message: 'Boredom has entered the chat 💀',
    tip: 'Try something different: play a game, listen to a new song, go for a short walk, or learn something random 🎮🎧',
    musicCategory: 'calm',
    accentColor: 'text-zinc-300',
    badgeBg: 'bg-zinc-800/60 border-zinc-500/40 text-zinc-300',
    borderGlow: 'border-zinc-500/40 shadow-zinc-500/10'
  },
  overwhelmed: {
    id: 'overwhelmed',
    name: 'Overwhelmed',
    emoji: '😵',
    message: 'Bro has 99 notifications in the brain 😭',
    tip: 'Don\'t solve everything at once. Pick ONE thing to deal with first, take a few slow breaths, and give yourself a short break 🧘',
    musicCategory: 'high_stress',
    accentColor: 'text-fuchsia-400',
    badgeBg: 'bg-fuchsia-950/60 border-fuchsia-500/40 text-fuchsia-300',
    borderGlow: 'border-fuchsia-500/40 shadow-fuchsia-500/10'
  },
  confident: {
    id: 'confident',
    name: 'Confident',
    emoji: '😎',
    message: 'Confidence level: main character 😎🔥',
    tip: 'Keep that energy! Do something you\'ve been putting off or encourage someone else today ✨',
    musicCategory: 'happy',
    accentColor: 'text-amber-300',
    badgeBg: 'bg-amber-950/60 border-amber-500/40 text-amber-200',
    borderGlow: 'border-amber-500/40 shadow-amber-500/10'
  },
  content: {
    id: 'content',
    name: 'Content',
    emoji: '🥰',
    message: 'Vibes are vibing ✨',
    tip: 'Enjoy the moment. Write down one thing you\'re grateful for or share the good energy with someone ❤️',
    musicCategory: 'calm',
    accentColor: 'text-rose-300',
    badgeBg: 'bg-rose-950/60 border-rose-500/40 text-rose-200',
    borderGlow: 'border-rose-500/40 shadow-rose-500/10'
  },
  confused: {
    id: 'confused',
    name: 'Confused',
    emoji: '😶',
    message: 'Loading brain.exe... 🤖',
    tip: "Take a short pause. Write down what you're trying to figure out, break it into smaller pieces, or ask someone for a second opinion 🧩",
    musicCategory: 'moderate_stress',
    accentColor: 'text-teal-300',
    badgeBg: 'bg-teal-950/60 border-teal-500/40 text-teal-200',
    borderGlow: 'border-teal-500/40 shadow-teal-500/10'
  },
  low_energy: {
    id: 'low_energy',
    name: 'Low Energy',
    emoji: '😪',
    message: 'Battery at 12% 🔋😭',
    tip: 'Grab some water, stretch, get some fresh air, and take a proper break if you need one.',
    musicCategory: 'tired',
    accentColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-200',
    borderGlow: 'border-cyan-500/40 shadow-cyan-500/10'
  }
};

export interface FacialObservation {
  timestamp: number;
  confidence: number;
  scores: Record<string, number>;
  dominant: string;
  heartRate: number;
  temperature: number;
  landmarks?: {
    positions: Array<{ x: number; y: number }>;
    leftEye: Array<{ x: number; y: number }>;
    rightEye: Array<{ x: number; y: number }>;
    mouth: Array<{ x: number; y: number }>;
    jawOutline: Array<{ x: number; y: number }>;
    nose: Array<{ x: number; y: number }>;
  };
}

/**
 * Analyzes continuous facial observations collected over the 5-second scan
 * to determine the most accurate estimated mood.
 */
export function classifyObservationsToMood(observations: FacialObservation[]): {
  mood: MoodProfile;
  confidence: number;
  dominantExpression: string;
  avgBpm: number;
  avgTemp: number;
  allAverages: Record<string, number>;
} {
  const count = observations.length;
  if (count === 0) {
    return {
      mood: MOOD_CATALOG.neutral,
      confidence: 50,
      dominantExpression: 'neutral',
      avgBpm: 72,
      avgTemp: 36.7,
      allAverages: { neutral: 50 }
    };
  }

  // 1. Compute aggregate emotion scores
  const scoreTotals: Record<string, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    fearful: 0,
    disgusted: 0,
    surprised: 0,
    neutral: 0
  };

  let totalBpm = 0;
  let totalTemp = 0;
  let smileSum = 0;
  let eyeOpennessSum = 0;
  let browTensionSum = 0;
  let mouthOpennessSum = 0;

  for (const obs of observations) {
    totalBpm += obs.heartRate || 72;
    totalTemp += obs.temperature || 36.7;

    for (const [expr, score] of Object.entries(obs.scores || {})) {
      const norm = expr.toLowerCase();
      if (scoreTotals[norm] !== undefined) {
        scoreTotals[norm] += score;
      }
    }

    // Extract landmark geometric ratios if available
    if (obs.landmarks && obs.landmarks.positions && obs.landmarks.positions.length >= 68) {
      const p = obs.landmarks.positions;
      // Mouth corners: 48 (left), 54 (right), top lip: 51, bottom lip: 57
      const mouthWidth = Math.hypot(p[54].x - p[48].x, p[54].y - p[48].y);
      const mouthHeight = Math.hypot(p[57].x - p[51].x, p[57].y - p[51].y);
      const mouthCornerAvgY = (p[48].y + p[54].y) / 2;
      const mouthCenterY = (p[51].y + p[57].y) / 2;
      // If corners are higher than center, smile curvature is positive
      const smile = (mouthCenterY - mouthCornerAvgY) / (mouthWidth || 1);
      smileSum += Math.max(-1, Math.min(1, smile * 8));

      // Mouth opening ratio
      const mouthOpen = mouthHeight / (mouthWidth || 1);
      mouthOpennessSum += mouthOpen;

      // Eye openness (left eye: 37, 38, 40, 41; right eye: 43, 44, 46, 47)
      const leftEyeH = (Math.abs(p[37].y - p[41].y) + Math.abs(p[38].y - p[40].y)) / 2;
      const leftEyeW = Math.hypot(p[39].x - p[36].x, p[39].y - p[36].y) || 1;
      const ear = leftEyeH / leftEyeW;
      eyeOpennessSum += ear;

      // Eyebrow furrow / distance (19, 24)
      const browDist = Math.hypot(p[24].x - p[19].x, p[24].y - p[19].y) / (mouthWidth || 1);
      browTensionSum += browDist;
    }
  }

  const avgScores: Record<string, number> = {};
  let dominantExpr = 'neutral';
  let highestScore = -1;

  for (const [expr, total] of Object.entries(scoreTotals)) {
    const avg = Math.round(total / count);
    avgScores[expr] = avg;
    if (avg > highestScore) {
      highestScore = avg;
      dominantExpr = expr;
    }
  }

  const avgBpm = Math.round(totalBpm / count);
  const avgTemp = Number((totalTemp / count).toFixed(1));
  const avgSmile = smileSum / count;
  const avgEyeOpenness = eyeOpennessSum / count;
  const avgMouthOpen = mouthOpennessSum / count;

  const happyScore = avgScores['happy'] || 0;
  const sadScore = avgScores['sad'] || 0;
  const angryScore = avgScores['angry'] || 0;
  const fearScore = avgScores['fearful'] || 0;
  const surpriseScore = avgScores['surprised'] || 0;
  const neutralScore = avgScores['neutral'] || 0;

  // 2. Multi-Signal Rule Evaluation
  // Check conditions from highest valence / specific emotional signatures

  // A. High Positive Valence (Happy, Excited, Confident, Content, Motivated)
  if (happyScore >= 35 || avgSmile > 0.12) {
    if (avgBpm >= 90 || surpriseScore >= 25 || avgMouthOpen > 0.45) {
      return {
        mood: MOOD_CATALOG.excited,
        confidence: Math.max(happyScore, 85),
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
    if (avgBpm >= 82) {
      return {
        mood: MOOD_CATALOG.motivated,
        confidence: Math.max(happyScore, 82),
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
    if (avgSmile > 0.08 && avgBpm <= 76) {
      return {
        mood: MOOD_CATALOG.content,
        confidence: Math.max(happyScore, 80),
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
    if (happyScore >= 50) {
      return {
        mood: MOOD_CATALOG.happy,
        confidence: happyScore,
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
    return {
      mood: MOOD_CATALOG.confident,
      confidence: Math.max(happyScore, 78),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  // B. High Tension / Arousal (Angry, Anxious, Overwhelmed)
  if (fearScore >= 30 || (fearScore >= 20 && avgBpm >= 88)) {
    if (avgBpm >= 92 || surpriseScore >= 20) {
      return {
        mood: MOOD_CATALOG.overwhelmed,
        confidence: Math.max(fearScore, 86),
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
    return {
      mood: MOOD_CATALOG.anxious,
      confidence: Math.max(fearScore, 84),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  if (angryScore >= 30 || (angryScore >= 20 && avgBpm >= 84)) {
    return {
      mood: MOOD_CATALOG.angry,
      confidence: Math.max(angryScore, 85),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  // C. Low Affect / Somber (Sad, Lonely)
  if (sadScore >= 28) {
    if (avgBpm < 68) {
      return {
        mood: MOOD_CATALOG.lonely,
        confidence: Math.max(sadScore, 80),
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
    return {
      mood: MOOD_CATALOG.sad,
      confidence: Math.max(sadScore, 82),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  // D. Fatigue / Drowsy (Tired, Low Energy)
  if (avgEyeOpenness < 0.22 && count >= 5) {
    if (avgBpm < 65) {
      return {
        mood: MOOD_CATALOG.low_energy,
        confidence: 82,
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
    return {
      mood: MOOD_CATALOG.tired,
      confidence: 80,
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  // E. Novelty / Puzzle (Confused)
  if (surpriseScore >= 32) {
    return {
      mood: MOOD_CATALOG.confused,
      confidence: Math.max(surpriseScore, 78),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  // F. Neutral Baseline Branches (Calm, Bored, Neutral, Confident)
  if (avgBpm <= 68 && neutralScore >= 45) {
    return {
      mood: MOOD_CATALOG.calm,
      confidence: Math.max(neutralScore, 84),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  if (neutralScore >= 60 && avgBpm >= 70 && avgBpm <= 80 && avgEyeOpenness > 0.23 && avgEyeOpenness < 0.27) {
    // Unengaged, flat expression
    if (Math.abs(avgSmile) < 0.03 && count >= 8) {
      return {
        mood: MOOD_CATALOG.bored,
        confidence: Math.max(neutralScore, 75),
        dominantExpression: dominantExpr,
        avgBpm,
        avgTemp,
        allAverages: avgScores
      };
    }
  }

  if (avgBpm >= 84 && neutralScore >= 45) {
    return {
      mood: MOOD_CATALOG.motivated,
      confidence: Math.max(neutralScore, 76),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  // Default to Calm if smooth/relaxed, else Neutral
  if (avgBpm <= 75) {
    return {
      mood: MOOD_CATALOG.calm,
      confidence: Math.max(neutralScore, 80),
      dominantExpression: dominantExpr,
      avgBpm,
      avgTemp,
      allAverages: avgScores
    };
  }

  return {
    mood: MOOD_CATALOG.neutral,
    confidence: Math.max(neutralScore, 75),
    dominantExpression: dominantExpr,
    avgBpm,
    avgTemp,
    allAverages: avgScores
  };
}
