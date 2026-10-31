import { MapPin, Navigation, Train, Plane, Phone, ExternalLink } from "lucide-react";
import { weddingData } from "../data/weddingData";
import SwipeUpIndicator from "./SwipeUpIndicator";

export default function VenueSection({ onNext }) {
  const { location } = weddingData;

  return (
    <div className="snap-section bg-royal-maroon font-serif">
      <div className="max-w-2xl w-full my-auto px-1">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>विवाह स्थल एवं मार्ग निर्देश</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold gold-gradient-text">
            टाटानगर (झारखण्ड)
          </h2>
        </div>

        {/* Venue Card */}
        <div className="rounded-2xl p-4 sm:p-5 royal-card border-2 border-amber-400/60 shadow-xl space-y-3">
          <div className="flex items-start gap-3 border-b border-amber-500/20 pb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-300 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                पावन परिणय स्थल (Venue)
              </span>
              <h3 className="text-base sm:text-lg font-bold text-amber-100">
                {location.venueName}
              </h3>
              <p className="text-xs text-amber-200/90 mt-0.5">
                {location.address}
              </p>
            </div>
          </div>

          {/* Transit & Helpline Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] sm:text-xs">
            <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/20 flex items-center gap-2">
              <Train className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-300 text-[10px]">रेलवे स्टेशन</p>
                <p className="text-amber-100">{location.nearestStation}</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/20 flex items-center gap-2">
              <Plane className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-300 text-[10px]">हवाई अड्डा</p>
                <p className="text-amber-100">रांची (IXR)</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/20 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-300 text-[10px]">हेल्पलाइन</p>
                <p className="text-amber-100">{location.helplinePhone}</p>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Preview */}
          <div className="rounded-xl overflow-hidden border border-amber-500/40 h-32 sm:h-44 relative bg-stone-950">
            <iframe
              title="Venue Location Map"
              src={location.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full opacity-85"
            />
          </div>

          {/* 1-Tap Google Maps Button */}
          <div>
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-98"
            >
              <Navigation className="w-4 h-4 text-stone-950" />
              <span>Google Maps ऐप में मार्ग देखें (Directions)</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-950" />
            </a>
          </div>
        </div>
      </div>

      {/* Swipe up cue */}
      <SwipeUpIndicator onNext={onNext} label="छायाचित्र वीथिका देखें" />
    </div>
  );
}
