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
    <div className="snap-section bg-royal-emerald font-serif">
      <div className="max-w-2xl w-full my-auto px-1 text-center flex flex-col items-center">
        {/* Header */}
        <div className="mb-3">
          <span className="inline-block px-5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-1">
            मांगलिक उत्सव कार्यक्रम
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold gold-gradient-text mt-1">
            विवाह उत्सव एवं मुहूर्त
          </h2>
        </div>

        {/* 4 Events Grid with Larger Text & No Repetitive Calendar/Location Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 text-left w-full">
          {weddingData.events.map((event) => {
            const IconComponent = iconMap[event.icon] || Sparkles;

            return (
              <div
                key={event.id}
                className={`rounded-2xl p-3.5 sm:p-4 royal-card border shadow-lg transition-transform ${
                  event.isMain
                    ? "border-amber-400 ring-2 ring-amber-400/50 bg-gradient-to-br from-[#3b000f]/95 to-[#1a0006]/98"
                    : "border-amber-500/35"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase font-bold text-amber-400 tracking-wider">
                      {event.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-amber-100 leading-snug">
                      {event.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm text-amber-100/95 pt-2 border-t border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-bold text-amber-200">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unified Common Venue Notice (Since venue is same for all) */}
        <div className="mt-3.5 w-full p-2.5 rounded-xl bg-amber-950/60 border border-amber-400/30 flex items-center justify-center gap-2 text-xs sm:text-sm text-amber-200">
          <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>
            <strong>सभी मांगलिक स्थल:</strong> टाटानगर, झारखण्ड • <em>(विस्तृत मार्ग निर्देश हेतु नीचे स्वाइप करें)</em>
          </span>
        </div>
      </div>
    </div>
  );
}
