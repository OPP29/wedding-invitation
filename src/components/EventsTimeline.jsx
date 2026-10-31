import { Sparkles, Music, HeartHandshake, PartyPopper, Calendar, Clock, MapPin } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl } from "../utils/calendar";

export default function EventsTimeline() {
  const iconMap = {
    Sparkles: Sparkles,
    Music: Music,
    HeartHandshake: HeartHandshake,
    PartyPopper: PartyPopper,
  };

  return (
    <div className="snap-section bg-royal-emerald font-serif">
      <div className="max-w-2xl w-full my-auto px-1 text-center">
        {/* Header */}
        <div className="mb-4">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">
            मांगलिक उत्सव कार्यक्रम
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text mt-1">
            विवाह उत्सव एवं मुहूर्त
          </h2>
        </div>

        {/* 4 Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {weddingData.events.map((event) => {
            const IconComponent = iconMap[event.icon] || Sparkles;

            return (
              <div
                key={event.id}
                className={`rounded-2xl p-3.5 royal-card border shadow-lg ${
                  event.isMain
                    ? "border-amber-400 ring-1 ring-amber-400/50 bg-gradient-to-br from-[#3b000f]/95 to-[#1a0006]/98"
                    : "border-amber-500/30"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider">
                      {event.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-amber-100 leading-snug">
                      {event.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-amber-100/90 pt-1.5 border-t border-amber-500/20">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{event.date} ({event.dateEn})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-amber-500/20 flex gap-2">
                  <a
                    href={weddingData.location.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-1.5 rounded-lg bg-amber-950/70 border border-amber-500/30 text-amber-200 text-[11px] font-semibold"
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
                    className="flex-1 text-center py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[11px] font-bold"
                  >
                    कैलेंडर में जोड़ें
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
