import { MapPin, Navigation, Train, Plane, Phone, ExternalLink } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function VenueSection() {
  const { location } = weddingData;

  const transitInfo = [
    {
      icon: Train,
      title: "रेलवे स्टेशन (Train)",
      primary: "टाटानगर जंक्शन (TATA)",
      detail: "दूरी: 4 किमी (10 मिनट)",
      iconColor: "text-amber-400",
    },
    {
      icon: Plane,
      title: "हवाई अड्डा (Airport)",
      primary: "बिरसा मुंडा एयरपोर्ट (IXR)",
      detail: "रांची • दूरी: ~130 किमी",
      iconColor: "text-sky-400",
    },
    {
      icon: Phone,
      title: "अतिथि सहायता (Helpline)",
      primary: location.helplinePhone,
      detail: "पंडित परिवार समन्वय सेवा",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-2xl w-full my-auto px-2 flex flex-col items-center">
        {/* Header */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block px-5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-1">
            विवाह स्थल एवं मार्ग निर्देश
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text mt-1">
            टाटानगर (झारखण्ड)
          </h2>
        </div>

        {/* Venue Information */}
        <div className="w-full space-y-3">
          <div className="text-center">
            <h3 className="text-xl sm:text-3xl font-bold text-amber-100">
              {location.venueName}
            </h3>
            <p className="text-sm sm:text-base text-amber-200/90 mt-0.5 max-w-lg mx-auto font-medium">
              {location.address}
            </p>
          </div>

          {/* 3 Transit Cards - Strictly Uniform Height, Font Sizes, and Symmetrical Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full">
            {transitInfo.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-2xl bg-amber-950/45 border border-amber-500/25 flex flex-col items-center justify-center text-center shadow-md min-h-[92px] sm:min-h-[105px]"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <IconComp className={`w-4 h-4 ${item.iconColor} flex-shrink-0`} />
                    <span className="font-bold text-amber-300 text-xs sm:text-sm">
                      {item.title}
                    </span>
                  </div>
                  <p className="font-bold text-amber-100 text-xs sm:text-sm leading-tight">
                    {item.primary}
                  </p>
                  <p className="text-[11px] sm:text-xs text-amber-300/80 mt-1">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Google Map Preview */}
          <div className="rounded-2xl overflow-hidden border border-amber-500/40 h-36 sm:h-44 relative bg-stone-950 shadow-xl w-full">
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

          {/* 1-Tap Google Maps Directions Button */}
          <div className="pt-0.5">
            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95"
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
