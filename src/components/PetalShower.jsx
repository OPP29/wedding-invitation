import { useEffect, useState } from "react";

export default function PetalShower() {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    // Petals are always active by default - continuous royal rose & marigold shower
    const newPetals = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 15 + Math.random() * 18,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 6,
      opacity: 0.45 + Math.random() * 0.45,
      rotation: Math.random() * 360,
      isMarigold: i % 2 === 0,
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
          {p.isMarigold ? (
            // Auspicious Marigold (गेंदा फूल) Petal
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

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(50vh) translateX(35px) rotate(180deg);
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
