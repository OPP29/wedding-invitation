import { useState, useRef, useEffect } from "react";
import { Disc, VolumeX } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setShowHint(false);
            })
            .catch(() => {});
        }
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowHint(false);
        })
        .catch((err) => console.log("Audio play error:", err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingData.audioTrack.src}
        loop
        preload="auto"
      />

      {/* Floating Royal Audio Controller */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 font-serif">
        {showHint && !isPlaying && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#200007]/95 text-amber-200 text-xs shadow-2xl animate-bounce backdrop-blur-md border border-amber-400/60">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>राजसी शहनाई संगीत बजाएं 🎵</span>
          </div>
        )}

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          className={`relative group flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-xl border-2 ${
            isPlaying
              ? "bg-[#38010d]/95 text-amber-300 border-amber-400 shadow-amber-500/20 scale-105"
              : "bg-[#200007]/90 text-amber-200 border-amber-500/50 hover:bg-[#38010d] hover:text-amber-100"
          }`}
        >
          <div className="relative">
            <Disc
              className={`w-5 h-5 transition-transform duration-1000 ${
                isPlaying ? "animate-spin text-amber-400" : "text-amber-500/70"
              }`}
              style={{ animationDuration: "3s" }}
            />
          </div>

          {isPlaying ? (
            <div className="flex items-end gap-1 h-4">
              <span className="w-1 bg-amber-400 rounded-full sound-bar" />
              <span className="w-1 bg-amber-300 rounded-full sound-bar" />
              <span className="w-1 bg-amber-400 rounded-full sound-bar" />
              <span className="w-1 bg-amber-200 rounded-full sound-bar" />
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-amber-500/70 group-hover:text-amber-300" />
          )}

          <span className="text-xs font-bold tracking-wider uppercase">
            {isPlaying ? "शहनाई चालू" : "संगीत"}
          </span>
        </button>
      </div>
    </>
  );
}
