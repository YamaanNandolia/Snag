import { X, CheckCircle, TrendingUp, Shield } from 'lucide-react';

interface TrustDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrustDetailsDrawer({ isOpen, onClose }: TrustDetailsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 max-w-md mx-auto animate-in slide-in-from-bottom duration-300">
        <div className="backdrop-blur-2xl bg-white/90 rounded-t-3xl border-t border-x border-white/60 shadow-[0_-8px_32px_rgba(0,0,0,0.12)] p-6 pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#222] font-semibold">Trust Score</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/50 transition-colors"
            >
              <X className="w-5 h-5 text-[#555]" />
            </button>
          </div>

          {/* Trust Score Circle */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <svg className="w-32 h-32 -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-purple-200/60"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 56 * 0.98} ${2 * Math.PI * 56 * 0.02}`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#9333ea" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[#222] font-semibold text-3xl">98%</span>
                <span className="text-[#555] text-sm font-medium">Trust Score</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="backdrop-blur-xl bg-purple-50/60 rounded-2xl p-3 border border-purple-200/40 text-center">
              <div className="text-[#222] font-semibold mb-1">12</div>
              <div className="text-[#555] text-xs font-medium">Trades</div>
            </div>
            <div className="backdrop-blur-xl bg-purple-50/60 rounded-2xl p-3 border border-purple-200/40 text-center">
              <div className="text-[#222] font-semibold mb-1">12</div>
              <div className="text-[#555] text-xs font-medium">Completed</div>
            </div>
            <div className="backdrop-blur-xl bg-purple-50/60 rounded-2xl p-3 border border-purple-200/40 text-center">
              <div className="text-[#222] font-semibold mb-1">0</div>
              <div className="text-[#555] text-xs font-medium">Disputed</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3 mb-6">
            <h3 className="text-[#222] font-semibold text-sm">Recent Completions</h3>
            {[
              { title: 'Desk Chair', type: 'Sold', date: '5 days ago' },
              { title: 'Winter Jacket', type: 'Bartered', date: '1 week ago' },
              { title: 'Calculus Textbook', type: 'Sold', date: '2 weeks ago' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[#222] font-medium text-sm">{activity.title}</p>
                  <p className="text-[#555] text-xs font-light">{activity.type} · {activity.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-2xl p-4 border border-purple-300/40">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[#222] font-medium mb-1 text-sm">How to improve trust</p>
                <ul className="text-[#555] text-sm font-light space-y-1">
                  <li>• Complete trades on time</li>
                  <li>• Respond to messages quickly</li>
                  <li>• Accurate item descriptions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
