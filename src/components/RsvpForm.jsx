import { useState, useEffect } from "react";
import { Send, CheckCircle2, Heart, Sparkles, MessageSquareHeart } from "lucide-react";
import { weddingData } from "../data/weddingData";
import { triggerCelebration } from "../utils/confetti";

export default function RsvpForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attendees: "2",
    attendance: "attending",
    dietary: "शुद्ध शाकाहारी",
    notes: "",
  });

  const [wishes, setWishes] = useState([]);
  const [status, setStatus] = useState("idle");
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("monika_ritesh_wishes");
    if (stored) {
      try {
        setWishes(JSON.parse(stored));
      } catch {
        setWishes(weddingData.initialWishes);
      }
    } else {
      setWishes(weddingData.initialWishes);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    // 1. Save RSVP in local storage
    try {
      const existingRsvps = JSON.parse(localStorage.getItem("monika_ritesh_rsvps") || "[]");
      existingRsvps.push(payload);
      localStorage.setItem("monika_ritesh_rsvps", JSON.stringify(existingRsvps));
    } catch (err) {
      console.log("Local backup error:", err);
    }

    // 2. If notes/wishes entered, also add to Blessings list immediately
    if (formData.notes.trim()) {
      const newWish = {
        id: `wish-${Date.now()}`,
        name: formData.name.trim(),
        relation: "अतिथि (Guest)",
        message: formData.notes.trim(),
        time: "अभी-अभी",
        hearts: 1,
      };
      const updatedWishes = [newWish, ...wishes];
      setWishes(updatedWishes);
      localStorage.setItem("monika_ritesh_wishes", JSON.stringify(updatedWishes));
    }

    // 3. Webhook for Google Sheets
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

  const handleHeartWish = (id) => {
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, hearts: (w.hearts || 0) + 1 } : w
    );
    setWishes(updated);
    localStorage.setItem("monika_ritesh_wishes", JSON.stringify(updated));
  };

  const getWhatsAppConfirmationUrl = () => {
    if (!submittedData) return "#";
    const msg = `सादर प्रणाम पंडित परिवार! 🙏✨\n\nमैं *मोनिका एवं रितेश के शुभ विवाह* में अपनी उपस्थिति की पुष्टि करता हूँ:\n\n👤 *नाम:* ${submittedData.name}\n📞 *मोबाइल:* ${submittedData.phone}\n👥 *अतिथि संख्या:* ${submittedData.attendees}\n✨ *स्थिति:* ${submittedData.attendance === "attending" ? "सपरिवार सहर्ष पधारेंगे" : "असमर्थ हैं, दूर से असीम आशीर्वाद"}\n💌 *संदेश:* ${submittedData.notes || "वर-वधू को बहुत-बहुत बधाई एवं शुभाशीर्वाद!"}`;
    return `https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="rsvp" className="py-10 px-3 sm:px-6 bg-royal-emerald border-b border-amber-500/30 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>उपस्थिति पुष्टि एवं शुभाशीर्वाद</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text">
            अपनी उपस्थिति व मंगलकामना दें
          </h2>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-5 sm:p-8 royal-card border border-amber-400/60 shadow-xl">
          {status === "success" ? (
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-950 border border-emerald-400 text-emerald-400 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold gold-gradient-text mb-1">
                धन्यवाद, {submittedData.name} जी!
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 mb-5">
                आपकी उपस्थिति एवं आशीर्वाद प्रेमपूर्वक सुरक्षित कर लिए गए हैं।
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={getWhatsAppConfirmationUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-transform active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
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
                  className="px-4 py-2.5 rounded-full border border-amber-400/50 text-amber-200 text-xs hover:bg-amber-950/40"
                >
                  पुनः प्रपत्र भरें
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Attendance toggle */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "attending" })}
                  className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    formData.attendance === "attending"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 border-amber-300 shadow"
                      : "bg-amber-950/40 text-amber-200 border-amber-500/30"
                  }`}
                >
                  🎉 सहर्ष पधारेंगे
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: "regret" })}
                  className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                    formData.attendance === "regret"
                      ? "bg-stone-800 text-amber-200 border-amber-400 shadow"
                      : "bg-amber-950/40 text-amber-200 border-amber-500/30"
                  }`}
                >
                  💐 दूर से शुभाशीर्वाद
                </button>
              </div>

              {/* Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-amber-300 mb-1">
                    पूरा नाम (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="उदा. ओम प्रकाश पंडित"
                    className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-amber-300 mb-1">
                    मोबाइल / WhatsApp नंबर *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Attendees & Meal */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-amber-300 mb-1">
                    सदस्य संख्या (Guests)
                  </label>
                  <select
                    value={formData.attendees}
                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#200007] border border-amber-500/40 text-amber-100 text-xs sm:text-sm"
                  >
                    <option value="1">1 सदस्य</option>
                    <option value="2">2 सदस्य</option>
                    <option value="3">3 सदस्य</option>
                    <option value="4">4 सदस्य</option>
                    <option value="5+">5+ सदस्य (सपरिवार)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-amber-300 mb-1">
                    भोजन (Meal)
                  </label>
                  <select
                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#200007] border border-amber-500/40 text-amber-100 text-xs sm:text-sm"
                  >
                    <option value="शुद्ध शाकाहारी">शुद्ध शाकाहारी (Pure Veg)</option>
                    <option value="जैन भोजन">जैन भोजन (No Onion/Garlic)</option>
                  </select>
                </div>
              </div>

              {/* Blessings Message */}
              <div>
                <label className="block text-[11px] font-bold text-amber-300 mb-1">
                  वर-वधू के लिए मंगलकामना संदेश (Wishes / Blessing)
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="मोनिका एवं रितेश के लिए अपनी मंगलकामना लिखें..."
                  className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-serif text-xs sm:text-sm font-bold shadow-md transition-transform active:scale-98"
              >
                <Send className="w-3.5 h-3.5 text-stone-950" />
                <span>{status === "submitting" ? "पंजीकरण जारी है..." : "उपस्थिति व आशीर्वाद दर्ज करें"}</span>
              </button>
            </form>
          )}

          {/* Compact Blessings Stream Preview */}
          <div className="mt-6 pt-5 border-t border-amber-500/30">
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-3">
              <MessageSquareHeart className="w-3.5 h-3.5" />
              <span>परिवार एवं सगे-संबंधियों के शुभाशीर्वाद</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {wishes.slice(0, 4).map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/20 text-xs flex flex-col justify-between"
                >
                  <p className="italic text-amber-100 leading-snug mb-2">
                    &ldquo;{w.message}&rdquo;
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-amber-400/90 pt-1 border-t border-amber-500/20">
                    <span className="font-bold truncate max-w-[170px]">{w.name} ({w.relation})</span>
                    <button
                      onClick={() => handleHeartWish(w.id)}
                      className="flex items-center gap-1 text-rose-400 hover:text-rose-300"
                    >
                      <Heart className="w-3 h-3 fill-rose-500" />
                      <span>{w.hearts || 1}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
