import { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, ChevronDown, Sparkles, Clock, Share2 } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";
import { triggerCelebration } from "../utils/confetti";

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
    // Read ?guest=... from URL for personalized greeting
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
    <section className="relative pt-6 sm:pt-10 pb-8 px-3 sm:px-6 bg-royal-maroon overflow-hidden">
      <div className="max-w-4xl w-full mx-auto relative z-10 text-center">
        {/* Main Royal Gateway Card */}
        <div className="relative rounded-3xl p-5 sm:p-10 royal-card border-2 border-amber-400/60 shadow-2xl">
          {/* Corner Motifs */}
          <div className="absolute top-2.5 left-3 text-amber-400/60 text-lg sm:text-2xl select-none font-serif">❖</div>
          <div className="absolute top-2.5 right-3 text-amber-400/60 text-lg sm:text-2xl select-none font-serif">❖</div>
          <div className="absolute bottom-2.5 left-3 text-amber-400/60 text-lg sm:text-2xl select-none font-serif">❖</div>
          <div className="absolute bottom-2.5 right-3 text-amber-400/60 text-lg sm:text-2xl select-none font-serif">❖</div>

          {/* Personalized Guest Greeting (If ?guest= parameter is in URL) */}
          {guestName && (
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/60 shadow-md">
              <span className="text-amber-400 font-bold">ॐ</span>
              <span className="font-serif text-xs sm:text-sm text-amber-200">
                सादर सप्रेम अभिवादन, <strong className="text-amber-300 font-bold underline decoration-amber-400/70">{guestName} जी</strong>! आप सपरिवार सादर आमंत्रित हैं।
              </span>
            </div>
          )}

          {/* Sacred Vedic Header */}
          <div className="mb-3">
            <span className="inline-block px-4 py-1 rounded-full border border-amber-400/60 bg-amber-950/70 text-amber-300 font-bold text-xs sm:text-sm tracking-widest font-serif shadow-sm">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <p className="font-serif italic text-amber-200/90 text-xs sm:text-sm tracking-wide mt-2">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </p>
          </div>

          {/* Subheading */}
          <div className="my-2">
            <span className="inline-block px-4 py-0.5 rounded-full bg-gradient-to-r from-amber-600/30 via-amber-400/20 to-amber-600/30 border-y border-amber-400/60 text-amber-300 text-[11px] sm:text-xs tracking-[0.2em] uppercase font-serif font-bold">
              ॥ पावन शुभ विवाह निमंत्रण पत्र ॥
            </span>
          </div>

          {/* Couple Royal Names */}
          <div className="my-5 sm:my-6 space-y-3">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-serif">
                सौ. कां. (वधू)
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-gradient-text mt-0.5">
                Monika Pandit
              </h1>
              <p className="text-sm font-serif text-amber-300">
                (प्यार से: <strong className="text-amber-200">दिव्या</strong>)
              </p>
            </div>

            {/* Sacred knot */}
            <div className="flex items-center justify-center gap-3 py-0.5">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <div className="w-9 h-9 rounded-full border border-amber-400/70 bg-gradient-to-br from-amber-700 to-[#38010d] flex items-center justify-center shadow">
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300 animate-pulse" />
              </div>
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            <div>
              <span className="text-[11px] uppercase tracking-widest text-amber-400 font-serif">
                चि. (वर)
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-gradient-text mt-0.5">
                Ritesh Ku. Pandit
              </h1>
              <p className="text-sm font-serif text-amber-300">
                (प्यार से: <strong className="text-amber-200">चिंटू</strong>)
              </p>
            </div>
          </div>

          {/* Compact Date & Venue Info */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-5 text-xs sm:text-sm font-serif">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-950/80 border border-amber-400/40 text-amber-200 shadow-sm">
              <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>11 दिसम्बर 2026 (रात्रि 9:00 बजे से)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-amber-400/40 text-amber-200 shadow-sm">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>टाटानगर (झारखण्ड)</span>
            </div>
          </div>

          {/* Integrated Compact Countdown Strip */}
          <div className="mt-5 pt-4 border-t border-amber-500/30">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-serif font-bold uppercase tracking-wider mb-2.5">
              <Clock className="w-3.5 h-3.5" />
              <span>लग्न मुहूर्त उल्टी गिनती (Countdown)</span>
            </div>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
              {[
                { label: "दिन", val: timeLeft.days },
                { label: "घंटे", val: timeLeft.hours },
                { label: "मिनट", val: timeLeft.minutes },
                { label: "सेकंड", val: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-2 sm:p-2.5 rounded-xl bg-amber-950/70 border border-amber-400/40 text-center"
                >
                  <div className="text-xl sm:text-2xl font-serif font-bold gold-gradient-text leading-tight">
                    {String(item.val).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] text-amber-300 font-serif">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 pt-2">
            {/* Calendar dropdown */}
            <div className="relative">
              <button
                onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>तिथि सुरक्षित करें</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {calendarMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl bg-[#200007] border border-amber-400 shadow-2xl py-2 z-30 text-left animate-fadeIn">
                  <a
                    href={createGoogleCalendarUrl({})}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setCalendarMenuOpen(false)}
                    className="block px-3.5 py-2 text-xs text-amber-200 hover:bg-amber-900/60 font-serif"
                  >
                    📅 Google Calendar में जोड़ें
                  </a>
                  <button
                    onClick={() => {
                      downloadIcsFile({});
                      setCalendarMenuOpen(false);
                    }}
                    className="w-full text-left block px-3.5 py-2 text-xs text-amber-200 hover:bg-amber-900/60 font-serif"
                  >
                    🍏 Apple / Outlook (.ics)
                  </button>
                </div>
              )}
            </div>

            {/* Confetti button */}
            <button
              onClick={triggerCelebration}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#540217] hover:bg-[#730022] border border-amber-400 text-amber-200 font-serif text-xs sm:text-sm font-semibold transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>पुष्प वर्षा (Petals)</span>
            </button>

            {/* Generate Link modal button */}
            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-400 text-amber-200 font-serif text-xs sm:text-sm font-semibold transition-all active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-300" />
                <span>अतिथि लिंक बनाएं</span>
              </button>
            )}

            {/* RSVP Jump */}
            <a
              href="#rsvp"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-emerald-950 hover:bg-emerald-900 border border-emerald-400 text-amber-200 font-serif text-xs sm:text-sm font-semibold transition-all active:scale-95"
            >
              <span>उपस्थिति पुष्टि (RSVP)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
