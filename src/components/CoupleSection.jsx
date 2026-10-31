import { Heart, Users, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function CoupleSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center flex flex-col justify-between p-0">
      {/* Top Header Zone */}
      <header className="w-full pt-3 sm:pt-5 pb-2 px-3 flex flex-col items-center flex-shrink-0 border-b border-amber-400/25 bg-gradient-to-b from-black/40 via-black/20 to-transparent">
        <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1">
          वर-वधू एवं कुल परिचय
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gold-gradient-text mt-0.5">
          पवित्र पारिवारिक संबंध
        </h2>
      </header>

      {/* Main Body Zone */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-2 flex flex-col items-center justify-center py-2">
        {/* Partially Overlapping Animated Portraits in Center */}
        <div className="relative flex items-center justify-center my-2 sm:my-3">
          {/* Bride Photo - Gliding from Left */}
          <div className="relative animate-glide-left z-10 -mr-4 sm:-mr-6 group">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 sm:border-[3px] border-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.45)]">
              <img
                src={bride.photo}
                alt={bride.fullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-rose-950/90 border border-amber-400 text-amber-200 text-[10px] sm:text-xs font-bold whitespace-nowrap shadow">
              वधू (दिव्या)
            </span>
          </div>

          {/* Central Union Knot */}
          <div className="relative z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-600 to-[#38010d] border border-amber-300 flex items-center justify-center shadow-lg -mx-2">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300 animate-pulse" />
          </div>

          {/* Groom Photo - Gliding from Right */}
          <div className="relative animate-glide-right z-20 -ml-4 sm:-ml-6 group">
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 sm:border-[3px] border-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.45)]">
              <img
                src={groom.photo}
                alt={groom.fullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-amber-400 text-amber-200 text-[10px] sm:text-xs font-bold whitespace-nowrap shadow">
              वर (चिंटू)
            </span>
          </div>
        </div>

        {/* Side-by-Side Left & Right Family Columns with Larger Text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 w-full text-left mt-2">
          {/* Left Column: Bride (वधू पक्ष) */}
          <div className="bg-amber-950/35 p-3 sm:p-3.5 rounded-2xl border border-amber-500/25 space-y-1.5">
            <div className="border-b border-amber-500/20 pb-1">
              <span className="text-[10px] sm:text-xs text-amber-400 font-bold uppercase tracking-wider">
                ॥ वधू पक्ष • सौ. कां. ॥
              </span>
              <h3 className="text-lg sm:text-xl font-bold gold-gradient-text leading-tight mt-0.5">
                {bride.fullName}
              </h3>
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-amber-100/95">
              <div className="flex items-start gap-2">
                <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-300 font-bold">पूज्य माता-पिता:</span>{" "}
                  <span>{bride.father} एवं {bride.mother}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-300 font-bold">भ्रातागण:</span>{" "}
                  <span>Om Prakash (बड़ा भाई), Amandeep (छोटा भाई)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-300 font-bold">भगिनी:</span>{" "}
                  <span>Dipika Pandit (छोटी बहन)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Groom (वर पक्ष) */}
          <div className="bg-amber-950/35 p-3 sm:p-3.5 rounded-2xl border border-amber-500/25 space-y-1.5">
            <div className="border-b border-amber-500/20 pb-1">
              <span className="text-[10px] sm:text-xs text-amber-400 font-bold uppercase tracking-wider">
                ॥ वर पक्ष • चि. ॥
              </span>
              <h3 className="text-lg sm:text-xl font-bold gold-gradient-text leading-tight mt-0.5">
                {groom.fullName}
              </h3>
            </div>

            <div className="space-y-1 text-xs sm:text-sm text-amber-100/95">
              <div className="flex items-start gap-2">
                <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-300 font-bold">पूज्य माता-पिता:</span>{" "}
                  <span>{groom.father} एवं {groom.mother}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-300 font-bold">भगिनी:</span>{" "}
                  <span>Supriya Devi (बड़ी बहन)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-300 font-bold">भ्राता:</span>{" "}
                  <span>Ritik Kumar (छोटा भाई)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Lineage Footer */}
        <div className="mt-2 text-center text-xs sm:text-sm text-amber-300/90 font-medium">
          समस्त पंडित परिवार • टाटानगर, झारखण्ड
        </div>
      </div>
    </div>
  );
}
