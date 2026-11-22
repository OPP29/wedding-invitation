import { useState, useEffect } from "react";
import {
  Sparkles,
  Send,
  Check,
  ArrowLeft,
  Key,
  Plus,
  X,
  Download,
  Copy,
  Search,
  RefreshCw,
  Trash2,
  ExternalLink,
  Lock
} from "lucide-react";

export default function InviteGenerator() {
  const getStoredGitHubToken = () => {
    try {
      return localStorage.getItem("wedding_gh_pat") || (import.meta.env && import.meta.env.VITE_GITHUB_TOKEN) || "";
    } catch {
      return "";
    }
  };

  const [guestName, setGuestName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [hasGitHubToken, setHasGitHubToken] = useState(() => Boolean(getStoredGitHubToken()));
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem("monika_ritesh_generated_invites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [toastNotice, setToastNotice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const showToast = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(""), 4500);
  };

  // Track if current name in text input is already generated
  const isAlreadyGenerated = Boolean(
    generatedResult &&
    generatedResult.name &&
    guestName.trim() &&
    generatedResult.name.trim().toLowerCase() === guestName.trim().toLowerCase()
  );

  // Reset to easily create the next invite
  const handleNextGuest = () => {
    setGuestName("");
    setGeneratedResult(null);
    const inputEl = document.getElementById("guest-name-input");
    if (inputEl) {
      inputEl.focus();
    }
  };

  // Export all saved names and links to a .txt file (Manual utility: Guest list.txt)
  const exportToTextFile = async (listToExport = history) => {
    if (!listToExport || listToExport.length === 0) {
      alert("सुरक्षित करने हेतु कोई अतिथि नाम उपलब्ध नहीं है।");
      return;
    }

    const header =
      `========================================================================\n` +
      `🌸॥ श्री गणेशाय नमः ॥ 🌸\n` +
      `मोनिका संग रितेश - व्यक्तिगत निमंत्रण अतिथि सूची (Guest list.txt)\n` +
      `शुभ विवाह: 11 दिसम्बर 2026 • जमशेदपुर (झारखण्ड)\n` +
      `कुल निमंत्रित अतिथि: ${listToExport.length}\n` +
      `अंतिम अपडेट: ${new Date().toLocaleString("hi-IN")}\n` +
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
    a.download = "Guest list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
  };

  // Hidden Export Triggers (No auto-downloads, strictly manual keyboard shortcut or console):
  // 1. Press Ctrl + Shift + D (or Cmd + Shift + D)
  // 2. In console: window.downloadGuestListTxt()
  useEffect(() => {
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

  // Format WhatsApp message with highlighted link and "मोनिका संग रितेश"
  const formatWhatsAppMessage = (name, link) => {
    return `🌸॥ श्री गणेशाय नमः ॥ 🌸\n\nसादर सप्रेम अभिवादन ${name.trim()} जी!\nआप सपरिवार सादर आमंत्रित हैं।\n\n✨ मोनिका संग रितेश ✨\nपावन शुभ विवाह निमंत्रण\n🗓️ 11 दिसम्बर 2026 • 📍 जमशेदपुर\n\n═══════════════════════\n🌟 डिजिटल निमंत्रण पत्र खोलें:\n${link}\n═══════════════════════\n\n🙏 सस्नेह निमंत्रित: समस्त पंडित परिवार`;
  };

  // Generate High-Resolution Personalized Royal Card Image
  const generatePersonalizedCardImage = async (name, url) => {
    if (typeof document === "undefined") return null;

    if (document.fonts) {
      try {
        await Promise.all([
          document.fonts.load("600 26px 'Mukta'"),
          document.fonts.load("700 62px 'Mukta'"),
          document.fonts.load("700 48px 'Mukta'"),
          document.fonts.load("500 22px 'Mukta'"),
          document.fonts.ready
        ]);
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

    // 5. Typography & Content (Crisp, High-Legibility, Flawless Devanagari)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Auspicious Shloka - Clean & Balanced
    ctx.fillStyle = "#e6c875";
    ctx.font = "600 26px 'Mukta', sans-serif";
    ctx.fillText("🌸॥ श्री गणेशाय नमः ॥ 🌸", 540, 125);

    // Sacred Om Emblem
    ctx.fillStyle = "#fae092";
    ctx.font = "40px serif";
    ctx.fillText("ॐ", 540, 182);

    // Event Label
    ctx.fillStyle = "#ffd875";
    ctx.font = "700 30px 'Mukta', sans-serif";
    ctx.fillText("पावन शुभ विवाह निमंत्रण", 540, 245);

    // Divider Line
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(320, 285);
    ctx.lineTo(760, 285);
    ctx.stroke();
    drawDiamond(540, 285, 6, "#fae092");

    // Bride Name - Clean, Elegant & Crisp
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = "#fae092";
    ctx.font = "700 62px 'Mukta', sans-serif";
    ctx.fillText("मोनिका", 540, 360);
    ctx.restore();

    // Sang
    ctx.fillStyle = "#f5da81";
    ctx.font = "italic 28px 'Playfair Display', serif";
    ctx.fillText("— संग —", 540, 422);

    // Groom Name - Clean, Elegant & Crisp
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = "#fae092";
    ctx.font = "700 62px 'Mukta', sans-serif";
    ctx.fillText("रितेश", 540, 490);
    ctx.restore();

    // 6. GUEST PLAQUE BOX (Highlighted centerpiece with guest name)
    const boxX = 90;
    const boxY = 565;
    const boxW = 900;
    const boxH = 295;
    const boxR = 26;

    // Box Background
    ctx.save();
    ctx.fillStyle = "rgba(12, 0, 4, 0.85)";
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
    ctx.font = "600 22px 'Mukta', sans-serif";
    ctx.fillText("॥ सादर सप्रेम निमंत्रण ॥", 540, 622);

    // Dynamic Guest Name in Razor-Sharp Mukta Font with Ultra-Crisp Legibility
    const displayName = `${name.trim()} जी`;
    let guestFontSize = 50;
    if (displayName.length > 22) {
      guestFontSize = 36;
    } else if (displayName.length > 16) {
      guestFontSize = 42;
    }

    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetY = 1;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `700 ${guestFontSize}px 'Mukta', sans-serif`;
    ctx.fillText(displayName, 540, 712);
    ctx.restore();

    // Plaque Bottom Subtext
    ctx.fillStyle = "#ffd97d";
    ctx.font = "500 22px 'Mukta', sans-serif";
    ctx.fillText("आप सपरिवार सादर आमंत्रित हैं", 540, 795);

    // 7. Event Date & Venue Details
    ctx.fillStyle = "#fae092";
    ctx.font = "600 26px 'Mukta', sans-serif";
    ctx.fillText("🗓️ 11 दिसम्बर 2026 • 📍 जमशेदपुर (झारखण्ड)", 540, 920);

    ctx.fillStyle = "#e5c158";
    ctx.font = "400 21px 'Mukta', sans-serif";
    ctx.fillText("स्थान: श्री श्री लक्ष्मीनारायण मन्दिर परिसर, केबल टाउन, गोलमुरी", 540, 975);

    // Host Family
    ctx.fillStyle = "#ffd97d";
    ctx.font = "600 24px 'Mukta', sans-serif";
    ctx.fillText("🙏 सस्नेह निमंत्रित: समस्त पंडित परिवार", 540, 1055);

    // Divider
    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(300, 1110);
    ctx.lineTo(780, 1110);
    ctx.stroke();
    drawDiamond(540, 1110, 5, "#fae092");

    // Digital Link Footer with Prominent Highlight Badge
    const finalDisplayUrl = url || "https://opp29.github.io/wedding-invitation/";
    ctx.save();
    ctx.fillStyle = "rgba(212, 175, 55, 0.16)";
    drawRoundedRect(100, 1145, 880, 68, 16);
    ctx.fill();
    ctx.strokeStyle = "rgba(245, 218, 129, 0.75)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 22px 'Mukta', sans-serif";
    ctx.fillText(`👉 डिजिटल निमंत्रण देखें: ${finalDisplayUrl}`, 540, 1179);
    ctx.restore();

    // Output as DataURL, Blob and File
    const dataUrl = canvas.toDataURL("image/png");
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    const safeFileName = `Shubh_Vivah_Nimantran_${name.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, "_")}.png`;
    const file = new File([blob], safeFileName, { type: "image/png" });

    return { dataUrl, blob, file, fileName: safeFileName };
  };

  // Generate Personalized Link & Short Link + Image Card
  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    const trimmed = guestName.trim();
    if (!trimmed) return;

    // Strict Requirement: GitHub Sync Token is mandatory to generate the link
    let token = getStoredGitHubToken();
    if (!token) {
      const userInput = window.prompt(
        "⚠️ GitHub Sync टोकन अनिवार्य है!\n\nनिमंत्रण लिंक बनाने और 'Guest list.txt' को ऑटो-अपडेट करने के लिए अपना GitHub Personal Access Token (PAT) दर्ज करें:\n(यह सुरक्षित रूप से केवल आपके डिवाइस में रहेगा)",
        ""
      );
      if (userInput && userInput.trim()) {
        token = userInput.trim();
        try {
          localStorage.setItem("wedding_gh_pat", token);
        } catch {
          // Ignored
        }
        setHasGitHubToken(true);
        showToast("✓ GitHub टोकन सुरक्षित रूप से सहेजा गया!");
      } else {
        showToast("⚠️ GitHub Sync टोकन के बिना निमंत्रण लिंक नहीं बनाया जा सकता।");
        return; // Abort link generation completely
      }
    }

    // Prevent duplicate re-generation for the same name if already generated
    if (generatedResult && generatedResult.name.trim().toLowerCase() === trimmed.toLowerCase()) {
      return;
    }

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
    if (typeof window !== "undefined") {
      window.lastGeneratedCardDataUrl = newRecord.cardDataUrl;
    }
    setIsGenerating(false);
  };

  // Base64 Unicode helpers to prevent Devanagari Hindi character corruption in GitHub API
  const b64DecodeUnicode = (str) => {
    try {
      return decodeURIComponent(
        atob(str.replace(/\s/g, ""))
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch {
      return atob(str.replace(/\s/g, ""));
    }
  };

  const b64EncodeUnicode = (str) => {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  };

  // Update Guest list.txt directly on GitHub repo via GitHub REST API (supports concurrent multi-user sync)
  const updateGitHubGuestList = async (card, retryCount = 0) => {
    if (!card || !card.name) return false;

    let token = getStoredGitHubToken();
    if (!token) {
      const userInput = window.prompt(
        "GitHub पर 'Guest list.txt' सीधे अपडेट करने हेतु अपना GitHub Personal Access Token दर्ज करें:\n(यह सुरक्षित रूप से केवल आपके ब्राउज़र में रहेगा)",
        ""
      );
      if (userInput && userInput.trim()) {
        token = userInput.trim();
        try {
          localStorage.setItem("wedding_gh_pat", token);
        } catch {
          // Ignored
        }
        setHasGitHubToken(true);
      } else {
        return false;
      }
    }

    try {
      const owner = "OPP29";
      const repo = "wedding-invitation";
      const path = "public/Guest list.txt";
      const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

      // 1. Fetch current file info and SHA
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      let currentSha = "";
      let existingContent = "";

      if (getRes.ok) {
        const fileData = await getRes.json();
        currentSha = fileData.sha;
        if (fileData.content) {
          existingContent = b64DecodeUnicode(fileData.content);
        }
      } else if (getRes.status === 404) {
        existingContent =
          `========================================================================\n` +
          `🌸॥ श्री गणेशाय नमः ॥ 🌸\n` +
          `मोनिका संग रितेश - व्यक्तिगत निमंत्रण अतिथि सूची (Guest List)\n` +
          `शुभ विवाह: 11 दिसम्बर 2026 • जमशेदपुर (झारखण्ड)\n` +
          `========================================================================\n\n` +
          `[अतिथि सूची अभिलेख]\n` +
          `------------------------------------------------------------------------\n`;
      } else {
        const errData = await getRes.json().catch(() => ({}));
        showToast(`⚠️ GitHub टोकन त्रुटि: ${errData.message || getRes.statusText}`);
        return false;
      }

      // Check if duplicate entry already present to keep list clean
      if (existingContent.includes(card.name) && existingContent.includes(card.shortUrl || card.fullUrl)) {
        showToast(`✓ GitHub पर ${card.name} जी पहले से दर्ज हैं।`);
        return true;
      }

      const entryLine = `• [${card.timestamp}] ${card.name} जी | लिंक: ${card.shortUrl || card.fullUrl}`;
      const updatedContent = existingContent.trimEnd() + "\n" + entryLine + "\n";

      // 2. Commit updated content directly to GitHub
      const putRes = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `chore: add ${card.name} to Guest list.txt`,
          content: b64EncodeUnicode(updatedContent),
          sha: currentSha || undefined,
          branch: "main",
        }),
      });

      if (putRes.ok) {
        showToast(`✓ GitHub पर ${card.name} जी का नाम सीधे दर्ज हो गया!`);
        return true;
      } else {
        // Automatic Conflict Retry: If another family member committed at the exact same moment
        if (putRes.status === 409 && retryCount < 3) {
          await new Promise((res) => setTimeout(res, 400 + Math.random() * 300));
          return updateGitHubGuestList(card, retryCount + 1);
        }

        const err = await putRes.json().catch(() => ({}));
        if (putRes.status === 401 || putRes.status === 403) {
          localStorage.removeItem("wedding_gh_pat");
          setHasGitHubToken(false);
          showToast("⚠️ GitHub टोकन अमान्य है। पुनः दर्ज करें।");
        } else {
          showToast(`⚠️ GitHub अपडेट असफल: ${err.message || putRes.statusText}`);
        }
        return false;
      }
    } catch (err) {
      showToast(`⚠️ GitHub नेटवर्क त्रुटि: ${err.message}`);
      return false;
    }
  };

  // Parse Guest list.txt format lines
  const parseGuestListText = (text) => {
    if (!text) return [];
    const parsed = [];
    const lines = text.split("\n");
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Pattern: • [21 नव॰ 2026, 2:42 pm] Prakash जी | लिंक: https://spoo.me/dJluSh
      const matchBullet = line.match(/^•?\s*\[(.*?)\]\s*(.*?)(?:\s*जी)?\s*\|\s*लिंक:\s*(https?:\/\/[^\s]+)/);
      if (matchBullet) {
        const timestamp = matchBullet[1].trim();
        const name = matchBullet[2].trim().replace(/\s*जी$/, "");
        const link = matchBullet[3].trim();
        parsed.push({
          id: `gh-${link}-${name}`,
          name,
          shortUrl: link,
          fullUrl: link,
          message: formatWhatsAppMessage(name, link),
          timestamp,
        });
      }
    }
    return parsed;
  };

  // Fetch & merge Guest list.txt from GitHub / local fallback
  const fetchAndMergeGitHubList = async (token = getStoredGitHubToken(), notify = false) => {
    setIsSyncingGitHub(true);
    let remoteContent = "";

    // 1. Try GitHub REST API if token is present
    if (token) {
      try {
        const owner = "OPP29";
        const repo = "wedding-invitation";
        const path = "public/Guest list.txt";
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.content) {
            remoteContent = b64DecodeUnicode(data.content);
          }
        }
      } catch {
        // Fall back to static file
      }
    }

    // 2. If API was unavailable or returned nothing, fallback to static public Guest list.txt
    if (!remoteContent) {
      try {
        const baseUrl = getBaseWeddingUrl();
        const staticRes = await fetch(`${baseUrl}Guest%20list.txt?t=${Date.now()}`);
        if (staticRes.ok) {
          remoteContent = await staticRes.text();
        }
      } catch {
        // Ignored
      }
    }

    if (remoteContent) {
      const parsedItems = parseGuestListText(remoteContent);
      if (parsedItems.length > 0) {
        setHistory((prevHistory) => {
          const combinedMap = new Map();

          // Remote items first
          for (const item of parsedItems) {
            const key = (item.shortUrl || item.fullUrl || item.name).trim().toLowerCase();
            combinedMap.set(key, item);
          }

          // Local items take precedence
          for (const item of prevHistory) {
            const key = (item.shortUrl || item.fullUrl || item.name).trim().toLowerCase();
            const existing = combinedMap.get(key);
            combinedMap.set(key, { ...existing, ...item });
          }

          const merged = Array.from(combinedMap.values());
          try {
            localStorage.setItem("monika_ritesh_generated_invites", JSON.stringify(merged));
          } catch {
            // Ignored
          }
          return merged;
        });
        if (notify) {
          showToast(`✓ GitHub से ${parsedItems.length} अतिथि सिंक हो गए!`);
        }
      }
    }
    setIsSyncingGitHub(false);
  };

  // Automatically sync saved guest list when GitHub Sync is active
  useEffect(() => {
    if (hasGitHubToken) {
      const timer = setTimeout(() => {
        fetchAndMergeGitHubList();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [hasGitHubToken]);

  // One-click copy helper
  const handleCopyLink = async (item) => {
    const link = item.shortUrl || item.fullUrl;
    if (!link) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopiedId(item.id || link);
      setTimeout(() => setCopiedId(null), 2500);
      showToast(`✓ ${item.name} जी का लिंक कॉपी हो गया!`);
    } catch {
      showToast("⚠️ लिंक कॉपी करने में असमर्थ।");
    }
  };

  // Delete invite from local saved history
  const handleDeleteInvite = (item) => {
    const confirmDelete = window.confirm(
      `क्या आप '${item.name} जी' का निमंत्रण इस सूची से हटाना चाहते हैं?`
    );
    if (!confirmDelete) return;

    setHistory((prev) => {
      const updated = prev.filter(
        (i) =>
          i.id !== item.id &&
          (i.shortUrl || i.fullUrl) !== (item.shortUrl || item.fullUrl)
      );
      try {
        localStorage.setItem("monika_ritesh_generated_invites", JSON.stringify(updated));
      } catch {
        // Ignored
      }
      return updated;
    });
    showToast(`✓ ${item.name} जी का निमंत्रण हटा दिया गया।`);
  };

  // Configure / Change GitHub Token
  const handleConfigureGitHubToken = () => {
    const current = getStoredGitHubToken();
    const promptMsg = current
      ? "GitHub Token वर्तमान में सेट है। बदलने हेतु नया टोकन दर्ज करें, या हटाने हेतु खाली छोड़ें:"
      : "GitHub पर Guest list.txt सीधे ऑटो-अपडेट करने के लिए अपना GitHub Personal Access Token दर्ज करें:\n(यह सुरक्षित रूप से केवल आपके ब्राउज़र के localStorage में रहेगा)";
    const res = window.prompt(promptMsg, current);
    if (res !== null) {
      const trimmed = res.trim();
      if (trimmed) {
        try {
          localStorage.setItem("wedding_gh_pat", trimmed);
        } catch {
          // Ignored
        }
        setHasGitHubToken(true);
        showToast("✓ GitHub टोकन सफलतापूर्वक सहेजा गया!");
        fetchAndMergeGitHubList(trimmed, true);
      } else {
        try {
          localStorage.removeItem("wedding_gh_pat");
        } catch {
          // Ignored
        }
        setHasGitHubToken(false);
        showToast("GitHub टोकन हटा दिया गया।");
      }
    }
  };

  // Share to WhatsApp with Link Preview & Direct GitHub Sync
  const handleShareWhatsApp = async (card) => {
    if (!card) return;

    // Immediately trigger GitHub update directly
    updateGitHubGuestList(card);

    // Open WhatsApp directly with text message containing the link.
    // Without an attached file, WhatsApp automatically renders the interactive Rich Link Preview card!
    const messageText = card.message || formatWhatsAppMessage(card.name, card.shortUrl || card.fullUrl);
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank");
  };

  // Filter saved invites based on search query
  const filteredInvites = history.filter((inv) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const nameMatch = (inv.name || "").toLowerCase().includes(q);
    const linkMatch = (inv.shortUrl || inv.fullUrl || "").toLowerCase().includes(q);
    return nameMatch || linkMatch;
  });

  return (
    <div className="min-h-screen bg-[#200007] text-[#fbf6ee] font-mukta p-4 sm:p-8 flex flex-col items-center">
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

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleConfigureGitHubToken}
            title="GitHub Sync Token (Guest list.txt)"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
              hasGitHubToken
                ? "bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-400/50 text-emerald-300"
                : "bg-amber-500/20 hover:bg-amber-500/30 border-amber-400/60 text-amber-300 animate-pulse"
            }`}
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>{hasGitHubToken ? "GitHub Sync: सक्रिय ✓" : "GitHub Sync टोकन दर्ज करें ⚠️"}</span>
          </button>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-amber-300/80 font-medium hidden sm:inline">स्वतंत्र निमंत्रण केंद्र</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Main Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-4xl font-extrabold gold-gradient-text font-hindi-title">
            व्यक्तिगत निमंत्रण लिंक निर्माता
          </h1>
          <p className="text-xs sm:text-sm text-amber-200/80 max-w-xl mx-auto">
            विशिष्ट सगे-संबंधियों व मित्रों के नाम से विशेष लिंक तैयार करें, सीधे WhatsApp पर भेजें
          </p>
        </div>

        {/* Generator Card */}
        <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#2a010c] to-[#1c0007] border-2 border-amber-400/70 shadow-2xl space-y-5">
          {/* GitHub Sync Status Warning Banner if not configured */}
          {!hasGitHubToken && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-200">
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>लिंक बनाने और Guest list.txt सिंक करने हेतु GitHub टोकन अनिवार्य है।</span>
              </div>
              <button
                type="button"
                onClick={handleConfigureGitHubToken}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex-shrink-0 transition-colors cursor-pointer"
              >
                टोकन दर्ज करें
              </button>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label htmlFor="guest-name-input" className="block text-xs sm:text-sm font-semibold text-amber-300 mb-2">
                अतिथि / परिवार का नाम (Enter Inviter / Guest Name) *
              </label>
              <div className="relative">
                <input
                  id="guest-name-input"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="उदा. शर्मा परिवार, आदरणीय चाचा जी, राजेश भैया, अमित जी..."
                  className="w-full px-4 py-3.5 pr-10 rounded-2xl bg-black/50 border-2 border-amber-500/40 text-amber-100 placeholder-amber-400/40 text-sm sm:text-base focus:outline-none focus:border-amber-400 shadow-inner"
                />
                {guestName && (
                  <button
                    type="button"
                    onClick={() => {
                      setGuestName("");
                      const inputEl = document.getElementById("guest-name-input");
                      if (inputEl) inputEl.focus();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 flex items-center justify-center transition-colors cursor-pointer"
                    title="नाम साफ़ करें"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Generate Button: Disabled once generated for current name, re-enables on edit */}
            <button
              type="submit"
              disabled={isGenerating || !guestName.trim() || isAlreadyGenerated}
              className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-sm sm:text-base select-none transition-all ${
                isAlreadyGenerated
                  ? "bg-emerald-950/70 border-2 border-emerald-500/60 text-emerald-300 cursor-not-allowed opacity-90 shadow-none"
                  : isGenerating
                  ? "bg-amber-600 text-stone-950 opacity-75 cursor-wait"
                  : !hasGitHubToken
                  ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                  : "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
              }`}
            >
              {isAlreadyGenerated ? (
                <>
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>लिंक तैयार है (नीचे WhatsApp पर भेजें)</span>
                </>
              ) : isGenerating ? (
                <>
                  <Sparkles className="w-5 h-5 text-stone-950 animate-spin flex-shrink-0" />
                  <span>कार्ड व लिंक तैयार हो रहा है...</span>
                </>
              ) : !hasGitHubToken ? (
                <>
                  <Key className="w-5 h-5 text-stone-950 flex-shrink-0" />
                  <span>🔑 GitHub टोकन दर्ज करें व लिंक बनाएं</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-stone-950 animate-pulse flex-shrink-0" />
                  <span>लिंक बनाएं (Generate Link)</span>
                </>
              )}
            </button>
          </form>

          {/* Generated Result Display: ONLY निमंत्रण तैयार है!, Date, WhatsApp share button, and Next Guest action */}
          {generatedResult && (
            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-amber-950/60 border border-amber-400/60 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-emerald-300">
                    {generatedResult.name} जी का निमंत्रण तैयार है!
                  </span>
                </div>
                <span className="text-xs text-amber-300/70 font-mono flex-shrink-0">
                  {generatedResult.timestamp}
                </span>
              </div>

              {/* Primary Action: WhatsApp Share with Link Preview */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(generatedResult)}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>WhatsApp पर भेजें (Link Preview)</span>
                </button>
              </div>

              {/* Optional: Download Personalized Card PNG */}
              {generatedResult.cardDataUrl && (
                <div className="flex items-center justify-center pt-0.5">
                  <a
                    href={generatedResult.cardDataUrl}
                    download={generatedResult.cardFileName || "Shubh_Vivah_Nimantran.png"}
                    className="inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>व्यक्तिगत कार्ड इमेज डाउनलोड करें (.PNG)</span>
                  </a>
                </div>
              )}

              {/* Quick Reset / Next Guest Action */}
              <div className="flex items-center justify-center pt-1 border-t border-amber-500/20">
                <button
                  type="button"
                  onClick={handleNextGuest}
                  className="inline-flex items-center gap-1.5 py-1 px-3 text-xs sm:text-sm text-amber-300/80 hover:text-amber-200 font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>अगला नया निमंत्रण बनाएं (Next Guest)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Saved Guest Invites History Section (STRICT REQUIREMENT: Only visible if GitHub Sync is ON) */}
        {hasGitHubToken ? (
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-b from-[#2a010c] to-[#1c0007] border-2 border-amber-400/70 shadow-2xl space-y-5 animate-fadeIn">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-amber-500/30 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-amber-200 font-hindi-title">
                    📋 पूर्व निर्मित निमंत्रण लिंक सूची
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                    {filteredInvites.length} {filteredInvites.length === history.length ? "अतिथि" : `(कुल ${history.length})`}
                  </span>
                </div>
                <p className="text-xs text-amber-300/70 mt-1">
                  सभी सहेजे गए निमंत्रण लिंक यहां उपलब्ध हैं। किसी भी समय पुनः WhatsApp पर भेजें या कॉपी करें।
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => fetchAndMergeGitHubList(undefined, true)}
                  disabled={isSyncingGitHub}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                  title="GitHub से नवीनतम सूची सिंक करें"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGitHub ? "animate-spin text-amber-400" : ""}`} />
                  <span>{isSyncingGitHub ? "सिंक हो रहा है..." : "रीफ्रेश"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => exportToTextFile(history)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
                  title="संपूर्ण अतिथि सूची .txt फ़ाइल के रूप में डाउनलोड करें"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>सूची डाउनलोड (.txt)</span>
                </button>
              </div>
            </div>

            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 अतिथि का नाम या लिंक खोजें..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 placeholder-amber-400/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors cursor-pointer"
                  title="खोज साफ़ करें"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Cards List */}
            {filteredInvites.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-black/30 border border-amber-500/20 text-amber-300/70 text-xs sm:text-sm">
                {history.length === 0
                  ? "अभी तक कोई निमंत्रण लिंक नहीं बना है। ऊपर नाम लिखकर 'Generate Link' पर क्लिक करें।"
                  : `'${searchQuery}' से मेल खाता कोई अतिथि नहीं मिला।`}
              </div>
            ) : (
              <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
                {filteredInvites.map((inv) => {
                  const itemKey = inv.id || `${inv.name}-${inv.shortUrl || inv.fullUrl}`;
                  const isCopied = copiedId === (inv.id || inv.shortUrl || inv.fullUrl);
                  return (
                    <div
                      key={itemKey}
                      className="p-3.5 sm:p-4 rounded-2xl bg-black/40 hover:bg-black/60 border border-amber-500/30 hover:border-amber-400/60 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-amber-200 text-sm sm:text-base truncate">
                            {inv.name} जी
                          </span>
                          {inv.timestamp && (
                            <span className="text-[11px] text-amber-400/60 font-mono">
                              • {inv.timestamp}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-amber-300/80 truncate">
                          <a
                            href={inv.shortUrl || inv.fullUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-amber-200 hover:underline flex items-center gap-1 truncate font-mono text-[11px] sm:text-xs"
                          >
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{inv.shortUrl || inv.fullUrl}</span>
                          </a>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-wrap flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-500/20">
                        <button
                          type="button"
                          onClick={() => handleShareWhatsApp(inv)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition-colors cursor-pointer"
                          title="WhatsApp पर पुनः भेजें"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopyLink(inv)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-semibold text-xs transition-colors cursor-pointer"
                          title="लिंक कॉपी करें"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">कॉपी हुआ</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>कॉपी</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteInvite(inv)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 hover:text-red-200 transition-colors cursor-pointer"
                          title="सूची से हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-black/30 border border-amber-500/20 text-center space-y-2">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-amber-200/80 font-medium">
              🔒 पूर्व निर्मित निमंत्रण लिंक सूची केवल GitHub Sync सक्रिय होने पर दिखाई देगी।
            </p>
            <button
              type="button"
              onClick={handleConfigureGitHubToken}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Key className="w-3.5 h-3.5" />
              <span>GitHub Sync टोकन दर्ज करें</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
