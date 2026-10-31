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

// Grand screen-wide touch petals shower
export function triggerTouchPetals(clientX, clientY) {
  if (typeof window === "undefined") return;

  const x = clientX ? clientX / window.innerWidth : 0.5;
  const y = clientY ? clientY / window.innerHeight : 0.5;

  // 1. High-velocity 360-degree burst from touch location (distributes across the center/local area)
  confetti({
    particleCount: 35,
    startVelocity: 30,
    spread: 360,
    ticks: 65,
    origin: { x, y },
    colors: royalPetalColors,
    shapes: ["circle"],
    scalar: 1.1,
    drift: 0.2,
    gravity: 0.7,
    disableForReducedMotion: true,
  });

  // 2. Wide dispersion from left & right to distribute across the entire screen
  confetti({
    particleCount: 18,
    angle: 60,
    spread: 75,
    startVelocity: 38,
    ticks: 75,
    origin: { x: 0.05, y: Math.max(0.2, Math.min(y, 0.8)) },
    colors: royalPetalColors,
    shapes: ["circle"],
    scalar: 1.15,
    gravity: 0.65,
    disableForReducedMotion: true,
  });

  confetti({
    particleCount: 18,
    angle: 120,
    spread: 75,
    startVelocity: 38,
    ticks: 75,
    origin: { x: 0.95, y: Math.max(0.2, Math.min(y, 0.8)) },
    colors: royalPetalColors,
    shapes: ["circle"],
    scalar: 1.15,
    gravity: 0.65,
    disableForReducedMotion: true,
  });
}
