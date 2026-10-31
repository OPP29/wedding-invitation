// Royal Wedding Digital E-Card Image Generator & WhatsApp Native Sharer
// Generates a high-definition (1200x1800) royal invitation card image in phone gallery / WhatsApp status

function renderCardCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1800;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Royal Maroon Velvet Background Gradient
  const bgGrad = ctx.createRadialGradient(600, 400, 100, 600, 900, 1000);
  bgGrad.addColorStop(0, "#3d0210");
  bgGrad.addColorStop(0.5, "#250009");
  bgGrad.addColorStop(1, "#140004");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 1800);

  // Subtle golden micro-dot pattern
  ctx.fillStyle = "rgba(212, 175, 55, 0.08)";
  for (let x = 40; x < 1200; x += 40) {
    for (let y = 40; y < 1800; y += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. Ornate Double Golden Border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 5;
  ctx.strokeRect(40, 40, 1120, 1720);

  ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(55, 55, 1090, 1690);

  // Corner ornaments
  const drawCorner = (x, y, flipX, flipY) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);
    ctx.strokeStyle = "#dfb045";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 45);
    ctx.lineTo(0, 0);
    ctx.lineTo(45, 0);
    ctx.stroke();

    ctx.fillStyle = "#dfb045";
    ctx.beginPath();
    ctx.arc(15, 15, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCorner(65, 65, false, false);
  drawCorner(1135, 65, true, false);
  drawCorner(65, 1735, false, true);
  drawCorner(1135, 1735, true, true);

  // Helper for text alignment
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 3. Om & Ganesh Header
  ctx.fillStyle = "#dfb045";
  ctx.font = "bold 44px serif";
  ctx.fillText("ॐ", 600, 140);

  ctx.font = "bold 34px serif";
  ctx.fillStyle = "#f5d77f";
  ctx.fillText("॥ श्री गणेशाय नमः ॥", 600, 205);

  ctx.font = "italic 24px serif";
  ctx.fillStyle = "rgba(255, 248, 220, 0.85)";
  ctx.fillText("वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।", 600, 260);
  ctx.fillText("निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥", 600, 300);

  // Divider 1
  ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(350, 345);
  ctx.lineTo(850, 345);
  ctx.stroke();

  // 4. Main Invitation Banner
  ctx.font = "bold 38px serif";
  ctx.fillStyle = "#fdf3c7";
  ctx.fillText("॥ पावन शुभ विवाह निमंत्रण ॥", 600, 400);

  ctx.font = "24px serif";
  ctx.fillStyle = "#f3e8c9";
  ctx.fillText("परमपिता परमात्मा की असीम अनुकम्पा से हमारे परिवार में", 600, 465);
  ctx.fillText("पावन वैवाहिक गठबंधन तय हुआ है:", 600, 505);

  // 5. Bride Details
  ctx.font = "bold 26px serif";
  ctx.fillStyle = "#dfb045";
  ctx.fillText("॥ सौ. कां. (वधू) ॥", 600, 580);

  ctx.font = "bold 64px serif";
  ctx.fillStyle = "#fff8dc";
  ctx.fillText("Monika Pandit", 600, 655);

  ctx.font = "bold 32px serif";
  ctx.fillStyle = "#f5d77f";
  ctx.fillText("(प्यार से: दिव्या)", 600, 720);

  ctx.font = "24px serif";
  ctx.fillStyle = "#e6d6b8";
  ctx.fillText("सुपुत्री: श्रीमती रेखा पंडित एवं श्री शम्भू पंडित", 600, 770);
  ctx.fillText("भ्रातागण: Om Prakash Pandit (बड़ा भाई), Amandeep Pandit (छोटा भाई)", 600, 810);
  ctx.fillText("भगिनी: Dipika Pandit (छोटी बहन)", 600, 845);

  // Sacred Union Knot Symbol
  ctx.fillStyle = "#dfb045";
  ctx.font = "bold 36px serif";
  ctx.fillText("⚜  संग (Wed)  ⚜", 600, 915);

  // 6. Groom Details
  ctx.font = "bold 26px serif";
  ctx.fillStyle = "#dfb045";
  ctx.fillText("॥ चि. (वर) ॥", 600, 985);

  ctx.font = "bold 64px serif";
  ctx.fillStyle = "#fff8dc";
  ctx.fillText("Ritesh Ku. Pandit", 600, 1060);

  ctx.font = "bold 32px serif";
  ctx.fillStyle = "#f5d77f";
  ctx.fillText("(प्यार से: चिंटू)", 600, 1125);

  ctx.font = "24px serif";
  ctx.fillStyle = "#e6d6b8";
  ctx.fillText("सुपुत्र: श्रीमती सुनैना देवी एवं श्री प्रदीप कु. पंडित", 600, 1175);
  ctx.fillText("भगिनी: Supriya Devi (बड़ी बहन) • भ्राता: Ritik Kumar (छोटा भाई)", 600, 1215);

  // Divider 2
  ctx.strokeStyle = "rgba(212, 175, 55, 0.5)";
  ctx.beginPath();
  ctx.moveTo(350, 1265);
  ctx.lineTo(850, 1265);
  ctx.stroke();

  // 7. Date & Muhurat
  ctx.font = "bold 34px serif";
  ctx.fillStyle = "#dfb045";
  ctx.fillText("शुभ विवाह तिथि एवं लग्न", 600, 1315);

  ctx.font = "bold 38px serif";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("शुक्रवार, 11 दिसम्बर 2026", 600, 1375);

  ctx.font = "bold 28px serif";
  ctx.fillStyle = "#f5d77f";
  ctx.fillText("शुभ लग्न मुहूर्त: रात्रि 9:00 बजे के बाद", 600, 1430);

  // 8. Venue & City
  ctx.font = "26px serif";
  ctx.fillStyle = "#f3e8c9";
  ctx.fillText("स्थल: Royal Heritage Palace & Banquets, Bistupur", 600, 1495);

  ctx.font = "bold 32px serif";
  ctx.fillStyle = "#dfb045";
  ctx.fillText("टाटानगर (जमशेदपुर), झारखण्ड - 831001", 600, 1545);

  // 9. Lineage & Auspicious Closing
  ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
  ctx.beginPath();
  ctx.moveTo(250, 1595);
  ctx.lineTo(950, 1595);
  ctx.stroke();

  ctx.font = "italic 23px serif";
  ctx.fillStyle = "#f5d77f";
  ctx.fillText("मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः। मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥", 600, 1640);

  ctx.font = "bold 28px serif";
  ctx.fillStyle = "#fff8dc";
  ctx.fillText("दर्शनाभिलाषी: समस्त पंडित परिवार", 600, 1695);

  return canvas;
}

export function downloadWeddingCard() {
  const canvas = renderCardCanvas();
  if (!canvas) return;

  const link = document.createElement("a");
  link.download = "Monika-weds-Ritesh-Wedding-Invitation.png";
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 1-Tap WhatsApp Share: Shares Royal Card Image directly via Web Share API on mobile,
// with graceful fallback to WhatsApp Web / App
export async function shareWeddingCardOnWhatsApp(compactCaption) {
  const canvas = renderCardCanvas();
  if (!canvas) return;

  // Check if browser supports sharing image files directly to WhatsApp
  if (navigator.share && navigator.canShare) {
    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (blob) {
        const file = new File([blob], "Monika-Ritesh-Wedding-Invitation.png", { type: "image/png" });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "॥ शुभ विवाह ॥ मोनिका संग रितेश",
            text: compactCaption,
          });
          return;
        }
      }
    } catch (err) {
      // User cancelled share or browser fallback
      if (err.name === "AbortError") return;
      console.log("Web Share error, falling back to URL scheme:", err);
    }
  }

  // Fallback for browsers without direct file sharing: download card and open WhatsApp
  downloadWeddingCard();
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(compactCaption)}`, "_blank");
}
