// import { ArrowLeft, Star, MapPin, Calendar, Coins, ArrowLeftRight, Shield } from 'lucide-react';
// import { Avatar, AvatarFallback } from './ui/avatar';
// import { Badge } from './ui/badge';
// import ImageCarousel from './ImageCarousel';

// export default function ItemDetailScreen({ item, navigateTo }: any) {
//   if (!item) return null;

//   const IconComponent = item.icon;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
//       {/* Header */}
//       <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
//         <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
//           <button
//             onClick={() => navigateTo('home')}
//             className="p-2 rounded-full hover:bg-white/50 transition-colors"
//           >
//             <ArrowLeft className="w-6 h-6 text-[#222]" />
//           </button>
//           <h2 className="text-[#9333ea] font-semibold text-xl">Item Details</h2>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-md mx-auto pb-32">
//         {/* Image Carousel */}
//         <div className="relative">
//           <ImageCarousel 
//             images={item.images || [item.image]} 
//             alt={item.title}
//             aspectRatio="aspect-square"
//           />
//           {item.isBarter ? (
//             <div className="absolute top-4 left-4 z-10">
//               <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5">
//                 <ArrowLeftRight className="w-4 h-4" />
//                 <span>Barter Only</span>
//               </Badge>
//             </div>
//           ) : (
//             <div className="absolute top-4 right-4 z-10">
//               <div className="backdrop-blur-xl bg-white/90 rounded-2xl px-4 py-2.5 border border-white/60 shadow-lg">
//                 <div className="flex items-center gap-2">
//                   <Coins className="w-5 h-5 text-yellow-500" />
//                   <span className="text-[#222] font-semibold">{item.credits} Credits</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Details Card */}
//         <div className="p-4 space-y-4">
//           <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
//             <h1 className="text-[#222] font-semibold mb-2">{item.title}</h1>
//             <p className="text-[#555] mb-4">{item.description}</p>

//             {/* Tags */}
//             <div className="flex items-center gap-2 mb-6">
//               {item.tags.map((tag: string) => (
//                 <div
//                   key={tag}
//                   className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5"
//                 >
//                   <IconComponent className="w-4 h-4 text-purple-600" />
//                   <span className="text-purple-700 text-sm font-medium">{tag}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Seller Info */}
//             <div className="flex items-center justify-between pt-4 border-t border-purple-200/40">
//               <div className="flex items-center gap-3">
//                 <Avatar className="w-10 h-10">
//                   <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white font-medium">
//                     {item.seller.name.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-[#222] font-medium">{item.seller.name}</span>
//                     {item.seller.verified && (
//                       <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//                         <span className="text-white text-xs">✓</span>
//                       </div>
//                     )}
//                   </div>
//                   <p className="text-[#888] text-sm font-light">Active seller</p>
//                 </div>
//               </div>
//               <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
//                 <Shield className="w-4 h-4 text-purple-600" />
//                 <span className="text-purple-700 text-sm font-medium">98%</span>
//               </div>
//             </div>
//           </div>

//           {/* Additional Info */}
//           <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
//                 <MapPin className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-[#888] text-sm font-light">Pickup Location</p>
//                 <p className="text-[#222] font-medium">Main Campus Library Lobby</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
//                 <Calendar className="w-5 h-5 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-[#888] text-sm font-light">Posted</p>
//                 <p className="text-[#222] font-medium">2 days ago</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Fixed Bottom CTA */}
//       <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
//         <div className="max-w-md mx-auto">
//           {item.isBarter ? (
//             <button
//               onClick={() => navigateTo('barter-offer', item)}
//               className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
//             >
//               <ArrowLeftRight className="w-5 h-5" strokeWidth={2.5} />
//               <span>Offer to Barter</span>
//             </button>
//           ) : (
//             <button
//               onClick={() => navigateTo('meeting', item)}
//               className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
//             >
//               <Coins className="w-5 h-5" strokeWidth={2.5} />
//               <span>Snag Now · {item.credits} Credits</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// 1. (새로 추가!) 태그에 필요한 아이콘들을 모두 import 합니다.
import { 
  ArrowLeft, Star, MapPin, Calendar, Coins, ArrowLeftRight, Shield,
  BookOpen, Armchair, Shirt, Beaker, Laptop, UtensilsCrossed, PartyPopper, Package 
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import ImageCarousel from './ImageCarousel';

// 2. (새로 추가!) HomeScreen에서 사용했던 아이콘 헬퍼 함수를 여기에 복사합니다.
const getIconByTag = (tags: string[]) => {
  if (!Array.isArray(tags)) return Package; // 데이터가 배열이 아닐 경우 기본값
  if (tags.includes('Textbook')) return BookOpen;
  if (tags.includes('Furniture')) return Armchair;
  if (tags.includes('Apparel')) return Shirt;
  if (tags.includes('Lab/Tech')) return Beaker;
  if (tags.includes('Electronics')) return Laptop;
  if (tags.includes('Kitchen')) return UtensilsCrossed;
  if (tags.includes('Seasonal')) return PartyPopper;
  if (tags.includes('Dorm')) return Package;
  return Package; // 기본 아이콘
};

export default function ItemDetailScreen({ item, navigateTo }: any) {
  if (!item) return null;

  // 3. (수정!) item.icon 대신, 태그로부터 아이콘을 "찾아냅니다".
  const IconComponent = getIconByTag(item.tags);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('home')}
            className="p-2 rounded-full hover:bg-white/50 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#222]" />
          </button>
          <h2 className="text-[#9333ea] font-semibold text-xl">Item Details</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto pb-32">
        {/* Image Carousel */}
        <div className="relative">
          <ImageCarousel 
            // 4. (수정!) item.images가 배열인지, item.image가 단일 문자열인지 모두 대비합니다.
            images={Array.isArray(item.images) ? item.images : [item.image]} 
            alt={item.title}
            aspectRatio="aspect-square"
          />
          {item.isBarter ? (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Barter Only</span>
              </Badge>
            </div>
          ) : (
            <div className="absolute top-4 right-4 z-10">
              <div className="backdrop-blur-xl bg-white/90 rounded-2xl px-4 py-2.5 border border-white/60 shadow-lg">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className="text-[#222] font-semibold">{item.credits} Credits</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Details Card */}
        <div className="p-4 space-y-4">
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)]">
            {/* 5. (수정!) 데이터가 없을 경우를 대비해 || '기본값'을 추가합니다. */}
            <h1 className="text-[#222] font-semibold mb-2">{item.title || 'No Title'}</h1>
            <p className="text-[#555] mb-4">{item.description || 'No description provided.'}</p>

            {/* Tags */}
            {/* 6. (수정!) item.tags가 배열이 맞는지 확인하고 렌더링합니다. */}
            {Array.isArray(item.tags) && item.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                {item.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5"
                  >
                    {/* 이제 IconComponent는 'BookOpen' 같은 실제 컴포넌트입니다. */}
                    {IconComponent && <IconComponent className="w-4 h-4 text-purple-600" />}
                    <span className="text-purple-700 text-sm font-medium">{tag}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Seller Info */}
            {/* 7. (수정!) item.seller가 존재하는지 확인하고 렌더링합니다. */}
            {item.seller && (
              <div className="flex items-center justify-between pt-4 border-t border-purple-200/40">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white font-medium">
                      {item.seller.name ? item.seller.name.charAt(0) : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#222] font-medium">{item.seller.name}</span>
                      {item.seller.verified && (
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[#888] text-sm font-light">Active seller</p>
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-purple-700 text-sm font-medium">98%</span>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-6 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-[#888] text-sm font-light">Pickup Location</p>
                {/* 8. (수정!) 하드코딩된 값 대신 item.meetingSpot을 사용합니다. */}
                <p className="text-[#222] font-medium">{item.meetingSpot || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-[#888] text-sm font-light">Posted</p>
                <p className="text-[#222] font-medium">{item.postedTime || 'Recently'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-2xl bg-white/70 border-t border-white/40 p-4">
        <div className="max-w-md mx-auto">
          {item.isBarter ? (
            <button
              onClick={() => navigateTo('barter-offer', item)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-5 h-5" strokeWidth={2.5} />
              <span>Offer to Barter</span>
            </button>
          ) : (
            <button
              onClick={() => navigateTo('meeting', item)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Coins className="w-5 h-5" strokeWidth={2.5} />
              <span>Snag Now · {item.credits} Credits</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}