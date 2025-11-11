import { X, Shield, GraduationCap } from 'lucide-react';

interface BadgeInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  badgeType: 'verified' | 'trades' | null;
}

export default function BadgeInfoModal({ isOpen, onClose, badgeType }: BadgeInfoModalProps) {
  if (!isOpen || !badgeType) return null;

  const badgeInfo = {
    verified: {
      title: '.edu Verified',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      description: 'This user has verified their .edu email address with their campus.',
      benefits: [
        'Confirmed campus student status',
        'Access to campus-only marketplace',
        'Enhanced trust and credibility'
      ]
    },
    trades: {
      title: 'Successful Trades',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      description: 'Awarded for completing multiple successful trades on Snag.',
      benefits: [
        'Completed 10+ verified transactions',
        'Zero disputes or cancellations',
        'High trust score (95%+)'
      ]
    }
  };

  const info = badgeInfo[badgeType];
  const IconComponent = info.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-w-sm w-full backdrop-blur-2xl bg-white/90 rounded-3xl p-6 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] animate-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/50 transition-colors"
        >
          <X className="w-5 h-5 text-[#555]" />
        </button>

        {/* Badge Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-[#222] font-semibold text-center mb-2">{info.title}</h2>
        
        {/* Description */}
        <p className="text-[#555] text-center mb-6 text-sm">
          {info.description}
        </p>

        {/* Benefits */}
        <div className="backdrop-blur-xl bg-purple-50/60 rounded-2xl p-4 border border-purple-200/40">
          <p className="text-[#222] font-medium mb-3 text-sm">What this means:</p>
          <ul className="space-y-2">
            {info.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5" />
                <span className="text-[#555] text-sm font-light">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
