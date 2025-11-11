import { Search, Plus, Users } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useState } from 'react';

interface CirclesHomeScreenProps {
  navigateTo: (screen: string, data?: any) => void;
  userCircles: any[];
}

const mockCircles = [
  {
    id: 1,
    name: 'Move-Out Sale 2025',
    description: 'Graduating seniors selling everything!',
    activePosts: 128,
    coverImage: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    isJoined: true
  },
  {
    id: 2,
    name: 'Textbook Exchange',
    description: 'Trade or sell textbooks for all majors',
    activePosts: 94,
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
    isJoined: true
  },
  {
    id: 3,
    name: 'Tech & Electronics',
    description: 'Laptops, phones, headphones, and more',
    activePosts: 67,
    coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    isJoined: false
  },
  {
    id: 4,
    name: 'Dorm Furniture',
    description: 'Chairs, desks, shelves for dorm rooms',
    activePosts: 52,
    coverImage: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    isJoined: false
  },
  {
    id: 5,
    name: 'Winter Apparel',
    description: 'Coats, boots, and cold weather gear',
    activePosts: 41,
    coverImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',
    isJoined: false
  },
  {
    id: 6,
    name: 'Free Stuff',
    description: 'Items being given away for free!',
    activePosts: 33,
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    isJoined: false
  }
];

export default function CirclesHomeScreen({ navigateTo, userCircles }: CirclesHomeScreenProps) {
  const { darkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  
  const allAvailableCircles = [...userCircles, ...mockCircles];
  const yourCircles = allAvailableCircles.filter(c => c.isJoined);
  const allCircles = mockCircles;

  // Filter circles based on search query
  const filterCircles = (circles: any[]) => {
    if (!searchQuery.trim()) return circles;
    
    const query = searchQuery.toLowerCase();
    return circles.filter(circle => 
      circle.name.toLowerCase().includes(query) ||
      circle.description.toLowerCase().includes(query) ||
      (circle.category && circle.category.toLowerCase().includes(query))
    );
  };

  const filteredYourCircles = filterCircles(yourCircles);
  const filteredAllCircles = filterCircles(allCircles);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} pb-24`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className={`${darkMode ? 'text-white' : 'text-[#9333ea]'} font-semibold text-xl mb-4`}>Circles</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-[#888]'}`} />
            <input
              type="text"
              placeholder="Search circles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-white/60 text-[#222] placeholder:text-[#888]'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50`}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Create Circle Button */}
        <button
          onClick={() => navigateTo('create-circle')}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2 mx-auto"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
          <span>Create a Circle</span>
        </button>

        {/* Your Circles */}
        {filteredYourCircles.length > 0 && (
          <div>
            <h2 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-3 px-2`}>Your Circles</h2>
            <div className="space-y-3">
              {filteredYourCircles.map((circle) => (
                <CircleCard key={circle.id} circle={circle} navigateTo={navigateTo} darkMode={darkMode} />
              ))}
            </div>
          </div>
        )}

        {/* All Circles */}
        <div>
          <h2 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-3 px-2`}>All Circles</h2>
          {filteredAllCircles.length > 0 ? (
            <div className="space-y-3">
              {filteredAllCircles.map((circle) => (
                <CircleCard key={circle.id} circle={circle} navigateTo={navigateTo} darkMode={darkMode} />
              ))}
            </div>
          ) : (
            <div className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border p-8 text-center`}>
              <p className={`${darkMode ? 'text-gray-400' : 'text-[#888]'}`}>No circles match your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CircleCardProps {
  circle: any;
  navigateTo: (screen: string, data?: any) => void;
  darkMode: boolean;
}

function CircleCard({ circle, navigateTo, darkMode }: CircleCardProps) {
  return (
    <button
      onClick={() => navigateTo('circle-feed', circle)}
      className={`w-full backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] transition-all active:scale-[0.98]`}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Cover Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
          <img src={circle.coverImage} alt={circle.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex-1 text-left">
          <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-sm mb-1`}>{circle.name}</h3>
          <p className={`${darkMode ? 'text-gray-400' : 'text-[#555]'} text-xs mb-2 line-clamp-1`}>{circle.description}</p>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-purple-500" />
            <span className={`${darkMode ? 'text-gray-400' : 'text-[#999]'} text-xs`}>{circle.activePosts} active posts</span>
          </div>
        </div>

        {/* Status */}
        {circle.isJoined && (
          <div className={`${darkMode ? 'bg-purple-500/20' : 'bg-purple-100/60'} rounded-full px-3 py-1 border ${darkMode ? 'border-purple-500/40' : 'border-purple-200/60'}`}>
            <span className="text-purple-600 text-xs font-medium">Following</span>
          </div>
        )}
      </div>
    </button>
  );
}