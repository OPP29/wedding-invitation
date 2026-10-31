import confetti from "canvas-confetti";

export function triggerCelebration() {
  const count = 220;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#D4AF37", "#FFD700", "#990024", "#DC2626", "#F59E0B", "#FFF5CC"],
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, { spread: 30, startVelocity: 60 });
  fire(0.2, { spread: 65 });
  fire(0.35, { spread: 110, decay: 0.91, scalar: 0.9 });
  fire(0.1, { spread: 130, startVelocity: 30, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 130, startVelocity: 50 });
}

// Lightweight fingertip touch petals burst
export function triggerTouchPetals(clientX, clientY) {
  if (typeof window === "undefined" || !clientX || !clientY) return;

  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  confetti({
    particleCount: 12,
    startVelocity: 14,
    spread: 100,
    ticks: 45,
    origin: { x, y },
    colors: ["#D4AF37", "#FFD700", "#DC2626", "#B91C1C", "#F59E0B", "#FF85A2"],
    shapes: ["circle"],
    scalar: 0.9,
    disableForReducedMotion: true,
  });
}
