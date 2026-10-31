import { useState, useEffect } from "react";
import { Calendar, Heart, Clock, Download, Send } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl } from "../utils/calendar";
import { downloadWeddingCard, shareWeddingCardOnWhatsApp } from "../utils/cardGenerator";
import { playSacredBellChime } from "../utils/audioChime";
import { triggerTouchPetals } from "../utils/confetti";

export default function Hero() {
  const [guestName, setGuestName] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Smart Multi-Format Guest URL Scanner:
    // Supports:
    // 1. ?guest=Sharma Family or ?guest=Sharma%20Family
    // 2. #guest=Sharma Family or #guest=Sharma%20Family
    // 3. ?Sharma Family (direct query string)
    // 4. #Sharma Family (direct hash after link)
    // 5. .../wedding-invitation/guest=Sharma Family
    const parseGuest = () => {
      try {
        const href = window.location.href;
        const search = window.location.search;
        const hash = window.location.hash;

        // A. Standard URLSearchParams (?guest=... or ?to=... or ?name=...)
        if (search) {
          const params = new URLSearchParams(search);
          const val = params.get("guest") || params.get("to") || params.get("name") || params.get("n");
          if (val && val.trim()) {
            setGuestName(val.trim());
            return;
          }
          // Direct query string without key: e.g. ?Sharma%20Family
          const rawQuery = search.replace(/^\?/, "").trim();
          if (rawQuery && !rawQuery.includes("=") && rawQuery.length < 50) {
            setGuestName(decodeURIComponent(rawQuery.replace(/\+/g, " ")).trim());
            return;
          }
        }

        // B. Hash string (#guest=... or direct #Sharma Family)
        if (hash) {
          const cleanHash = hash.replace(/^#/, "").trim();
          if (/^guest=/i.test(cleanHash)) {
            const rawVal = cleanHash.replace(/^guest=/i, "").trim();
            setGuestName(decodeURIComponent(rawVal.replace(/\+/g, " ")).trim());
            return;
          }
          if (cleanHash && !cleanHash.includes("=") && cleanHash.length < 50) {
            setGuestName(decodeURIComponent(cleanHash.replace(/\+/g, " ")).trim());
            return;
          }
        }

        // C. Full URL match for guest=... anywhere
        const match = href.match(/guest=([^&#?]+)/i);
        if (match && match[1]) {
          const decoded = decodeURIComponent(match[1].replace(/\+/g, " "));
          setGuestName(decoded.replace(/\/+$/, "").trim());
          return;
        }
      } catch (err) {
        console.log("Guest parse error:", err);
      }
    };

    parseGuest();
    window.addEventListener("hashchange", parseGuest);
    window.addEventListener("popstate", parseGuest);

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
    return () => {
      clearInterval(interval);
      window.removeEventListener("hashchange", parseGuest);
      window.removeEventListener("popstate", parseGuest);
    };
  }, []);

  const handleOpenGoogleCalendar = () => {
    const url = createGoogleCalendarUrl({});
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDirectWhatsAppShare = async () => {
    const shareUrl = window.location.href.split("#")[0].split("?")[0];
    // Compact, poetic caption crafted for WhatsApp Status (< 300 chars, < 8 lines)
    const compactCaption = `॥ श्री गणेशाय नमः ॥ 🌸\nमोनिका (दिव्या) संग रितेश (चिंटू)\nपावन शुभ विवाह निमंत्रण\n📅 11 दिसम्बर 2026 • 📍 टाटानगर\n👉 डिजिटल निमंत्रण देखें:\n${shareUrl}\n🙏 सस्नेह निमंत्रित: समस्त पंडित परिवार`;
    await shareWeddingCardOnWhatsApp(compactCaption);
  };

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-2xl w-full my-auto px-2 flex flex-col items-center">
        {/* Personalized Guest Greeting */}
        {guestName && (
          <div className="mb-2 sm:mb-3 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-400/20 border border-amber-400/60 shadow-lg animate-fadeIn">
            <span className="text-amber-400 font-bold text-base sm:text-lg">ॐ</span>
            <span className="text-sm sm:text-base text-amber-200">
              सादर सप्रेम अभिवादन, <strong className="text-amber-300 font-bold underline decoration-amber-400/80">{guestName} जी</strong>! आप सपरिवार सादर आमंत्रित हैं।
            </span>
          </div>
        )}

        {/* Simple Auspicious Ganesh Icon at Top Center - Interactive Bell Ring & Petals */}
        <div className="mb-1.5 flex items-center justify-center">
          <button
            onClick={() => {
              playSacredBellChime();
              triggerTouchPetals(window.innerWidth / 2, 120);
            }}
            type="button"
            title="शुभ घंटा ध्वनि एवं पुष्प वर्षा"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-amber-500/25 via-amber-400/15 to-amber-950/80 border border-amber-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-transform active:scale-90 hover:scale-105 cursor-pointer group"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-8 h-8 sm:w-9 sm:h-9 text-amber-300 drop-shadow-[0_2px_6px_rgba(212,175,55,0.7)] group-hover:scale-105 transition-transform"
              fill="currentColor"
            >
              {/* Crown Mukut */}
              <polygon points="50,12 43,24 57,24" fill="#f5d77f" />
              <circle cx="50" cy="10" r="3" fill="#f5d77f" />
              {/* Head & Ears */}
              <path
                d="M32 30 C22 30, 22 46, 32 48 C34 44, 35 36, 36 32 Z"
                fill="#dfb045"
              />
              <path
                d="M68 30 C78 30, 78 46, 68 48 C66 44, 65 36, 64 32 Z"
                fill="#dfb045"
              />
              {/* Face & Trunk curving gently */}
              <path
                d="M38 28 C38 28, 50 26, 62 28 C64 34, 63 42, 57 48 C53 52, 53 60, 56 68 C58 73, 56 79, 50 81 C44 83, 38 78, 40 73 C41 70, 44 71, 44 73 C44 75, 47 77, 50 76 C53 75, 53 71, 51 66 C48 59, 47 51, 51 46 C55 42, 56 36, 52 32 C46 32, 40 32, 38 28 Z"
                fill="#f5d77f"
              />
              {/* Sacred Tilak */}
              <path d="M48 24 L52 24 L52 30 L48 30 Z" fill="#e11d48" />
              {/* Sweet Modak on Side */}
              <circle cx="63" cy="62" r="4.5" fill="#f5d77f" />
            </svg>
          </button>
        </div>

        {/* Sacred Vedic Header */}
        <div className="mb-2">
          <span className="inline-block px-6 py-1.5 rounded-full bg-gradient-to-r from-amber-950/90 via-amber-900/80 to-amber-950/90 border border-amber-400/60 text-amber-300 font-bold text-base sm:text-xl tracking-widest shadow-md">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <p className="italic text-amber-100 text-sm sm:text-base tracking-wide mt-2 font-medium">
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
        </div>

        {/* Subheading - Grand Prominent Banner */}
        <div className="my-2">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.15em] sm:tracking-[0.25em] gold-gradient-text uppercase">
            ॥ पावन शुभ विवाह निमंत्रण ॥
          </h2>
        </div>

        {/* Couple Royal Names with Larger Typography */}
        <div className="my-3 sm:my-4 space-y-2 sm:space-y-3">
          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-medium">
              सौ. कां. (वधू)
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight gold-gradient-text mt-0.5">
              Monika Pandit
            </h1>
            <p className="text-sm sm:text-base text-amber-300 font-medium">
              (प्यार से: <strong className="text-amber-200 text-base sm:text-lg">दिव्या</strong>)
            </p>
          </div>

          {/* Sacred knot with pulsing heart */}
          <div className="flex items-center justify-center gap-3 py-1">
            <div className="h-[1px] w-14 sm:w-28 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-amber-400/70 bg-gradient-to-br from-amber-700 to-[#38010d] flex items-center justify-center shadow-lg">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 fill-amber-300 animate-pulse" />
            </div>
            <div className="h-[1px] w-14 sm:w-28 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>

          <div>
            <span className="text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-medium">
              चि. (वर)
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight gold-gradient-text mt-0.5">
              Ritesh Ku. Pandit
            </h1>
            <p className="text-sm sm:text-base text-amber-300 font-medium">
              (प्यार से: <strong className="text-amber-200 text-base sm:text-lg">चिंटू</strong>)
            </p>
          </div>
        </div>

        {/* Date Centered (Location removed from Slide 1 as requested) */}
        <div className="my-2">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-950/80 border border-amber-400/40 text-amber-200 text-sm sm:text-base font-semibold shadow-md">
            <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>शुक्रवार, 11 दिसम्बर 2026 (रात्रि 9:00 बजे से)</span>
          </div>
        </div>

        {/* Countdown - Header changed to "लग्न मुहूर्त (Countdown)" */}
        <div className="w-full my-2">
          <div className="inline-flex items-center gap-1.5 text-sm sm:text-base text-amber-400 font-bold uppercase tracking-wider mb-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>लग्न मुहूर्त (Countdown)</span>
          </div>
          <div className="grid grid-cols-4 gap-2 max-w-xs sm:max-w-sm mx-auto">
            {[
              { label: "दिन", val: timeLeft.days },
              { label: "घंटे", val: timeLeft.hours },
              { label: "मिनट", val: timeLeft.minutes },
              { label: "सेकंड", val: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="p-2 sm:p-2.5 rounded-2xl bg-amber-950/60 border border-amber-400/40 text-center shadow-inner"
              >
                <div className="text-xl sm:text-3xl font-bold gold-gradient-text leading-tight">
                  {String(item.val).padStart(2, "0")}
                </div>
                <div className="text-[11px] sm:text-xs text-amber-300 font-semibold mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Royal Action Buttons: Calendar, E-Card Download & WhatsApp Share */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-lg mx-auto">
          <button
            onClick={handleOpenGoogleCalendar}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950 flex-shrink-0" />
            <span>तिथि सुरक्षित करें</span>
          </button>

          <button
            onClick={downloadWeddingCard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-400/60 text-amber-200 text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-95"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
            <span>ई-कार्ड डाउनलोड</span>
          </button>

          <button
            onClick={handleDirectWhatsAppShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-400/60 text-emerald-200 text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-95"
          >
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 flex-shrink-0" />
            <span>WhatsApp पर भेजें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
