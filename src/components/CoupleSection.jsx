import { Heart, Users, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function CoupleSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-3xl w-full my-auto px-2 flex flex-col items-center">
        {/* Header */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block px-5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-1">
            वर-वधू एवं कुल परिचय
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text mt-1">
            पवित्र पारिवारिक संबंध
          </h2>
        </div>

        {/* Partially Overlapping Animated Portraits in Center */}
        <div className="relative flex items-center justify-center my-3 sm:my-4">
          {/* Bride Photo - Gliding from Left */}
          <div className="relative animate-glide-left z-10 -mr-4 sm:-mr-6 group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-[3px] border-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.45)]">
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
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-[3px] border-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.45)]">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 w-full text-left mt-3">
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
                  <span className="font-medium">Om Prakash (बड़ा भाई), Amandeep (छोटा भाई)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">भगिनी:</span>{" "}
                  <span className="font-medium">Dipika Pandit (छोटी बहन)</span>
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
                  <span className="font-medium">Supriya Devi (बड़ी बहन)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <div>
                  <span className="text-amber-300 font-bold">भ्राता:</span>{" "}
                  <span className="font-medium">Ritik Kumar (छोटा भाई)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Lineage Footer */}
        <div className="mt-3 text-center text-xs sm:text-sm text-amber-300/90 font-medium">
          समस्त पंडित परिवार • टाटानगर, झारखण्ड
        </div>
      </div>
    </div>
  );
}
