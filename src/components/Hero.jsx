import { useState, useEffect } from "react";
import { Calendar, MapPin, Heart, ChevronDown, Sparkles, Clock, Share2 } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl, downloadIcsFile } from "../utils/calendar";
import { triggerCelebration } from "../utils/confetti";
import SwipeUpIndicator from "./SwipeUpIndicator";

export default function Hero({ onOpenShareModal, onNext }) {
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
    <div className="snap-section bg-royal-maroon">
      <div className="max-w-2xl w-full my-auto text-center px-1">
        {/* Main Royal Gateway Card */}
        <div className="relative rounded-3xl p-4 sm:p-7 royal-card border-2 border-amber-400/60 shadow-2xl">
          {/* Corner Motifs */}
          <div className="absolute top-2 left-3 text-amber-400/60 text-base sm:text-xl select-none font-serif">❖</div>
          <div className="absolute top-2 right-3 text-amber-400/60 text-base sm:text-xl select-none font-serif">❖</div>
          <div className="absolute bottom-2 left-3 text-amber-400/60 text-base sm:text-xl select-none font-serif">❖</div>
          <div className="absolute bottom-2 right-3 text-amber-400/60 text-base sm:text-xl select-none font-serif">❖</div>

          {/* Personalized Guest Greeting */}
          {guestName && (
            <div className="mb-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/60 shadow">
              <span className="text-amber-400 font-bold text-xs">ॐ</span>
              <span className="font-serif text-[11px] sm:text-xs text-amber-200">
                सादर सप्रेम अभिवादन, <strong className="text-amber-300 font-bold underline decoration-amber-400/70">{guestName} जी</strong>!
              </span>
            </div>
          )}

          {/* Sacred Vedic Header */}
          <div className="mb-2">
            <span className="inline-block px-3.5 py-0.5 rounded-full border border-amber-400/60 bg-amber-950/70 text-amber-300 font-bold text-[11px] sm:text-xs tracking-widest font-serif shadow-sm">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <p className="font-serif italic text-amber-200/90 text-[10px] sm:text-xs tracking-wide mt-1">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </p>
          </div>

          {/* Subheading */}
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-600/30 via-amber-400/20 to-amber-600/30 border-y border-amber-400/60 text-amber-300 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-serif font-bold">
              ॥ पावन शुभ विवाह निमंत्रण ॥
            </span>
          </div>

          {/* Couple Royal Names */}
          <div className="my-3 sm:my-4 space-y-1.5 sm:space-y-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-serif">
                सौ. कां. (वधू)
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight gold-gradient-text">
                Monika Pandit
              </h1>
              <p className="text-xs sm:text-sm font-serif text-amber-300">
                (प्यार से: <strong className="text-amber-200">दिव्या</strong>)
              </p>
            </div>

            {/* Sacred knot */}
            <div className="flex items-center justify-center gap-2 py-0.5">
              <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <div className="w-7 h-7 rounded-full border border-amber-400/70 bg-gradient-to-br from-amber-700 to-[#38010d] flex items-center justify-center shadow">
                <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
              </div>
              <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-serif">
                चि. (वर)
              </span>
              <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight gold-gradient-text">
                Ritesh Ku. Pandit
              </h1>
              <p className="text-xs sm:text-sm font-serif text-amber-300">
                (प्यार से: <strong className="text-amber-200">चिंटू</strong>)
              </p>
            </div>
          </div>

          {/* Date & Location Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 my-2.5 text-[11px] sm:text-xs font-serif">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-400/40 text-amber-200 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>11 दिसम्बर 2026 (रात्रि 9:00 बजे से)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-amber-400/40 text-amber-200 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
              <span>टाटानगर (झारखण्ड)</span>
            </div>
          </div>

          {/* Integrated Countdown */}
          <div className="mt-3 pt-2.5 border-t border-amber-500/30">
            <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-amber-400 font-serif font-bold uppercase tracking-wider mb-1.5">
              <Clock className="w-3 h-3" />
              <span>लग्न मुहूर्त उल्टी गिनती (Countdown)</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 max-w-xs mx-auto">
              {[
                { label: "दिन", val: timeLeft.days },
                { label: "घंटे", val: timeLeft.hours },
                { label: "मिनट", val: timeLeft.minutes },
                { label: "सेकंड", val: timeLeft.seconds },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-1.5 sm:p-2 rounded-lg bg-amber-950/70 border border-amber-400/40 text-center"
                >
                  <div className="text-base sm:text-xl font-serif font-bold gold-gradient-text leading-tight">
                    {String(item.val).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] text-amber-300 font-serif">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-1">
            {/* Calendar dropdown */}
            <div className="relative">
              <button
                onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif text-[11px] sm:text-xs font-bold shadow transition-transform active:scale-95"
              >
                <Calendar className="w-3 h-3" />
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
                    className="block px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-900/60 font-serif"
                  >
                    📅 Google Calendar
                  </a>
                  <button
                    onClick={() => {
                      downloadIcsFile({});
                      setCalendarMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-900/60 font-serif"
                  >
                    🍏 Apple / Outlook (.ics)
                  </button>
                </div>
              )}
            </div>

            {/* Confetti button */}
            <button
              onClick={triggerCelebration}
              className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full bg-[#540217] hover:bg-[#730022] border border-amber-400 text-amber-200 font-serif text-[11px] sm:text-xs font-semibold shadow transition-transform active:scale-95"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>पुष्प वर्षा (Petals)</span>
            </button>

            {/* Generate Link modal button */}
            {onOpenShareModal && (
              <button
                onClick={onOpenShareModal}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-400 text-amber-200 font-serif text-[11px] sm:text-xs font-semibold transition-transform active:scale-95"
              >
                <Share2 className="w-3 h-3 text-amber-300" />
                <span>अतिथि लिंक बनाएं</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Swipe up cue */}
      <SwipeUpIndicator onNext={onNext} label="परिवार परिचय देखें" />
    </div>
  );
}
