import { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Photos loaded directly from /couple-photos/ folder
  const couplePhotos = [
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo1.jpg`,
      title: "राजसी प्रेम का सूत्रपात",
      caption: "Two souls united by destiny, blessed by traditions",
      position: "center",
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo2.jpg`,
      title: "वधु सौंदर्य व लालित्य",
      caption: "Adorned in royal crimson, ready for sacred vows",
      position: "bottom", // Lower part visible
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo3.jpg`,
      title: "अनंत पथ पर साथ",
      caption: "Walking hand in hand toward eternity",
      position: "center",
      zoom: true, // Slightly make zoom
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo4.jpg`,
      title: "मुस्कुराते सुंदर पल",
      caption: "Laughter, devotion and eternal companionship",
      position: "bottom", // Lower part visible
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo5.jpg`,
      title: "स्नेहमयी स्मृतियां",
      caption: "Cherished moments and eternal blessings",
      position: "bottom", // Lower part visible
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo6.jpg`,
      title: "शुभ बंधन व उमंग",
      caption: "Celebrations of divine togetherness",
      position: "bottom", // Lower part visible
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo7.jpg`,
      title: "मंगलमय परिणय",
      caption: "A sacred journey of love and togetherness",
      position: "center",
    },
    {
      src: `${import.meta.env.BASE_URL}couple-photos/photo8.jpg`,
      title: "अमृतमयी संगम",
      caption: "Bound together for seven lifetimes",
      position: "center",
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
      <div className="max-w-2xl w-full my-auto px-1 flex flex-col items-center">
        {/* Header */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-1">
            शाही फोटो गैलरी
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold gold-gradient-text mt-0.5 sm:mt-1">
            स्नेहमयी स्मृतियां (Gallery)
          </h2>
        </div>

        {/* 8 Photo Grid - 4x2 on Desktop, 2x4 on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full max-h-[66vh] sm:max-h-none overflow-y-auto sm:overflow-visible pr-0.5 sm:pr-0">
          {couplePhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-28 sm:h-36 md:h-44 rounded-2xl overflow-hidden cursor-pointer shadow-xl royal-card border-2 border-amber-400/50 hover:border-amber-300 transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                style={{ objectPosition: photo.position || "center" }}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  photo.zoom ? "scale-[1.18] group-hover:scale-[1.25]" : "group-hover:scale-105"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2 text-white">
                <span className="text-[11px] sm:text-xs text-amber-200 font-bold truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-amber-300/80 text-center mt-2 sm:mt-3 font-medium">
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
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-amber-500/25 border border-amber-400/50 text-amber-200 hover:bg-amber-500/40 hover:text-white transition-colors"
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
            className="absolute left-2 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-amber-950/80 border border-amber-400/60 text-amber-200 hover:bg-amber-800 hover:text-white shadow-2xl transition-transform active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Main Photo Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl max-h-[85vh] p-3 sm:p-4 rounded-2xl border-2 border-amber-400/80 bg-[#1e0207] text-center shadow-2xl relative flex flex-col items-center"
          >
            {/* Photo Counter Pill */}
            <div className="mb-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <span>शाही स्मृति {selectedPhotoIndex + 1} / {couplePhotos.length}</span>
            </div>

            <img
              src={couplePhotos[selectedPhotoIndex].src}
              alt={couplePhotos[selectedPhotoIndex].title}
              className="max-w-full max-h-[60vh] sm:max-h-[68vh] object-contain rounded-xl mx-auto shadow-2xl transition-opacity duration-300"
            />

            <h3 className="text-amber-200 text-sm sm:text-base font-bold mt-2.5">
              {couplePhotos[selectedPhotoIndex].title}
            </h3>
            <p className="text-amber-400/80 text-xs italic mt-0.5">
              {couplePhotos[selectedPhotoIndex].caption}
            </p>

            <span className="text-[11px] text-amber-400/60 mt-1 sm:hidden">
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
            className="absolute right-2 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-amber-950/80 border border-amber-400/60 text-amber-200 hover:bg-amber-800 hover:text-white shadow-2xl transition-transform active:scale-90"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      )}
    </div>
  );
}
