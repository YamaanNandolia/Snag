import { ArrowLeft, ArrowLeftRight, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CounterOfferScreenProps {
  item: any;
  counterOffer: {
    title: string;
    description: string;
    image: string;
    credits?: number;
  };
  navigateTo: (screen: string, data?: any) => void;
  onConfirm: () => void;
}

export default function CounterOfferScreen({
  item,
  counterOffer,
  navigateTo,
  onConfirm
}: CounterOfferScreenProps) {
  if (!item) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#222]" />
          </button>
          <h2 className="text-[#9333ea] font-semibold text-xl">Counter Offer Received</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-32 space-y-4">
        {/* Status Banner */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-4 border border-purple-300/40 text-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
            <ArrowLeftRight className="w-6 h-6 text-white" />
          </div>
          <p className="text-[#222] font-medium mb-1">New Counter Offer!</p>
          <p className="text-[#555] text-sm">
            The seller has responded with a different item
          </p>
        </div>

        {/* Your Original Offer */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
          <p className="text-[#555] mb-3 text-sm font-medium">You wanted</p>
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

        {/* Exchange Arrow */}
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Counter Offer */}
        <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-3xl p-6 border border-purple-400/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
          <p className="text-[#555] mb-3 text-sm font-medium">They're offering instead</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/50 flex-shrink-0">
              <ImageWithFallback
                src={counterOffer.image}
                alt={counterOffer.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-[#222] font-semibold mb-1">{counterOffer.title}</h3>
              <p className="text-[#555] text-sm">{counterOffer.description}</p>
            </div>
          </div>

          {counterOffer.credits !== undefined && counterOffer.credits > 0 && (
            <div className="backdrop-blur-xl bg-white/60 rounded-2xl p-3 border border-purple-200/60">
              <p className="text-[#555] text-sm mb-1">
                <span className="font-medium">Additional Credits:</span>
              </p>
              <p className="text-purple-600 font-semibold">+{counterOffer.credits} Credits</p>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-2xl p-4 border border-blue-300/40">
          <p className="text-[#222] font-medium mb-1">💡 What happens next?</p>
          <p className="text-[#555] text-sm">
            If you accept, you'll coordinate a meeting spot to complete the exchange. If you decline, the seller will be notified.
          </p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
        <div className="max-w-md mx-auto space-y-3">
          <button
            onClick={onConfirm}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Accept Counter Offer</span>
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-4 rounded-2xl backdrop-blur-xl bg-white/80 text-[#222] font-medium border border-purple-200/60 shadow-sm transition-transform active:scale-[0.98]"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
