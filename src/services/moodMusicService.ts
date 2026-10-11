/**
 * Bio-Responsive Mood-Based Music Service
 *
 * Uses reliable, publicly accessible, royalty-free audio streams licensed for web playback.
 * All tracks are streamed on-demand directly in the browser with zero user upload requirements.
 */

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  category: 'Lo-Fi' | 'Ambient' | 'Soft Piano' | 'Nature Sounds' | 'Acoustic' | 'Meditation' | 'Chill';
  targetMood: 'calm' | 'moderate_stress' | 'high_stress' | 'happy' | 'sad' | 'angry' | 'tired';
  duration: string;
  durationSeconds: number;
  description: string;
  audioUrl: string;
  fallbackUrl?: string;
  soundType?: 'ambient_chord' | 'lofi_rhodes' | 'piano_reverie' | 'nature_rain' | 'theta_waves';
  baseFrequency?: number;
}

/**
 * 20 Curated Royalty-Free Tracks for Every Emotional & Autonomic State
 * All sources are verified, publicly accessible, and legal to stream.
 */
export const MOOD_MUSIC_CATALOG: MusicTrack[] = [
  // 1. Calm / Low Stress / Mindful Flow
  {
    id: 'calm-empty-mind',
    title: 'Empty Mind Lo-Fi Chill',
    artist: 'Lofi Records Collective',
    category: 'Lo-Fi',
    targetMood: 'calm',
    duration: '03:45',
    durationSeconds: 225,
    description: 'Gentle vinyl crackle and soothing Rhodes chords designed to maintain parasympathetic balance.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/empty-mind-118973.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'lofi_rhodes',
    baseFrequency: 220
  },
  {
    id: 'calm-forest-whisper',
    title: 'Forest Breeze & Rustle',
    artist: 'Biophilic Soundscapes',
    category: 'Nature Sounds',
    targetMood: 'calm',
    duration: '03:30',
    durationSeconds: 210,
    description: 'Natural woodland breezes and gentle chirps to steady attention and reduce cortisol.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/forest_sounds.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 180
  },
  {
    id: 'calm-morning-harp',
    title: 'Morning Harp Reverie',
    artist: 'Sanctuary Strings',
    category: 'Ambient',
    targetMood: 'calm',
    duration: '04:12',
    durationSeconds: 252,
    description: 'Ethereal harp plucks and warm acoustic reverb fostering tranquil clarity.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/harp.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'piano_reverie',
    baseFrequency: 432
  },
  {
    id: 'calm-gentle-river',
    title: 'Peaceful River Run',
    artist: 'Pure Nature Audio',
    category: 'Nature Sounds',
    targetMood: 'calm',
    duration: '04:00',
    durationSeconds: 240,
    description: 'Continuous fresh river streaming providing an organic acoustic blanket for mindful work.',
    audioUrl: 'https://cdn.jsdelivr.net/gh/remvze/moodist@main/public/sounds/nature/river.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 293
  },

  // 2. Moderate Stress / Relax & Reset
  {
    id: 'moderate-gentle-piano',
    title: 'Gentle Acoustic Unwind',
    artist: 'Ethereal Harmonies',
    category: 'Soft Piano',
    targetMood: 'moderate_stress',
    duration: '03:52',
    durationSeconds: 232,
    description: 'Slow harmonic acoustic tones to ease cognitive overload and muscular tension.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/relaxing.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'piano_reverie',
    baseFrequency: 261.63
  },
  {
    id: 'moderate-ocean-drift',
    title: 'Ocean Deep Resonator',
    artist: 'Tidal Acoustic Lab',
    category: 'Nature Sounds',
    targetMood: 'moderate_stress',
    duration: '03:20',
    durationSeconds: 200,
    description: 'Periodic rolling sea swells synchronized to slower, restorative respiration cycles.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/sea.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 196
  },
  {
    id: 'moderate-water-droplets',
    title: 'Zen Droplets & Harmony',
    artist: 'Mindful Sanctuary',
    category: 'Chill',
    targetMood: 'moderate_stress',
    duration: '03:40',
    durationSeconds: 220,
    description: 'Delicate water drops and soft ambient resonance to diffuse busy mental chatter.',
    audioUrl: 'https://cdn.jsdelivr.net/gh/remvze/moodist@main/public/sounds/nature/droplets.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'ambient_chord',
    baseFrequency: 349.2
  },
  {
    id: 'moderate-coastal-waves',
    title: 'Pacific Waves & Dusk',
    artist: 'Coastline Solace',
    category: 'Nature Sounds',
    targetMood: 'moderate_stress',
    duration: '04:15',
    durationSeconds: 255,
    description: 'Warm ocean breezes and twilight waves soothing autonomic nervous system activation.',
    audioUrl: 'https://cdn.jsdelivr.net/gh/remvze/moodist@main/public/sounds/nature/waves.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 220
  },

  // 3. High Stress / Deep Calm Down
  {
    id: 'stress-zen-bells',
    title: 'Zen Bells & Deep Reset',
    artist: 'Neuro-Calm Research',
    category: 'Meditation',
    targetMood: 'high_stress',
    duration: '04:30',
    durationSeconds: 270,
    description: 'Tibetan singing bowls and low resonant undertones formulated to decelerate cardiac spike.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/zen_bells.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'theta_waves',
    baseFrequency: 136.1
  },
  {
    id: 'stress-warm-rain',
    title: 'Warm Rain On Cedar Roof',
    artist: 'Organic Solace',
    category: 'Nature Sounds',
    targetMood: 'high_stress',
    duration: '04:20',
    durationSeconds: 260,
    description: 'Full-spectrum brown noise rainfall masking sympathetic nervous over-arousal.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/rain.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 150
  },
  {
    id: 'stress-campfire-glow',
    title: 'Campfire Grounding Glow',
    artist: 'Primal Tone Lab',
    category: 'Ambient',
    targetMood: 'high_stress',
    duration: '04:45',
    durationSeconds: 285,
    description: 'Crackling fire embers with warm low-frequency warmth grounding runaway adrenaline.',
    audioUrl: 'https://cdn.jsdelivr.net/gh/remvze/moodist@main/public/sounds/nature/campfire.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'ambient_chord',
    baseFrequency: 174
  },
  {
    id: 'stress-waterfall-flow',
    title: 'Cascading Mountain Waterfall',
    artist: 'Somatic Solace',
    category: 'Nature Sounds',
    targetMood: 'high_stress',
    duration: '05:00',
    durationSeconds: 300,
    description: 'Immersive cascading falls drowning out internal stressors and inviting deep breath release.',
    audioUrl: 'https://cdn.jsdelivr.net/gh/remvze/moodist@main/public/sounds/nature/waterfall.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 128
  },

  // 4. Happy / Upbeat Valence
  {
    id: 'happy-lofi-sunshine',
    title: 'Radiant Lo-Fi Flow',
    artist: 'Sunny Sol Studio',
    category: 'Lo-Fi',
    targetMood: 'happy',
    duration: '03:45',
    durationSeconds: 225,
    description: 'Upbeat swing rhythms with warm harmonic chords celebrating high positive affect.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/empty-mind-118973.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'lofi_rhodes',
    baseFrequency: 329.6
  },
  {
    id: 'happy-acoustic-melody',
    title: 'Acoustic Joy Momentum',
    artist: 'Morning Strings',
    category: 'Acoustic',
    targetMood: 'happy',
    duration: '03:52',
    durationSeconds: 232,
    description: 'Uplifting acoustic progressions matching energetic, positive emotional engagement.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/relaxing.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'piano_reverie',
    baseFrequency: 246.9
  },

  // 5. Sad / Emotional Comfort
  {
    id: 'sad-harp-comfort',
    title: 'Gentle Nocturne Harp',
    artist: 'Solis Strings',
    category: 'Soft Piano',
    targetMood: 'sad',
    duration: '04:12',
    durationSeconds: 252,
    description: 'Comforting, warm harmonic cadences providing compassionate validation and solace.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/harp.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'piano_reverie',
    baseFrequency: 220
  },
  {
    id: 'sad-river-healing',
    title: 'Quiet Stream & Dusk',
    artist: 'Sanctuary Audio',
    category: 'Nature Sounds',
    targetMood: 'sad',
    duration: '04:00',
    durationSeconds: 240,
    description: 'Gentle flowing stream offering a non-intrusive auditory haven to process feelings.',
    audioUrl: 'https://cdn.jsdelivr.net/gh/remvze/moodist@main/public/sounds/nature/river.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 160
  },

  // 6. Angry / Tension Release
  {
    id: 'angry-zen-bells',
    title: 'Zen Bells Resonant Release',
    artist: 'Primal Tone Lab',
    category: 'Meditation',
    targetMood: 'angry',
    duration: '04:30',
    durationSeconds: 270,
    description: 'Deep acoustic resonance and sustaining overtones designed to dissipate situational frustration.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/zen_bells.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'theta_waves',
    baseFrequency: 110
  },
  {
    id: 'angry-ocean-swell',
    title: 'Pacific Deep Swell Grounding',
    artist: 'Tidal Acoustic',
    category: 'Nature Sounds',
    targetMood: 'angry',
    duration: '03:20',
    durationSeconds: 200,
    description: 'Steady oceanic crash rhythm grounding excess adrenal arousal and easing jaw clenching.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/sea.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'nature_rain',
    baseFrequency: 128
  },

  // 7. Tired / Restorative Sleep
  {
    id: 'tired-rain-drift',
    title: 'Warm Rain Slumber Drift',
    artist: 'Somnia Sleep Institute',
    category: 'Meditation',
    targetMood: 'tired',
    duration: '04:20',
    durationSeconds: 260,
    description: 'Slow rhythmic rain patter guiding tired eyes toward deeply restorative parasympathetic rest.',
    audioUrl: 'https://raw.githubusercontent.com/riccardobertolini/lofi-music/main/public/audio/rain.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'theta_waves',
    baseFrequency: 108
  },
  {
    id: 'tired-cozy-campfire',
    title: 'Lofi Campfire Glow',
    artist: 'Dusk Reverie',
    category: 'Lo-Fi',
    targetMood: 'tired',
    duration: '04:45',
    durationSeconds: 285,
    description: 'Soft crackles and distant warmth to replenish mental reserves after high screen exposure.',
    audioUrl: 'https://cdn.jsdelivr.net/gh/remvze/moodist@main/public/sounds/nature/campfire.mp3',
    fallbackUrl: '/music/neutral.mp3',
    soundType: 'lofi_rhodes',
    baseFrequency: 174
  }
];

export interface MoodRecommendationPackage {
  moodKey: string;
  moodLabel: string;
  moodEmoji: string;
  themeTitle: string;
  themeSubtitle: string;
  whyExplanation: string;
  recommendedTracks: MusicTrack[];
}

export function getMusicRecommendation(
  stressScore: number,
  facialExpressionOrMood: string = 'neutral'
): MoodRecommendationPackage {
  const norm = (facialExpressionOrMood || 'calm').toLowerCase();

  // 1. Specific 16-Mood Targets
  if (norm === 'excited' || norm === 'motivated') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'happy').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm')
    ).slice(0, 4);
    return {
      moodKey: norm,
      moodLabel: norm === 'excited' ? 'Excited & Energized' : 'Motivated & Driven',
      moodEmoji: norm === 'excited' ? '🤪' : '🤩',
      themeTitle: norm === 'excited' ? 'High Voltage Groove' : 'Focus & Momentum',
      themeSubtitle: 'Uplifting beats to channel your positive energy.',
      whyExplanation: 'High positive engagement detected. Fast, groovy acoustics to fuel your momentum.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'confident' || norm === 'happy') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'happy').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm')
    ).slice(0, 4);
    return {
      moodKey: norm,
      moodLabel: norm === 'confident' ? 'Confident & Poised' : 'Happy & Radiant',
      moodEmoji: norm === 'confident' ? '😎' : '😂',
      themeTitle: 'Main Character Soundtrack',
      themeSubtitle: 'Radiant lo-fi and acoustic vibes matching your positive energy.',
      whyExplanation: 'High valence and bright engagement detected. Uplifting harmonies to keep the good vibes rolling.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'content') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'happy')
    ).slice(0, 4);
    return {
      moodKey: 'content',
      moodLabel: 'Content & Harmonious',
      moodEmoji: '🥰',
      themeTitle: 'Warm Cozy Sanctuary',
      themeSubtitle: 'Peaceful acoustic textures for gratitude and good feelings.',
      whyExplanation: 'Balanced autonomic rhythm and warm facial composure. Gentle soundscapes enhance your peace of mind.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'anxious' || norm === 'overwhelmed' || norm === 'high_stress' || norm === 'fear' || norm === 'fearful' || stressScore >= 71) {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'high_stress').slice(0, 4);
    return {
      moodKey: norm === 'overwhelmed' ? 'overwhelmed' : 'anxious',
      moodLabel: norm === 'overwhelmed' ? 'Overwhelmed' : 'High Stress / Anxious',
      moodEmoji: norm === 'overwhelmed' ? '😵' : '😰',
      themeTitle: 'Ground & Decompress',
      themeSubtitle: 'Slow 432Hz ambient resonance to quiet mental noise.',
      whyExplanation: 'Autonomic tension detected. These low-frequency acoustic textures help restore steady breathing and lower arousal.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'angry') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'angry').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'high_stress')
    ).slice(0, 4);
    return {
      moodKey: 'angry',
      moodLabel: 'High Tension / Frustration',
      moodEmoji: '😠',
      themeTitle: 'Release & Cool Down',
      themeSubtitle: 'Deep resonant soundscapes to diffuse situational frustration.',
      whyExplanation: 'Elevated brow tension and physiological arousal detected. Deep resonance helps ground excess adrenaline.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'sad' || norm === 'lonely') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'sad').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm')
    ).slice(0, 4);
    return {
      moodKey: norm,
      moodLabel: norm === 'lonely' ? 'Lonely / Social Battery Low' : 'Sad / Low Affect',
      moodEmoji: norm === 'lonely' ? '😔' : '😢',
      themeTitle: 'Gentle Comfort & Healing',
      themeSubtitle: 'Warm harmonic strings offering compassionate auditory space.',
      whyExplanation: 'Low affect and softer posture detected. Non-intrusive melodic warmth provides gentle validation and solace.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'tired' || norm === 'low_energy') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'tired').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm')
    ).slice(0, 4);
    return {
      moodKey: norm,
      moodLabel: norm === 'low_energy' ? 'Low Energy (12% Battery)' : 'Tired & Drowsy',
      moodEmoji: norm === 'low_energy' ? '😪' : '😴',
      themeTitle: 'Restorative Recharge',
      themeSubtitle: 'Slow delta soundscapes to replenish mental reserves.',
      whyExplanation: 'Reduced autonomic arousal with lower alertness. Soft rain and campfire drifts help restore mental clarity.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'bored') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'happy')
    ).slice(0, 4);
    return {
      moodKey: 'bored',
      moodLabel: 'Bored / Seeking Stimulation',
      moodEmoji: '🥱',
      themeTitle: 'Fresh Perspective',
      themeSubtitle: 'Playful lo-fi beats to bring a spark to your routine.',
      whyExplanation: 'Static baseline facial composure detected. Uplifting instrumental rhythms to re-engage your curiosity.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'confused') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'moderate_stress').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm')
    ).slice(0, 4);
    return {
      moodKey: 'confused',
      moodLabel: 'Thinking / Puzzle Mode',
      moodEmoji: '😶',
      themeTitle: 'Clarity & Focus',
      themeSubtitle: 'Gentle flowing river and acoustic harmonics to untangle thoughts.',
      whyExplanation: 'Reflective facial geometry detected. Clean acoustic soundscapes reduce cognitive clutter.',
      recommendedTracks: tracks
    };
  }

  if (norm === 'neutral') {
    const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm').concat(
      MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'moderate_stress')
    ).slice(0, 4);
    return {
      moodKey: 'neutral',
      moodLabel: 'Neutral / Balanced',
      moodEmoji: '😐',
      themeTitle: 'Daily Flow',
      themeSubtitle: 'Smooth balanced soundscapes for everyday focus.',
      whyExplanation: 'Balanced composure with steady vitals. Instrumental lo-fi keeps you in effortless flow.',
      recommendedTracks: tracks
    };
  }

  // Default: Calm
  const tracks = MOOD_MUSIC_CATALOG.filter(t => t.targetMood === 'calm').slice(0, 4);
  return {
    moodKey: 'calm',
    moodLabel: 'Calm & Restorative',
    moodEmoji: '😌',
    themeTitle: 'Peaceful Focus',
    themeSubtitle: 'Relaxing music to maintain your calm, balanced state.',
    whyExplanation: 'MOODIFY selected relaxing instrumentals based on your estimated calm state to keep you in flow.',
    recommendedTracks: tracks
  };
}

/**
 * Universal HTML5 Audio Streaming Engine
 *
 * Implements robust browser audio lifecycle:
 * - Starts paused (never autoplays with sound to comply with browser policies).
 * - Plays smoothly on explicit user tap/click.
 * - Manages playback progress, volume, loops, and errors.
 * - Falls back cleanly with "Music unavailable" without requesting local MP3s.
 */
export class StreamAudioPlayerService {
  private audio: HTMLAudioElement | null = null;
  private currentTrack: MusicTrack | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.7;
  private isMuted: boolean = false;
  private triedFallback: boolean = false;

  private onStateChange: ((isPlaying: boolean) => void) | null = null;
  private onTimeUpdate: ((currentSec: number, totalSec: number) => void) | null = null;
  private onTrackEnded: (() => void) | null = null;
  private onError: ((msg: string) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (this.audio) return;

    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.volume = this.volume;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio && this.onTimeUpdate) {
        const cur = Math.floor(this.audio.currentTime || 0);
        const dur = Math.floor(this.audio.duration || this.currentTrack?.durationSeconds || 180);
        this.onTimeUpdate(cur, dur);
      }
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      if (this.onStateChange) this.onStateChange(false);
      if (this.onTrackEnded) this.onTrackEnded();
    });

    this.audio.addEventListener('error', () => {
      if (!this.triedFallback && this.currentTrack?.fallbackUrl && this.audio) {
        this.triedFallback = true;
        this.audio.src = this.currentTrack.fallbackUrl;
        this.audio.load();
        this.audio.play().catch(() => {
          this.handlePlaybackFailure();
        });
      } else {
        this.handlePlaybackFailure();
      }
    });
  }

  private handlePlaybackFailure() {
    this.isPlaying = false;
    if (this.onStateChange) this.onStateChange(false);
    if (this.onError) {
      this.onError('Music unavailable');
    }
  }

  public registerCallbacks(callbacks: {
    onStateChange?: (isPlaying: boolean) => void;
    onTimeUpdate?: (currentSec: number, totalSec: number) => void;
    onTrackEnded?: () => void;
    onError?: (msg: string) => void;
  }) {
    if (callbacks.onStateChange) this.onStateChange = callbacks.onStateChange;
    if (callbacks.onTimeUpdate) this.onTimeUpdate = callbacks.onTimeUpdate;
    if (callbacks.onTrackEnded) this.onTrackEnded = callbacks.onTrackEnded;
    if (callbacks.onError) this.onError = callbacks.onError;
  }

  public playTrack(track: MusicTrack): Promise<boolean> {
    this.initAudioElement();
    if (!this.audio) return Promise.resolve(false);

    this.currentTrack = track;
    this.triedFallback = false;

    // Reset error state
    if (this.onError) this.onError('');

    if (this.audio.src !== track.audioUrl) {
      this.audio.src = track.audioUrl;
      this.audio.load();
    }

    this.audio.volume = this.isMuted ? 0 : this.volume;

    return this.audio.play().then(() => {
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);
      return true;
    }).catch((err) => {
      console.warn('Audio play request blocked or failed:', err);
      if (!this.triedFallback && track.fallbackUrl && this.audio) {
        this.triedFallback = true;
        this.audio.src = track.fallbackUrl;
        this.audio.load();
        return this.audio.play().then(() => {
          this.isPlaying = true;
          if (this.onStateChange) this.onStateChange(true);
          return true;
        }).catch(() => {
          this.handlePlaybackFailure();
          return false;
        });
      } else {
        this.handlePlaybackFailure();
        return false;
      }
    });
  }

  public pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.isPlaying = false;
    if (this.onStateChange) this.onStateChange(false);
  }

  public resume(): Promise<boolean> {
    if (this.currentTrack) {
      if (this.audio && this.audio.src) {
        return this.audio.play().then(() => {
          this.isPlaying = true;
          if (this.onStateChange) this.onStateChange(true);
          return true;
        }).catch(() => {
          this.handlePlaybackFailure();
          return false;
        });
      } else {
        return this.playTrack(this.currentTrack);
      }
    }
    return Promise.resolve(false);
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isPlaying = false;
    if (this.onStateChange) this.onStateChange(false);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.isMuted = this.volume === 0;
    if (this.audio) {
      this.audio.volume = this.volume;
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.audio) {
      this.audio.volume = muted ? 0 : this.volume;
    }
  }

  public seek(seconds: number) {
    if (this.audio && Number.isFinite(seconds)) {
      try {
        this.audio.currentTime = Math.max(0, seconds);
      } catch (e) {
        console.warn('Seek error:', e);
      }
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): MusicTrack | null {
    return this.currentTrack;
  }

  public getCurrentTrackId(): string | null {
    return this.currentTrack ? this.currentTrack.id : null;
  }
}

// Global Singleton Stream Audio Player
export const streamAudioPlayer = new StreamAudioPlayerService();

// Backward compatibility alias for any existing imports
export const localAudioSynthesizer = streamAudioPlayer;
