import { useState, useEffect, useRef } from "react";
import { Heart, Users, Sparkles, MapPin } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function CoupleSection({ isActive }) {
  const { bride, groom } = weddingData.couple;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger bride & groom face photo animation after 2nd slide has loaded into view
  useEffect(() => {
    let timer;
    if (isActive) {
      // 400ms delay allows the slide scroll transition to settle, then glides photos in
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 400);
    } else if (typeof isActive !== "undefined") {
      setIsVisible(false);
    }

    return () => clearTimeout(timer);
  }, [isActive]);

  // Fallback: IntersectionObserver if rendered independently
  useEffect(() => {
    if (typeof isActive !== "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setTimeout(() => setIsVisible(true), 400);
        } else if (!entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isActive]);

  return (
    <div ref={sectionRef} className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-3xl w-full my-auto px-2 flex flex-col items-center">
        {/* Header */}
        <div className="mb-1.5 sm:mb-2.5">
          <span className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-0.5">
            वर-वधू एवं कुल परिचय
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold gold-gradient-text mt-0.5 sm:mt-1">
            पवित्र पारिवारिक संबंध
          </h2>
        </div>

        {/* Bigger Circular Portraits with Animated Left & Right Entrances */}
        <div className="relative flex items-center justify-center my-2.5 sm:my-4">
          {/* Bride Photo - Animated Glide from Left */}
          <div
            key={`bride-${isVisible}`}
            className={`relative z-10 -mr-3 sm:-mr-5 group ${
              isVisible ? "animate-glide-left" : "opacity-0 -translate-x-24"
            }`}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-3 sm:border-4 border-amber-400 ring-2 sm:ring-4 ring-amber-500/50 shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              <img
                src={bride.photo}
                alt={bride.fullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-rose-950/95 border-2 border-amber-400 text-amber-200 text-[11px] sm:text-xs font-bold whitespace-nowrap shadow-xl">
              मोनिका (वधू)
            </span>
          </div>

          {/* Central Union Knot */}
          <div
            key={`knot-${isVisible}`}
            className={`relative z-30 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-600 to-[#38010d] border border-amber-300 flex items-center justify-center shadow-lg -mx-2 transition-all duration-700 delay-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300 animate-pulse" />
          </div>

          {/* Groom Photo - Animated Glide from Right */}
          <div
            key={`groom-${isVisible}`}
            className={`relative z-20 -ml-3 sm:-ml-5 group ${
              isVisible ? "animate-glide-right" : "opacity-0 translate-x-24"
            }`}
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-3 sm:border-4 border-amber-400 ring-2 sm:ring-4 ring-amber-500/50 shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              <img
                src={groom.photo}
                alt={groom.fullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-emerald-950/95 border-2 border-amber-400 text-amber-200 text-[11px] sm:text-xs font-bold whitespace-nowrap shadow-xl">
              रितेश (वर)
            </span>
          </div>
        </div>

        {/* Family Details Columns: Guaranteed single-column vertical stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-4 w-full text-left mt-2 sm:mt-3">
          {/* Left Column: Bride (वधू पक्ष) */}
          <div className="bg-amber-950/35 p-3.5 sm:p-4 rounded-2xl border border-amber-500/25 space-y-2">
            <div className="border-b border-amber-500/20 pb-1.5">
              <span className="text-[11px] sm:text-xs text-amber-400 font-bold uppercase tracking-wider">
                ॥ वधू पक्ष • सौ. कां. ॥
              </span>
              <h3 className="text-xl sm:text-2xl font-bold gold-gradient-text leading-tight mt-0.5">
                {bride.fullName}
              </h3>
            </div>

            <div className="space-y-1.5 text-xs sm:text-base text-amber-100">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">पूज्य माता-पिता:</span>{" "}
                  <span className="font-medium">{bride.father} एवं {bride.mother}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">भ्रातागण:</span>{" "}
                  <span className="font-medium">ओम प्रकाश पंडित (बड़े भाई), अमनदीप पंडित (छोटे भाई)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">भगिनी:</span>{" "}
                  <span className="font-medium">दीपिका पंडित (छोटी बहन)</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-amber-500/20">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div className="text-[11px] sm:text-xs text-amber-200/90 leading-tight">
                  <span className="text-amber-300 font-bold">मूल निवास:</span>{" "}
                  <span>ग्राम:लोदिया, रजवाड़ा, साहिबगंज, मुजफ्फरपुर (बिहार)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Groom (वर पक्ष) */}
          <div className="bg-amber-950/35 p-3.5 sm:p-4 rounded-2xl border border-amber-500/25 space-y-2">
            <div className="border-b border-amber-500/20 pb-1.5">
              <span className="text-[11px] sm:text-xs text-amber-400 font-bold uppercase tracking-wider">
                ॥ वर पक्ष • चि. ॥
              </span>
              <h3 className="text-xl sm:text-2xl font-bold gold-gradient-text leading-tight mt-0.5">
                {groom.fullName}
              </h3>
            </div>

            <div className="space-y-1.5 text-xs sm:text-base text-amber-100">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">पूज्य माता-पिता:</span>{" "}
                  <span className="font-medium">{groom.father} एवं {groom.mother}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">भगिनी:</span>{" "}
                  <span className="font-medium">सुप्रिया देवी (बड़ी बहन)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">भ्राता:</span>{" "}
                  <span className="font-medium">रितिक कुमार (छोटा भाई)</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-amber-500/20">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div className="text-[11px] sm:text-xs text-amber-200/90 leading-tight">
                  <span className="text-amber-300 font-bold">मूल निवास:</span>{" "}
                  <span>टेल्को, जमशेदपुर, झारखण्ड</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Lineage Footer */}
        <div className="mt-3 text-center text-xs sm:text-sm text-amber-300/90 font-medium">
          समस्त पंडित परिवार (वधू पक्ष) • साहिबगंज, मुजफ्फरपुर (बिहार)
        </div>
      </div>
    </div>
  );
}
