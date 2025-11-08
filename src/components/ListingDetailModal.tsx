import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ListingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: {
    title: string;
    image: string;
    credits: number;
    tags: string[];
    description: string;
    meetingSpot?: string;
    meetingTime?: string;
  } | null;
  onViewListing: () => void;
}

export default function ListingDetailModal({
  isOpen,
  onClose,
  listing,
  onViewListing
}: ListingDetailModalProps) {
  if (!isOpen || !listing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-full max-w-md backdrop-blur-2xl bg-white/95 rounded-t-3xl border border-white/60 shadow-[0_-8px_32px_rgba(139,92,246,0.2)] max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 z-10 backdrop-blur-xl bg-white/80 border-b border-purple-100/40 px-6 py-4 flex items-center justify-between">
          <h3 className="text-[#222] font-semibold">Listing Posted</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-purple-100/50 transition-colors"
          >
            <X className="w-5 h-5 text-[#555]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(70vh-120px)]">
          {/* Success Message */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-4 border border-green-300/40 text-center">
            <p className="text-green-900 font-medium mb-1">✅ Successfully Posted!</p>
            <p className="text-green-700 text-sm">
              Your listing is now live and visible to all students
            </p>
          </div>

          {/* Listing Preview */}
          <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/60 overflow-hidden">
            {/* Image */}
            <div className="aspect-[4/3] bg-purple-100/50 overflow-hidden">
              <ImageWithFallback
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-[#222] font-semibold">{listing.title}</h4>
                <div className="backdrop-blur-xl bg-white/90 rounded-full px-3 py-1 border border-white/60 flex items-center gap-1 flex-shrink-0 ml-2">
                  <span className="text-[#222] font-medium text-sm">{listing.credits} Cr</span>
                </div>
              </div>

              <p className="text-[#555] text-sm mb-3">{listing.description}</p>

              {/* Tags */}
              {listing.tags && listing.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {listing.tags.map((tag) => (
                    <div
                      key={tag}
                      className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1 border border-purple-200/60"
                    >
                      <span className="text-purple-700 text-xs font-medium">{tag}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Meeting Info */}
              {listing.meetingSpot && (
                <div className="pt-3 border-t border-purple-200/40">
                  <p className="text-[#555] text-sm mb-1">
                    <span className="font-medium">Meeting:</span> {listing.meetingSpot}
                  </p>
                  {listing.meetingTime && (
                    <p className="text-[#555] text-sm">
                      <span className="font-medium">Suggested time:</span> {listing.meetingTime}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 backdrop-blur-xl bg-white/80 border-t border-purple-100/40 p-6">
          <button
            onClick={onViewListing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center"
          >
            <span>View Full Listing</span>
          </button>
        </div>
      </div>
    </div>
  );
}