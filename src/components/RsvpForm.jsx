import { useState } from "react";
import { Send, CheckCircle2, Heart, ArrowUp } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { triggerCelebration } from "../utils/confetti";

export default function RsvpForm({ onScrollToTop }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendees: "2",
    attendance: "attending",
    dietary: "शुद्ध शाकाहारी",
    notes: "",
  });

  const [status, setStatus] = useState("idle");
  const [submittedData, setSubmittedData] = useState(null);

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

    triggerCelebration();
    setSubmittedData(formData);
    setStatus("success");
  };

  const getWhatsAppConfirmationUrl = () => {
    if (!submittedData) return "#";
    const msg = `सादर प्रणाम पंडित परिवार! 🙏✨\n\nमैं *मोनिका एवं रितेश के शुभ विवाह* में अपनी उपस्थिति की पुष्टि करता हूँ:\n\n👤 *नाम:* ${submittedData.name}\n📞 *मोबाइल:* ${submittedData.phone}\n👥 *अतिथि संख्या:* ${submittedData.attendees}\n✨ *स्थिति:* ${submittedData.attendance === "attending" ? "सपरिवार सहर्ष पधारेंगे" : "असमर्थ हैं, दूर से असीम आशीर्वाद"}\n💌 *संदेश:* ${submittedData.notes || "वर-वधू को बहुत-बहुत बधाई एवं शुभाशीर्वाद!"}`;
    return `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="snap-section bg-royal-maroon font-serif text-center">
      <div className="max-w-xl w-full my-auto px-2 flex flex-col items-center">
        {/* Header with Larger Text */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1">
            उपस्थिति पुष्टि एवं शुभाशीर्वाद
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text mt-0.5">
            अपनी उपस्थिति व मंगलकामना दें
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
              {/* Attendance toggle with larger text */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "attending" })}
                  className={`py-2.5 px-3 rounded-full border text-xs sm:text-sm font-bold transition-all ${
                    formData.attendance === "attending"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-300 shadow-md"
                      : "bg-amber-950/40 text-amber-200 border-amber-500/30"
                  }`}
                >
                  🎉 सहर्ष पधारेंगे
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "regret" })}
                  className={`py-2.5 px-3 rounded-full border text-xs sm:text-sm font-bold transition-all ${
                    formData.attendance === "regret"
                      ? "bg-stone-800 text-amber-200 border-amber-400 shadow-md"
                      : "bg-amber-950/40 text-amber-200 border-amber-500/30"
                  }`}
                >
                  💐 दूर से शुभाशीर्वाद
                </button>
              </div>

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

              {/* Attendees & Blessing */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="col-span-1">
                  <select
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#200007] border border-amber-500/35 text-amber-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                  >
                    <option value="1">1 सदस्य</option>
                    <option value="2">2 सदस्य</option>
                    <option value="3">3 सदस्य</option>
                    <option value="4">4 सदस्य</option>
                    <option value="5+">5+ (सपरिवार)</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="वर-वधू के लिए मंगलकामना संदेश..."
                    className="w-full px-4 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/35 text-amber-100 placeholder-amber-400/50 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Submit Button with Larger Touch Target */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-98"
                >
                  <Send className="w-4 h-4 text-stone-950" />
                  <span>{status === "submitting" ? "पंजीकरण जारी है..." : "उपस्थिति व आशीर्वाद दर्ज करें"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sacred Vedic Shloka & Pandit Family Honors with Increased Text Size */}
        <div className="text-center text-xs sm:text-sm text-amber-200/95 space-y-1.5 leading-relaxed pt-2.5 border-t border-amber-500/25 w-full">
          <p className="text-amber-300 font-bold text-xs sm:text-sm">
            मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः। मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥
          </p>
          <p className="text-amber-100 font-medium">
            <strong>दर्शनाभिलाषी:</strong> श्री शंभू पंडित & श्रीमती रेखा पंडित | श्री प्रदीप कु. पंडित & श्रीमती सुनैना देवी
          </p>
          <p className="text-xs text-amber-300/90 font-medium">
            ओम प्रकाश (बड़ा भाई), अमनदीप (छोटा भाई), सुप्रिया (बड़ी बहन), रितिक (छोटा भाई), दीपिका (छोटी बहन)
          </p>
          <p className="text-amber-400 font-bold text-xs sm:text-sm mt-0.5">
            समस्त पंडित परिवार • टाटानगर, झारखण्ड
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
