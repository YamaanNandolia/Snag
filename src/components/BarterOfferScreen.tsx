import { useState } from 'react';
import { ArrowLeft, Upload, X, ArrowLeftRight, CheckCircle, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Textarea } from './ui/textarea';

interface Photo {
  id: number;
  url: string;
}

export default function BarterOfferScreen({ item, navigateTo }: any) {
  const [offerPhotos, setOfferPhotos] = useState<Photo[]>([]);
  const [offerDescription, setOfferDescription] = useState('');

  if (!item) return null;

  const handleAddPhoto = () => {
    const newPhoto: Photo = {
      id: Date.now(),
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
    };
    setOfferPhotos([...offerPhotos, newPhoto]);
  };

  const handleRemovePhoto = (id: number) => {
    setOfferPhotos(offerPhotos.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('item-detail', item)}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#222]" />
          </button>
          <h2 className="text-[#9333ea] font-semibold text-xl">Barter Offer</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 space-y-4 pb-32">
        {/* What They're Offering */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
          <p className="text-[#555] mb-3 text-sm font-medium">They're offering</p>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-purple-100/50 flex-shrink-0">
              <ImageWithFallback
                src={item.image || item.images?.[0]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-[#222] font-semibold mb-1">{item.title}</h3>
              <p className="text-[#555] text-sm">{item.description}</p>
            </div>
          </div>
        </div>

        {/* Your Offer */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
          <h3 className="text-[#222] font-semibold mb-4">What are you offering?</h3>

          {/* Image Upload */}
          <div className="mb-4">
            <p className="text-[#555] mb-3 text-sm font-medium">Add Photos</p>
            <div className="grid grid-cols-3 gap-3">
              {offerPhotos.map((photo) => (
                <div key={photo.id} className="relative aspect-square group">
                  <div className="w-full h-full backdrop-blur-2xl bg-white/70 rounded-2xl border border-white/60 overflow-hidden">
                    <ImageWithFallback 
                      src={photo.url} 
                      alt="Offer item" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {offerPhotos.length < 6 && (
                <button
                  onClick={handleAddPhoto}
                  className="aspect-square backdrop-blur-2xl bg-white/70 rounded-2xl border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-white/80 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <Plus className="w-6 h-6 text-purple-500" />
                  <span className="text-xs text-purple-600 font-medium">Add photo</span>
                </button>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-[#555] mb-3 text-sm font-medium">Description</p>
            <Textarea
              value={offerDescription}
              onChange={(e) => setOfferDescription(e.target.value)}
              placeholder="Describe what you're offering in exchange..."
              className="min-h-32 backdrop-blur-xl bg-white/80 border-purple-200/60 rounded-2xl resize-none focus-visible:ring-purple-400/50 text-[#222]"
            />
          </div>
        </div>

        {/* Suggested Items (Mock) */}
        <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-3xl p-6 border border-purple-300/40">
          <p className="text-[#222] font-medium mb-3">💡 Quick Tip</p>
          <p className="text-[#555] text-sm font-light">
            Be specific about condition, brand, and why this is a fair trade. Photos help build trust!
          </p>
        </div>

        {/* Status Indicator */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
          <h3 className="text-[#222] font-semibold mb-4">Offer Status</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">1</span>
              </div>
              <div>
                <p className="text-[#222] font-medium">Submit Offer</p>
                <p className="text-[#555] text-sm font-light">You send your proposal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 text-xs font-semibold">2</span>
              </div>
              <div>
                <p className="text-[#222] font-medium">Seller Reviews</p>
                <p className="text-[#555] text-sm font-light">They accept or counter</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 text-xs font-semibold">3</span>
              </div>
              <div>
                <p className="text-[#222] font-medium">Meet & Exchange</p>
                <p className="text-[#555] text-sm font-light">Complete the trade</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
        <div className="max-w-md mx-auto space-y-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ArrowLeftRight className="w-5 h-5" strokeWidth={2.5} />
            <span>Send Barter Offer</span>
          </button>
          <button
            onClick={() => navigateTo('item-detail', item)}
            className="w-full py-4 rounded-2xl backdrop-blur-xl bg-white/80 text-[#222] font-medium border border-purple-200/60 shadow-sm transition-transform active:scale-[0.98] flex items-center justify-center"
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}