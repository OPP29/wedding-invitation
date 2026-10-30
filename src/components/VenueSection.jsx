import { MapPin, Navigation, Train, Plane, Phone, ExternalLink } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function VenueSection() {
  const { location } = weddingData;

  return (
    <section id="venue" className="py-24 px-4 bg-royal-maroon relative overflow-hidden border-b-2 border-amber-500/30">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-xs font-serif font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>विवाह स्थल एवं मार्ग निर्देश</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-gradient-text mb-4">
            टाटानगर, झारखण्ड में आपका स्वागत है
          </h2>
          <p className="font-serif text-amber-100/80 text-base">
            आपकी सुखद एवं सुगम यात्रा हेतु विवाह स्थल के संपूर्ण मार्ग निर्देश नीचे दिए गए हैं।
          </p>
        </div>

        {/* Venue Information Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Venue Card */}
          <div className="lg:col-span-5 rounded-3xl p-8 sm:p-10 royal-card border-2 border-amber-400/60 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/60 text-amber-300 flex items-center justify-center mb-6 shadow-inner">
                <MapPin className="w-7 h-7" />
              </div>

              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold font-serif">
                पावन परिणय स्थल (Venue)
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mt-1 mb-3">
                {location.venueName}
              </h3>
              <p className="text-amber-100/80 text-sm leading-relaxed mb-6 font-serif">
                {location.address}
              </p>

              {/* Transit & Travel Assistance */}
              <div className="space-y-4 pt-6 border-t border-amber-500/20 font-serif">
                <div className="flex items-start gap-3.5 bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
                  <Train className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-amber-400">
                      निकटतम रेलवे स्टेशन (Railway Station)
                    </p>
                    <p className="text-sm text-amber-100 font-medium">
                      {location.nearestStation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
                  <Plane className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-amber-400">
                      निकटतम हवाई अड्डा (Airport)
                    </p>
                    <p className="text-sm text-amber-100 font-medium">
                      {location.nearestAirport}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase text-amber-400">
                      अतिथि स्वागत एवं सहयोग हेल्पलाइन
                    </p>
                    <p className="text-sm text-amber-100 font-medium">
                      {location.helplinePhone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <div className="mt-8 pt-6 border-t border-amber-500/20">
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif text-sm font-bold shadow-xl transition-all hover:scale-[1.02]"
              >
                <Navigation className="w-4 h-4 text-stone-950" />
                <span>Google Maps ऐप में मार्ग देखें</span>
                <ExternalLink className="w-4 h-4 text-stone-950 ml-1" />
              </a>
            </div>
          </div>

          {/* Interactive Google Map Frame with Ornate Border */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/60 min-h-[400px] relative bg-stone-950">
            <iframe
              title="Venue Location Map"
              src={location.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "440px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-90"
            />
            {/* Overlay pill */}
            <div className="absolute top-4 left-4 bg-[#200007]/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-amber-400/60 text-xs font-serif font-bold text-amber-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>टाटानगर (जमशेदपुर), झारखण्ड</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
