import { useState, useEffect } from "react";
import { Calendar, Heart, Clock } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl } from "../utils/calendar";

export default function Hero() {
  const [guestName, setGuestName] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Smart Guest URL Scanner:
    // Supports any of:
    // .../wedding-invitation/guest=Sharma Family
    // .../wedding-invitation/?guest=Sharma Family
    // .../wedding-invitation/#guest=Sharma Family
    // .../wedding-invitation/guest=Sharma%20Family
    const href = window.location.href;
    const match = href.match(/guest=([^&#?]+)/i);
    if (match && match[1]) {
      try {
        const decoded = decodeURIComponent(match[1].replace(/\+/g, " "));
        setGuestName(decoded.replace(/\/+$/, "").trim());
      } catch {
        setGuestName(match[1].replace(/[+/]/g, " ").trim());
      }
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

  const handleOpenGoogleCalendar = () => {
    const url = createGoogleCalendarUrl({});
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center flex flex-col justify-between p-0">
      {/* Top Header Zone */}
      <header className="w-full pt-3 sm:pt-5 pb-2 px-3 flex flex-col items-center flex-shrink-0 border-b border-amber-400/25 bg-gradient-to-b from-black/40 via-black/20 to-transparent">
        {/* Personalized Guest Greeting */}
        {guestName && (
          <div className="mb-2 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400/20 border border-amber-400/60 shadow-lg animate-fadeIn">
            <span className="text-amber-400 font-bold text-xs sm:text-sm">ॐ</span>
            <span className="text-xs sm:text-sm text-amber-200">
              सादर सप्रेम अभिवादन, <strong className="text-amber-300 font-bold underline decoration-amber-400/80">{guestName} जी</strong>! आप सपरिवार सादर आमंत्रित हैं।
            </span>
          </div>
        )}

        {/* Sacred Vedic Header */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-950/70 border border-amber-400/50 text-amber-300 font-bold text-xs sm:text-sm tracking-widest shadow">
            ॥ श्री गणेशाय नमः ॥
          </span>
        </div>
        <p className="italic text-amber-200/90 text-[11px] sm:text-xs tracking-wide max-w-md mx-auto">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
        </p>

        {/* Subheading */}
        <div className="mt-1">
          <span className="inline-block px-3 py-0.5 text-amber-300 text-xs sm:text-sm tracking-[0.25em] uppercase font-bold">
            ॥ पावन शुभ विवाह निमंत्रण ॥
          </span>
        </div>
      </header>

      {/* Main Body Zone */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-2 flex flex-col items-center justify-center py-2">
        {/* Couple Royal Names with Larger Typography */}
        <div className="my-2 sm:my-3 space-y-1.5 sm:space-y-2.5">
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-medium">
              सौ. कां. (वधू)
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-gradient-text mt-0.5">
              Monika Pandit
            </h1>
            <p className="text-xs sm:text-sm text-amber-300 font-medium">
              (प्यार से: <strong className="text-amber-200 text-sm sm:text-base">दिव्या</strong>)
            </p>
          </div>

          {/* Sacred knot with pulsing heart */}
          <div className="flex items-center justify-center gap-3 py-0.5">
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-amber-400/70 bg-gradient-to-br from-amber-700 to-[#38010d] flex items-center justify-center shadow-lg">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 fill-amber-300 animate-pulse" />
            </div>
            <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-medium">
              चि. (वर)
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight gold-gradient-text mt-0.5">
              Ritesh Ku. Pandit
            </h1>
            <p className="text-xs sm:text-sm text-amber-300 font-medium">
              (प्यार से: <strong className="text-amber-200 text-sm sm:text-base">चिंटू</strong>)
            </p>
          </div>
        </div>

        {/* Date Centered */}
        <div className="my-1.5 sm:my-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-semibold shadow-md">
            <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>शुक्रवार, 11 दिसम्बर 2026 (रात्रि 9:00 बजे से)</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="w-full my-1.5 sm:my-2">
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-wider mb-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>लग्न मुहूर्त (Countdown)</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 max-w-xs sm:max-w-sm mx-auto">
            {[
              { label: "दिन", val: timeLeft.days },
              { label: "घंटे", val: timeLeft.hours },
              { label: "मिनट", val: timeLeft.minutes },
              { label: "सेकंड", val: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="p-1.5 sm:p-2 rounded-2xl bg-amber-950/60 border border-amber-400/40 text-center shadow-inner"
              >
                <div className="text-lg sm:text-2xl font-bold gold-gradient-text leading-tight">
                  {String(item.val).padStart(2, "0")}
                </div>
                <div className="text-[10px] sm:text-xs text-amber-300 font-semibold mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct 1-Click Google Calendar Action Button */}
        <div className="mt-2 sm:mt-2.5">
          <button
            onClick={handleOpenGoogleCalendar}
            className="flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>तिथि सुरक्षित करें (Add to Google Calendar)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
