import { Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#120004] text-amber-100/90 pt-10 pb-8 px-3 sm:px-6 border-t-2 border-amber-500/40 font-serif">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        {/* Vedic Shloka */}
        <p className="text-amber-300 text-xs sm:text-sm font-bold tracking-wide">
          मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः। मंगलम् पुण्डरीकाक्षः मंगलाय तनो हरिः॥
        </p>

        {/* Monogram & Title */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-full border border-amber-400 flex items-center justify-center bg-amber-900/60 text-amber-300 font-bold text-xs">
            म&रि
          </div>
          <span className="text-base sm:text-lg font-bold gold-gradient-text">
            मोनिका संग रितेश
          </span>
          <span className="text-xs text-amber-400">• 11 दिसम्बर 2026, टाटानगर</span>
        </div>

        {/* Family Lineage */}
        <div className="bg-amber-950/40 p-3.5 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 max-w-xl mx-auto leading-relaxed">
          <p className="font-bold text-amber-300">॥ दर्शनाभिलाषी एवं स्वागताकांक्षी ॥</p>
          <p className="mt-1">
            श्री शंभू पंडित एवं श्रीमती रेखा पंडित | श्री प्रदीप कु. पंडित एवं श्रीमती सुनैना देवी
          </p>
          <p className="text-[11px] text-amber-300/80 mt-1">
            ओम प्रकाश (बड़ा भाई), अमनदीप (छोटा भाई), सुप्रिया (बड़ी बहन), रितिक (छोटा भाई), दीपिका (छोटी बहन)
          </p>
          <p className="text-[11px] text-amber-400 font-bold mt-1">
            समस्त पंडित परिवार • टाटानगर, झारखण्ड
          </p>
        </div>

        {/* Return to top */}
        <div className="pt-2">
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            <span>शीर्ष पर जाएं</span>
          </button>
        </div>

        <div className="text-[11px] text-amber-400/50 flex items-center justify-center gap-1 pt-2">
          <span>प्रेम एवं शुभाशीर्वाद सहित</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>पंडित परिवार</span>
        </div>
      </div>
    </footer>
  );
}
