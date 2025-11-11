import { useState } from 'react';
import { ArrowLeft, Info, Coins, ArrowLeftRight, Grid3x3, List } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useDarkMode } from '../contexts/DarkModeContext';

interface CircleFeedScreenProps {
  navigateTo: (screen: string, data?: any) => void;
  circle: any;
  customTags?: string[];
  onAddCustomTag?: (tag: string) => void;
  onRemoveCustomTag?: (tag: string) => void;
}

const mockListings = [
  {
    id: 1,
    title: 'Calculus Textbook',
    description: 'Like new condition',
    credits: 15,
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400'],
    tags: ['Textbooks'],
    seller: { name: 'Sarah K.', verified: true, trustScore: 4.8, trades: 24 },
    isTrade: false
  },
  {
    id: 2,
    title: 'Mini Fridge',
    description: 'Perfect for dorm',
    credits: 0,
    images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400'],
    tags: ['Dorm'],
    seller: { name: 'Alex P.', verified: true, trustScore: 5.0, trades: 18 },
    isTrade: true
  },
  {
    id: 3,
    title: 'Desk Chair',
    description: 'Ergonomic, great condition',
    credits: 25,
    images: ['https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400'],
    tags: ['Furniture'],
    seller: { name: 'Mike R.', verified: true, trustScore: 4.9, trades: 31 },
    isTrade: false
  }
];

export default function CircleFeedScreen({ navigateTo, circle, customTags = [], onAddCustomTag, onRemoveCustomTag }: CircleFeedScreenProps) {
  const { darkMode } = useDarkMode();
  const [isFollowing, setIsFollowing] = useState(circle.isJoined || false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');

  const circleTags = ['Textbooks', 'Furniture', 'Electronics', 'Dorm', 'Apparel'];
  const allTags = [...circleTags, ...customTags];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleAddCustomTag = () => {
    if (newTagInput.trim() && onAddCustomTag) {
      onAddCustomTag(newTagInput.trim());
      setNewTagInput('');
    }
  };

  const filteredListings = selectedTags.length > 0
    ? mockListings.filter(item => item.tags.some(tag => selectedTags.includes(tag)))
    : mockListings;

  const hasNoPosts = circle.activePosts === 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'} pb-8`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigateTo('circles-home')}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
            >
              <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
            </button>
            <h2 className={`${darkMode ? 'text-white' : 'text-[#9333ea]'} font-semibold text-xl flex-1`}>{circle.name}</h2>
            <button
              onClick={() => navigateTo('circle-about', circle)}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
            >
              <Info className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
            </button>
          </div>

          {/* Circle Info */}
          <div className="mb-4">
            <p className={`${darkMode ? 'text-gray-400' : 'text-[#555]'} text-sm mb-3`}>{circle.description}</p>
            <div className="flex items-center justify-between">
              <span className={`${darkMode ? 'text-gray-400' : 'text-[#999]'} text-sm`}>{circle.activePosts} posts</span>
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  isFollowing
                    ? `${darkMode ? 'bg-white/10 border-white/20 text-white' : 'bg-white/60 border-white/60 text-[#555]'} border`
                    : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                }`}
              >
                {isFollowing ? 'Following' : 'Join Circle'}
              </button>
            </div>
          </div>

          {/* Unified Tag Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                    : `${darkMode ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-white/60 border-white/60 text-[#555]'} border`
                }`}
              >
                {tag}
              </button>
            ))}
            <div className="relative">
              <input
                type="text"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                placeholder="Add new tag"
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  darkMode ? 'bg-white/10 border-white/20 text-gray-300' : 'bg-white/60 border-white/60 text-[#555]'
                } border`}
              />
              <button
                onClick={handleAddCustomTag}
                className={`absolute right-2 top-1.5 p-1.5 rounded-full transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-[#555]'
                }`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-end gap-1">
            <div className={`flex items-center gap-1 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} border rounded-full p-0.5`}>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : `${darkMode ? 'text-gray-400' : 'text-[#555]'}`
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : `${darkMode ? 'text-gray-400' : 'text-[#555]'}`
                }`}
              >
                <Grid3x3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-md mx-auto px-4 mt-4">
        {hasNoPosts ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-8 border shadow-[0_8px_24px_rgba(139,92,246,0.12)] text-center space-y-4`}>
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-lg`}>No posts yet</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-[#555]'} text-sm`}>Be the first to add a post to this circle!</p>
              <button
                onClick={() => navigateTo('create', { prefilledCircle: circle })}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center mx-auto"
              >
                Post in This Circle
              </button>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredListings.map((item) => (
              <CircleListingCard key={item.id} item={item} navigateTo={navigateTo} darkMode={darkMode} circleName={circle.name} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredListings.map((item) => (
              <CircleGridCard key={item.id} item={item} navigateTo={navigateTo} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CircleListingCard({ item, navigateTo, darkMode, circleName }: any) {
  return (
    <button
      onClick={() => navigateTo('item-detail', { ...item, circle: circleName })}
      className={`w-full backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] transition-all active:scale-[0.98]`}
    >
      <div className="relative h-40">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        {item.isTrade && (
          <div className="absolute top-2 left-2">
            <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5 py-1">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="text-xs">Trade</span>
            </Badge>
          </div>
        )}
        {!item.isTrade && (
          <div className="absolute top-2 right-2">
            <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/20' : 'bg-white/90'} rounded-full px-2.5 py-1 border ${darkMode ? 'border-white/30' : 'border-white/60'} shadow-md flex items-center gap-1`}>
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className={`${darkMode ? 'text-white' : 'text-[#222]'} text-sm font-medium`}>{item.credits}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 text-left">
        <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-sm mb-2 line-clamp-2`}>{item.title}</h3>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateTo('user-profile', item.seller);
          }}
          className="flex items-center gap-1.5 mb-2 hover:opacity-80 transition-opacity"
        >
          <Avatar className="w-5 h-5">
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-[10px] font-medium">
              {item.seller.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className={`${darkMode ? 'text-gray-400' : 'text-[#555]'} text-xs`}>{item.seller.name}</span>
          {item.seller.verified && (
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          )}
          <span className={`${darkMode ? 'text-gray-500' : 'text-[#999]'} text-xs`}>• {item.seller.trustScore} ⭐</span>
        </button>

        <div className={`${darkMode ? 'bg-purple-500/20 border-purple-500/40' : 'bg-purple-100/60 border-purple-200/60'} rounded-full px-2 py-0.5 border inline-flex items-center gap-1 w-fit`}>
          <span className="text-purple-600 text-[10px] font-medium">Circle: {circleName}</span>
        </div>
      </div>
    </button>
  );
}

function CircleGridCard({ item, navigateTo, darkMode }: any) {
  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] transition-all active:scale-[0.98]`}
    >
      <div className="relative aspect-square">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        {item.isTrade && (
          <div className="absolute top-2 left-2">
            <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-md font-medium flex items-center gap-1 py-0.5 px-2">
              <ArrowLeftRight className="w-3 h-3" />
              <span className="text-[10px]">Trade</span>
            </Badge>
          </div>
        )}
        {!item.isTrade && (
          <div className="absolute top-2 right-2">
            <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/20' : 'bg-white/90'} rounded-full px-2 py-0.5 border ${darkMode ? 'border-white/30' : 'border-white/60'} shadow-md flex items-center gap-0.5`}>
              <Coins className="w-3 h-3 text-yellow-500" />
              <span className={`${darkMode ? 'text-white' : 'text-[#222]'} text-xs font-medium`}>{item.credits}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-2.5">
        <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'} font-semibold text-xs mb-1 line-clamp-2`}>{item.title}</h3>
        <div className="flex items-center gap-1">
          <span className={`${darkMode ? 'text-gray-400' : 'text-[#999]'} text-[10px]`}>{item.seller.trustScore} ⭐</span>
        </div>
      </div>
    </button>
  );
}