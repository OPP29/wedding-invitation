import { Heart, Users, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function CoupleSection() {
  const { bride, groom } = weddingData.couple;

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-3xl w-full my-auto px-2">
        {/* Header */}
        <div className="mb-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
            वर-वधू एवं कुल परिचय
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text mt-1">
            पवित्र पारिवारिक संबंध
          </h2>
        </div>

        {/* Bride & Groom Borderless Profiles */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-10 text-left">
          {/* Bride Column */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl flex-shrink-0">
                <img
                  src={bride.photo}
                  alt={bride.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] text-amber-400 uppercase tracking-wider font-bold">
                  ॥ वधू पक्ष • सौ. कां. ॥
                </span>
                <h3 className="text-xl sm:text-2xl font-bold gold-gradient-text">
                  {bride.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300">
                  प्यार से: <strong>{bride.nickname}</strong>
                </p>
              </div>
            </div>

            {/* Lineage Details */}
            <div className="space-y-1.5 text-xs sm:text-sm text-amber-100/90 w-full bg-amber-950/30 p-3 rounded-2xl border border-amber-500/20">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-400 font-bold">पूज्य माता-पिता:</span>{" "}
                  <span>{bride.father} एवं {bride.mother}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-400 font-bold">भ्रातागण:</span>{" "}
                  <span>Om Prakash (बड़ा भाई), Amandeep (छोटा भाई)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-400 font-bold">भगिनी:</span>{" "}
                  <span>Dipika Pandit (छोटी बहन)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Groom Column */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl flex-shrink-0">
                <img
                  src={groom.photo}
                  alt={groom.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] text-amber-400 uppercase tracking-wider font-bold">
                  ॥ वर पक्ष • चि. ॥
                </span>
                <h3 className="text-xl sm:text-2xl font-bold gold-gradient-text">
                  {groom.fullName}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300">
                  प्यार से: <strong>{groom.nickname}</strong>
                </p>
              </div>
            </div>

            {/* Lineage Details */}
            <div className="space-y-1.5 text-xs sm:text-sm text-amber-100/90 w-full bg-amber-950/30 p-3 rounded-2xl border border-amber-500/20">
              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-400 font-bold">पूज्य माता-पिता:</span>{" "}
                  <span>{groom.father} एवं {groom.mother}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-400 font-bold">भगिनी:</span>{" "}
                  <span>Supriya Devi (बड़ी बहन)</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-amber-400 font-bold">भ्राता:</span>{" "}
                  <span>Ritik Kumar (छोटा भाई)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional family tag at bottom */}
        <div className="mt-5 text-center text-xs text-amber-300/80">
          समस्त पंडित परिवार • टाटानगर, झारखण्ड
        </div>
      </div>
    </div>
  );
}
