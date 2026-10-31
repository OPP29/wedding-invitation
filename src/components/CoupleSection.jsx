import { Heart, Users, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";
import SwipeUpIndicator from "./SwipeUpIndicator";

export default function CoupleSection({ onNext }) {
  const { bride, groom } = weddingData.couple;

  return (
    <div className="snap-section bg-royal-maroon font-serif">
      <div className="max-w-3xl w-full my-auto px-1">
        {/* Section Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-3 h-3" />
            <span>वर-वधू एवं कुल परिचय</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold gold-gradient-text">
            पवित्र पारिवारिक संबंध
          </h2>
        </div>

        {/* Couple & Family Grid */}
        <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
          {/* Bride Card */}
          <div className="rounded-2xl p-3.5 sm:p-4 royal-card border border-amber-400/60 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-950/80 border border-amber-400/50 text-amber-300 text-[10px] font-bold">
                  ॥ वधू पक्ष (Bride) ॥
                </span>
                <span className="text-[10px] text-amber-400">सौ. कां. (आयुष्मती)</span>
              </div>

              {/* Photo & Name */}
              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-amber-400 flex-shrink-0 shadow">
                  <img
                    src={bride.photo}
                    alt={bride.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold gold-gradient-text leading-tight">
                    {bride.fullName}
                  </h3>
                  <p className="text-xs text-amber-300">
                    प्यार से: <strong>{bride.nickname}</strong>
                  </p>
                  <p className="text-[10px] text-amber-100/70 italic mt-0.5 leading-tight line-clamp-2">
                    {bride.about}
                  </p>
                </div>
              </div>

              {/* Family Lineage Details */}
              <div className="space-y-1.5 text-[11px] sm:text-xs bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/20">
                <div className="flex items-start gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">माता-पिता:</span>{" "}
                    <span className="text-amber-100">{bride.father} एवं {bride.mother}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भ्रातागण:</span>{" "}
                    <span className="text-amber-100">
                      Om Prakash (बड़ा भाई), Amandeep (छोटा भाई)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भगिनी:</span>{" "}
                    <span className="text-amber-100">Dipika Pandit (छोटी बहन)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-1 text-center text-[10px] text-amber-300/80 border-t border-amber-500/20">
              पंडित परिवार • टाटानगर, झारखण्ड
            </div>
          </div>

          {/* Groom Card */}
          <div className="rounded-2xl p-3.5 sm:p-4 royal-card border border-amber-400/60 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-amber-400/50 text-amber-300 text-[10px] font-bold">
                  ॥ वर पक्ष (Groom) ॥
                </span>
                <span className="text-[10px] text-amber-400">चि. (आयुष्मान)</span>
              </div>

              {/* Photo & Name */}
              <div className="flex items-center gap-3 mb-2.5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-amber-400 flex-shrink-0 shadow">
                  <img
                    src={groom.photo}
                    alt={groom.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold gold-gradient-text leading-tight">
                    {groom.fullName}
                  </h3>
                  <p className="text-xs text-amber-300">
                    प्यार से: <strong>{groom.nickname}</strong>
                  </p>
                  <p className="text-[10px] text-amber-100/70 italic mt-0.5 leading-tight line-clamp-2">
                    {groom.about}
                  </p>
                </div>
              </div>

              {/* Family Lineage Details */}
              <div className="space-y-1.5 text-[11px] sm:text-xs bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/20">
                <div className="flex items-start gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">माता-पिता:</span>{" "}
                    <span className="text-amber-100">{groom.father} एवं {groom.mother}</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भगिनी:</span>{" "}
                    <span className="text-amber-100">Supriya Devi (बड़ी बहन)</span>
                  </div>
                </div>

                <div className="flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भ्राता:</span>{" "}
                    <span className="text-amber-100">Ritik Kumar (छोटा भाई)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-1 text-center text-[10px] text-amber-300/80 border-t border-amber-500/20">
              पंडित परिवार • टाटानगर, झारखण्ड
            </div>
          </div>
        </div>
      </div>

      {/* Swipe up cue */}
      <SwipeUpIndicator onNext={onNext} label="उत्सव कार्यक्रम देखें" />
    </div>
  );
}
