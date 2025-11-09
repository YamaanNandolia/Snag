import { useState } from 'react';
import { Search, Bell, TrendingUp, Sparkles, Package, BookOpen, Armchair, Coins, ArrowLeftRight, Music, Shirt, Beaker, Laptop, UtensilsCrossed, PartyPopper, Briefcase, Paintbrush, Camera } from 'lucide-react';
import PillToggle from './PillToggle';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import ImageCarousel from './ImageCarousel';
import BoxLogo from './BoxLogo';

const allTags = ['Textbooks', 'Furniture', 'Apparel', 'Dorm', 'Lab/Tech', 'Electronics', 'Kitchen', 'Seasonal'];

export default function HomeScreen({ navigateTo, notificationCount = 0, listings = [] }: any) { 
  const [mode, setMode] = useState<'credits' | 'barter'>('credits');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };


  const filteredListings = listings.filter(item => {
    if (mode === 'barter' && !item.isBarter) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedTags.length > 0) {
      if (!Array.isArray(item.tags) || item.tags.length === 0) {
        return false;
      }
      
      const hasMatchingTag = item.tags.some((tag: string) => selectedTags.includes(tag));
      if (!hasMatchingTag) {
        return false; 
      }
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-8">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 border-b border-white/30 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Logo Icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <BoxLogo className="text-white" size={20} />
              </div>
              <h1 className="text-[#9333ea] font-semibold">Snag</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="backdrop-blur-xl bg-white/60 rounded-full px-3 py-1.5 border border-white/40 shadow-sm flex items-center gap-2">
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className="text-[#222] font-medium">42</span>
              </div>
              <button
                onClick={() => navigateTo('notifications')}
                className="relative p-2 rounded-full hover:bg-white/50 transition-colors"
              >
                <Bell className="w-6 h-6 text-[#222]" />
                {notificationCount > 0 && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]" />
            <input
              type="text"
              placeholder="Search items or descriptions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            />
          </div>

          {/* Pill Toggle */}
          <div className="mb-3">
            <PillToggle value={mode} onChange={setMode} />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full border transition-all text-sm font-medium ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5'
                    : 'backdrop-blur-xl bg-white/60 text-[#555] border-white/60 hover:bg-white/80'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings Feed */}
      <div className="max-w-md mx-auto px-4 mt-6 space-y-4">
        {filteredListings.length > 0 ? (
          filteredListings.map((item: any) => (
            <MarketplaceCard key={item.id} item={item} navigateTo={navigateTo} />
          ))
        ) : (
          <div className="text-center text-gray-500 pt-10">
            <Package className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No items found</h3>
            <p className="mt-1 text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MarketplaceCard({ item, navigateTo }: any) {
  const getIconByTag = (tags: string[]) => {
    if (tags.includes('Textbooks')) return BookOpen;
    if (tags.includes('Furniture')) return Armchair;
    if (tags.includes('Apparel')) return Shirt;
    if (tags.includes('Lab/Tech')) return Beaker;
    if (tags.includes('Electronics')) return Laptop;
    if (tags.includes('Kitchen')) return UtensilsCrossed;
    if (tags.includes('Seasonal')) return PartyPopper;
    if (tags.includes('Dorm')) return Package;
    return Package;
  };

  const IconComponent = getIconByTag(item.tags || []);

  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className="w-full backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden hover:shadow-[0_12px_32px_rgba(139,92,246,0.2)] transition-all active:scale-[0.98]"
    >
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={Array.isArray(item.images) ? item.images : [item.image]} alt={item.title} />
        {item.isBarter && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5">
              <ArrowLeftRight className="w-4 h-4" />
              <span>Barter</span>
            </Badge>
          </div>
        )}
        {!item.isBarter && (
          <div className="absolute top-3 right-3 z-10">
            <div className="backdrop-blur-xl bg-white/90 rounded-full px-3 py-1.5 border border-white/60 shadow-md flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-yellow-500" />
              <span className="text-[#222] font-medium">{item.credits}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 text-left">
        <h3 className="text-[#222] font-semibold mb-1">{item.title}</h3>
        <p className="text-[#555] mb-3 text-sm">{item.description}</p>

        {/* Tags */}
        {Array.isArray(item.tags) && item.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {item.tags.map((tag: string) => (
              <div
                key={tag}
                className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1 border border-purple-200/60 flex items-center gap-1.5"
              >
                {IconComponent && <IconComponent className="w-3.5 h-3.5 text-purple-600" />}
                <span className="text-purple-700 text-xs font-medium">{tag}</span>
              </div>
            ))}
          </div>
        )}

        {/* Seller Info */}
        {item.seller && (
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-xs font-medium">
                {item.seller.name ? item.seller.name.charAt(0) : '?'}
              </AvatarFallback>
            </Avatar>
            <span className="text-[#555] text-sm">{item.seller.name || 'Unknown User'}</span>
            {item.seller.verified && (
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-[10px]">✓</span>
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  );
}