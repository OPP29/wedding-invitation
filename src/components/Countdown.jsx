import { useState, useEffect } from "react";
import { Clock, Heart } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    const target = new Date(weddingData.weddingDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isComplete: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "दिन (Days)", value: timeLeft.days },
    { label: "घंटे (Hours)", value: timeLeft.hours },
    { label: "मिनट (Minutes)", value: timeLeft.minutes },
    { label: "सेकंड (Seconds)", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-20 px-4 bg-royal-emerald relative overflow-hidden border-y-2 border-amber-500/30">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-xs font-serif font-bold uppercase tracking-widest mb-4">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>शुभ विवाह लग्न मुहूर्त</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-gradient-text mb-3">
          पावन फेरों की शुभ प्रतीक्षा
        </h2>
        <p className="font-serif text-amber-100/80 text-sm sm:text-base max-w-xl mx-auto mb-10">
          क्षण-प्रतिक्षण निकट आ रहा है वह पावन समय, जब दो पवित्र आत्माएं एक अटूट बंधन में बंधेंगी।
        </p>

        {/* Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="relative p-5 sm:p-7 rounded-2xl royal-card border-2 border-amber-400/50 hover:border-amber-300 transition-all duration-300 shadow-2xl hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl font-serif font-extrabold gold-gradient-text tracking-tight">
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="text-xs uppercase tracking-wider text-amber-300/90 font-serif font-semibold mt-2">
                {unit.label}
              </div>

              {/* Ornate corner dot */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-amber-200/90 font-serif">
          <span>शुक्रवार, 11 दिसम्बर 2026</span>
          <span className="text-amber-400">•</span>
          <span>रात्रि 9:00 बजे से (शुभ मुहूर्त)</span>
          <span className="text-amber-400">•</span>
          <span>टाटानगर, झारखण्ड</span>
        </div>
      </div>
    </section>
  );
}
