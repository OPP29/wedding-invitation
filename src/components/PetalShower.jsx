import { useEffect, useState } from "react";

export default function PetalShower() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // 38 rich petals continuously distributed across the entire screen
    const newPetals = Array.from({ length: 38 }).map((_, i) => ({
      id: i,
      left: (i * 2.6 + Math.random() * 3) % 98, // Evenly distributed across 0-100% width
      size: 14 + Math.random() * 20,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * 7,
      opacity: 0.4 + Math.random() * 0.45,
      rotation: Math.random() * 360,
      drift: -30 + Math.random() * 60,
      type: i % 4, // 0: Marigold, 1: Crimson Rose, 2: Pink Rose, 3: Saffron Gold
    }));
    setPetals(newPetals);
  }, []);

  return (
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
          {p.type === 0 && (
            // Auspicious Marigold (गेंदा फूल) Petal
            <svg width={p.size} height={p.size} viewBox="0 0 30 30" fill="none">
              <path
                d="M15 2C11 8 5 13 4 20C3 25 8 28 15 28C22 28 27 25 26 20C25 13 19 8 15 2Z"
                fill="url(#marigoldGrad)"
              />
              <defs>
                <linearGradient id="marigoldGrad" x1="4" y1="2" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE047" />
                  <stop offset="0.5" stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 1 && (
            // Royal Crimson Rose Petal
            <svg width={p.size} height={p.size} viewBox="0 0 30 30" fill="none">
              <path
                d="M15 2C10 7 2 12 2 19C2 24.5 7.5 28 15 28C22.5 28 28 24.5 28 19C28 12 20 7 15 2Z"
                fill="url(#crimsonGrad)"
              />
              <defs>
                <linearGradient id="crimsonGrad" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#EF4444" />
                  <stop offset="0.6" stopColor="#991B1B" />
                  <stop offset="1" stopColor="#4A0210" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 2 && (
            // Soft Gulabi Pink Rose Petal
            <svg width={p.size} height={p.size} viewBox="0 0 30 30" fill="none">
              <path
                d="M15 2C10 7 2 12 2 19C2 24.5 7.5 28 15 28C22.5 28 28 24.5 28 19C28 12 20 7 15 2Z"
                fill="url(#pinkGrad)"
              />
              <defs>
                <linearGradient id="pinkGrad" x1="2" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FBCFE8" />
                  <stop offset="0.6" stopColor="#F472B6" />
                  <stop offset="1" stopColor="#BE185D" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 3 && (
            // Royal Saffron Golden Petal
            <svg width={p.size} height={p.size} viewBox="0 0 30 30" fill="none">
              <path
                d="M15 2C11 8 5 13 4 20C3 25 8 28 15 28C22 28 27 25 26 20C25 13 19 8 15 2Z"
                fill="url(#saffronGrad)"
              />
              <defs>
                <linearGradient id="saffronGrad" x1="4" y1="2" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FEF08A" />
                  <stop offset="0.5" stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#B45309" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      ))}

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(45px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-30px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
