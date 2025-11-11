import { ArrowLeft, Shield, MapPin, Users, Eye, AlertTriangle, CheckCircle } from 'lucide-react';

interface SafetyTipsScreenProps {
  navigateTo: (screen: string) => void;
}

export default function SafetyTipsScreen({ navigateTo }: SafetyTipsScreenProps) {
  const safetyTips = [
    {
      icon: <MapPin className="w-5 h-5 text-purple-600" />,
      title: 'Meet in Public Places',
      description: 'Always meet in well-lit, public campus locations. Use designated meeting spots like the Student Union or Library entrance.'
    },
    {
      icon: <Users className="w-5 h-5 text-purple-600" />,
      title: 'Bring a Friend',
      description: 'Consider bringing a friend to the meetup, especially for high-value items or first-time trades.'
    },
    {
      icon: <Eye className="w-5 h-5 text-purple-600" />,
      title: 'Inspect Before You Buy',
      description: 'Always inspect items carefully before completing a transaction. Check for any damage or issues.'
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-600" />,
      title: 'Trust Your Instincts',
      description: 'If something feels wrong or too good to be true, trust your gut. You can always cancel a meeting.'
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-purple-600" />,
      title: 'Verify Seller Identity',
      description: 'Check the seller\'s trust badges and verification status. Users with verified badges have confirmed their student status.'
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-purple-600" />,
      title: 'Report Suspicious Activity',
      description: 'If you encounter suspicious behavior or scams, report it immediately to help keep the community safe.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 border-b border-white/30">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('settings')}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#222]" />
            </button>
            <h2 className="text-[#9333ea] font-semibold text-xl">Safety Tips</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Hero Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-[#222] font-semibold text-lg mb-2">Stay Safe on Snag</h3>
          <p className="text-[#666]">
            Follow these guidelines to ensure safe and successful transactions with fellow students on campus.
          </p>
        </div>

        {/* Safety Tips */}
        <div className="space-y-4">
          {safetyTips.map((tip, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] p-4"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0">
                  {tip.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#222] font-medium mb-1">{tip.title}</h3>
                  <p className="text-[#666] text-sm leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="backdrop-blur-xl bg-red-50/50 border border-red-200/50 rounded-3xl p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-900 font-medium mb-1">Emergency Contact</h3>
              <p className="text-red-700 text-sm">
                If you feel unsafe or witness illegal activity, contact Campus Security immediately at (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
