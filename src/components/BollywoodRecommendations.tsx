import React, { useState, useEffect } from 'react';
import { 
  Music2, 
  ExternalLink, 
  RotateCw, 
  Sparkles, 
  Disc3, 
  Play, 
  Radio, 
  Flame,
  ShieldCheck
} from 'lucide-react';
import { 
  BollywoodSong, 
  getBollywoodRecommendations 
} from '../services/bollywoodRecommendationService';

interface BollywoodRecommendationsProps {
  moodId: string;
  moodName?: string;
  moodEmoji?: string;
  className?: string;
}

export const BollywoodRecommendations: React.FC<BollywoodRecommendationsProps> = ({
  moodId,
  moodName,
  moodEmoji,
  className = ''
}) => {
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [activeSongId, setActiveSongId] = useState<string | null>(null);

  // Reset pageIndex when mood changes, but NOT when user clicks "More Songs"
  useEffect(() => {
    setPageIndex(0);
    setActiveSongId(null);
  }, [moodId]);

  // Read recommendation package strictly from the calculated mood
  const recommendation = getBollywoodRecommendations(moodId, pageIndex, 3);
  const displayEmoji = moodEmoji || recommendation.emoji;
  const displayMood = moodName || recommendation.moodLabel;

  const handleMoreSongs = () => {
    setPageIndex(prev => prev + 1);
  };

  const handleOpenSong = (url: string, songId: string) => {
    setActiveSongId(songId);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#13162A] via-[#171B36] to-[#0E1020] border-2 border-purple-500/40 shadow-2xl relative overflow-hidden space-y-5 ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-500/10 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Row: Mood Context + Title + "More Songs" Refresh Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{displayEmoji}</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-500/40">
              {displayMood} Soundtrack
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[11px] font-mono text-slate-400">
              Bollywood Mode
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white flex items-center gap-2">
            <Disc3 className="w-5 h-5 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>🎵 YOUR BOLLYWOOD MOOD SONGS</span>
          </h3>
        </div>

        {/* 🔄 MORE SONGS REFRESH BUTTON */}
        <button
          onClick={handleMoreSongs}
          title="Keep this exact mood and shuffle new Bollywood songs"
          className="px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-400/40 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-950/50 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <RotateCw className="w-3.5 h-3.5 text-cyan-300" />
          <span>🔄 More Songs</span>
        </button>
      </div>

      {/* Personalized Mood Explanation Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3 relative z-10">
        <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-sm shrink-0 text-purple-300 mt-0.5">
          ✨
        </div>
        <div className="space-y-0.5">
          <span className="text-[11px] font-mono text-purple-300 font-bold uppercase tracking-wider block">
            VIBE TUNING:
          </span>
          <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed italic">
            &ldquo;{recommendation.explanation}&rdquo;
          </p>
        </div>
      </div>

      {/* 3-4 Real Bollywood Song Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative z-10">
        {recommendation.songs.map((song: BollywoodSong, idx: number) => {
          const isSelected = activeSongId === song.id;

          return (
            <div
              key={`${song.id}-${pageIndex}-${idx}`}
              className={`p-4 rounded-2xl bg-[#0B0D18]/90 border transition-all duration-200 flex flex-col justify-between group hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-950/40 hover:-translate-y-0.5 ${
                isSelected 
                  ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-950/40' 
                  : 'border-white/10'
              }`}
            >
              <div className="space-y-2.5">
                {/* Top Badge: Mood Tag & Movie */}
                <div className="flex items-center justify-between text-[10px] font-mono gap-1">
                  <span className="px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 truncate max-w-[130px]">
                    {song.moodTag}
                  </span>
                  {song.year && (
                    <span className="text-slate-500 shrink-0">
                      {song.year}
                    </span>
                  )}
                </div>

                {/* Song Title & Artist */}
                <div>
                  <div className="flex items-center gap-1.5 text-white font-bold text-base group-hover:text-cyan-300 transition-colors">
                    <Music2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="truncate">{song.title}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-mono mt-0.5 truncate flex items-center gap-1">
                    <span className="text-slate-500">🎤</span>
                    <span className="truncate">{song.artist}</span>
                  </p>

                  <p className="text-[11px] text-slate-400 italic truncate mt-0.5">
                    🎬 <span className="text-slate-300 font-sans font-medium">{song.movie}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons: Play / Open Song on YouTube or Spotify */}
              <div className="pt-3 mt-3 border-t border-white/5 space-y-2">
                <button
                  onClick={() => handleOpenSong(song.youtubeUrl, song.id)}
                  className="w-full py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-950/40 border border-red-400/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white shrink-0" />
                  <span>▶ Play / Open Song</span>
                </button>

                <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 px-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-1 transition-colors text-center truncate"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>

                  <a
                    href={song.jiosaavnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 px-2 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 flex items-center justify-center gap-1 transition-colors text-center truncate"
                  >
                    <span>JioSaavn</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy Guarantee Footer Note */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-400 relative z-10">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Calculated directly from MOODIFY mood ({displayMood}) · No face data used</span>
        </div>
        <div className="text-slate-500">
          Showing 3 of {recommendation.totalAvailable} curated songs · Click <strong>🔄 More Songs</strong> to rotate
        </div>
      </div>
    </div>
  );
};
