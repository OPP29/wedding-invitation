import { useState } from "react";
import { Camera, X } from "lucide-react";

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Photos loaded directly from /couple-photos/ folder
  // Users can drop/replace photos in public/couple-photos/ and they auto-adjust to screen!
  const couplePhotos = [
    {
      src: "./couple-photos/photo1.jpg",
      title: "राजसी प्रेम का सूत्रपात",
      caption: "Two souls united by destiny, blessed by traditions",
    },
    {
      src: "./couple-photos/photo2.jpg",
      title: "वधु सौंदर्य व लालित्य",
      caption: "Adorned in royal crimson, ready for sacred vows",
    },
    {
      src: "./couple-photos/photo3.jpg",
      title: "अनंत पथ पर साथ",
      caption: "Walking hand in hand toward eternity",
    },
    {
      src: "./couple-photos/photo4.jpg",
      title: "मुस्कुराते सुंदर पल",
      caption: "Laughter, devotion and eternal companionship",
    },
  ];

  return (
    <div className="snap-section bg-royal-emerald font-serif text-center flex flex-col justify-between p-0">
      {/* Top Header Zone */}
      <header className="w-full pt-3 sm:pt-5 pb-2 px-3 flex flex-col items-center flex-shrink-0 border-b border-amber-400/25 bg-gradient-to-b from-black/40 via-black/20 to-transparent">
        <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1">
          राजसी छायाचित्र वीथिका
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold gold-gradient-text mt-0.5">
          स्नेहमयी स्मृतियां (Gallery)
        </h2>
      </header>

      {/* Main Body Zone */}
      <div className="flex-1 w-full max-w-2xl mx-auto px-2 flex flex-col items-center justify-center py-2">
        {/* 4 Photo Grid - Auto-fits cleanly to any screen */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3.5 w-full">
          {couplePhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-32 sm:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-xl royal-card border-2 border-amber-400/50 hover:border-amber-300 transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2 sm:p-2.5 text-white">
                <span className="text-xs sm:text-sm text-amber-200 font-bold truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-amber-300/80 text-center mt-2 font-medium">
          * किसी भी चित्र पर स्पर्श करके बड़े रूप में देखें (Tap to enlarge)
        </p>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full bg-amber-500/20 text-amber-300 hover:bg-amber-500/40"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl max-h-[80vh] p-2 rounded-2xl border-2 border-amber-400 bg-[#200007] text-center"
          >
            <img
              src={couplePhotos[selectedPhotoIndex].src}
              alt=""
              className="max-w-full max-h-[70vh] object-contain rounded-xl mx-auto shadow-2xl"
            />
            <p className="text-amber-200 text-sm font-bold mt-2">
              {couplePhotos[selectedPhotoIndex].title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
