import { useState, useEffect } from "react";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  ArrowLeft,
  Share2
} from "lucide-react";

export default function InviteGenerator() {
  const [guestName, setGuestName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem("monika_ritesh_generated_invites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  // Export all saved names and links to a .txt file (Hidden utility)
  const exportToTextFile = (listToExport = history) => {
    if (!listToExport || listToExport.length === 0) {
      alert("सुरक्षित करने हेतु कोई अतिथि नाम उपलब्ध नहीं है।");
      return;
    }

    const header =
      `========================================================================\n` +
      `मोनिका (दिव्या) संग रितेश (चिंटू) - व्यक्तिगत निमंत्रण अतिथि सूची\n` +
      `शुभ विवाह: 11 दिसम्बर 2026 • जमशेदपुर (झारखण्ड)\n` +
      `कुल निमंत्रित अतिथि: ${listToExport.length}\n` +
      `फाइल दिनांक: ${new Date().toLocaleString("hi-IN")}\n` +
      `========================================================================\n\n`;

    const body = listToExport
      .map(
        (inv, idx) =>
          `[${idx + 1}] अतिथि / परिवार का नाम: ${inv.name}\n` +
          `    👉 निमंत्रण लिंक: ${inv.shortUrl || inv.fullUrl}\n` +
          `    🕒 निर्मित समय: ${inv.timestamp}\n` +
          `    --------------------------------------------------------------------`
      )
      .join("\n\n");

    const fullContent = header + body;
    const blob = new Blob([fullContent], { type: "text/plain;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `Wedding_Guest_List_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  // Hidden Export Triggers:
  // 1. Visit URL with ?export=txt or ?download=txt
  // 2. Press Ctrl + Shift + D (or Cmd + Shift + D)
  // 3. In console: window.downloadGuestListTxt()
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("export") === "txt" || params.get("download") === "txt") {
      try {
        const stored = localStorage.getItem("monika_ritesh_generated_invites");
        const list = stored ? JSON.parse(stored) : [];
        if (list.length > 0) {
          exportToTextFile(list);
        }
      } catch {
        // Ignored
      }
    }

    window.downloadGuestListTxt = () => {
      try {
        const stored = localStorage.getItem("monika_ritesh_generated_invites");
        const list = stored ? JSON.parse(stored) : [];
        exportToTextFile(list);
      } catch {
        // Ignored
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "D" || e.key === "d")) {
        e.preventDefault();
        try {
          const stored = localStorage.getItem("monika_ritesh_generated_invites");
          const list = stored ? JSON.parse(stored) : [];
          exportToTextFile(list);
        } catch {
          // Ignored
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save updated history hiddenly to localStorage
  const saveHistory = (newHistory) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("monika_ritesh_generated_invites", JSON.stringify(newHistory));
    } catch {
      // Ignored
    }
  };

  // Base URL of the main invitation card
  const getBaseWeddingUrl = () => {
    const origin = window.location.origin;
    let pathname = window.location.pathname;
    pathname = pathname.replace(/\/invite\.html.*$/, "/").replace(/\/invite\/?.*$/, "/");
    if (!pathname.endsWith("/")) {
      pathname += "/";
    }
    return `${origin}${pathname}`;
  };

  // Format WhatsApp message
  const formatWhatsAppMessage = (name, link) => {
    return `🌸॥ श्री गणेशाय नमः ॥ 🌸\n\nसादर सप्रेम अभिवादन ${name.trim()} जी!\n\nमोनिका (दिव्या) \nसंग \nरितेश (चिंटू)\n\nपावन शुभ विवाह निमंत्रण\n🗓️ 11 दिसम्बर 2026 • 📍 जमशेदपुर\n\n👉 निमंत्रण देखें:- ${link}\n🙏 सस्नेह निमंत्रित: समस्त पंडित परिवार`;
  };

  // Generate Personalized Link & Short Link
  const handleGenerate = async (e) => {
    e.preventDefault();
    const trimmed = guestName.trim();
    if (!trimmed) return;

    setIsGenerating(true);

    const baseUrl = getBaseWeddingUrl();
    const fullUrl = `${baseUrl}?guest=${encodeURIComponent(trimmed)}`;
    let finalUrl = fullUrl;

    // Attempt to generate short link via open CORS shortener (spoo.me)
    try {
      const res = await fetch("https://spoo.me", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `url=${encodeURIComponent(fullUrl)}`,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.short_url) {
          finalUrl = data.short_url.replace("http://", "https://");
        }
      }
    } catch {
      finalUrl = fullUrl;
    }

    const nowFormatted = new Date().toLocaleString("hi-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const whatsappText = formatWhatsAppMessage(trimmed, finalUrl);

    const newRecord = {
      id: `inv-${Date.now()}`,
      name: trimmed,
      shortUrl: finalUrl,
      fullUrl: fullUrl,
      message: whatsappText,
      timestamp: nowFormatted,
    };

    const updatedHistory = [newRecord, ...history];
    saveHistory(updatedHistory);
    setGeneratedResult(newRecord);
    setIsGenerating(false);
  };

  // Copy single link
  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Copy full WhatsApp message
  const handleCopyMessage = (msg) => {
    navigator.clipboard.writeText(msg);
    setCopiedMsg(true);
    setTimeout(() => setCopiedMsg(false), 2000);
  };

  // Share directly via WhatsApp Web / App
  const handleShareWhatsApp = (msg) => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#200007] text-[#fbf6ee] font-serif p-4 sm:p-8 flex flex-col items-center">
      {/* Top Navigation */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-6 pb-3 border-b border-amber-500/30">
        <a
          href={getBaseWeddingUrl()}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>मुख्य विवाह निमंत्रण देखें</span>
        </a>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-amber-300/80 font-medium">स्वतंत्र निमंत्रण केंद्र</span>
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Main Royal Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold gold-gradient-text tracking-wide">
            व्यक्तिगत निमंत्रण लिंक निर्माता
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            विशिष्ट सगे-संबंधियों व मित्रों के नाम से विशेष लिंक तैयार करें, सीधे WhatsApp पर भेजें
          </p>
        </div>

        {/* Generator Card */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#2a010c] to-[#1c0007] border-2 border-amber-400/70 shadow-2xl space-y-5">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 mb-2">
                अतिथि / परिवार का नाम (Enter Inviter / Guest Name) *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="उदा. शर्मा परिवार, आदरणीय चाचा जी, राजेश भैया, अमित जी..."
                className="w-full px-4 py-3.5 rounded-2xl bg-black/50 border-2 border-amber-500/40 text-amber-100 placeholder-amber-400/40 text-sm sm:text-base focus:outline-none focus:border-amber-400 shadow-inner"
              />
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating || !guestName.trim()}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-stone-950 animate-pulse" />
              <span>{isGenerating ? "लिंक तैयार हो रहा है..." : "लिंक बनाएं (Generate Link)"}</span>
            </button>
          </form>

          {/* Generated Result Display */}
          {generatedResult && (
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-amber-950/60 border border-amber-400/60 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm sm:text-base font-bold text-emerald-300">
                    {generatedResult.name} जी का निमंत्रण तैयार है!
                  </span>
                </div>
                <span className="text-xs text-amber-300/70 font-mono">
                  {generatedResult.timestamp}
                </span>
              </div>

              {/* Generated Short Link Field */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-amber-300/80 mb-1 font-semibold">
                  तैयार निमंत्रण लिंक (Personalized URL):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedResult.shortUrl}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-amber-500/40 text-amber-200 font-mono text-xs sm:text-sm select-all"
                  />
                  <button
                    onClick={() => handleCopyLink(generatedResult.shortUrl)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold whitespace-nowrap transition-colors"
                  >
                    {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? "कॉपी हुआ!" : "कॉपी"}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Message Preview */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-amber-300/80 mb-1 font-semibold">
                  WhatsApp आमंत्रण संदेश:
                </label>
                <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-xs sm:text-sm text-amber-100 whitespace-pre-line leading-relaxed font-serif">
                  {generatedResult.message}
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Copy Message */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={() => handleShareWhatsApp(generatedResult.message)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>WhatsApp पर अभी शेयर करें</span>
                </button>

                <button
                  onClick={() => handleCopyMessage(generatedResult.message)}
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border border-amber-400/60 hover:bg-amber-900/40 text-amber-200 font-semibold text-xs sm:text-sm transition-colors"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>{copiedMsg ? "संदेश कॉपी हुआ!" : "संदेश कॉपी करें"}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
