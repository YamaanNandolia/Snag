import { ArrowLeft, MapPin, Calendar, Clock, Coins, ArrowLeftRight, Shield } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import ImageCarousel from './ImageCarousel';

export default function FullListingView({ listing, navigateTo, currentUser }: any) {
  if (!listing) return null;

  const isOwnListing = listing.sellerId === currentUser?.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-32">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('profile')}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#222]" />
          </button>
          <h2 className="text-[#9333ea] font-semibold text-xl">Listing Details</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto">
        {/* Image Carousel */}
        <div className="aspect-[4/3] bg-purple-100/50 overflow-hidden">
          <ImageCarousel images={listing.images || [listing.image]} />
        </div>

        {/* Details Section */}
        <div className="px-4 py-6 space-y-4">
          {/* Title & Price */}
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <div className="flex items-start justify-between mb-3">
              <h1 className="text-[#222] font-semibold text-2xl flex-1">{listing.title}</h1>
              <div className="backdrop-blur-xl bg-white/90 rounded-full px-4 py-2 border border-white/60 flex items-center gap-1 ml-3">
                <Coins className="w-4 h-4 text-purple-600" />
                <span className="text-[#222] font-semibold">{listing.credits || 0} Cr</span>
              </div>
            </div>

            {/* Tags */}
            {listing.tags && listing.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1 border border-purple-200/60"
                  >
                    <span className="text-purple-700 text-xs font-medium">{tag}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mb-4">
              <p className="text-[#555]">{listing.description}</p>
            </div>

            {/* Condition */}
            {listing.condition && (
              <div className="pt-4 border-t border-purple-200/40">
                <p className="text-[#555] text-sm">
                  <span className="font-medium text-[#222]">Condition:</span> {listing.condition}
                </p>
              </div>
            )}
          </div>

          {/* Seller Info */}
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <p className="text-[#555] text-sm mb-3">Seller</p>
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold">
                  {listing.seller?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-[#222] font-semibold">{listing.seller?.name || 'Anonymous'}</h3>
                  {listing.seller?.verified && (
                    <Badge variant="secondary" className="backdrop-blur-xl bg-green-100/80 text-green-700 border-green-300/40">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <p className="text-[#555] text-sm">Active seller</p>
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            <h3 className="text-[#222] font-semibold mb-4">Meeting Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-[#888] text-sm font-light">Pickup Location</p>
                  <p className="text-[#222] font-medium">{listing.meetingSpot || 'Main Campus Library Lobby'}</p>
                </div>
              </div>
              {listing.meetingTime && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-[#888] text-sm font-light">Suggested Time</p>
                    <p className="text-[#222] font-medium">{listing.meetingTime}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-[#888] text-sm font-light">Posted</p>
                  <p className="text-[#222] font-medium">{listing.postedTime || '2 days ago'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Info */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-4 border border-purple-300/40">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#222] font-medium mb-1">🔒 Safety Reminder</p>
                <p className="text-[#555] text-sm">
                  Always meet in safe, public campus spaces. Report any suspicious activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      {!isOwnListing && (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
          <div className="max-w-md mx-auto">
            {listing.isBarter ? (
              <button
                onClick={() => navigateTo('barter-offer', listing)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <ArrowLeftRight className="w-5 h-5" strokeWidth={2.5} />
                <span>Offer to Barter</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('meeting', listing)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Coins className="w-5 h-5" strokeWidth={2.5} />
                <span>Snag Now · {listing.credits} Credits</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
