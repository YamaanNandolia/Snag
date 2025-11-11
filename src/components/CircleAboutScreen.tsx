import { useState } from 'react';
import { ArrowLeft, Users, TrendingUp } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface CircleAboutScreenProps {
  navigateTo: (screen: string, data?: any) => void;
  circle: any;
}

const highlightedListings = [
  {
    id: 1,
    title: 'Calculus Textbook',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    credits: 15
  },
  {
    id: 2,
    title: 'Mini Fridge',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400',
    credits: 0
  },
  {
    id: 3,
    title: 'Desk Chair',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    credits: 25
  }
];

export default function CircleAboutScreen({ navigateTo, circle }: CircleAboutScreenProps) {
  const { darkMode } = useDarkMode();
  const [isFollowing, setIsFollowing] = useState(circle.isJoined || false);

  const popularTags = ['Textbooks', 'Furniture', 'Electronics', 'Dorm'];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo('circle-feed', circle)}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
            >
              <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
            </button>
            <h2 className={`${darkMode ? 'text-white' : 'text-[#9333ea]'} font-semibold text-xl`}>About Circle</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Circle Header */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <div className="w-full h-32 rounded-2xl overflow-hidden mb-4">
            <img src={circle.coverImage} alt={circle.name} className="w-full h-full object-cover" />
          </div>
          
          <h1 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-2xl mb-2`}>{circle.name}</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-[#555]'} text-sm mb-4`}>{circle.description}</p>

          <div className="flex items-center gap-1 mb-4">
            <Users className="w-4 h-4 text-purple-500" />
            <span className={`${darkMode ? 'text-gray-400' : 'text-[#999]'} text-sm`}>{circle.activePosts} active posts</span>
          </div>

          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className={`w-full py-3 rounded-2xl font-semibold transition-all flex items-center justify-center mx-auto ${
              isFollowing
                ? `${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-white/60 border-white/60 text-[#555]'} border`
                : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
            }`}
          >
            {isFollowing ? 'Following' : 'Join Circle'}
          </button>
        </div>

        {/* Long Description */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-3`}>Description</h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-[#555]'} text-sm leading-relaxed`}>
            This circle is a community space for students to buy, sell, and trade items related to {circle.name.toLowerCase()}. 
            Join to discover great deals, connect with other students, and make sustainable choices by giving items a second life!
          </p>
        </div>

        {/* Guidelines */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-3`}>Guidelines</h3>
          <ul className={`${darkMode ? 'text-gray-300' : 'text-[#555]'} text-sm space-y-2`}>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>Only post items relevant to this circle's category</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>Be honest about item condition and include clear photos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>Meet in safe, public campus locations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500 font-medium">•</span>
              <span>Respect other members and communicate promptly</span>
            </li>
          </ul>
        </div>

        {/* Popular Tags */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg mb-3`}>Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <div
                key={tag}
                className={`${darkMode ? 'bg-purple-500/20 border-purple-500/40' : 'bg-purple-100/60 border-purple-200/60'} rounded-full px-3 py-1.5 border`}
              >
                <span className="text-purple-600 text-xs font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Listings */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg`}>Popular Listings</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {highlightedListings.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo('item-detail', item)}
                className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} rounded-xl border overflow-hidden hover:scale-105 transition-transform active:scale-95`}
              >
                <div className="aspect-square">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                  <p className={`${darkMode ? 'text-white' : 'text-[#222]'} text-xs font-medium line-clamp-1`}>{item.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
