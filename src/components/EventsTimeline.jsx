import { Sparkles, Music, HeartHandshake, PartyPopper, Calendar, Clock, MapPin } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function EventsTimeline() {
  const iconMap = {
    Sparkles: Sparkles,
    Music: Music,
    HeartHandshake: HeartHandshake,
    PartyPopper: PartyPopper,
  };

  return (
    <div className="snap-section bg-royal-emerald font-serif flex flex-col justify-between p-0">
      {/* Top Header Zone */}
      <header className="w-full pt-3 sm:pt-5 pb-2 px-3 flex flex-col items-center flex-shrink-0 border-b border-amber-400/25 bg-gradient-to-b from-black/40 via-black/20 to-transparent text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1">
          मांगलिक उत्सव कार्यक्रम
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gold-gradient-text mt-0.5">
          विवाह उत्सव एवं मुहूर्त
        </h2>
      </header>

      {/* Main Body Zone */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-2 flex flex-col items-center justify-center py-2 text-center">
        {/* 4 Events Grid with Larger Text & Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-left w-full">
          {weddingData.events.map((event) => {
            const IconComponent = iconMap[event.icon] || Sparkles;

            return (
              <div
                key={event.id}
                className={`rounded-2xl p-3 sm:p-3.5 royal-card border shadow-lg transition-transform ${
                  event.isMain
                    ? "border-amber-400 ring-2 ring-amber-400/50 bg-gradient-to-br from-[#3b000f]/95 to-[#1a0006]/98"
                    : "border-amber-500/35"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-400 tracking-wider">
                      {event.badge}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-amber-100 leading-snug">
                      {event.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1 text-xs sm:text-sm text-amber-100/95 pt-1.5 border-t border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                    <span className="font-bold text-amber-200">{event.date}</span>
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
              </div>
            );
          })}
        </div>

        {/* Unified Common Venue Notice */}
        <div className="mt-2.5 sm:mt-3 w-full p-2 sm:p-2.5 rounded-xl bg-amber-950/60 border border-amber-400/30 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-200">
          <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>
            <strong>सभी मांगलिक स्थल:</strong> टाटानगर, झारखण्ड • <em>(विस्तृत मार्ग निर्देश हेतु नीचे स्वाइप करें)</em>
          </span>
        </div>
      </div>
    </div>
  );
}
