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
                ? "scale-115 drop-shadow-[0_0_45px_rgba(255,215,0,1)] animate-pulse"
                : "hover:scale-105 active:scale-95"
            }`}
          >
            <svg
              viewBox="0 0 200 200"
              className="w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 drop-shadow-[0_4px_30px_rgba(212,175,55,0.9)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="ganeshShine" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF0" />
                  <stop offset="20%" stopColor="#FDE047" />
                  <stop offset="50%" stopColor="#EAB308" />
                  <stop offset="75%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <linearGradient id="ganeshGlowLine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDE0" />
                  <stop offset="50%" stopColor="#F5D77F" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <radialGradient id="divineAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE047" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="kumkumRed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF3366" />
                  <stop offset="100%" stopColor="#B91C1C" />
                </linearGradient>
              </defs>

              {/* Auspicious Radiant Halo / Prabhavali */}
              <circle cx="100" cy="100" r="94" fill="url(#divineAura)" />
              <circle cx="100" cy="100" r="92" stroke="url(#ganeshShine)" strokeWidth="1.8" strokeDasharray="4 4" opacity="0.65" />
              <circle cx="100" cy="100" r="88" stroke="#D4AF37" strokeWidth="0.8" opacity="0.4" />

              {/* Auspicious Outer Prabhavali Lotus Petals */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <circle
                  key={deg}
                  cx={100 + 92 * Math.cos((deg * Math.PI) / 180)}
                  cy={100 + 92 * Math.sin((deg * Math.PI) / 180)}
                  r="2.5"
                  fill="#FDE047"
                  opacity="0.85"
                />
              ))}

              {/* Royal Mukut Pinnacle (कलगी / मुकुट शिखर) */}
              <path
                d="M100 18 C102 24 105 28 108 30 C104 31 100 35 100 42 C100 35 96 31 92 30 C95 28 98 24 100 18 Z"
                fill="url(#ganeshShine)"
              />
              <circle cx="100" cy="15" r="3" fill="#FFFDF0" />

              {/* Crown Base & Tiered Layers */}
              <path
                d="M74 46 C86 38 114 38 126 46 L122 56 C112 50 88 50 78 56 Z"
                fill="url(#ganeshShine)"
                stroke="#AA771C"
                strokeWidth="0.8"
              />
              <path
                d="M82 56 C90 52 110 52 118 56 L115 63 C108 60 92 60 85 63 Z"
                fill="url(#ganeshGlowLine)"
              />
              <circle cx="100" cy="51" r="3.2" fill="#FFFDF0" />

              {/* Traditional Left Ear (विशाल कर्ण) */}
              <path
                d="M74 54 C54 50 32 64 30 88 C28 108 46 122 66 116 C70 104 74 86 76 68 Z"
                fill="url(#ganeshShine)"
              />
              <path
                d="M66 68 C52 70 42 80 40 94 C39 104 48 110 58 108"
                stroke="#78350F"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />

              {/* Traditional Right Ear (कर्ण) */}
              <path
                d="M126 54 C146 50 168 64 170 88 C172 108 154 122 134 116 C130 104 126 86 124 68 Z"
                fill="url(#ganeshShine)"
              />
              <path
                d="M134 68 C148 70 158 80 160 94 C161 104 152 110 142 108"
                stroke="#78350F"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />

              {/* Sacred Forehead & Temporal Bones (कुंभस्थल) */}
              <path
                d="M76 56 C90 52 110 52 124 56 C128 72 126 90 120 104 C112 96 88 96 80 104 C74 90 72 72 76 56 Z"
                fill="url(#ganeshShine)"
              />

              {/* Sacred Chandan Tripundra & Raktachandan Tilak */}
              <path
                d="M86 64 C94 67 106 67 114 64"
                stroke="#FFFDF0"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M88 70 C95 72 105 72 112 70"
                stroke="#FFFDF0"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M97 58 L103 58 L103 78 L97 78 Z"
                fill="url(#kumkumRed)"
              />
              <circle cx="100" cy="83" r="3.5" fill="url(#kumkumRed)" />
              <circle cx="100" cy="83" r="1.5" fill="#FFFDF0" />

              {/* Single Tusk (एकदन्त) on Left */}
              <path
                d="M82 104 L76 118 L84 114 Z"
                fill="#FFFDF0"
                stroke="#D4AF37"
                strokeWidth="1"
              />

              {/* Flowing Traditional Vakratunda Trunk (वक्रतुण्ड सूंड) */}
              <path
                d="M90 96 C90 114 88 132 102 148 C112 158 128 160 138 152 C146 144 148 130 138 122 C128 114 112 124 118 135 C120 139 124 141 128 139 C130 136 129 131 124 130 C120 129 117 134 119 138 C122 142 129 142 132 137 C135 130 131 124 124 122 C113 117 103 128 103 138 C103 146 109 151 116 151 C124 151 131 144 131 136 C131 125 119 116 112 110 C104 103 104 96 104 96 Z"
                fill="url(#ganeshShine)"
              />

              {/* Sacred Golden Modak / Laddu (मोदक) held at trunk curve */}
              <circle cx="140" cy="138" r="7.5" fill="#F59E0B" stroke="#FFFDF0" strokeWidth="1.5" />
              <circle cx="138" cy="136" r="2.5" fill="#FFFDF0" />

              {/* Auspicious Lotus Base (पद्मासन) */}
              <path
                d="M58 166 C74 158 92 164 100 172 C108 164 126 158 142 166 C130 176 116 178 100 178 C84 178 70 176 58 166 Z"
                fill="url(#ganeshShine)"
                opacity="0.95"
              />
              <path
                d="M74 171 C88 166 100 168 100 172 C100 168 112 166 126 171"
                stroke="#FFFDF0"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
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

        {/* 2 Royal Action Buttons: Calendar & WhatsApp Share (Matching Emerald Royale Theme) */}
        <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-lg mx-auto">
          <button
            onClick={handleOpenGoogleCalendar}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 border border-emerald-400/40"
          >
            <Calendar className="w-4 h-4 text-white flex-shrink-0" />
            <span>तिथि सुरक्षित करें</span>
          </button>

          <button
            onClick={handleDirectWhatsAppShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95 border border-emerald-400/40"
          >
            <Send className="w-4 h-4 text-white flex-shrink-0" />
            <span>WhatsApp पर भेजें</span>
          </button>
        </div>
      </div>
    </div>
  );
}
