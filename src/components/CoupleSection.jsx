import { Heart, Users, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function CoupleSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <section id="couple" className="py-10 px-3 sm:px-6 bg-royal-maroon border-b border-amber-500/30 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>वर-वधू एवं कुल परिचय</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text">
            पवित्र पारिवारिक संबंध
          </h2>
        </div>

        {/* Couple & Family Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Bride Card */}
          <div className="rounded-2xl p-5 royal-card border border-amber-400/60 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
                <span className="px-3 py-0.5 rounded-full bg-rose-950/80 border border-amber-400/50 text-amber-300 text-xs font-bold">
                  ॥ वधू पक्ष (Bride) ॥
                </span>
                <span className="text-[11px] text-amber-400">सौ. कां. (आयुष्मती)</span>
              </div>

              {/* Photo & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-amber-400 flex-shrink-0 shadow">
                  <img
                    src={bride.photo}
                    alt={bride.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold gold-gradient-text">
                    {bride.fullName}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300">
                    प्यार से: <strong>{bride.nickname}</strong>
                  </p>
                  <p className="text-[11px] text-amber-100/70 italic mt-1 leading-tight">
                    {bride.about}
                  </p>
                </div>
              </div>

              {/* Family Lineage Details */}
              <div className="space-y-2 text-xs bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">पूज्य माता-पिता:</span>{" "}
                    <span className="text-amber-100">{bride.father} एवं {bride.mother}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भ्रातागण:</span>{" "}
                    <span className="text-amber-100">
                      Om Prakash Pandit (बड़ा भाई), Amandeep Pandit (छोटा भाई)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भगिनी:</span>{" "}
                    <span className="text-amber-100">Dipika Pandit (छोटी बहन)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 text-center text-[11px] text-amber-300/80 border-t border-amber-500/20">
              पंडित परिवार • टाटानगर, झारखण्ड
            </div>
          </div>

          {/* Groom Card */}
          <div className="rounded-2xl p-5 royal-card border border-amber-400/60 shadow-xl flex flex-col justify-between">
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
                <span className="px-3 py-0.5 rounded-full bg-emerald-950/80 border border-amber-400/50 text-amber-300 text-xs font-bold">
                  ॥ वर पक्ष (Groom) ॥
                </span>
                <span className="text-[11px] text-amber-400">चि. (आयुष्मान)</span>
              </div>

              {/* Photo & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-amber-400 flex-shrink-0 shadow">
                  <img
                    src={groom.photo}
                    alt={groom.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold gold-gradient-text">
                    {groom.fullName}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-300">
                    प्यार से: <strong>{groom.nickname}</strong>
                  </p>
                  <p className="text-[11px] text-amber-100/70 italic mt-1 leading-tight">
                    {groom.about}
                  </p>
                </div>
              </div>

              {/* Family Lineage Details */}
              <div className="space-y-2 text-xs bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">पूज्य माता-पिता:</span>{" "}
                    <span className="text-amber-100">{groom.father} एवं {groom.mother}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भगिनी:</span>{" "}
                    <span className="text-amber-100">Supriya Devi (बड़ी बहन)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-amber-400 font-bold">भ्राता:</span>{" "}
                    <span className="text-amber-100">Ritik Kumar (छोटा भाई)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 text-center text-[11px] text-amber-300/80 border-t border-amber-500/20">
              पंडित परिवार • टाटानगर, झारखण्ड
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
