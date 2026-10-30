import { Sparkles, Music, HeartHandshake, PartyPopper, Calendar, Clock, MapPin, Navigation, Train, Plane, Phone, ExternalLink } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl } from "../utils/calendar";

export default function EventsTimeline() {
  const { location } = weddingData;

  const iconMap = {
    Sparkles: Sparkles,
    Music: Music,
    HeartHandshake: HeartHandshake,
    PartyPopper: PartyPopper,
  };

  return (
    <section id="events" className="py-10 px-3 sm:px-6 bg-royal-emerald border-b border-amber-500/30 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>उत्सव कार्यक्रम एवं विवाह स्थल</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text">
            मांगलिक उत्सव एवं स्थान
          </h2>
        </div>

        {/* 4 Events Grid (Compact) */}
        <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4 mb-6">
          {weddingData.events.map((event) => {
            const IconComponent = iconMap[event.icon] || Sparkles;

            return (
              <div
                key={event.id}
                className={`rounded-2xl p-4 sm:p-5 royal-card border shadow-lg transition-all ${
                  event.isMain
                    ? "border-amber-400 ring-1 ring-amber-400/50 bg-gradient-to-br from-[#3b000f]/95 to-[#1a0006]/98"
                    : "border-amber-500/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        {event.badge}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-amber-100 leading-snug">
                        {event.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-amber-100/90 pt-2 border-t border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{event.date} ({event.dateEn})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex gap-2">
                  <a
                    href={weddingData.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-2 rounded-lg bg-amber-950/70 border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-amber-900/60"
                  >
                    स्थान देखें
                  </a>
                  <a
                    href={createGoogleCalendarUrl({
                      title: `${event.name} - Monika & Ritesh Wedding`,
                      description: `${event.tagline}. Venue: ${event.venue}`,
                      location: event.venue,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold"
                  >
                    कैलेंडर में जोड़ें
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integrated Compact Venue Card */}
        <div id="venue" className="rounded-2xl p-5 royal-card border border-amber-400/60 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                विवाह स्थल (Venue)
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-amber-100 mt-0.5">
                {location.venueName}
              </h3>
              <p className="text-xs text-amber-200/80 mt-1">
                {location.address}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-amber-300/80 mt-2">
                <span>🚂 {location.nearestStation}</span>
                <span>✈️ {location.nearestAirport}</span>
                <span>📞 {location.helplinePhone}</span>
              </div>
            </div>

            <a
              href={location.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md whitespace-nowrap transition-transform active:scale-95"
            >
              <Navigation className="w-4 h-4 text-stone-950" />
              <span>Google Maps में दिशा देखें</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-950" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
