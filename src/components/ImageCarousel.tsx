import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  aspectRatio?: string;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function ImageCarousel({ 
  images, 
  alt, 
  aspectRatio = 'aspect-[4/3]',
  showDots = true,
  showArrows = true
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return (
      <div className={`${aspectRatio} bg-purple-100/50 flex items-center justify-center`}>
        <span className="text-purple-400 text-sm font-medium">No images</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`${aspectRatio} relative bg-purple-100/50`}>
        <ImageWithFallback
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${aspectRatio} relative bg-purple-100/50 group`}>
      {/* Current image */}
      <ImageWithFallback
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Navigation arrows */}
      {showArrows && images.length > 1 && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur-xl bg-white/80 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-[#222]" />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full backdrop-blur-xl bg-white/80 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 text-[#222]" />
          </div>
        </>
      )}

      {/* Pagination dots */}
      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 backdrop-blur-xl bg-black/20 rounded-full px-2 py-1">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`transition-all cursor-pointer ${
                index === currentIndex
                  ? 'w-6 h-1.5 bg-white rounded-full'
                  : 'w-1.5 h-1.5 bg-white/50 rounded-full hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Image counter */}
      <div className="absolute top-3 right-3 backdrop-blur-xl bg-black/30 rounded-full px-2.5 py-1">
        <span className="text-white text-xs font-medium">
          {currentIndex + 1}/{images.length}
        </span>
      </div>
    </div>
  );
}