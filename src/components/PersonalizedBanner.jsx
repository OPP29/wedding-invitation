import { useState, useEffect } from "react";
import { Sparkles, Share2, Copy, Check } from "lucide-react";

export default function PersonalizedBanner({ onOpenShareModal }) {
  const [guestName, setGuestName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const guestParam = searchParams.get("guest") || searchParams.get("to") || searchParams.get("name");
    if (guestParam) {
      setGuestName(decodeURIComponent(guestParam));
    }
  }, []);

  const handleCopyCurrentLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative z-30 w-full bg-gradient-to-r from-[#200007] via-[#4a0214] to-[#200007] text-amber-100 border-b-2 border-amber-500/40 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm">
        {guestName ? (
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-base">ॐ</span>
            <span className="font-serif tracking-wide text-xs sm:text-sm">
              सादर सप्रेम अभिवादन, <strong className="text-amber-300 font-bold underline decoration-amber-400/80">{guestName}</strong> जी! आप सपरिवार सादर आमंत्रित हैं।
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-sm">ॐ</span>
            <span className="font-serif text-xs sm:text-sm tracking-wider text-amber-200">
              ॥ शुभ विवाह पावन निमंत्रण ॥ मोनिका संग रितेश • 11 दिसम्बर 2026, टाटानगर
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {guestName && (
            <button
              onClick={handleCopyCurrentLink}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs transition-colors font-serif"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "लिंक कॉपी हो गई" : "Copy Link"}</span>
            </button>
          )}

          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shadow-md transition-all hover:scale-105 font-serif"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>अतिथि निमंत्रण लिंक बनाएं</span>
          </button>
        </div>
      </div>
    </div>
  );
}
