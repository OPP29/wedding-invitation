import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, Heart, ArrowUp, Sparkles } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { triggerCelebration } from "../utils/confetti";
import { playSacredBellChime } from "../utils/audioChime";

export default function RsvpForm({ onScrollToTop, isActive }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendees: "सपरिवार",
    attendance: "attending",
    dietary: "शुद्ध शाकाहारी",
    notes: "",
  });

  const [status, setStatus] = useState("idle");
  const [submittedData, setSubmittedData] = useState(null);
  const [wishes, setWishes] = useState(weddingData.initialWishes || []);

  const blessingsContainerRef = useRef(null);
  const isManualControlRef = useRef(false);
  const animationFrameRef = useRef(null);

  // Auto-scrolling on Slide 6: Starts automatically, stops on user touch, and restarts when returning to Slide 6
  useEffect(() => {
    if (isActive) {
      isManualControlRef.current = false;

      let lastTime = performance.now();
      const scrollSpeed = 24; // pixels per second

      const autoScrollStep = (now) => {
        if (isManualControlRef.current) return;

        const container = blessingsContainerRef.current;
        if (container) {
          const delta = (now - lastTime) / 1000;
          lastTime = now;

          container.scrollTop += scrollSpeed * delta;

          // Seamless loop when reaching bottom
          if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) {
            container.scrollTop = 0;
          }
        }

        animationFrameRef.current = requestAnimationFrame(autoScrollStep);
      };

      const startTimer = setTimeout(() => {
        if (!isManualControlRef.current) {
          lastTime = performance.now();
          animationFrameRef.current = requestAnimationFrame(autoScrollStep);
        }
      }, 500);

      return () => {
        clearTimeout(startTimer);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  }, [isActive]);

  // Touch anywhere inside box: Stop auto-scroll and switch to full manual scroll
  const handleUserTakeControl = () => {
    if (!isManualControlRef.current) {
      isManualControlRef.current = true;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // 1. Local backup
    try {
      const existingRsvps = JSON.parse(localStorage.getItem("monika_ritesh_rsvps") || "[]");
      existingRsvps.push(payload);
      localStorage.setItem("monika_ritesh_rsvps", JSON.stringify(existingRsvps));
    } catch (err) {
      console.log("Local backup error:", err);
    }

    // 2. Google Sheets Webhook
    if (weddingData.googleSheetScriptUrl) {
      try {
        await fetch(weddingData.googleSheetScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Google Sheet webhook error:", err);
      }
    }

    if (formData.notes && formData.notes.trim()) {
      const newWish = {
        id: `w-${Date.now()}`,
        name: formData.name || "सम्मानित अतिथि",
        relation: "शुभचिंतक अतिथि (Esteemed Guest)",
        message: formData.notes.trim(),
        time: "Just now",
        hearts: 1,
      };
      setWishes((prev) => [newWish, ...prev]);
    }

    playSacredBellChime();
    triggerCelebration();
    setSubmittedData(formData);
    setStatus("success");
  };

  const getWhatsAppConfirmationUrl = () => {
    if (!submittedData) return "#";
    const msg = `सादर प्रणाम पंडित परिवार! 🙏✨\n\nमैं *मोनिका एवं रितेश के शुभ विवाह* में अपनी मंगलकामना एवं शुभाशीर्वाद प्रेषित करता हूँ:\n\n👤 *नाम:* ${submittedData.name}\n📞 *मोबाइल:* ${submittedData.phone}\n👥 *अतिथि संख्या:* ${submittedData.attendees}\n💌 *मंगलकामना संदेश:* ${submittedData.notes || "वर-वधू को बहुत-बहुत बधाई एवं शुभाशीर्वाद!"}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-xl w-full my-auto px-2 flex flex-col items-center">
        {/* Header with Larger Text */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
            शुभाशीर्वाद
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold gold-gradient-text mt-0.5 sm:mt-1">
            अपनी मंगलकामना दें
          </h2>
        </div>

        {/* Borderless Form */}
        <div className="w-full mb-3 sm:mb-4">
          {status === "success" ? (
            <div className="text-center py-5 animate-fadeIn">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mb-2.5 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold gold-gradient-text mb-1">
                धन्यवाद, {submittedData.name} जी!
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 mb-4 max-w-sm mx-auto">
                आपकी उपस्थिति एवं आशीर्वाद प्रेमपूर्वक सुरक्षित कर लिए गए हैं।
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp पर सूचित करें</span>
                </a>

                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormData({
                      name: "",
                      phone: "",
                      attendees: "2",
                      attendance: "attending",
                      dietary: "शुद्ध शाकाहारी",
                      notes: "",
                    });
                  }}
                  className="px-4 py-2 rounded-full border border-amber-400/40 text-amber-200 text-xs hover:bg-amber-950/40"
                >
                  पुनः प्रपत्र भरें
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="आपका शुभ नाम (Full Name) *"
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/35 text-amber-100 placeholder-amber-400/50 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="मोबाइल / WhatsApp नंबर *"
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/35 text-amber-100 placeholder-amber-400/50 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* वर-वधू के लिए मंगलकामना संदेश (Increased Height & Full Width) */}
              <div>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="वर-वधू के लिए पावन मंगलकामना एवं शुभाशीर्वाद संदेश..."
                  className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/35 text-amber-100 placeholder-amber-400/50 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none shadow-inner"
                />
              </div>

              {/* Submit Button with Larger Touch Target */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-98"
                >
                  <Send className="w-4 h-4 text-stone-950" />
                  <span>{status === "submitting" ? "पंजीकरण जारी है..." : "आशीर्वाद दर्ज करें"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Auspicious Family Blessings Scrollable Box - Increased Height & Manual Scrolling */}
        <div className="w-full my-2.5 rounded-2xl bg-amber-950/65 border border-amber-400/40 p-3 sm:p-3.5 text-left relative shadow-lg">
          <div className="flex items-center gap-1.5 mb-2 text-xs sm:text-sm text-amber-300 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
            <span>परिवार एवं अतिथियों के पावन शुभाशीर्वाद (Live Blessings):</span>
          </div>

          {/* Scrollable Container with Auto-Scroll & Touch-Interrupt to Manual */}
          <div
            ref={blessingsContainerRef}
            onTouchStart={handleUserTakeControl}
            onPointerDown={handleUserTakeControl}
            onMouseDown={handleUserTakeControl}
            onWheel={handleUserTakeControl}
            className="overflow-y-auto max-h-52 sm:max-h-64 relative w-full space-y-2.5 pr-1.5 royal-scrollbar"
            style={{ overscrollBehaviorY: "contain", touchAction: "pan-y" }}
          >
            {wishes.map((item, idx) => (
              <div
                key={item.id || idx}
                className="w-full bg-[#1c0107]/90 p-2.5 sm:p-3 rounded-xl border border-amber-500/30 shadow-md text-left transition-colors hover:border-amber-400/50"
              >
                {/* Sender & Relation Header */}
                <div className="flex items-center justify-between gap-2 mb-1.5 w-full">
                  <span className="text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 truncate">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </span>
                  {item.relation && (
                    <span className="text-[10px] sm:text-xs text-amber-200/90 bg-amber-900/60 border border-amber-400/30 px-2 py-0.5 rounded-full font-medium flex-shrink-0 whitespace-nowrap">
                      {item.relation.split("(")[0].trim()}
                    </span>
                  )}
                </div>

                {/* Blessing Message - Clean Left Alignment & High Readability */}
                <p className="italic text-amber-100/95 text-xs sm:text-sm leading-relaxed pl-2.5 border-l-2 border-amber-400/60 font-serif">
                  "{item.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sacred Vedic Shloka & Pandit Family Honors with Increased Text Size */}
        <div className="text-center text-xs sm:text-sm text-amber-200/95 space-y-1.5 leading-relaxed pt-2.5 border-t border-amber-500/25 w-full">
          <p className="text-amber-300 font-bold text-xs sm:text-sm">
            मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः। मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥
          </p>
          <p className="text-amber-100 font-medium">
            <strong>दर्शनाभिलाषी:</strong> श्रीमती रेखा पंडित एवं श्री शंभू पंडित
          </p>
          <p className="text-xs text-amber-300/90 font-medium">
            ओम प्रकाश पंडित (बड़े भाई), अमनदीप पंडित (छोटे भाई), दीपिका पंडित (छोटी बहन)
          </p>
          <p className="text-amber-400 font-bold text-xs sm:text-sm mt-0.5">
            समस्त पंडित परिवार (वधू पक्ष) • साहिबगंज, मुजफ्फरपुर (बिहार)
          </p>
        </div>

        {/* Return to top */}
        <div className="mt-2.5">
          <button
            onClick={onScrollToTop}
            aria-label="Return to first slide"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>शीर्ष पर जाएं (First Slide)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
