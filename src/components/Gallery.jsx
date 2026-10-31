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
    <div className="snap-section bg-royal-emerald font-serif text-center">
      <div className="max-w-2xl w-full my-auto px-1 flex flex-col items-center">
        {/* Header */}
        <div className="mb-3">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1">
            राजसी छायाचित्र वीथिका
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text mt-0.5">
            स्नेहमयी स्मृतियां (Gallery)
          </h2>
        </div>

        {/* 4 Photo Grid - Auto-fits cleanly to any screen */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full">
          {couplePhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-36 sm:h-52 rounded-2xl overflow-hidden cursor-pointer shadow-xl royal-card border-2 border-amber-400/50 hover:border-amber-300 transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5 sm:p-3 text-white">
                <span className="text-xs sm:text-sm text-amber-200 font-bold truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-amber-300/80 text-center mt-3 font-medium">
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
