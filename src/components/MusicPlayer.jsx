import { useState, useEffect } from "react";
import { Disc, VolumeX } from "lucide-react";
import {
  isMusicPlaying,
  toggleBackgroundMusic,
  subscribeMusicState,
} from "../utils/musicController";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(() => isMusicPlaying());
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    // Synchronize UI with global music controller
    const unsubscribe = subscribeMusicState((state) => {
      setIsPlaying(state);
      if (state) setShowHint(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = () => {
    toggleBackgroundMusic();
  };

  return (
    <div className="fixed top-3.5 right-3.5 sm:top-5 sm:right-5 z-40 flex items-center gap-2 font-serif">
      {showHint && !isPlaying && (
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#200007]/95 text-amber-200 text-xs shadow-2xl backdrop-blur-md border border-amber-400/60 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>संगीत 🎵</span>
        </div>
      )}

      <button
        onClick={handleToggle}
        type="button"
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        className={`relative group flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-xl border-2 cursor-pointer ${
          isPlaying
            ? "bg-[#38010d]/95 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-105"
            : "bg-[#200007]/90 text-amber-200/80 border-amber-500/50 hover:bg-[#38010d] hover:text-amber-100"
        }`}
      >
        <div className="relative">
          <Disc
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-1000 ${
              isPlaying ? "animate-spin text-amber-400" : "text-amber-500/70"
            }`}
            style={{ animationDuration: "3s" }}
          />
        </div>

        {isPlaying ? (
          <div className="flex items-end gap-0.5 sm:gap-1 h-3.5">
            <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full sound-bar" />
            <span className="w-0.5 sm:w-1 bg-amber-300 rounded-full sound-bar" />
            <span className="w-0.5 sm:w-1 bg-amber-400 rounded-full sound-bar" />
            <span className="w-0.5 sm:w-1 bg-amber-200 rounded-full sound-bar" />
          </div>
        ) : (
          <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500/70 group-hover:text-amber-300" />
        )}

        <span className="text-[11px] sm:text-xs font-bold tracking-wider">
          {isPlaying ? "चालू" : "संगीत"}
        </span>
      </button>
    </div>
  );
}
