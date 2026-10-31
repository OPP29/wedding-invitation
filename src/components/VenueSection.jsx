import { MapPin, Navigation, Train, Plane, Phone, ExternalLink } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function VenueSection() {
  const { location } = weddingData;

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-2xl w-full my-auto px-2 flex flex-col items-center">
        {/* Header */}
        <div className="mb-3">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
            विवाह स्थल एवं मार्ग निर्देश
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text mt-1">
            टाटानगर (झारखण्ड)
          </h2>
        </div>

        {/* Venue Information - Borderless Layout */}
        <div className="w-full space-y-3">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-amber-100">
              {location.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 mt-1 max-w-lg mx-auto">
              {location.address}
            </p>
          </div>

          {/* Transit & Helpline Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-2xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-center gap-2">
              <Train className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-amber-300 text-[10px]">रेलवे स्टेशन</p>
                <p className="text-amber-100">{location.nearestStation}</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-center gap-2">
              <Plane className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-amber-300 text-[10px]">हवाई अड्डा</p>
                <p className="text-amber-100">रांची (IXR - 130 km)</p>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-left">
                <p className="font-bold text-amber-300 text-[10px]">हेल्पलाइन</p>
                <p className="text-amber-100">{location.helplinePhone}</p>
              </div>
            </div>
          </div>

          {/* Map View */}
          <div className="rounded-2xl overflow-hidden border border-amber-500/40 h-36 sm:h-48 relative bg-stone-950 shadow-xl w-full">
            <iframe
              title="Venue Location Map"
              src={location.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-90"
            />
          </div>

          {/* 1-Tap Google Maps Button */}
          <div className="pt-1">
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95"
            >
              <Navigation className="w-4 h-4 text-stone-950" />
              <span>Google Maps ऐप में मार्ग देखें (Directions)</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-950" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
