import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { weddingData } from "../data/weddingData";

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  // Show top 4 pictures for a clean, short preview
  const displayPhotos = weddingData.gallery.slice(0, 4);

  return (
    <section id="gallery" className="py-10 px-3 sm:px-6 bg-royal-maroon border-b border-amber-500/30 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-widest mb-1.5">
            <Camera className="w-3.5 h-3.5" />
            <span>राजसी छायाचित्र वीथिका</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold gold-gradient-text">
            स्नेहमयी स्मृतियां
          </h2>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          {displayPhotos.map((photo, index) => (
            <div
              key={index}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative h-40 sm:h-52 rounded-xl overflow-hidden cursor-pointer shadow-md royal-card border border-amber-400/40 hover:border-amber-300 transition-all"
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 text-white">
                <span className="text-[11px] text-amber-300 font-bold truncate">
                  {photo.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
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
            className="max-w-2xl max-h-[80vh] p-2 rounded-2xl border border-amber-400 bg-[#200007]"
          >
            <img
              src={displayPhotos[selectedPhotoIndex].url}
              alt=""
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
