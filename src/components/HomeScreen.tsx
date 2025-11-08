// import { useState } from 'react';
// import { Search, Bell, TrendingUp, Sparkles, Package, BookOpen, Armchair, Coins, ArrowLeftRight, Music, Shirt, Beaker, Laptop, UtensilsCrossed, PartyPopper, Briefcase, Paintbrush, Camera } from 'lucide-react';
// import PillToggle from './PillToggle';
// import { Badge } from './ui/badge';
// import { Avatar, AvatarFallback } from './ui/avatar';
// import ImageCarousel from './ImageCarousel';
// import BoxLogo from './BoxLogo';

// const allTags = ['Textbooks', 'Furniture', 'Apparel', 'Dorm', 'Lab/Tech', 'Electronics', 'Kitchen', 'Seasonal'];

// const mockListings = [
//   // Textbooks
//   {
//     id: 1,
//     title: 'Calculus Textbook',
//     description: 'Like new, minimal highlighting',
//     credits: 15,
//     images: [
//       'https://images.unsplash.com/photo-1707586234446-a1338e496161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0Ym9vayUyMHN0dWR5fGVufDF8fHx8MTc2MDkyMDM4OHww&ixlib=rb-4.1.0&q=80&w=1080',
//       'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1080',
//       'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=1080'
//     ],
//     tags: ['Textbooks'],
//     icon: BookOpen,
//     seller: { name: 'Sarah K.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 2,
//     title: 'Biology Lab Manual',
//     description: 'Spring semester edition, unused',
//     credits: 10,
//     images: [
//       'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1080',
//       'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1080'
//     ],
//     tags: ['Textbooks', 'Lab/Tech'],
//     icon: Beaker,
//     seller: { name: 'Nina P.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 3,
//     title: 'Chemistry Study Guide',
//     description: 'Perfect for finals prep',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=1080',
//       'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1080'
//     ],
//     tags: ['Textbooks'],
//     icon: BookOpen,
//     seller: { name: 'Tyler M.', verified: true },
//     isBarter: true
//   },
//   // Furniture
//   {
//     id: 4,
//     title: 'Desk Chair',
//     description: 'Ergonomic, great condition',
//     credits: 25,
//     images: [
//       'https://images.unsplash.com/photo-1636212644134-5867a3807ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTI2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
//       'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1080',
//       'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1080'
//     ],
//     tags: ['Furniture', 'Dorm'],
//     icon: Armchair,
//     seller: { name: 'Mike R.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 5,
//     title: 'Mini Bookshelf',
//     description: '3-tier, fits perfectly in dorms',
//     credits: 18,
//     images: [
//       'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1080',
//       'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1080'
//     ],
//     tags: ['Furniture', 'Dorm'],
//     icon: Armchair,
//     seller: { name: 'Jenna F.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 6,
//     title: 'Floor Lamp',
//     description: 'Modern design, adjustable height',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1080',
//       'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1080'
//     ],
//     tags: ['Furniture', 'Dorm'],
//     icon: Armchair,
//     seller: { name: 'Kevin L.', verified: false },
//     isBarter: true
//   },
//   // Apparel
//   {
//     id: 7,
//     title: 'Vintage Denim Jacket',
//     description: 'Size M, perfect for fall',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1648415041082-ced2cea26043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamFja2V0fGVufDF8fHx8MTc2MDgxNTI3NHww&ixlib=rb-4.1.0&q=80&w=1080',
//       'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1080',
//       'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1080'
//     ],
//     tags: ['Apparel'],
//     icon: Shirt,
//     seller: { name: 'Emma L.', verified: true },
//     isBarter: true
//   },
//   {
//     id: 8,
//     title: 'University Hoodie',
//     description: 'Size L, barely worn, school colors',
//     credits: 12,
//     images: [
//       'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1080',
//       'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1080'
//     ],
//     tags: ['Apparel'],
//     icon: Shirt,
//     seller: { name: 'Rachel B.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 9,
//     title: 'Winter Coat',
//     description: 'Warm, insulated, size S',
//     credits: 22,
//     images: [
//       'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1080',
//       'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1080'
//     ],
//     tags: ['Apparel', 'Seasonal'],
//     icon: Shirt,
//     seller: { name: 'Olivia W.', verified: true },
//     isBarter: false
//   },
//   // Dorm Essentials
//   {
//     id: 10,
//     title: 'Bedding Set',
//     description: 'Twin XL, includes sheets & comforter',
//     credits: 20,
//     images: [
//       'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1080',
//       'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1080'
//     ],
//     tags: ['Dorm'],
//     icon: Package,
//     seller: { name: 'Amy H.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 11,
//     title: 'Desk Organizer',
//     description: 'Multi-compartment, keeps desk tidy',
//     credits: 8,
//     images: [
//       'https://images.unsplash.com/photo-1578898887000-6f4df0891ea9?w=1080',
//       'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1080'
//     ],
//     tags: ['Dorm'],
//     icon: Briefcase,
//     seller: { name: 'Daniel S.', verified: false },
//     isBarter: false
//   },
//   {
//     id: 12,
//     title: 'Mini Fridge',
//     description: 'Compact, perfect for dorm rooms',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=1080',
//       'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1080'
//     ],
//     tags: ['Dorm'],
//     icon: Package,
//     seller: { name: 'Lucas G.', verified: true },
//     isBarter: true
//   },
//   // Lab/Tech
//   {
//     id: 13,
//     title: 'Lab Goggles',
//     description: 'Safety-rated, never used',
//     credits: 7,
//     images: [
//       'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=1080',
//       'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1080'
//     ],
//     tags: ['Lab/Tech'],
//     icon: Beaker,
//     seller: { name: 'Sophie D.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 14,
//     title: 'Graphing Calculator',
//     description: 'TI-84, works perfectly',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1585784564859-e8550b21f586?w=1080',
//       'https://images.unsplash.com/photo-1611532736573-628b56f7b01e?w=1080'
//     ],
//     tags: ['Lab/Tech'],
//     icon: Beaker,
//     seller: { name: 'Marcus T.', verified: true },
//     isBarter: true
//   },
//   // Electronics
//   {
//     id: 15,
//     title: 'Wireless Headphones',
//     description: 'Noise cancelling, works perfectly',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwbW9kZXJufGVufDF8fHx8MTc2MDkyMDM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
//       'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1080',
//       'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1080'
//     ],
//     tags: ['Electronics'],
//     icon: Music,
//     seller: { name: 'Chris M.', verified: true },
//     isBarter: true
//   },
//   {
//     id: 16,
//     title: 'Laptop Stand',
//     description: 'Aluminum, adjustable angles',
//     credits: 14,
//     images: [
//       'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1080',
//       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1080'
//     ],
//     tags: ['Electronics'],
//     icon: Laptop,
//     seller: { name: 'Brandon K.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 17,
//     title: 'Portable Charger',
//     description: '20000mAh, fast charging',
//     credits: 10,
//     images: [
//       'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1080',
//       'https://images.unsplash.com/photo-1591290619762-d4b9eb879ed5?w=1080'
//     ],
//     tags: ['Electronics'],
//     icon: Laptop,
//     seller: { name: 'Mia C.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 18,
//     title: 'Desk Lamp',
//     description: 'LED, adjustable brightness',
//     credits: 12,
//     images: [
//       'https://images.unsplash.com/photo-1621447980929-6638614633c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcHxlbnwxfHx8fDE3NjA5MjAzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
//       'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1080',
//       'https://images.unsplash.com/photo-1541009159795-d40d52c87f6b?w=1080'
//     ],
//     tags: ['Electronics', 'Dorm'],
//     icon: Sparkles,
//     seller: { name: 'Alex P.', verified: false },
//     isBarter: false
//   },
//   {
//     id: 19,
//     title: 'Bluetooth Speaker',
//     description: 'Waterproof, great sound quality',
//     credits: 16,
//     images: [
//       'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1080',
//       'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1080'
//     ],
//     tags: ['Electronics'],
//     icon: Music,
//     seller: { name: 'Ethan R.', verified: true },
//     isBarter: false
//   },
//   // Kitchen
//   {
//     id: 20,
//     title: 'Coffee Maker',
//     description: 'Single-serve, easy to clean',
//     credits: 18,
//     images: [
//       'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1080',
//       'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1080'
//     ],
//     tags: ['Kitchen', 'Dorm'],
//     icon: UtensilsCrossed,
//     seller: { name: 'Sophia R.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 21,
//     title: 'Microwave',
//     description: 'Compact, works great',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=1080',
//       'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1080'
//     ],
//     tags: ['Kitchen', 'Dorm'],
//     icon: UtensilsCrossed,
//     seller: { name: 'Jake W.', verified: true },
//     isBarter: true
//   },
//   {
//     id: 22,
//     title: 'Kitchen Utensil Set',
//     description: 'Complete set, barely used',
//     credits: 9,
//     images: [
//       'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1080',
//       'https://images.unsplash.com/photo-1565084888279-aca607ecce0a?w=1080'
//     ],
//     tags: ['Kitchen'],
//     icon: UtensilsCrossed,
//     seller: { name: 'Hannah J.', verified: false },
//     isBarter: false
//   },
//   // Seasonal
//   {
//     id: 23,
//     title: 'Holiday String Lights',
//     description: 'Perfect for dorm decoration',
//     credits: 6,
//     images: [
//       'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1080',
//       'https://images.unsplash.com/photo-1606328832893-88afd3fb6804?w=1080'
//     ],
//     tags: ['Seasonal', 'Dorm'],
//     icon: PartyPopper,
//     seller: { name: 'Lily A.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 24,
//     title: 'Halloween Decorations',
//     description: 'Spooky lights & props set',
//     credits: 8,
//     images: [
//       'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1080',
//       'https://images.unsplash.com/photo-1570921477374-bf2ab7b2e408?w=1080'
//     ],
//     tags: ['Seasonal'],
//     icon: PartyPopper,
//     seller: { name: 'Noah V.', verified: true },
//     isBarter: false
//   },
//   {
//     id: 25,
//     title: 'Art Supplies Kit',
//     description: 'Paints, brushes, & canvas included',
//     credits: 0,
//     images: [
//       'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1080',
//       'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1080'
//     ],
//     tags: ['Dorm'],
//     icon: Paintbrush,
//     seller: { name: 'Ava M.', verified: true },
//     isBarter: true
//   },
//   {
//     id: 26,
//     title: 'Polaroid Camera',
//     description: 'Instant film, vintage vibes',
//     credits: 28,
//     images: [
//       'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1080',
//       'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=1080'
//     ],
//     tags: ['Electronics'],
//     icon: Camera,
//     seller: { name: 'Isabella N.', verified: true },
//     isBarter: false
//   }
// ];

// export default function HomeScreen({ navigateTo, notificationCount = 0 }: any) {
//   const [mode, setMode] = useState<'credits' | 'barter'>('credits');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);

//   const toggleTag = (tag: string) => {
//     if (selectedTags.includes(tag)) {
//       setSelectedTags(selectedTags.filter(t => t !== tag));
//     } else {
//       setSelectedTags([...selectedTags, tag]);
//     }
//   };

//   const filteredListings = mockListings.filter(item => {
//     if (mode === 'barter' && !item.isBarter) return false;
//     if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
//     if (selectedTags.length > 0 && !item.tags.some(tag => selectedTags.includes(tag))) return false;
//     return true;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-8">
//       {/* Top Bar */}
//       <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 border-b border-white/30 shadow-sm">
//         <div className="max-w-md mx-auto px-4 py-4">
//           <div className="flex items-center justify-between mb-4">
//             {/* Logo Icon */}
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
//                 <BoxLogo className="text-white" size={20} />
//               </div>
//               <h1 className="text-[#9333ea] font-semibold">Snag</h1>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="backdrop-blur-xl bg-white/60 rounded-full px-3 py-1.5 border border-white/40 shadow-sm flex items-center gap-2">
//                 <Coins className="w-4 h-4 text-yellow-500" />
//                 <span className="text-[#222] font-medium">42</span>
//               </div>
//               <button
//                 onClick={() => navigateTo('notifications')}
//                 className="relative p-2 rounded-full hover:bg-white/50 transition-colors"
//               >
//                 <Bell className="w-6 h-6 text-[#222]" />
//                 {notificationCount > 0 && (
//                   <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="relative mb-3">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]" />
//             <input
//               type="text"
//               placeholder="Search items or descriptions"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 shadow-sm placeholder:text-[#888] text-[#222] focus:outline-none focus:ring-2 focus:ring-purple-400/50"
//             />
//           </div>

//           {/* Pill Toggle */}
//           <div className="mb-3">
//             <PillToggle value={mode} onChange={setMode} />
//           </div>

//           {/* Tag Filters */}
//           <div className="flex flex-wrap gap-2">
//             {allTags.map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => toggleTag(tag)}
//                 className={`px-3 py-1.5 rounded-full border transition-all text-sm font-medium ${
//                   selectedTags.includes(tag)
//                     ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5'
//                     : 'backdrop-blur-xl bg-white/60 text-[#555] border-white/60 hover:bg-white/80'
//                 }`}
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Listings Feed */}
//       <div className="max-w-md mx-auto px-4 mt-6 space-y-4">
//         {filteredListings.map((item) => (
//           <MarketplaceCard key={item.id} item={item} navigateTo={navigateTo} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function MarketplaceCard({ item, navigateTo }: any) {
//   const IconComponent = item.icon;

//   return (
//     <button
//       onClick={() => navigateTo('item-detail', item)}
//       className="w-full backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden hover:shadow-[0_12px_32px_rgba(139,92,246,0.2)] transition-all active:scale-[0.98]"
//     >
//       {/* Image Carousel */}
//       <div className="relative">
//         <ImageCarousel images={item.images} alt={item.title} />
//         {item.isBarter && (
//           <div className="absolute top-3 left-3 z-10">
//             <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5">
//               <ArrowLeftRight className="w-4 h-4" />
//               <span>Barter</span>
//             </Badge>
//           </div>
//         )}
//         {!item.isBarter && (
//           <div className="absolute top-3 right-3 z-10">
//             <div className="backdrop-blur-xl bg-white/90 rounded-full px-3 py-1.5 border border-white/60 shadow-md flex items-center gap-1.5">
//               <Coins className="w-4 h-4 text-yellow-500" />
//               <span className="text-[#222] font-medium">{item.credits}</span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4 text-left">
//         <h3 className="text-[#222] font-semibold mb-1">{item.title}</h3>
//         <p className="text-[#555] mb-3 text-sm">{item.description}</p>

//         {/* Tags */}
//         <div className="flex items-center gap-2 mb-3">
//           {item.tags.map((tag: string) => (
//             <div
//               key={tag}
//               className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1 border border-purple-200/60 flex items-center gap-1.5"
//             >
//               <IconComponent className="w-3.5 h-3.5 text-purple-600" />
//               <span className="text-purple-700 text-xs font-medium">{tag}</span>
//             </div>
//           ))}
//         </div>

//         {/* Seller Info */}
//         <div className="flex items-center gap-2">
//           <Avatar className="w-6 h-6">
//             <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-xs font-medium">
//               {item.seller.name.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//           <span className="text-[#555] text-sm">{item.seller.name}</span>
//           {item.seller.verified && (
//             <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
//               <span className="text-white text-[10px]">✓</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </button>
//   );
// }


import { useState } from 'react';
import { Search, Bell, TrendingUp, Sparkles, Package, BookOpen, Armchair, Coins, ArrowLeftRight, Music, Shirt, Beaker, Laptop, UtensilsCrossed, PartyPopper, Briefcase, Paintbrush, Camera } from 'lucide-react';
import PillToggle from './PillToggle';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import ImageCarousel from './ImageCarousel';
import BoxLogo from './BoxLogo';

const allTags = ['Textbooks', 'Furniture', 'Apparel', 'Dorm', 'Lab/Tech', 'Electronics', 'Kitchen', 'Seasonal'];

// (❗️ 중요 ❗️)
// 200줄이 넘던 const mockListings = [...] 변수를 여기서 삭제했습니다.

export default function HomeScreen({ navigateTo, notificationCount = 0, listings = [] }: any) { // ⬅️ 1. listings = [] 를 추가해서 데이터를 받습니다.
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

  // ⬅️ 2. mockListings.filter(...) 를 listings.filter(...) 로 변경했습니다.
  const filteredListings = listings.filter(item => {
    if (mode === 'barter' && !item.isBarter) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedTags.length > 0 && !item.tags.some((tag: string) => selectedTags.includes(tag))) return false;
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

          {/* Search Bar */}
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
        {/* 이제 filteredListings는 서버에서 온 'listings' 배열을 기반으로 합니다. */}
        {filteredListings.length > 0 ? (
          filteredListings.map((item: any) => (
            <MarketplaceCard key={item.id} item={item} navigateTo={navigateTo} />
          ))
        ) : (
          // (보너스) 물품이 없을 때 표시할 메시지
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
  // ❗️ item.icon 이 작동하지 않을 수 있습니다. 
  // 서버에서 'BookOpen' 같은 문자열을 보내면 아이콘 컴포넌트로 변환하는 로직이 필요합니다.
  // 지금은 'item.tags'에 의존하는 기존 로직을 임시로 사용합니다.
  const getIconByTag = (tags: string[]) => {
    if (tags.includes('Textbooks')) return BookOpen;
    if (tags.includes('Furniture')) return Armchair;
    if (tags.includes('Apparel')) return Shirt;
    if (tags.includes('Lab/Tech')) return Beaker;
    if (tags.includes('Electronics')) return Laptop;
    if (tags.includes('Kitchen')) return UtensilsCrossed;
    if (tags.includes('Seasonal')) return PartyPopper;
    if (tags.includes('Dorm')) return Package;
    return Package; // 기본 아이콘
  };

  // 'item.icon' 대신 태그 기반으로 아이콘을 가져옵니다.
  const IconComponent = getIconByTag(item.tags || []);

  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className="w-full backdrop-blur-xl bg-white/10 rounded-3xl border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden hover:shadow-[0_12px_32px_rgba(139,92,246,0.2)] transition-all active:scale-[0.98]"
    >
      {/* Image Carousel */}
      <div className="relative">
        {/* 서버에서 'images'가 배열이 아닐 수 있으므로 방어 코드를 추가합니다. */}
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
        {/* 서버에서 'tags'가 배열이 아닐 수 있으므로 방어 코드를 추가합니다. */}
        {Array.isArray(item.tags) && item.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {item.tags.map((tag: string) => (
              <div
                key={tag}
                className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1 border border-purple-200/60 flex items-center gap-1.5"
              >
                {/* IconComponent가 유효한지 확인합니다. */}
                {IconComponent && <IconComponent className="w-3.5 h-3.5 text-purple-600" />}
                <span className="text-purple-700 text-xs font-medium">{tag}</span>
              </div>
            ))}
          </div>
        )}

        {/* Seller Info */}
        {/* 서버에서 'seller' 객체가 없을 수 있으므로 방어 코드를 추가합니다. */}
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