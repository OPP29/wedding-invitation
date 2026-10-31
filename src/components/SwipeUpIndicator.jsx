import { ChevronDown } from "lucide-react";

export default function SwipeUpIndicator({ onNext, label = "ऊपर स्वाइप करें" }) {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 text-center">
      <button
        onClick={onNext}
        aria-label="Next slide"
        className="inline-flex flex-col items-center text-[10px] sm:text-xs text-amber-300/80 hover:text-amber-200 transition-colors group cursor-pointer"
      >
        <span className="font-serif tracking-widest uppercase mb-0.5">{label}</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400 group-hover:text-amber-300" />
      </button>
    </div>
  );
}
