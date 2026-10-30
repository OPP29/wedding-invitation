import { useState } from "react";
import { X, Copy, Check, MessageSquare, Sparkles, Send } from "lucide-react";

export default function InviteShareModal({ isOpen, onClose }) {
  const [customName, setCustomName] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  if (!isOpen) return null;

  const baseUrl = window.location.origin + window.location.pathname;
  const guestQuery = customName.trim() ? `?guest=${encodeURIComponent(customName.trim())}` : "";
  const inviteUrl = `${baseUrl}${guestQuery}`;

  const whatsappMessage = `॥ श्री गणेशाय नमः ॥ 🙏✨

सादर सप्रेम अभिवादन ${customName.trim() ? customName.trim() + " जी" : "जी"}!

परमपिता परमेश्वर के असीम अनुग्रह से हमारे प्रिय:

💍 *आयुष्मती मोनिका पंडित (दिव्या)* संग *आयुष्मान रितेश कु. पंडित (चिंटू)*

का पावन शुभ विवाह समारोह तय हुआ है।

🗓️ *शुभ लग्न तिथि:* शुक्रवार, 11 दिसम्बर 2026 (रात्रि 9:00 बजे से)
📍 *विवाह स्थल:* टाटानगर, झारखण्ड

इस मांगलिक अवसर पर आप सपरिवार पधारकर वर-वधू को अपना स्नेह एवं शुभाशीर्वाद प्रदान करें।

पावन निमंत्रण पत्र, कार्यक्रम एवं मार्ग निर्देश यहाँ देखें:
👉 ${inviteUrl}

दर्शनाभिलाषी:
समस्त पंडित परिवार
टाटानगर, झारखण्ड`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2200);
  };

  const handleSendWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn font-serif">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#200007] border-2 border-amber-400 shadow-2xl p-6 sm:p-8 text-amber-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full text-amber-300 hover:text-amber-100 hover:bg-amber-900/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 mb-3 shadow-inner">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold gold-gradient-text">
            व्यक्तिगत निमंत्रण लिंक तैयार करें
          </h3>
          <p className="text-xs text-amber-200/80 mt-1">
            रिश्तेदारों एवं मित्रों के नाम से विशेष डिजिटल निमंत्रण बनाएं और WhatsApp पर भेजें!
          </p>
        </div>

        {/* Input Name */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              अतिथि / परिवार का नाम (Guest / Family Name)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="उदा. शर्मा जी, आदरणीय चाचाजी, राजेश भैया..."
              className="w-full px-4 py-3 rounded-xl border border-amber-500/40 bg-amber-950/60 focus:outline-none focus:ring-2 focus:ring-amber-400 text-amber-100 placeholder-amber-400/40 text-sm shadow-inner"
            />
          </div>

          {/* Generated Link Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-1.5">
              विशेष निमंत्रण लिंक (Personalized URL)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={inviteUrl}
                className="w-full px-3 py-2.5 rounded-lg border border-amber-500/30 bg-black/40 text-xs text-amber-200 truncate font-mono select-all"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs whitespace-nowrap transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? "कॉपी हुआ" : "कॉपी"}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleSendWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-all hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp पर शेयर करें</span>
            </button>

            <button
              onClick={handleCopyMessage}
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-amber-400/60 hover:bg-amber-900/40 text-amber-200 font-semibold text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>{copiedMsg ? "संदेश कॉपी हुआ!" : "संदेश कॉपी"}</span>
            </button>
          </div>
        </div>

        <p className="text-[11px] text-amber-300/70 text-center mt-6">
          * जब अतिथि इस लिंक को खोलेंगे, तो सबसे ऊपर उनका नाम सस्नेह अंकित दिखाई देगा!
        </p>
      </div>
    </div>
  );
}
