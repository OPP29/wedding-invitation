import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Photos loaded directly from /couple-photos/ folder
  // Exactly 6 photos re-examined and framed with precision to spotlight the couple's faces prominently
  const couplePhotos = [
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo1.jpg`,
      title: "राजसी प्रेम का सूत्रपात",
      caption: "Two souls united by destiny, blessed by traditions",
      position: "65% 38%",
      origin: "65% 38%",
      scale: 1.45,
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo2.jpg`,
      title: "हाथों में हाथ, सदा का साथ",
      caption: "Walking hand in hand along the golden sands",
      position: "48% 74%",
      origin: "48% 72%",
      scale: 1.45,
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo3.jpg`,
      title: "लहरों के संग पावन वादा",
      caption: "Whispers of eternal love amidst ocean waves",
      position: "60% 63%",
      origin: "60% 63%",
      scale: 1.5,
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo4.jpg`,
      title: "अनंत पथ पर साथ",
      caption: "Walking hand in hand toward eternity",
      position: "61% 51%",
      origin: "61% 51%",
      scale: 1.45,
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo5.jpg`,
      title: "स्नेहमयी स्मृतियां",
      caption: "Cherished moments and eternal companionship",
      position: "80% 35%",
      origin: "80% 35%",
      scale: 1.45,
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo6.jpg`,
      title: "प्रकृति की छांव में",
      caption: "Surrounded by nature, bound by sacred destiny",
      position: "63% 58%",
      origin: "63% 58%",
      scale: 1.4,
    },
  ];

  const handleNextPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev === null ? 0 : (prev + 1) % couplePhotos.length));
  }, [couplePhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    setSelectedPhotoIndex((prev) => (prev === null ? 0 : (prev - 1 + couplePhotos.length) % couplePhotos.length));
  }, [couplePhotos.length]);

  // Keyboard navigation (Arrow keys & Escape)
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "Escape") setSelectedPhotoIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, handleNextPhoto, handlePrevPhoto]);

  // Touch Swipe Handlers for mobile gesture navigation
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const SWIPE_THRESHOLD = 45; // Minimum px to trigger swipe

    if (diff > SWIPE_THRESHOLD) {
      // Swiped Left -> Show Next
      handleNextPhoto();
    } else if (diff < -SWIPE_THRESHOLD) {
      // Swiped Right -> Show Prev
      handlePrevPhoto();
    }
  };

  return (
    <div className="snap-section bg-royal-emerald font-serif text-center">
      <div className="max-w-3xl sm:max-w-4xl w-full my-auto px-2 sm:px-4 flex flex-col items-center">
        {/* Header */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold tracking-wider mb-1 font-['Mukta',sans-serif]">
            शाही फोटो गैलरी
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold gold-gradient-text font-['Mukta',sans-serif] mt-0.5 sm:mt-1">
            स्नेहमयी स्मृतियां (Gallery)
          </h2>
        </div>

        {/* 6 Photo Grid - 3x2 on Desktop, 2x3 on Mobile with enlarged view windows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full">
          {couplePhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-32 sm:h-44 md:h-52 lg:h-56 rounded-2xl overflow-hidden cursor-pointer shadow-xl royal-card border-2 border-amber-400/50 hover:border-amber-300 transition-all duration-300"
            >
              <div
                className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-105"
                style={{
                  transformOrigin: photo.origin || "center",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  style={{
                    objectPosition: photo.position || "center",
                    transform: `scale(${photo.scale || 1.3})`,
                    transformOrigin: photo.origin || photo.position || "center",
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bottom Subtle Title Gradient (leaves upper 75% unshaded so couple faces are bright & clear) */}
              <div className="absolute bottom-0 inset-x-0 h-9 sm:h-11 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex items-end px-2 sm:px-2.5 py-1 text-white pointer-events-none">
                <span className="text-[11px] sm:text-xs text-amber-200 font-bold truncate font-['Mukta',sans-serif]">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-amber-300/80 text-center mt-2.5 sm:mt-3.5 font-medium font-['Mukta',sans-serif]">
          * किसी भी चित्र पर स्पर्श करके बड़े रूप में देखें व स्वाइप करें (Tap & Swipe)
        </p>
      </div>

      {/* Enhanced Lightbox Modal with Arrows & Touch-Swipe */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            aria-label="Close photo preview"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-200 hover:bg-amber-500/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-amber-950/80 border border-amber-400/60 text-amber-200 hover:bg-amber-800 hover:text-white shadow-2xl transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Main Photo Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[88vh] p-3 sm:p-4 rounded-2xl border-2 border-amber-400/80 bg-[#1e0207] text-center shadow-2xl relative flex flex-col items-center"
          >
            {/* Photo Counter Pill */}
            <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-['Mukta',sans-serif]">
              <span>शाही स्मृति {selectedPhotoIndex + 1} / {couplePhotos.length}</span>
            </div>

            <img
              src={couplePhotos[selectedPhotoIndex].src}
              alt={couplePhotos[selectedPhotoIndex].title}
              className="max-w-full max-h-[64vh] sm:max-h-[72vh] object-contain rounded-xl mx-auto shadow-2xl transition-opacity duration-300"
            />

            <h3 className="text-amber-200 text-sm sm:text-base font-bold mt-2.5 font-['Mukta',sans-serif]">
              {couplePhotos[selectedPhotoIndex].title}
            </h3>
            <p className="text-amber-400/80 text-xs italic mt-0.5">
              {couplePhotos[selectedPhotoIndex].caption}
            </p>

            <span className="text-[11px] text-amber-400/60 mt-1 sm:hidden font-['Mukta',sans-serif]">
              ← स्वाइप करके अगले चित्र देखें →
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-amber-950/80 border border-amber-400/60 text-amber-200 hover:bg-amber-800 hover:text-white shadow-2xl transition-transform active:scale-90 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      )}
    </div>
  );
}
