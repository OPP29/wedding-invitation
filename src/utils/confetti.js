import confetti from "canvas-confetti";

// Rich traditional festive color palette: Rose Crimson, Gulabi Pink, Auspicious Marigold, Saffron, and Royal Gold
const royalPetalColors = [
  "#D4AF37", // Royal Gold
  "#FFD700", // Bright Gold
  "#FFF2A8", // Light Shimmer Gold
  "#DC2626", // Deep Rose Crimson
  "#990024", // Royal Velvet Maroon
  "#FF6B8B", // Auspicious Pink Rose
  "#F59E0B", // Bright Marigold (गेंदा)
  "#D97706", // Dark Marigold
  "#FF7A00", // Festive Saffron
  "#FDA4AF", // Soft Rose Petal
];

export function triggerCelebration() {
  const count = 240;
  const defaults = {
    origin: { y: 0.7 },
    colors: royalPetalColors,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 35, startVelocity: 65 });
  fire(0.2, { spread: 70 });
  fire(0.35, { spread: 120, decay: 0.91, scalar: 1.1 });
  fire(0.1, { spread: 140, startVelocity: 35, decay: 0.92, scalar: 1.3 });
  fire(0.1, { spread: 140, startVelocity: 55 });
}

// Delicate mini-bloom of 12 petals at touch point
export function triggerTouchPetals(clientX, clientY) {
  if (typeof window === "undefined") return;

  const x = clientX ? clientX / window.innerWidth : 0.5;
  const y = clientY ? clientY / window.innerHeight : 0.5;

  // Delicate mini-bloom of exactly 12 petals
  confetti({
    particleCount: 12,
    startVelocity: 16,
    spread: 110,
    ticks: 45,
    origin: { x, y },
    colors: royalPetalColors,
    shapes: ["circle"],
    scalar: 0.9,
    gravity: 0.75,
    disableForReducedMotion: true,
  });
}
