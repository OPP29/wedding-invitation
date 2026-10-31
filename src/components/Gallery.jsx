import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";
import { weddingData } from "../data/weddingData";
import SwipeUpIndicator from "./SwipeUpIndicator";

export default function Gallery({ onNext }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const displayPhotos = weddingData.gallery.slice(0, 4);

  return (
    <div className="snap-section bg-royal-emerald font-serif">
      <div className="max-w-2xl w-full my-auto px-1">
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
            <Camera className="w-3 h-3 text-amber-400" />
            <span>राजसी छायाचित्र वीथिका</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold gold-gradient-text">
            स्नेहमयी स्मृतियां (Gallery)
          </h2>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-36 sm:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-lg royal-card border border-amber-400/50 hover:border-amber-300 transition-all"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-2.5 text-white">
                <span className="text-[11px] sm:text-xs text-amber-200 font-bold truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-amber-300/60 text-center mt-3">
          * किसी भी चित्र पर स्पर्श करके बड़े रूप में देखें (Tap to enlarge)
        </p>
      </div>

      {/* Swipe up cue */}
      <SwipeUpIndicator onNext={onNext} label="उपस्थिति पुष्टि (RSVP) करें" />

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            aria-label="Close"
            className="absolute top-5 right-5 p-2 rounded-full bg-amber-500/20 text-amber-300"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl max-h-[80vh] p-2 rounded-2xl border-2 border-amber-400 bg-[#200007]"
          >
            <img
              src={displayPhotos[selectedPhotoIndex].url}
              alt=""
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
