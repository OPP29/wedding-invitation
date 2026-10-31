import { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, ChevronDown, Sparkles, Clock, Share2 } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";

export default function Hero({ onOpenShareModal }) {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const guestParam = searchParams.get("guest") || searchParams.get("to") || searchParams.get("name");
    if (guestParam) {
      setGuestName(decodeURIComponent(guestParam));
    }

    const target = new Date(weddingData.weddingDate).getTime();
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-2xl w-full my-auto px-2 flex flex-col items-center">
        {/* Personalized Guest Greeting */}
        {guestName && (
          <div className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 shadow-sm">
            <span className="text-amber-400 font-bold text-xs sm:text-sm">ॐ</span>
            <span className="text-xs sm:text-sm text-amber-200">
              सादर सप्रेम अभिवादन, <strong className="text-amber-300 font-bold underline decoration-amber-400/70">{guestName} जी</strong>!
            </span>
          </div>
        )}

        {/* Sacred Vedic Header */}
        <div className="mb-2">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 font-bold text-xs sm:text-sm tracking-widest shadow-sm">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <p className="italic text-amber-200/90 text-xs sm:text-sm tracking-wide mt-1.5">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
        </div>

        {/* Subheading */}
        <div className="my-1.5">
          <span className="inline-block px-3 py-0.5 text-amber-300 text-xs sm:text-sm tracking-[0.25em] uppercase font-bold">
            ॥ पावन शुभ विवाह निमंत्रण ॥
          </span>
        </div>

        {/* Couple Royal Names */}
        <div className="my-3 sm:my-5 space-y-2">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-400">
              सौ. कां. (वधू)
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-gradient-text mt-0.5">
              Monika Pandit
            </h1>
            <p className="text-xs sm:text-sm text-amber-300">
              (प्यार से: <strong className="text-amber-200">दिव्या</strong>)
            </p>
          </div>

          {/* Sacred knot */}
          <div className="flex items-center justify-center gap-3 py-1">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="w-8 h-8 rounded-full border border-amber-400/70 bg-gradient-to-br from-amber-700 to-[#38010d] flex items-center justify-center shadow">
              <Heart className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
            </div>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-400">
              चि. (वर)
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-gradient-text mt-0.5">
              Ritesh Ku. Pandit
            </h1>
            <p className="text-xs sm:text-sm text-amber-300">
              (प्यार से: <strong className="text-amber-200">चिंटू</strong>)
            </p>
          </div>
        </div>

        {/* Date & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 my-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-400/30 text-amber-200">
            <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>11 दिसम्बर 2026 (रात्रि 9:00 बजे से)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-amber-400/30 text-amber-200">
            <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
            <span>टाटानगर (झारखण्ड)</span>
          </div>
        </div>

        {/* Fullscreen Countdown Strip */}
        <div className="w-full my-3">
          <div className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>लग्न मुहूर्त उल्टी गिनती (Countdown)</span>
          </div>
          <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
            {[
              { label: "दिन", val: timeLeft.days },
              { label: "घंटे", val: timeLeft.hours },
              { label: "मिनट", val: timeLeft.minutes },
              { label: "सेकंड", val: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="p-2 rounded-xl bg-amber-950/50 border border-amber-400/30 text-center"
              >
                <div className="text-xl sm:text-2xl font-bold gold-gradient-text leading-tight">
                  {String(item.val).padStart(2, "0")}
                </div>
                <div className="text-[10px] text-amber-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {/* Calendar dropdown */}
          <div className="relative">
            <button
              onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow transition-transform active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>तिथि सुरक्षित करें</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {calendarMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-52 rounded-xl bg-[#200007] border border-amber-400 shadow-2xl py-1.5 z-30 text-left animate-fadeIn">
                <a
                  href={createGoogleCalendarUrl({})}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarMenuOpen(false)}
                  className="block px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-900/60"
                >
                  📅 Google Calendar
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile({});
                    setCalendarMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-900/60"
                >
                  🍏 Apple / Outlook (.ics)
                </button>
              </div>
            )}
          </div>


          {/* Generate Link modal button */}
          {onOpenShareModal && (
            <button
              onClick={onOpenShareModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-950/70 hover:bg-amber-900 border border-amber-400 text-amber-200 text-xs sm:text-sm font-semibold transition-transform active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-300" />
              <span>अतिथि लिंक बनाएं</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
