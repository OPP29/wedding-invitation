import { ChevronUp, ChevronDown } from "lucide-react";

export default function SlideNavDots({ currentSlide, totalSlides, onSelectSlide, slideLabels }) {
  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5">
      {/* Up arrow for fast step */}
      {currentSlide > 0 && (
        <button
          onClick={() => onSelectSlide(currentSlide - 1)}
          aria-label="Previous slide"
          className="p-1 rounded-full text-amber-400 hover:text-amber-200 hover:bg-amber-950/60 transition-colors"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}

      {/* Slide indicator dots */}
      <div className="flex flex-col gap-2 py-1">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isActive = currentSlide === idx;
          const label = slideLabels[idx] || `Slide ${idx + 1}`;

          return (
            <button
              key={idx}
              onClick={() => onSelectSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${label}`}
              className="group relative flex items-center justify-end"
            >
              {/* Tooltip on hover */}
              <span className="hidden sm:inline-block absolute right-6 px-2 py-0.5 rounded bg-[#200007]/90 border border-amber-400/50 text-amber-200 text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity font-serif">
                {label}
              </span>

              {/* Dot / Pill indicator */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-2.5 h-6 bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                    : "w-2 h-2 bg-amber-500/40 hover:bg-amber-400/80"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Down arrow */}
      {currentSlide < totalSlides - 1 && (
        <button
          onClick={() => onSelectSlide(currentSlide + 1)}
          aria-label="Next slide"
          className="p-1 rounded-full text-amber-400 hover:text-amber-200 hover:bg-amber-950/60 transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
