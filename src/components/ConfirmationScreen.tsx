import { CheckCircle, Calendar, MapPin, Coins, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ConfirmationScreenProps {
  item: any;
  meetingSpot?: string;
  navigateTo: (screen: string) => void;
}

export default function ConfirmationScreen({ item, meetingSpot, navigateTo }: ConfirmationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 animate-in fade-in duration-500">
        {/* Header */}
        <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
          <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
            <button
              onClick={() => navigateTo('home')}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#222]" />
            </button>
            <h2 className="text-[#9333ea] font-semibold text-xl">Confirmation</h2>
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-[0_8px_32px_rgba(34,197,94,0.3)] animate-in zoom-in duration-300">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-[#222] font-semibold mb-2">Snag Confirmed!</h1>
          <p className="text-[#555]">Your meeting has been scheduled</p>
        </div>

        {/* Details Card */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-4">
          {/* Item Preview */}
          <div className="flex gap-4 pb-4 border-b border-purple-200/40">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-purple-100/50 flex-shrink-0">
              {item?.image && (
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-[#222] font-semibold mb-1">{item?.title || 'Item'}</h3>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-[#555] text-sm font-medium">{item?.credits || 0} Credits</span>
              </div>
            </div>
          </div>

          {/* Meeting Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-[#888] text-sm font-light">Meeting Location</p>
                <p className="text-[#222] font-medium">{meetingSpot || 'Main Library Lobby'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-[#888] text-sm font-light">Scheduled For</p>
                <p className="text-[#222] font-medium">Today at 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-2xl p-4 border border-green-300/40">
          <p className="text-green-900 mb-1 font-medium">✓ What's next?</p>
          <p className="text-green-700 text-sm font-light">
            You'll receive a notification 30 minutes before your meeting. The seller has been notified.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigateTo('notifications')}
            className="w-full py-4 rounded-2xl backdrop-blur-xl bg-white/60 text-[#222] font-medium border border-purple-200/60 shadow-sm transition-transform active:scale-[0.98]"
          >
            View Notifications
          </button>
        </div>
      </div>
    </div>
  );
}