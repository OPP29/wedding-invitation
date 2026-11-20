import { useState } from "react";
import { Sparkles } from "lucide-react";
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

    // 2. Dispatch custom event to trigger background music with default ON
    window.dispatchEvent(new CustomEvent("wedding:play-music"));

    // 3. Auspicious celebratory flower petal shower
    triggerCelebration();

    // 4. Notify parent after clouds have parted smoothly to left and right
    setTimeout(() => {
      setIsDismissed(true);
      if (onOpened) onOpened();
    }, 1100);
  };

  if (isDismissed) return null;

  return (
    <div
      onClick={handleOpenCurtain}
      onTouchStart={handleOpenCurtain}
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center font-serif text-center select-none cursor-pointer bg-[#140004] ${
        isOpen ? "pointer-events-none" : ""
      }`}
      aria-label="Touch anywhere to open"
    >
      {/* Subtle Starry Night & Golden Dust Background */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black pointer-events-none" />

      {/* LEFT CLOUD BANK (Slides completely to the left on tap) */}
      <div
        className={`absolute inset-y-0 left-0 w-[56%] z-10 transition-transform duration-1000 ease-out pointer-events-none ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="relative w-full h-full bg-gradient-to-r from-[#180006] via-[#24010a] to-[#2c010d] shadow-[15px_0_40px_rgba(0,0,0,0.8)]">
          {/* Layered Cloud SVGs - Left Fluffy Clouds */}
          <svg
            className="absolute top-0 -right-16 w-48 sm:w-72 h-full opacity-85 text-[#2c010d]"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C40,40 70,80 50,140 C80,180 90,240 60,300 C95,350 85,420 55,480 C85,540 80,620 50,680 C70,720 40,770 0,800 Z" />
          </svg>

          {/* Golden Mist Cloud Puff (Upper Left) */}
          <div className="absolute top-[15%] right-0 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl" />
          {/* Velvet Crimson Cloud Puff (Lower Left) */}
          <div className="absolute bottom-[20%] right-10 w-72 h-72 rounded-full bg-rose-700/20 blur-3xl" />
          {/* Deep Dark Cloud Puff */}
          <div className="absolute top-[45%] -right-12 w-80 h-80 rounded-full bg-[#3b0211]/60 blur-2xl" />

          {/* Cloud Contour SVG Edge */}
          <svg
            className="absolute inset-y-0 -right-10 w-28 h-full opacity-50 text-amber-500/30"
            viewBox="0 0 50 800"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,0 C30,60 45,120 25,180 C50,230 45,310 20,380 C45,440 40,530 20,600 C40,660 30,740 0,800 Z" />
          </svg>
        </div>
      </div>

      {/* RIGHT CLOUD BANK (Slides completely to the right on tap) */}
      <div
        className={`absolute inset-y-0 right-0 w-[56%] z-10 transition-transform duration-1000 ease-out pointer-events-none ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="relative w-full h-full bg-gradient-to-l from-[#180006] via-[#24010a] to-[#2c010d] shadow-[-15px_0_40px_rgba(0,0,0,0.8)]">
          {/* Layered Cloud SVGs - Right Fluffy Clouds */}
          <svg
            className="absolute top-0 -left-16 w-48 sm:w-72 h-full opacity-85 text-[#2c010d]"
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M100,0 C60,40 30,80 50,140 C20,180 10,240 40,300 C5,350 15,420 45,480 C15,540 20,620 50,680 C30,720 60,770 100,800 Z" />
          </svg>

          {/* Golden Mist Cloud Puff (Upper Right) */}
          <div className="absolute top-[20%] left-0 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl" />
          {/* Velvet Crimson Cloud Puff (Lower Right) */}
          <div className="absolute bottom-[15%] left-10 w-72 h-72 rounded-full bg-rose-700/20 blur-3xl" />
          {/* Deep Dark Cloud Puff */}
          <div className="absolute top-[50%] -left-12 w-80 h-80 rounded-full bg-[#3b0211]/60 blur-2xl" />

          {/* Cloud Contour SVG Edge */}
          <svg
            className="absolute inset-y-0 -left-10 w-28 h-full opacity-50 text-amber-500/30"
            viewBox="0 0 50 800"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M50,0 C20,60 5,120 25,180 C0,230 5,310 30,380 C5,440 10,530 30,600 C10,660 20,740 50,800 Z" />
          </svg>
        </div>
      </div>

      {/* CENTER ELEMENT: ONLY "Touch to Open" — Zero information visible, pure mystery */}
      <div
        className={`relative z-30 transition-all duration-700 ease-out flex flex-col items-center ${
          isOpen ? "scale-125 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
      >
        <button
          onClick={handleOpenCurtain}
          className="group relative px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base tracking-[0.2em] uppercase shadow-[0_0_40px_rgba(212,175,55,0.85)] border border-amber-200 active:scale-95 transition-all duration-300 animate-pulse flex items-center gap-3 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-stone-950 fill-stone-950 group-hover:rotate-12 transition-transform" />
          <span>Touch to Open</span>
          <Sparkles className="w-4 h-4 text-stone-950 fill-stone-950 group-hover:-rotate-12 transition-transform" />
        </button>

        <span className="text-[11px] text-amber-300/60 mt-3 tracking-wider font-sans">
          ✨ Tap anywhere on screen to open ✨
        </span>
      </div>
    </div>
  );
}
