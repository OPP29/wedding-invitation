import { useState } from "react";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Download,
  Trash2,
  Search,
  FileText,
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
  const [copiedHistoryId, setCopiedHistoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [autoDownload, setAutoDownload] = useState(false);

  // Save updated history to localStorage
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
    // Remove invite.html or invite subpath to get main wedding card URL
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

    // Attempt to generate a short link via open CORS shortener (spoo.me)
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
      // Graceful fallback to direct personalized URL
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

    // If auto-download toggle is ON, automatically trigger text file download
    if (autoDownload) {
      exportToTextFile(updatedHistory);
    }
  };

  // Download all names and links stored in a clean .txt file
  const exportToTextFile = (listToExport = history) => {
    if (!listToExport || listToExport.length === 0) {
      alert("सुरक्षित करने हेतु कोई अतिथि नाम उपलब्ध नहीं है। कृपया पहले निमंत्रण लिंक बनाएं।");
      return;
    }

    const header = `========================================================================\n` +
      `🌸॥ श्री गणेशाय नमः ॥ 🌸\n` +
      `मोनिका (दिव्या) संग रितेश (चिंटू) - व्यक्तिगत निमंत्रण अतिथि सूची\n` +
      `शुभ विवाह: 11 दिसम्बर 2026 • जमशेदपुर (झारखण्ड)\n` +
      `कुल निमंत्रित अतिथि: ${listToExport.length}\n` +
      `फाइल डाउनलोड दिनांक: ${new Date().toLocaleString("hi-IN")}\n` +
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
    a.download = `Monika_Ritesh_Wedding_Guest_List_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  // Download as CSV (Excel compatible)
  const exportToCsvFile = (listToExport = history) => {
    if (!listToExport || listToExport.length === 0) return;

    const headers = ["क्रम", "अतिथि का नाम", "निमंत्रण लिंक", "निर्मित समय"];
    const rows = listToExport.map((inv, idx) => [
      idx + 1,
      `"${inv.name.replace(/"/g, '""')}"`,
      `"${inv.shortUrl || inv.fullUrl}"`,
      `"${inv.timestamp}"`,
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `Monika_Ritesh_Wedding_Guest_List_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
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

  // Delete single entry from history
  const handleDeleteEntry = (id) => {
    const filtered = history.filter((item) => item.id !== id);
    saveHistory(filtered);
    if (generatedResult?.id === id) {
      setGeneratedResult(null);
    }
  };

  // Clear all history
  const handleClearAll = () => {
    if (window.confirm("क्या आप सुरक्षित की गई संपूर्ण अतिथि सूची हटाना चाहते हैं?")) {
      saveHistory([]);
      setGeneratedResult(null);
    }
  };

  // Filter history based on search
  const filteredHistory = history.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#200007] text-[#fbf6ee] font-serif p-4 sm:p-8 flex flex-col items-center">
      {/* Top Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-6 pb-3 border-b border-amber-500/30">
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

      <div className="w-full max-w-3xl space-y-6">
        {/* Main Royal Header */}
        <div className="text-center space-y-2">
          <span className="inline-block px-5 py-1 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold gold-gradient-text tracking-wide">
            व्यक्तिगत निमंत्रण लिंक निर्माता
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            विशिष्ट सगे-संबंधियों व मित्रों के नाम से विशेष लिंक तैयार करें, सीधे WhatsApp पर भेजें
            तथा सभी अतिथियों के नाम को <strong className="text-amber-300">टेक्स्ट फाइल (.txt)</strong> में सुरक्षित रखें।
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

            {/* Auto-Download Toggle */}
            <div className="flex items-center justify-between text-xs text-amber-200/80 pt-1">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoDownload}
                  onChange={(e) => setAutoDownload(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
                />
                <span>लिंक बनते ही स्वतः टेक्स्ट फाइल (.txt) डाउनलोड करें</span>
              </label>

              <span className="text-[11px] text-amber-400/60 hidden sm:inline">
                * सभी नाम नीचे भी सुरक्षित रहेंगे
              </span>
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={isGenerating || !guestName.trim()}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-sm sm:text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5 text-stone-950 animate-pulse" />
              <span>{isGenerating ? "शॉर्ट लिंक तैयार हो रहा है..." : "लिंक बनाएं (Generate Short Link)"}</span>
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
                  तैयार शॉर्ट लिंक (Personalized Short URL):
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

        {/* Saved Guests Management & Text File Export */}
        <div className="p-5 sm:p-7 rounded-3xl bg-[#1b0007] border border-amber-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/30 pb-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold gold-gradient-text flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>सुरक्षित अतिथि सूची (Saved Guest List)</span>
              </h2>
              <p className="text-xs text-amber-300/70 mt-0.5">
                कुल तैयार निमंत्रण: <strong>{history.length}</strong>
              </p>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => exportToTextFile()}
                disabled={history.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-bold shadow transition-transform active:scale-95 disabled:opacity-40"
              >
                <Download className="w-4 h-4" />
                <span>टेक्स्ट फाइल (.txt) डाउनलोड करें</span>
              </button>

              <button
                onClick={() => exportToCsvFile()}
                disabled={history.length === 0}
                className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-xl border border-amber-500/40 hover:bg-amber-950/40 text-amber-300 text-xs font-medium transition-colors disabled:opacity-40"
              >
                <span>Excel (.csv)</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {history.length > 0 && (
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="अतिथि का नाम खोजें..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-xs sm:text-sm text-amber-200 placeholder-amber-400/40 focus:outline-none focus:border-amber-400"
              />
            </div>
          )}

          {/* List of Saved Invitations */}
          {history.length === 0 ? (
            <div className="text-center py-8 text-amber-300/60 text-xs sm:text-sm space-y-1">
              <p>अभी तक कोई निमंत्रण लिंक नहीं बनाया गया है।</p>
              <p className="text-[11px] text-amber-400/40">
                ऊपर नाम दर्ज करके 'Generate' पर क्लिक करें; सभी नाम यहाँ स्वतः सुरक्षित होते रहेंगे।
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 royal-scrollbar">
              {filteredHistory.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 sm:p-3.5 rounded-xl bg-black/40 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-amber-400/50 transition-colors"
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                        #{history.length - idx}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-amber-100 truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-300/70 font-mono truncate">
                      <span className="truncate">{item.shortUrl || item.fullUrl}</span>
                      <span>•</span>
                      <span className="text-[11px] text-amber-400/50 whitespace-nowrap">
                        {item.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Item Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => handleShareWhatsApp(item.message)}
                      title="WhatsApp पर भेजें"
                      className="p-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        handleCopyLink(item.shortUrl || item.fullUrl);
                        setCopiedHistoryId(item.id);
                        setTimeout(() => setCopiedHistoryId(null), 1800);
                      }}
                      title="लिंक कॉपी करें"
                      className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/40 text-amber-200 text-xs transition-colors"
                    >
                      {copiedHistoryId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => handleDeleteEntry(item.id)}
                      title="सूची से हटाएं"
                      className="p-2 rounded-lg hover:bg-rose-950/60 text-rose-400/70 hover:text-rose-300 text-xs transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clear All Footer */}
          {history.length > 0 && (
            <div className="pt-2 flex items-center justify-between border-t border-amber-500/20 text-xs">
              <span className="text-amber-400/60 text-[11px]">
                * यह सूची आपके इसी ब्राउज़र / फोन में हमेशा सुरक्षित रहेगी
              </span>
              <button
                onClick={handleClearAll}
                className="text-rose-400/80 hover:text-rose-300 text-[11px] underline transition-colors"
              >
                संपूर्ण सूची साफ करें
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
