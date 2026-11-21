import { useState, useEffect } from "react";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  ArrowLeft,
  Share2,
  Download,
  Image as ImageIcon
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
  const [copiedImage, setCopiedImage] = useState(false);
  const [toastNotice, setToastNotice] = useState("");

  const showToast = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(""), 4500);
  };

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

  // Generate High-Resolution Personalized Royal Card Image
  const generatePersonalizedCardImage = async (name, url) => {
    if (typeof document === "undefined") return null;

    if (document.fonts) {
      try {
        await document.fonts.ready;
      } catch {
        // Ignore font wait error
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // 1. Royal Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1350);
    bgGrad.addColorStop(0, "#220008");
    bgGrad.addColorStop(0.3, "#3d0211");
    bgGrad.addColorStop(0.7, "#32010d");
    bgGrad.addColorStop(1, "#180005");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    // 2. Ambient Gold Radial Glow behind center
    const radialGlow = ctx.createRadialGradient(540, 440, 50, 540, 440, 520);
    radialGlow.addColorStop(0, "rgba(212, 175, 55, 0.16)");
    radialGlow.addColorStop(0.7, "rgba(212, 175, 55, 0.04)");
    radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, 1080, 1350);

    // 3. Concentric Decorative Mandala Rings behind couple names
    ctx.save();
    ctx.strokeStyle = "rgba(212, 175, 55, 0.14)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(540, 410, 240, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(540, 410, 280, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Helper: Draw Diamond
    const drawDiamond = (x, y, size, fill) => {
      ctx.save();
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    // Helper: Draw Rounded Rect
    const drawRoundedRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    // 4. Royal Borders
    // Outer Border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.65)";
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 40, 1000, 1270);

    // Inner Border
    ctx.strokeStyle = "rgba(245, 218, 129, 0.85)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(55, 55, 970, 1240);

    // Corner Diamond Accents
    drawDiamond(55, 55, 12, "#fae092");
    drawDiamond(1025, 55, 12, "#fae092");
    drawDiamond(55, 1295, 12, "#fae092");
    drawDiamond(1025, 1295, 12, "#fae092");

    // Corner Bracket Accents
    ctx.strokeStyle = "#fae092";
    ctx.lineWidth = 2.5;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(85, 55);
    ctx.lineTo(55, 55);
    ctx.lineTo(55, 85);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(995, 55);
    ctx.lineTo(1025, 55);
    ctx.lineTo(1025, 85);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(85, 1295);
    ctx.lineTo(55, 1295);
    ctx.lineTo(55, 1265);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(995, 1295);
    ctx.lineTo(1025, 1295);
    ctx.lineTo(1025, 1265);
    ctx.stroke();

    // 5. Typography & Content
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Auspicious Shloka
    ctx.fillStyle = "#e6c875";
    ctx.font = "bold 32px 'Rozha One', 'Yatra One', serif, sans-serif";
    ctx.fillText("🌸॥ श्री गणेशाय नमः ॥ 🌸", 540, 125);

    // Sacred Om Emblem
    ctx.fillStyle = "#fae092";
    ctx.font = "46px serif";
    ctx.fillText("ॐ", 540, 185);

    // Event Label
    ctx.fillStyle = "#ffd875";
    ctx.font = "bold 34px 'Rozha One', serif, sans-serif";
    ctx.fillText("पावन शुभ विवाह निमंत्रण", 540, 250);

    // Divider Line
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(320, 290);
    ctx.lineTo(760, 290);
    ctx.stroke();
    drawDiamond(540, 290, 6, "#fae092");

    // Bride Name
    ctx.save();
    ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#fae092";
    ctx.font = "bold 64px 'Rozha One', 'Cinzel Decorative', serif";
    ctx.fillText("मोनिका (दिव्या)", 540, 365);
    ctx.restore();

    // Sang
    ctx.fillStyle = "#f5da81";
    ctx.font = "italic 30px 'Playfair Display', serif";
    ctx.fillText("— संग —", 540, 430);

    // Groom Name
    ctx.save();
    ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#fae092";
    ctx.font = "bold 64px 'Rozha One', 'Cinzel Decorative', serif";
    ctx.fillText("रितेश (चिंटू)", 540, 500);
    ctx.restore();

    // 6. GUEST PLAQUE BOX (Highlighted centerpiece with guest name!)
    const boxX = 90;
    const boxY = 575;
    const boxW = 900;
    const boxH = 290;
    const boxR = 26;

    // Box Background
    ctx.save();
    ctx.fillStyle = "rgba(12, 0, 4, 0.75)";
    drawRoundedRect(boxX, boxY, boxW, boxH, boxR);
    ctx.fill();

    // Outer Gold Box Border
    ctx.strokeStyle = "rgba(212, 175, 55, 0.95)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner Thin Box Border
    ctx.strokeStyle = "rgba(245, 218, 129, 0.45)";
    ctx.lineWidth = 1;
    drawRoundedRect(boxX + 10, boxY + 10, boxW - 20, boxH - 20, boxR - 6);
    ctx.stroke();
    ctx.restore();

    // Plaque Top Ribbon Text
    ctx.fillStyle = "#fad776";
    ctx.font = "bold 26px 'Rozha One', 'Yatra One', serif";
    ctx.fillText("॥ सादर सप्रेम निमंत्रण ॥", 540, 630);

    // Dynamic Guest Name in Golden Glow
    const displayName = `${name.trim()} जी`;
    let guestFontSize = 54;
    if (displayName.length > 22) {
      guestFontSize = 40;
    } else if (displayName.length > 16) {
      guestFontSize = 46;
    }

    ctx.save();
    ctx.shadowColor = "rgba(255, 220, 100, 0.9)";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${guestFontSize}px 'Rozha One', 'Cinzel', serif`;
    ctx.fillText(displayName, 540, 720);
    ctx.restore();

    // Plaque Bottom Subtext
    ctx.fillStyle = "#ffd97d";
    ctx.font = "26px 'Rozha One', serif";
    ctx.fillText("आप सपरिवार सादर आमंत्रित हैं", 540, 805);

    // 7. Event Date & Venue Details
    ctx.fillStyle = "#fae092";
    ctx.font = "bold 32px 'Rozha One', sans-serif";
    ctx.fillText("🗓️ 11 दिसम्बर 2026 • 📍 जमशेदपुर (झारखण्ड)", 540, 930);

    ctx.fillStyle = "#e5c158";
    ctx.font = "24px 'Rozha One', sans-serif";
    ctx.fillText("स्थान: श्री श्री लक्ष्मीनारायण मन्दिर परिसर, केबल टाउन, गोलमुरी", 540, 985);

    // Host Family
    ctx.fillStyle = "#ffd97d";
    ctx.font = "bold 28px 'Rozha One', serif";
    ctx.fillText("🙏 सस्नेह निमंत्रित: समस्त पंडित परिवार", 540, 1065);

    // Divider
    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(300, 1120);
    ctx.lineTo(780, 1120);
    ctx.stroke();
    drawDiamond(540, 1120, 5, "#fae092");

    // Digital Link Footer
    const finalDisplayUrl = url || "https://tinyurl.com/monika-ritesh-wedding";
    ctx.fillStyle = "#ffd770";
    ctx.font = "bold 24px monospace";
    ctx.fillText(`👉 डिजिटल निमंत्रण देखें: ${finalDisplayUrl}`, 540, 1180);

    // Output as DataURL, Blob and File
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const safeFileName = `Shubh_Vivah_Nimantran_${name.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, "_")}.png`;
    const file = new File([blob], safeFileName, { type: "image/png" });

    return { dataUrl, blob, file, fileName: safeFileName };
  };

  // Generate Personalized Link & Short Link + Image Card
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

    // Generate personalized card image with guest name
    const cardData = await generatePersonalizedCardImage(trimmed, finalUrl);

    const newRecord = {
      id: `inv-${Date.now()}`,
      name: trimmed,
      shortUrl: finalUrl,
      fullUrl: fullUrl,
      message: whatsappText,
      timestamp: nowFormatted,
      cardDataUrl: cardData?.dataUrl,
      cardBlob: cardData?.blob,
      cardFile: cardData?.file,
      cardFileName: cardData?.fileName,
    };

    const updatedHistory = [newRecord, ...history];
    saveHistory(updatedHistory);
    setGeneratedResult(newRecord);
    setIsGenerating(false);
  };

  // Download Generated Card Image
  const handleDownloadCard = (card) => {
    if (!card?.cardDataUrl) return;
    const a = document.createElement("a");
    a.href = card.cardDataUrl;
    a.download = card.cardFileName || `Wedding_Invite_${card.name}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Copy Generated Card Image to Clipboard
  const handleCopyCardImage = async (card) => {
    if (!card?.cardBlob) return;
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": card.cardBlob,
          }),
        ]);
        setCopiedImage(true);
        showToast("इमेज क्लिपबोर्ड में कॉपी हो गई! WhatsApp में Ctrl+V करके पेस्ट करें।");
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        handleDownloadCard(card);
        showToast("इमेज डाउनलोड हो गई है! WhatsApp में अटैच करके भेजें।");
      }
    } catch {
      handleDownloadCard(card);
      showToast("इमेज डाउनलोड हो गई है! WhatsApp में अटैच करके भेजें।");
    }
  };

  // Share to WhatsApp with Image
  const handleShareWhatsAppWithImage = async (card) => {
    if (!card) return;

    // 1. Mobile Browsers: Use Web Share API if files sharing is supported
    if (card.cardFile && navigator.canShare && navigator.canShare({ files: [card.cardFile] })) {
      try {
        await navigator.share({
          title: "पावन शुभ विवाह निमंत्रण - मोनिका संग रितेश",
          text: card.message,
          files: [card.cardFile],
        });
        return;
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
      }
    }

    // 2. Fallback for Desktop/WhatsApp Web or unsupported file sharing:
    // Download the card image, copy it to clipboard, and open WhatsApp with the pre-filled text
    handleDownloadCard(card);
    if (card.cardBlob && navigator.clipboard && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": card.cardBlob,
          }),
        ]);
      } catch {
        // Ignored
      }
    }
    showToast("इमेज कार्ड डाउनलोड हो गया! WhatsApp में Ctrl+V दबाकर इमेज भेजें।");

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(card.message)}`;
    window.open(waUrl, "_blank");
  };

  // Share text-only to WhatsApp
  const handleShareWhatsAppTextOnly = (msg) => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");
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

  return (
    <div className="min-h-screen bg-[#200007] text-[#fbf6ee] font-serif p-4 sm:p-8 flex flex-col items-center">
      {/* Toast Notification */}
      {toastNotice && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm px-4 py-3 rounded-2xl bg-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-2xl border-2 border-amber-300 animate-fadeIn">
          {toastNotice}
        </div>
      )}

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
        {/* Main Header */}
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
              <span>{isGenerating ? "कार्ड व लिंक तैयार हो रहा है..." : "लिंक बनाएं (Generate Link)"}</span>
            </button>
          </form>

          {/* Generated Result Display */}
          {generatedResult && (
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-amber-950/60 border border-amber-400/60 space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm sm:text-base font-bold text-emerald-300">
                    {generatedResult.name} जी का निमंत्रण कार्ड तैयार है!
                  </span>
                </div>
                <span className="text-xs text-amber-300/70 font-mono">
                  {generatedResult.timestamp}
                </span>
              </div>

              {/* Personalized Card Image Preview */}
              {generatedResult.cardDataUrl && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-amber-300">
                    <span className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      <span>तैयार व्यक्तिगत इमेज कार्ड:</span>
                    </span>
                    <button
                      onClick={() => handleDownloadCard(generatedResult)}
                      className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-100 underline text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>इमेज डाउनलोड</span>
                    </button>
                  </div>

                  <div className="relative group max-w-xs sm:max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/70 shadow-2xl bg-black/60">
                    <img
                      src={generatedResult.cardDataUrl}
                      alt={`Wedding Invitation Card for ${generatedResult.name}`}
                      className="w-full h-auto object-cover select-none"
                    />
                  </div>
                </div>
              )}

              {/* Primary Action: WhatsApp Share with Image */}
              <div className="pt-1 space-y-2.5">
                <button
                  onClick={() => handleShareWhatsAppWithImage(generatedResult)}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-transform active:scale-[0.98]"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>WhatsApp पर इमेज सहित शेयर करें</span>
                </button>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleDownloadCard(generatedResult)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-300" />
                    <span>इमेज डाउनलोड</span>
                  </button>

                  <button
                    onClick={() => handleCopyCardImage(generatedResult)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold transition-colors"
                  >
                    {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
                    <span>{copiedImage ? "कॉपी हुआ!" : "इमेज कॉपी"}</span>
                  </button>

                  <button
                    onClick={() => handleShareWhatsAppTextOnly(generatedResult.message)}
                    className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-amber-500/30 hover:bg-amber-950/40 text-amber-300 text-xs font-semibold transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>केवल टेक्स्ट शेयर</span>
                  </button>
                </div>
              </div>

              {/* Generated Short Link Field */}
              <div className="pt-2 border-t border-amber-500/20">
                <label className="block text-[11px] uppercase tracking-wider text-amber-300/80 mb-1 font-semibold">
                  तैयार निमंत्रण लिंक (Personalized URL):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedResult.shortUrl}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-amber-500/40 text-amber-200 font-mono text-xs select-all"
                  />
                  <button
                    onClick={() => handleCopyLink(generatedResult.shortUrl)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold whitespace-nowrap transition-colors"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? "कॉपी हुआ!" : "कॉपी"}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Message Preview & Copy */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] uppercase tracking-wider text-amber-300/80 font-semibold">
                    WhatsApp आमंत्रण संदेश:
                  </label>
                  <button
                    onClick={() => handleCopyMessage(generatedResult.message)}
                    className="text-[11px] text-amber-300 hover:text-amber-100 underline font-semibold flex items-center gap-1"
                  >
                    {copiedMsg ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedMsg ? "संदेश कॉपी हुआ!" : "संदेश कॉपी करें"}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20 text-xs sm:text-sm text-amber-100 whitespace-pre-line leading-relaxed font-serif">
                  {generatedResult.message}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
