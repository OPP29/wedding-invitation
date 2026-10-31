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
