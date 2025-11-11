import { ArrowLeft, Star, CheckCircle, ArrowLeftRight } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useDarkMode } from '../contexts/DarkModeContext';

interface UserProfileViewProps {
  navigateTo: (screen: string, data?: any) => void;
  user: {
    name: string;
    verified: boolean;
    trustScore: number;
    trades: number;
    bio?: string;
    listings?: any[];
  };
}

export default function UserProfileView({ navigateTo, user }: UserProfileViewProps) {
  const { darkMode } = useDarkMode();
  
  const listings = user.listings || [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      credits: 0,
      images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
      isTrade: true
    },
    {
      id: 2,
      title: 'Desk Lamp',
      credits: 12,
      images: ['https://images.unsplash.com/photo-1621447980929-6638614633c8?w=400'],
      isTrade: false
    },
    {
      id: 3,
      title: 'Wireless Headphones',
      credits: 0,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'],
      isTrade: true
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <button
            onClick={() => navigateTo('home')}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
          >
            <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
          </button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <div className="flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-3xl font-medium">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex items-center gap-2 mb-2">
              <h2 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-2xl`}>{user.name}</h2>
              {user.verified && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" fill="currentColor" />
                </div>
              )}
            </div>

            <p className={`${darkMode ? 'text-gray-300' : 'text-[#555]'} text-sm mb-4`}>
              {user.bio || 'Student at campus • Selling dorm essentials'}
            </p>

            {/* Trust Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  <span className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-xl`}>{user.trustScore}</span>
                </div>
                <p className={`${darkMode ? 'text-gray-400' : 'text-[#999]'} text-xs`}>Trust Score</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <ArrowLeftRight className="w-5 h-5 text-purple-500" />
                  <span className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-xl`}>{user.trades}</span>
                </div>
                <p className={`${darkMode ? 'text-gray-400' : 'text-[#999]'} text-xs`}>Completed Trades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold mb-3`}>Interests</h3>
          <div className="flex flex-wrap gap-2">
            {['Electronics', 'Clothing', 'Vintage'].map((interest) => (
              <span
                key={interest}
                className={`${darkMode ? 'bg-purple-600/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300'} px-3 py-1 rounded-full border text-sm`}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* User's Listings */}
        <div>
          <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-4 px-2`}>
            Active Listings ({listings.length})
          </h3>
          <div className="space-y-3">
            {listings.map((listing) => (
              <button
                key={listing.id}
                onClick={() => navigateTo('item-detail', { ...listing, seller: user })}
                className={`w-full backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] transition-all active:scale-[0.98]`}
              >
                <div className="flex items-center gap-3 p-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-sm mb-1`}>{listing.title}</h4>
                    {listing.isTrade ? (
                      <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-sm font-medium flex items-center gap-1 w-fit">
                        <ArrowLeftRight className="w-3 h-3" />
                        <span className="text-xs">Trade</span>
                      </Badge>
                    ) : (
                      <p className={`${darkMode ? 'text-gray-400' : 'text-[#555]'} text-sm`}>{listing.credits} credits</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
