import { useState, useEffect, useRef } from "react";
import { Sparkles, Music, HeartHandshake, Calendar, Clock, MapPin } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function EventsTimeline({ isActive }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const sectionRef = useRef(null);

  const iconMap = {
    Sparkles: Sparkles,
    Music: Music,
    HeartHandshake: HeartHandshake,
  };

  // Staggered sequential appearance when the slide comes into view
  useEffect(() => {
    let timers = [];
    if (isActive) {
      // Reset first, then reveal each card one after another
      setVisibleCount(0);

      // Step 1: Reveal header & card 1 after slide arrives and settles (300ms)
      timers.push(setTimeout(() => setVisibleCount(1), 300));
      // Step 2: Reveal card 2 (650ms)
      timers.push(setTimeout(() => setVisibleCount(2), 650));
      // Step 3: Reveal card 3 (1000ms)
      timers.push(setTimeout(() => setVisibleCount(3), 1000));
      // Step 4: Reveal venue banner (1250ms)
      timers.push(setTimeout(() => setVisibleCount(4), 1250));
    } else if (typeof isActive !== "undefined") {
      setVisibleCount(0);
    }

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isActive]);

  // Fallback observer if rendered outside parent slide container or isActive is undefined
  useEffect(() => {
    if (typeof isActive !== "undefined") return;
    const el = sectionRef.current;
    if (!el) return;

    let timers = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount(0);
          timers.push(setTimeout(() => setVisibleCount(1), 300));
          timers.push(setTimeout(() => setVisibleCount(2), 650));
          timers.push(setTimeout(() => setVisibleCount(3), 1000));
          timers.push(setTimeout(() => setVisibleCount(4), 1250));
        } else {
          setVisibleCount(0);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [isActive]);

  return (
    <div ref={sectionRef} className="snap-section bg-royal-emerald font-serif">
      <div className="max-w-2xl sm:max-w-4xl w-full my-auto px-2.5 sm:px-4 pt-10 sm:pt-4 text-center flex flex-col items-center">
        {/* Header */}
        <div
          className={`mb-2.5 sm:mb-4 transition-all duration-700 ease-out transform ${
            visibleCount >= 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1 font-['Mukta',sans-serif]">
            मांगलिक उत्सव कार्यक्रम
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold gold-gradient-text font-['Mukta',sans-serif] mt-0.5">
            विवाह उत्सव एवं मुहूर्त
          </h2>
        </div>

        {/* 3 Events Grid: Sequentially Appears One After Another */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-left w-full">
          {weddingData.events.map((event, index) => {
            const IconComponent = iconMap[event.icon] || Sparkles;
            const isShown = visibleCount >= index + 1;

            return (
              <div
                key={event.id}
                className={`rounded-2xl p-3 sm:p-4 royal-card border shadow-lg transition-all duration-700 ease-out transform ${
                  isShown
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                } ${
                  event.isMain
                    ? "border-amber-400 ring-2 ring-amber-400/50 bg-gradient-to-br from-[#3b000f]/95 to-[#1a0006]/98 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                    : "border-amber-500/35"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-amber-100 leading-snug font-['Mukta',sans-serif]">
                      {event.name}
                    </h3>
                    <span className="text-[11px] sm:text-xs font-semibold text-amber-400 font-['Mukta',sans-serif]">
                      {event.badge}
                    </span>
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm text-amber-100/95 pt-2 border-t border-amber-500/20 font-['Mukta',sans-serif]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-bold text-amber-200">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unified Common Venue Notice (Fades in last) */}
        <div
          className={`mt-2.5 sm:mt-4 w-full p-2 sm:p-2.5 rounded-xl bg-amber-950/60 border border-amber-400/30 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-200 font-['Mukta',sans-serif] transition-all duration-700 ease-out transform ${
            visibleCount >= 4
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 flex-shrink-0" />
          <span>
            <strong>मुख्य पावन विवाह स्थल:</strong> सिदगोड़ा बारा फ्लैट क्लब हाउस, जमशेदपुर
          </span>
        </div>
      </div>
    </div>
  );
}
