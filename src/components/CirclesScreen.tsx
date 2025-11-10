import { Search, Plus, Users } from 'lucide-react';

// 이미지에 보이는 목업(mock) 데이터
const mockYourCircles = [
  {
    id: 1,
    name: 'Move-Out Sale 2025',
    description: 'Graduating seniors selling...',
    members: 128,
    image: 'https://images.unsplash.com/photo-1636212644134-5867a3807ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTI2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Textbook Exchange',
    description: 'Trade or sell textbooks for all majors',
    members: 94,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1080',
  },
];

const mockAllCircles = [
  ...mockYourCircles,
  {
    id: 3,
    name: 'Tech & Electronics',
    description: 'Laptops, phones, headphones, and more',
    members: 67,
    image: 'https://plus.unsplash.com/premium_photo-1679913792906-13f6f6b4a18d?w=1080',
  },
  {
    id: 4,
    name: 'Dorm Furniture',
    description: 'Chairs, desks, shelves for dorm rooms',
    members: 52,
    image: 'https://images.unsplash.com/photo-1636212644134-5867a3807ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTI2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Winter Apparel',
    description: 'Coats, boots, and warm accessories',
    members: 78,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1080',
  }
];

// Circle 카드를 위한 재사용 컴포넌트
function CircleCard({ circle, isFollowing = false, navigateTo }: any) {
  return (
    <button 
      // onClick={() => navigateTo('circle-detail', circle)} 
      className="flex items-center gap-4 p-3 backdrop-blur-xl bg-white/70 rounded-2xl border border-white/60 shadow-sm w-full"
    >
      <img src={circle.image} alt={circle.name} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex-1 text-left">
        <h4 className="font-semibold text-[#222]">{circle.name}</h4>
        <p className="text-sm text-[#555] truncate">{circle.description}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <Users className="w-3.5 h-3.5 text-[#888]" />
          <span className="text-xs text-[#555]">{circle.members} active posts</span>
        </div>
      </div>
      {isFollowing && (
        <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100/60 text-purple-600 border border-purple-200/60">
          Following
        </button>
      )}
    </button>
  );
}

export default function CirclesScreen({ navigateTo }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-24">
      {/* Header Area */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 pt-4 pb-3">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-semibold text-[#222]">Circles</h2>
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]" />
            <input
              type="text"
              placeholder="Search circles..."
              className="w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            />
          </div>
          {/* Create Button */}
          <button 
            // onClick={() => navigateTo('create-circle')}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create a Circle</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-md mx-auto px-4 mt-6 space-y-6">
        {/* Your Circles */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#222]">Your Circles</h3>
          <div className="space-y-3">
            {mockYourCircles.map(circle => (
              <CircleCard 
                key={circle.id} 
                circle={circle} 
                isFollowing={true} 
                navigateTo={navigateTo} 
              />
            ))}
          </div>
        </div>

        {/* All Circles */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#222]">All Circles</h3>
          <div className="space-y-3">
            {mockAllCircles.map(circle => (
              <CircleCard 
                key={circle.id} 
                circle={circle} 
                isFollowing={false} // 'All Circles' 에는 'Following' 버튼이 없음
                navigateTo={navigateTo} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}