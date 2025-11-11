import { useState } from 'react';
import { ArrowLeftRight, Coins, Grid3x3, List, Search } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import ImageCarousel from './ImageCarousel';
import { useDarkMode } from '../contexts/DarkModeContext';

const allTags = ['Textbooks', 'Furniture', 'Apparel', 'Dorm', 'Lab/Tech', 'Electronics', 'Kitchen', 'Seasonal'];

const eventFilters = [
  { id: 'halloween', label: 'Halloween', color: 'from-orange-500 to-orange-600' },
  { id: 'finals', label: 'Finals', color: 'from-blue-500 to-blue-600' },
  { id: 'movein', label: 'Move-Out', color: 'from-green-500 to-green-600' },
  { id: 'graduation', label: 'Graduation', color: 'from-purple-500 to-purple-600' }
];

// Mock trade listings data
const tradeListings = [
  {
    id: 1,
    title: 'Vintage Denim Jacket',
    description: 'Size M, excellent condition',
    credits: 0,
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'],
    tags: ['Apparel', 'Vintage'],
    seller: { name: 'Emma L.', verified: true, trustScore: 4.8, trades: 24 },
    location: 'Main Library',
    postedTime: '2h ago',
    isBarter: true,
    eventTag: 'halloween'
  },
  {
    id: 2,
    title: 'Graphing Calculator',
    description: 'TI-84 Plus, like new',
    credits: 0,
    images: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400'],
    tags: ['Electronics', 'School'],
    seller: { name: 'Alex P.', verified: true, trustScore: 4.9, trades: 31 },
    location: 'Student Union',
    postedTime: '5h ago',
    isBarter: true,
    eventTag: 'finals'
  },
  {
    id: 3,
    title: 'Mini Fridge',
    description: 'Perfect for dorm, works great',
    credits: 0,
    images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400'],
    tags: ['Furniture', 'Dorm'],
    seller: { name: 'Sarah K.', verified: true, trustScore: 5.0, trades: 18 },
    location: 'Campus Center',
    postedTime: '1d ago',
    isBarter: true,
    eventTag: 'movein'
  },
  {
    id: 4,
    title: 'Textbook Bundle',
    description: 'Engineering 101-103 set',
    credits: 0,
    images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'],
    tags: ['Textbooks', 'School'],
    seller: { name: 'Jordan T.', verified: true, trustScore: 4.7, trades: 15 },
    location: 'Library Entrance',
    postedTime: '3h ago',
    isBarter: true,
    eventTag: 'graduation'
  }
];

export default function TradeScreen({ navigateTo }: any) {
  const { darkMode } = useDarkMode();
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(e => e !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredListings = tradeListings.filter(item => {
    if (selectedEvents.length > 0 && !selectedEvents.includes(item.eventTag)) return false;
    if (selectedTags.length > 0 && !item.tags.some(tag => selectedTags.includes(tag))) return false;
    return true;
  });

  return (
    <div className={`min-h-screen pb-8 ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-2xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/70 border-white/40'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className={`font-semibold text-xl ${darkMode ? 'text-purple-400' : 'text-[#9333ea]'}`}>Trade</h1>
        </div>
      </div>

      {/* Search & Controls */}
      <div className="max-w-md mx-auto px-4 pt-4 pb-3 space-y-3">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-[#999]'}`} />
          <input
            type="text"
            placeholder="Search trade items..."
            className={`w-full backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/60 border-white/60 text-[#222] placeholder:text-[#999]'} border rounded-full pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>

        {/* Event Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {eventFilters.map((event) => (
            <button
              key={event.id}
              onClick={() => toggleEvent(event.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedEvents.includes(event.id)
                  ? 'bg-gradient-to-r ' + event.color + ' text-white shadow-md'
                  : darkMode
                    ? 'bg-white/10 text-gray-300 border border-white/20'
                    : 'bg-white/60 text-[#555] border border-white/60'
              }`}
            >
              {event.label}
            </button>
          ))}
        </div>

        {/* Tag Bar & View Toggle */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full border transition-all text-sm font-medium whitespace-nowrap ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-md'
                      : darkMode
                        ? 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/15'
                        : 'bg-white/60 text-[#555] border-white/60 hover:bg-white/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex items-center gap-1 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} border rounded-full p-1 flex-shrink-0`}>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'list' ? 'bg-purple-600 text-white' : darkMode ? 'text-gray-300' : 'text-[#555]'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-colors ${
                viewMode === 'grid' ? 'bg-purple-600 text-white' : darkMode ? 'text-gray-300' : 'text-[#555]'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-md mx-auto px-4 pb-4">
        {viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredListings.map((item) => (
              <TradeListingCard key={item.id} item={item} navigateTo={navigateTo} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredListings.map((item) => (
              <TradeGridCard key={item.id} item={item} navigateTo={navigateTo} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TradeListingCard({ item, navigateTo, darkMode }: any) {
  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className={`w-full backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/70 border-white/60 hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)]'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden transition-all active:scale-[0.98]`}
    >
      {/* Image */}
      <div className="relative h-40">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2">
          <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5 py-1">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span className="text-xs">Trade</span>
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 text-left">
        <h3 className={`font-semibold text-sm mb-1 line-clamp-1 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.title}</h3>
        
        {/* Seller with Trust Score */}
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
          <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>{item.seller.name}</span>
          {item.seller.verified && (
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          )}
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-[#999]'}`}>• {item.seller.trustScore} ⭐ • {item.seller.trades} trades</span>
        </button>

        {/* Location & Time */}
        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-[#999]'}`}>{item.location} • {item.postedTime}</p>
      </div>
    </button>
  );
}

function TradeGridCard({ item, navigateTo, darkMode }: any) {
  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/70 border-white/60 hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)]'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden transition-all active:scale-[0.98]`}
    >
      {/* Image */}
      <div className="relative aspect-square">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2">
          <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-md font-medium flex items-center gap-1 py-0.5 px-2">
            <ArrowLeftRight className="w-3 h-3" />
            <span className="text-[10px]">Trade</span>
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5">
        <h3 className={`font-semibold text-xs mb-1 line-clamp-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.title}</h3>
        <div className="flex items-center gap-1">
          <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-[#999]'}`}>{item.seller.trustScore} ⭐</span>
          <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-[#999]'}`}>• {item.seller.trades}</span>
        </div>
      </div>
    </button>
  );
}
