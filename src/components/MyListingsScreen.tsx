import { ArrowLeft, Package } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MyListingsScreen({ navigateTo, myListings = [] }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('profile')}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#222]" />
          </button>
          <h2 className="text-[#9333ea] font-semibold text-xl">My Listings</h2>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-md mx-auto px-4 py-4">
        {myListings.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {myListings.map((listing: any) => (
              <button
                key={listing.id}
                onClick={() => navigateTo('full-listing-view', listing)}
                className="backdrop-blur-2xl bg-white/70 rounded-2xl border border-white/60 shadow-sm hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] transition-all active:scale-[0.98] overflow-hidden text-left"
              >
                {/* Image */}
                <div className="aspect-square bg-purple-100/50 overflow-hidden">
                  <ImageWithFallback
                    src={listing.images?.[0] || listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-[#222] font-semibold text-sm mb-1 line-clamp-2">
                    {listing.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="backdrop-blur-xl bg-white/90 rounded-full px-2 py-1 border border-white/60">
                      <span className="text-[#222] font-medium text-xs">{listing.credits} Cr</span>
                    </div>
                    <div className="backdrop-blur-xl bg-green-100/80 rounded-full px-2 py-1 border border-green-200/60">
                      <span className="text-green-700 text-xs font-medium">Active</span>
                    </div>
                  </div>
                  <p className="text-[#777] text-xs mt-2">{listing.postedTime || 'Just now'}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-12 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-[#222] font-semibold mb-2">No listings yet</h3>
            <p className="text-[#555] mb-4">Start selling items to see them here</p>
            <button
              onClick={() => navigateTo('create')}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]"
            >
              Create Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
