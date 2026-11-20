import { useState } from "react";
import { Sparkles, Heart } from "lucide-react";
import { playSacredBellChime } from "../utils/audioChime";
import { triggerCelebration } from "../utils/confetti";

export default function RoyalOpeningCurtain({ onOpened }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleOpenCurtain = (e) => {
    e.stopPropagation();
    if (isOpen) return;

    setIsOpen(true);

    // 1. Play sacred temple bell chime within real user touch gesture
    playSacredBellChime();

    // 2. Dispatch custom event to trigger background music with gentle 1.5s volume ramp
    window.dispatchEvent(new CustomEvent("wedding:play-music"));

    // 3. Auspicious royal flower petal celebration
    triggerCelebration();

    // 4. Notify parent after curtains have parted smoothly
    setTimeout(() => {
      setIsDismissed(true);
      if (onOpened) onOpened();
    }, 1150);
  };

  if (isDismissed) return null;

  return (
    <div
      onClick={handleOpenCurtain}
      onTouchStart={handleOpenCurtain}
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center font-serif text-center select-none cursor-pointer transition-opacity duration-700 ${
        isOpen ? "pointer-events-none" : ""
      }`}
      aria-label="Touch anywhere to open royal wedding invitation"
    >
      {/* Left Cloudy Curtain Panel */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#170005] via-[#2d010d] to-[#1c0006] border-r border-amber-400/40 z-10 transition-transform duration-1000 ease-in-out ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, rgba(212,175,55,0.22) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(148,3,45,0.3) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)
          `,
        }}
      >
        {/* Soft Golden Cloud Orbs */}
        <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-12 right-6 w-56 h-56 rounded-full bg-rose-600/10 blur-3xl" />
      </div>

      {/* Right Cloudy Curtain Panel */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#170005] via-[#2d010d] to-[#1c0006] border-l border-amber-400/40 z-10 transition-transform duration-1000 ease-in-out ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(212,175,55,0.22) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(148,3,45,0.3) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.1) 0%, transparent 70%)
          `,
        }}
      >
        {/* Soft Golden Cloud Orbs */}
        <div className="absolute top-12 right-10 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-10 left-6 w-56 h-56 rounded-full bg-rose-600/10 blur-3xl" />
      </div>

      {/* Center Royal Medallion & Call-to-Action Seal */}
      <div
        className={`relative z-20 max-w-md mx-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#2a010c]/95 via-[#180006]/98 to-[#2a010c]/95 border-2 border-amber-400/70 shadow-[0_0_60px_rgba(212,175,55,0.45)] backdrop-blur-xl flex flex-col items-center transition-all duration-700 ease-out ${
          isOpen ? "scale-110 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        {/* Ganesha Silhouette Emblem with Divine Golden Halo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-3 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-900/40 border border-amber-400/60 p-2.5 shadow-[0_0_25px_rgba(212,175,55,0.6)] flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-amber-300 drop-shadow-[0_2px_12px_rgba(212,175,55,0.8)]"
            fill="currentColor"
          >
            {/* Crown Mukut */}
            <polygon points="50,6 40,22 60,22" fill="#FFF8DC" />
            <circle cx="50" cy="4" r="3" fill="#F5D77F" />
            <path d="M43 14 L57 14 L50 7 Z" fill="#D4AF37" />

            {/* Ears */}
            <path
              d="M30 28 C18 28, 16 48, 30 52 C32 46, 34 36, 36 30 Z"
              fill="#dfb045"
            />
            <path
              d="M70 28 C82 28, 84 48, 70 52 C68 46, 66 36, 64 30 Z"
              fill="#dfb045"
            />

            {/* Face & Trunk */}
            <path
              d="M36 26 C36 26, 50 24, 64 26 C67 34, 66 44, 59 50 C54 54, 54 62, 58 72 C60 78, 58 84, 51 86 C44 88, 37 83, 39 77 C40 73, 44 74, 44 77 C44 80, 48 82, 51 81 C55 80, 55 75, 53 69 C49 61, 48 52, 53 46 C58 41, 59 34, 54 30 C47 30, 40 30, 36 26 Z"
              fill="#f5d77f"
            />

            {/* Tilak */}
            <path d="M48 20 L52 20 L52 28 L48 28 Z" fill="#e11d48" />
            <circle cx="50" cy="31" r="2" fill="#e11d48" />

            {/* Modak */}
            <circle cx="68" cy="66" r="4.5" fill="#FFF8DC" />
            <circle cx="68" cy="66" r="2.5" fill="#D4AF37" />
          </svg>
        </div>

        {/* Sacred Vedic Inscription */}
        <span className="inline-block px-4 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 font-bold text-xs sm:text-sm tracking-[0.25em] uppercase mb-2">
          ॥ श्री गणेशाय नमः ॥
        </span>

        <p className="text-xs text-amber-200/90 font-medium mb-1">
          मांगलिक पावन परिणयोत्सव
        </p>

        {/* Couple Names */}
        <h1 className="text-2xl sm:text-3xl font-extrabold gold-gradient-text leading-snug my-1">
          मोनिका (दिव्या)
        </h1>
        <span className="text-xs sm:text-sm text-amber-400 font-semibold my-0.5 flex items-center justify-center gap-1.5">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> संग <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold gold-gradient-text leading-snug mb-2">
          रितेश (चिंटू)
        </h2>

        {/* Date & Location Pill */}
        <div className="mb-4 text-[11px] sm:text-xs text-amber-300/90 font-medium bg-amber-950/70 border border-amber-400/30 px-3 py-1 rounded-full">
          शुक्रवार, 11 दिसम्बर 2026 • जमशेदपुर (झारखण्ड)
        </div>

        {/* Pulsing Touch to Open Button */}
        <button
          onClick={handleOpenCurtain}
          className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(212,175,55,0.7)] border border-amber-200/80 active:scale-95 transition-transform duration-300 animate-pulse flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span>पावन निमंत्रण खोलें (Touch to Open)</span>
          <Sparkles className="w-4 h-4 text-stone-950" />
        </button>

        {/* Gentle Explanatory Hint */}
        <p className="text-[10px] sm:text-[11px] text-amber-300/70 mt-2.5 tracking-wide">
          🔔 स्क्रीन पर कहीं भी स्पर्श करें • पावन घंटा एवं मंगल संगीत के साथ
        </p>
      </div>
    </div>
  );
}
