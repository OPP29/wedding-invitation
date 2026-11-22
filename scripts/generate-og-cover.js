import http from "http";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const htmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <style>
    @font-face {
      font-family: 'Mukta';
      font-weight: 800;
      src: url('/Mukta-800.ttf') format('truetype');
    }
    @font-face {
      font-family: 'Mukta';
      font-weight: 700;
      src: url('/Mukta-700.ttf') format('truetype');
    }
    body { margin: 0; background: #111; display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Mukta', sans-serif; }
    canvas { width: 1200px; height: 630px; }
    .font-loader { position: absolute; left: -9999px; top: -9999px; visibility: hidden; }
    .f-800 { font-family: 'Mukta'; font-weight: 800; }
    .f-700 { font-family: 'Mukta'; font-weight: 700; }
  </style>
</head>
<body>
  <div class="font-loader f-800">मोनिका रितेश श्री गणेशाय नमः पावन शुभ विवाह निमंत्रण</div>
  <div class="font-loader f-700">संग WEDS शुक्रवार दिसम्बर 2026 जमशेदपुर पंडित परिवार</div>
  <canvas id="c" width="1200" height="630"></canvas>
  <script>
    async function renderAndExport() {
      if (document.fonts) {
        await document.fonts.load("800 70px 'Mukta'");
        await document.fonts.load("700 25px 'Mukta'");
        await document.fonts.ready;
      }

      // Small extra pause for font glyph rendering
      await new Promise(r => setTimeout(r, 600));

      const canvas = document.getElementById('c');
      const ctx = canvas.getContext('2d');

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

      // 1. Royal Deep Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 630);
      bgGrad.addColorStop(0, "#1c0006");
      bgGrad.addColorStop(0.35, "#3b0212");
      bgGrad.addColorStop(0.7, "#28010a");
      bgGrad.addColorStop(1, "#120004");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 630);

      // 2. Ambient Gold Radial Glow behind names
      const glow = ctx.createRadialGradient(600, 260, 20, 600, 260, 500);
      glow.addColorStop(0, "rgba(212, 175, 55, 0.28)");
      glow.addColorStop(0.45, "rgba(212, 175, 55, 0.08)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1200, 630);

      // 3. Decorative Concentric Circles
      ctx.save();
      ctx.strokeStyle = "rgba(212, 175, 55, 0.14)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(600, 260, 200, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(600, 260, 250, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. Double Royal Gold Borders
      ctx.strokeStyle = "rgba(212, 175, 55, 0.8)";
      ctx.lineWidth = 3;
      ctx.strokeRect(22, 22, 1156, 586);

      ctx.strokeStyle = "rgba(245, 218, 129, 0.9)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(34, 34, 1132, 562);

      // Corner Diamonds & Brackets
      drawDiamond(34, 34, 11, "#fae092");
      drawDiamond(1166, 34, 11, "#fae092");
      drawDiamond(34, 596, 11, "#fae092");
      drawDiamond(1166, 596, 11, "#fae092");

      ctx.strokeStyle = "#ffd875";
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(62, 34); ctx.lineTo(34, 34); ctx.lineTo(34, 62); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(1138, 34); ctx.lineTo(1166, 34); ctx.lineTo(1166, 62); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(62, 596); ctx.lineTo(34, 596); ctx.lineTo(34, 568); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(1138, 596); ctx.lineTo(1166, 596); ctx.lineTo(1166, 568); ctx.stroke();

      // 5. Typography Alignment
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Auspicious Shloka
      ctx.fillStyle = "#fae092";
      ctx.font = "700 25px 'Mukta', sans-serif";
      ctx.fillText("🌸॥ श्री गणेशाय नमः ॥ 🌸", 600, 74);

      // Sacred Om
      ctx.fillStyle = "#fae092";
      ctx.font = "32px serif";
      ctx.fillText("ॐ", 600, 114);

      // Ribbon Badge
      ctx.save();
      ctx.fillStyle = "rgba(212, 175, 55, 0.16)";
      drawRoundedRect(420, 138, 360, 38, 19);
      ctx.fill();
      ctx.strokeStyle = "rgba(245, 218, 129, 0.85)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#ffd875";
      ctx.font = "700 21px 'Mukta', sans-serif";
      ctx.fillText("॥ पावन शुभ विवाह निमंत्रण ॥", 600, 157);
      ctx.restore();

      // 6. Bride & Groom Centerpiece
      // Gold gradient for couple names
      const goldGrad = ctx.createLinearGradient(0, 200, 0, 280);
      goldGrad.addColorStop(0, "#fae092");
      goldGrad.addColorStop(0.5, "#ffd875");
      goldGrad.addColorStop(1, "#dfb045");

      // Bride
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = goldGrad;
      ctx.font = "800 70px 'Mukta', sans-serif";
      ctx.fillText("मोनिका", 330, 246);
      ctx.restore();

      ctx.fillStyle = "#ecc874";
      ctx.font = "600 19px 'Mukta', sans-serif";
      ctx.fillText("Monika Pandit (सौ. कां. दिव्या)", 330, 294);

      // Sang & Weds
      ctx.fillStyle = "#ffd875";
      ctx.font = "italic 30px 'Playfair Display', serif";
      ctx.fillText("— संग —", 600, 246);

      ctx.fillStyle = "rgba(245, 218, 129, 0.85)";
      ctx.font = "700 15px 'Cinzel', serif";
      ctx.fillText("WEDS", 600, 280);

      // Groom
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = goldGrad;
      ctx.font = "800 70px 'Mukta', sans-serif";
      ctx.fillText("रितेश", 870, 246);
      ctx.restore();

      ctx.fillStyle = "#ecc874";
      ctx.font = "600 19px 'Mukta', sans-serif";
      ctx.fillText("Ritesh Kumar (चि. चिंटू)", 870, 294);

      // 7. Date & Venue Plaque Box
      ctx.save();
      ctx.fillStyle = "rgba(10, 0, 3, 0.85)";
      drawRoundedRect(90, 332, 1020, 100, 20);
      ctx.fill();
      ctx.strokeStyle = "rgba(212, 175, 55, 0.9)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.strokeStyle = "rgba(245, 218, 129, 0.45)";
      ctx.lineWidth = 1;
      drawRoundedRect(98, 340, 1004, 84, 14);
      ctx.stroke();

      ctx.fillStyle = "#fae092";
      ctx.font = "700 24px 'Mukta', sans-serif";
      ctx.fillText("🗓️ शुक्रवार, 11 दिसम्बर 2026 • लग्न मुहूर्त: रात्रि 9:00 बजे से", 600, 368);

      ctx.fillStyle = "#ffd97d";
      ctx.font = "500 20px 'Mukta', sans-serif";
      ctx.fillText("📍 स्थान: सिदगोड़ा बारा फ्लैट क्लब हाउस, नियर SDSM स्कूल, जमशेदपुर (झारखण्ड)", 600, 404);
      ctx.restore();

      // 8. Family Blessing
      ctx.fillStyle = "#f7e7b4";
      ctx.font = "700 22px 'Mukta', sans-serif";
      ctx.fillText("🙏 सस्नेह निमंत्रित: समस्त पंडित परिवार (वधू पक्ष)", 600, 468);

      // 9. Digital Invitation CTA Ribbon
      ctx.save();
      const ctaGrad = ctx.createLinearGradient(310, 0, 890, 0);
      ctaGrad.addColorStop(0, "#b38328");
      ctaGrad.addColorStop(0.5, "#fae092");
      ctaGrad.addColorStop(1, "#b38328");
      ctx.fillStyle = ctaGrad;
      drawRoundedRect(300, 506, 600, 52, 26);
      ctx.fill();
      ctx.strokeStyle = "#fae092";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#1a0208";
      ctx.font = "800 21px 'Mukta', sans-serif";
      ctx.fillText("✨ डिजिटल निमंत्रण पत्र देखें (Click to Open Invitation) ✨", 600, 532);
      ctx.restore();

      // Export as Data URL
      const jpegData = canvas.toDataURL("image/jpeg", 0.93);
      const pngData = canvas.toDataURL("image/png");

      await fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jpegData, pngData }),
      });
    }

    window.addEventListener("load", () => {
      setTimeout(renderAndExport, 1400);
    });
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/Mukta-800.ttf") {
      const fontPath = path.join(__dirname, "Mukta-800.ttf");
      res.writeHead(200, { "Content-Type": "font/ttf" });
      res.end(fs.readFileSync(fontPath));
      return;
    }
    if (req.url === "/Mukta-700.ttf") {
      const fontPath = path.join(__dirname, "Mukta-700.ttf");
      res.writeHead(200, { "Content-Type": "font/ttf" });
      res.end(fs.readFileSync(fontPath));
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(htmlContent);
  } else if (req.method === "POST" && req.url === "/save") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const { jpegData, pngData } = JSON.parse(body);

        if (jpegData) {
          const base64Jpeg = jpegData.replace(/^data:image\/jpeg;base64,/, "");
          const jpegPath = path.join(publicDir, "og-cover.jpg");
          fs.writeFileSync(jpegPath, Buffer.from(base64Jpeg, "base64"));
          console.log("✓ Saved public/og-cover.jpg successfully! Size:", fs.statSync(jpegPath).size, "bytes");
        }

        if (pngData) {
          const base64Png = pngData.replace(/^data:image\/png;base64,/, "");
          const pngPath = path.join(publicDir, "og-cover.png");
          fs.writeFileSync(pngPath, Buffer.from(base64Png, "base64"));
          console.log("✓ Saved public/og-cover.png successfully! Size:", fs.statSync(pngPath).size, "bytes");
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok" }));

        setTimeout(() => {
          console.log("Done! Closing server.");
          server.close();
          process.exit(0);
        }, 500);
      } catch (err) {
        console.error("Error saving image:", err);
        res.writeHead(500);
        res.end(err.message);
      }
    });
  }
});

const PORT = 3777;
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  // Launch Edge or Chrome to trigger canvas rendering and save
  const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const cmd = `"${edgePath}" --headless=new http://localhost:${PORT}`;
  exec(cmd, (err) => {
    if (err) {
      console.log("Browser command exited:", err.message);
    }
  });
});
