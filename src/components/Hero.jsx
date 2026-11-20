import { useState, useEffect, useRef } from "react";
import { Calendar, Heart, Clock, Send } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { createGoogleCalendarUrl } from "../utils/calendar";
import { shareWeddingCardOnWhatsApp } from "../utils/cardGenerator";
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
  const [isBellRinging, setIsBellRinging] = useState(false);
  const ganeshButtonRef = useRef(null);

  // Auto click top Ganesh icon once at 1st page load to automatically ring temple bell
  useEffect(() => {
    const autoClickTimer = setTimeout(() => {
      if (ganeshButtonRef.current) {
        ganeshButtonRef.current.click();
      }
    }, 400);

    return () => clearTimeout(autoClickTimer);
  }, []);

  const handleGaneshClick = () => {
    setIsBellRinging(true);
    setTimeout(() => setIsBellRinging(false), 1200);
    playSacredBellChime();
    triggerTouchPetals(window.innerWidth / 2, 130);
  };

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
    const compactCaption = `॥ श्री गणेशाय नमः ॥ 🌸\nमोनिका (दिव्या) संग रितेश (चिंटू)\nपावन शुभ विवाह निमंत्रण\n📅 11 दिसम्बर 2026 • 📍 जमशेदपुर\n👉 डिजिटल निमंत्रण देखें:\n${shareUrl}\n🙏 सस्नेह निमंत्रित: समस्त पंडित परिवार`;
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

        {/* Large Borderless Majestic Lord Ganesha Icon at Top Center */}
        <div className="mb-2 flex items-center justify-center">
          <button
            ref={ganeshButtonRef}
            onClick={handleGaneshClick}
            type="button"
            title="पवित्र मंदिर घंटा ध्वनि एवं पुष्प वर्षा (Click to Ring Sacred Bell)"
            className={`transition-all duration-500 cursor-pointer bg-transparent border-0 p-0 outline-none ${
              isBellRinging
                ? "scale-115 drop-shadow-[0_0_35px_rgba(255,215,0,0.95)] animate-pulse"
                : "hover:scale-105 active:scale-95"
            }`}
          >
            <svg
              viewBox="0 0 160 160"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 drop-shadow-[0_4px_22px_rgba(212,175,55,0.85)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF0" />
                  <stop offset="25%" stopColor="#FDE047" />
                  <stop offset="60%" stopColor="#D4AF37" />
                  <stop offset="90%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#F5D77F" />
                </linearGradient>
                <linearGradient id="gCrown" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="50%" stopColor="#FFF9E6" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>
                <linearGradient id="gRed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#9F1239" />
                </linearGradient>
                <radialGradient id="gHalo" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE082" stopOpacity="0.45" />
                  <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Radiant Auspicious Aura Ring */}
              <circle cx="80" cy="80" r="74" fill="url(#gHalo)" />
              <circle cx="80" cy="80" r="72" stroke="url(#gGold)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

              {/* Royal Crown / Mukut Pinnacle */}
              <path d="M80 14 L84 22 L90 23 L85 28 L86 35 L80 31 L74 35 L75 28 L70 23 L76 22 Z" fill="url(#gCrown)" />
              <path d="M60 36 C70 30 90 30 100 36 L96 48 C86 44 74 44 64 48 Z" fill="url(#gGold)" stroke="#D4AF37" strokeWidth="1" />
              <circle cx="80" cy="42" r="3" fill="#FFF9E6" />

              {/* Left Ear (कर्ण) */}
              <path d="M60 48 C44 46 26 56 24 76 C22 92 38 104 53 100 C56 90 58 76 60 62 Z" fill="url(#gGold)" />
              <path d="M54 58 C42 60 33 68 32 80 C31 88 39 94 48 92" stroke="#78350F" strokeWidth="1.5" fill="none" opacity="0.65" />

              {/* Right Ear (कर्ण) */}
              <path d="M100 48 C116 46 134 56 136 76 C138 92 122 104 107 100 C104 90 102 76 100 62 Z" fill="url(#gGold)" />
              <path d="M106 58 C118 60 127 68 128 80 C129 88 121 94 112 92" stroke="#78350F" strokeWidth="1.5" fill="none" opacity="0.65" />

              {/* Forehead & Face (मस्तक) */}
              <path d="M62 48 C72 46 88 46 98 48 C100 62 98 76 94 86 C88 80 72 80 66 86 C62 76 60 62 62 48 Z" fill="url(#gGold)" />

              {/* Sacred Raktachandan Tilak & Trishul Line */}
              <path d="M78 48 L82 48 L82 64 L78 64 Z" fill="url(#gRed)" />
              <circle cx="80" cy="68" r="3" fill="url(#gRed)" />
              <path d="M71 52 C77 55 83 55 89 52" stroke="#FFFDF0" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M72 56 C77 58 83 58 88 56" stroke="#FFFDF0" strokeWidth="1.5" strokeLinecap="round" fill="none" />

              {/* Divine Expressive Eyes */}
              <ellipse cx="69" cy="68" rx="2.5" ry="3.5" fill="#4A0210" />
              <ellipse cx="91" cy="68" rx="2.5" ry="3.5" fill="#4A0210" />
              <circle cx="69.5" cy="67" r="1" fill="#FFFDF0" />
              <circle cx="91.5" cy="67" r="1" fill="#FFFDF0" />

              {/* Sacred Tusk (एकदन्त) */}
              <path d="M67 86 L62 97 L69 93 Z" fill="#FFFDF0" stroke="#D4AF37" strokeWidth="1" />

              {/* Majestic Curved Trunk (वक्रतुण्ड) */}
              <path
                d="M72 80 C72 96 70 110 82 124 C90 132 102 134 110 128 C117 122 118 110 110 104 C102 98 90 105 95 114 C96 117 99 119 102 117 C104 115 103 111 99 110 C95 109 93 113 95 116 C97 119 103 119 105 115 C107 109 104 105 99 103 C90 99 82 108 82 116 C82 123 87 127 92 127 C99 127 104 121 104 115 C104 106 94 99 89 94 C82 88 82 80 82 80 Z"
                fill="url(#gGold)"
              />

              {/* Auspicious Golden Modak / Laddu (मोदक) */}
              <circle cx="110" cy="112" r="6" fill="#F59E0B" stroke="#FFFDF0" strokeWidth="1.2" />
              <circle cx="108" cy="110" r="2" fill="#FFFDF0" />

              {/* Sacred Lotus Peeth Base (पद्मासन) */}
              <path d="M46 136 C58 128 72 134 80 142 C88 134 102 128 114 136 C104 144 92 146 80 146 C68 146 56 144 46 136 Z" fill="url(#gGold)" opacity="0.95" />
              <path d="M58 140 C70 136 80 138 80 142 C80 138 90 136 102 140" stroke="#FFFDF0" strokeWidth="1" fill="none" opacity="0.7" />
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
              Ritesh Kumar
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

        {/* 2 Royal Action Buttons: Calendar & WhatsApp Share */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-lg mx-auto">
          <button
            onClick={handleOpenGoogleCalendar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95"
          >
            <Calendar className="w-4 h-4 text-stone-950 flex-shrink-0" />
            <span>तिथि सुरक्षित करें</span>
          </button>

          <button
            onClick={handleDirectWhatsAppShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95"
          >
            <Send className="w-4 h-4 text-white flex-shrink-0" />
            <span>WhatsApp पर भेजें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
