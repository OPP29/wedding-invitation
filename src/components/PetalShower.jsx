import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export function triggerCelebration() {
  // Traditional Royal Indian Wedding celebration: Gold foil, Sindoor red, and auspicious Marigold yellow
  const count = 240;
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

export default function PetalShower({ enabled, onToggle }) {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (!enabled) {
      setPetals([]);
      return;
    }

    // Mix of Red Rose and Marigold (Genda) petals
    const newPetals = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 15 + Math.random() * 18,
      duration: 8 + Math.random() * 11,
      delay: Math.random() * 7,
      opacity: 0.45 + Math.random() * 0.45,
      rotation: Math.random() * 360,
      isMarigold: i % 2 === 0,
    }));
    setPetals(newPetals);
  }, [enabled]);

  return (
    <>
      {enabled && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
          {petals.map((p) => (
            <div
              key={p.id}
              className="absolute select-none pointer-events-none"
              style={{
                left: `${p.left}%`,
                top: "-6%",
                opacity: p.opacity,
                animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
                transform: `rotate(${p.rotation}deg)`,
              }}
            >
              {p.isMarigold ? (
                // Auspicious Marigold (गेंदा) Petal
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 2C11 8 5 13 4 20C3 25 8 28 15 28C22 28 27 25 26 20C25 13 19 8 15 2Z"
                    fill="url(#marigoldGradient)"
                  />
                  <defs>
                    <linearGradient id="marigoldGradient" x1="4" y1="2" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FDE047" />
                      <stop offset="0.5" stopColor="#F59E0B" />
                      <stop offset="1" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                // Royal Crimson Rose Petal
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 2C10 7 2 12 2 19C2 24.5 7.5 28 15 28C22.5 28 28 24.5 28 19C28 12 20 7 15 2Z"
                    fill="url(#roseGradient)"
                  />
                  <defs>
                    <linearGradient id="roseGradient" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EF4444" />
                      <stop offset="0.6" stopColor="#991B1B" />
                      <stop offset="1" stopColor="#5B0215" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Royal Petals Toggle */}
      <button
        onClick={onToggle}
        aria-label="Toggle falling flower petals"
        className="fixed bottom-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#38010d]/90 to-[#200007]/90 text-amber-200 border border-amber-500/50 shadow-2xl backdrop-blur-md hover:border-amber-300 transition-all duration-300 text-xs font-serif"
      >
        <span className={`inline-block text-base ${enabled ? "animate-spin" : "opacity-40"}`} style={{ animationDuration: "8s" }}>
          🌸
        </span>
        <span className="hidden sm:inline tracking-wider">
          पुष्प वर्षा (Petals): <strong className={enabled ? "text-amber-400 font-bold" : "text-stone-400 font-normal"}>{enabled ? "चालू" : "बंद"}</strong>
        </span>
      </button>

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(40px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-25px) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
