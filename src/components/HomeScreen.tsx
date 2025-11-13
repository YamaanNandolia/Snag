import {useEffect, useState} from 'react';
import { Search, Bell, TrendingUp, Sparkles, Package, BookOpen, Armchair, Coins, ArrowLeftRight, Music, Shirt, Beaker, Laptop, UtensilsCrossed, PartyPopper, Briefcase, Paintbrush, Camera, Grid3x3, List, X } from 'lucide-react';
import PillToggle from './PillToggle';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import ImageCarousel from './ImageCarousel';
import BoxLogo from './BoxLogo';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useCredits } from "../contexts/CreditContext";
//for something else:
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import SnagLogo from '../assets/Snag.png';

const ICON_MAP: Record<string, React.ElementType> = {
    BookOpen,
    Armchair,
    Package,
    Beaker,
    Music,
    Shirt,
    Laptop,
    Sparkles,
    UtensilsCrossed,
    PartyPopper,
    Briefcase,
    Paintbrush,
    Camera,
};

const allTags = ['Textbooks', 'Furniture', 'Apparel', 'Dorm', 'Lab/Tech', 'Electronics', 'Kitchen', 'Seasonal'];

let mockListings = [
  // Textbooks

  {
    id: 1,
    title: 'Calculus Textbook',
    description: 'Like new, minimal highlighting',
    credits: 15,
    images: [
      'https://images.unsplash.com/photo-1707586234446-a1338e496161?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0Ym9vayUyMHN0dWR5fGVufDF8fHx8MTc2MDkyMDM4OHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1080',
      'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=1080'
    ],
    tags: ['Textbooks'],
    icon: BookOpen,
    seller: { name: 'Sarah K.', verified: true },
    isBarter: false
  },
    /*
  {
    id: 2,
    title: 'Biology Lab Manual',
    description: 'Spring semester edition, unused',
    credits: 10,
    images: [
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1080',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1080'
    ],
    tags: ['Textbooks', 'Lab/Tech'],
    icon: Beaker,
    seller: { name: 'Nina P.', verified: true },
    isBarter: false
  },
  {
    id: 3,
    title: 'Chemistry Study Guide',
    description: 'Perfect for finals prep',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=1080',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1080'
    ],
    tags: ['Textbooks'],
    icon: BookOpen,
    seller: { name: 'Tyler M.', verified: true },
    isBarter: true
  },
  // Furniture
  {
    id: 4,
    title: 'Desk Chair',
    description: 'Ergonomic, great condition',
    credits: 25,
    images: [
      'https://images.unsplash.com/photo-1636212644134-5867a3807ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjA4MTI2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1080',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1080'
    ],
    tags: ['Furniture', 'Dorm'],
    icon: Armchair,
    seller: { name: 'Mike R.', verified: true },
    isBarter: false
  },
  {
    id: 5,
    title: 'Mini Bookshelf',
    description: '3-tier, fits perfectly in dorms',
    credits: 18,
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1080',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1080'
    ],
    tags: ['Furniture', 'Dorm'],
    icon: Armchair,
    seller: { name: 'Jenna F.', verified: true },
    isBarter: false
  },
  {
    id: 6,
    title: 'Floor Lamp',
    description: 'Modern design, adjustable height',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1080',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1080'
    ],
    tags: ['Furniture', 'Dorm'],
    icon: Armchair,
    seller: { name: 'Kevin L.', verified: false },
    isBarter: true
  },
  // Apparel
  {
    id: 7,
    title: 'Vintage Denim Jacket',
    description: 'Size M, perfect for fall',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1648415041082-ced2cea26043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwamFja2V0fGVufDF8fHx8MTc2MDgxNTI3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1080',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1080'
    ],
    tags: ['Apparel'],
    icon: Shirt,
    seller: { name: 'Emma L.', verified: true },
    isBarter: true
  },
  {
    id: 8,
    title: 'University Hoodie',
    description: 'Size L, barely worn, school colors',
    credits: 12,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1080',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1080'
    ],
    tags: ['Apparel'],
    icon: Shirt,
    seller: { name: 'Rachel B.', verified: true },
    isBarter: false
  },
  {
    id: 9,
    title: 'Winter Coat',
    description: 'Warm, insulated, size S',
    credits: 22,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1080',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1080'
    ],
    tags: ['Apparel', 'Seasonal'],
    icon: Shirt,
    seller: { name: 'Olivia W.', verified: true },
    isBarter: false
  },
  // Dorm Essentials
  {
    id: 10,
    title: 'Bedding Set',
    description: 'Twin XL, includes sheets & comforter',
    credits: 20,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1080',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1080'
    ],
    tags: ['Dorm'],
    icon: Package,
    seller: { name: 'Amy H.', verified: true },
    isBarter: false
  },
  {
    id: 11,
    title: 'Desk Organizer',
    description: 'Multi-compartment, keeps desk tidy',
    credits: 8,
    images: [
      'https://images.unsplash.com/photo-1578898887000-6f4df0891ea9?w=1080',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1080'
    ],
    tags: ['Dorm'],
    icon: Briefcase,
    seller: { name: 'Daniel S.', verified: false },
    isBarter: false
  },
  {
    id: 12,
    title: 'Mini Fridge',
    description: 'Compact, perfect for dorm rooms',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=1080',
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1080'
    ],
    tags: ['Dorm'],
    icon: Package,
    seller: { name: 'Lucas G.', verified: true },
    isBarter: true
  },
  // Lab/Tech
  {
    id: 13,
    title: 'Lab Goggles',
    description: 'Safety-rated, never used',
    credits: 7,
    images: [
      'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=1080',
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1080'
    ],
    tags: ['Lab/Tech'],
    icon: Beaker,
    seller: { name: 'Sophie D.', verified: true },
    isBarter: false
  },
  {
    id: 14,
    title: 'Graphing Calculator',
    description: 'TI-84, works perfectly',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1585784564859-e8550b21f586?w=1080',
      'https://images.unsplash.com/photo-1611532736573-628b56f7b01e?w=1080'
    ],
    tags: ['Lab/Tech'],
    icon: Beaker,
    seller: { name: 'Marcus T.', verified: true },
    isBarter: true
  },
  // Electronics
  {
    id: 15,
    title: 'Wireless Headphones',
    description: 'Noise cancelling, works perfectly',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1713618651165-a3cf7f85506c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwbW9kZXJufGVufDF8fHx8MTc2MDkyMDM5MHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1080',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1080'
    ],
    tags: ['Electronics'],
    icon: Music,
    seller: { name: 'Chris M.', verified: true },
    isBarter: true
  },
  {
    id: 16,
    title: 'Laptop Stand',
    description: 'Aluminum, adjustable angles',
    credits: 14,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1080',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1080'
    ],
    tags: ['Electronics'],
    icon: Laptop,
    seller: { name: 'Brandon K.', verified: true },
    isBarter: false
  },
  {
    id: 17,
    title: 'Portable Charger',
    description: '20000mAh, fast charging',
    credits: 10,
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=1080',
      'https://images.unsplash.com/photo-1591290619762-d4b9eb879ed5?w=1080'
    ],
    tags: ['Electronics'],
    icon: Laptop,
    seller: { name: 'Mia C.', verified: true },
    isBarter: false
  },
  {
    id: 18,
    title: 'Desk Lamp',
    description: 'LED, adjustable brightness',
    credits: 12,
    images: [
      'https://images.unsplash.com/photo-1621447980929-6638614633c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNrJTIwbGFtcHxlbnwxfHx8fDE3NjA5MjAzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1080',
      'https://images.unsplash.com/photo-1541009159795-d40d52c87f6b?w=1080'
    ],
    tags: ['Electronics', 'Dorm'],
    icon: Sparkles,
    seller: { name: 'Alex P.', verified: false },
    isBarter: false
  },
  {
    id: 19,
    title: 'Bluetooth Speaker',
    description: 'Waterproof, great sound quality',
    credits: 16,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1080',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1080'
    ],
    tags: ['Electronics'],
    icon: Music,
    seller: { name: 'Ethan R.', verified: true },
    isBarter: false
  },
  // Kitchen
  {
    id: 20,
    title: 'Coffee Maker',
    description: 'Single-serve, easy to clean',
    credits: 18,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=1080',
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1080'
    ],
    tags: ['Kitchen', 'Dorm'],
    icon: UtensilsCrossed,
    seller: { name: 'Sophia R.', verified: true },
    isBarter: false
  },
  {
    id: 21,
    title: 'Microwave',
    description: 'Compact, works great',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=1080',
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1080'
    ],
    tags: ['Kitchen', 'Dorm'],
    icon: UtensilsCrossed,
    seller: { name: 'Jake W.', verified: true },
    isBarter: true
  },
  {
    id: 22,
    title: 'Kitchen Utensil Set',
    description: 'Complete set, barely used',
    credits: 9,
    images: [
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1080',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0a?w=1080'
    ],
    tags: ['Kitchen'],
    icon: UtensilsCrossed,
    seller: { name: 'Hannah J.', verified: false },
    isBarter: false
  },
  // Seasonal
  {
    id: 23,
    title: 'Holiday String Lights',
    description: 'Perfect for dorm decoration',
    credits: 6,
    images: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1080',
      'https://images.unsplash.com/photo-1606328832893-88afd3fb6804?w=1080'
    ],
    tags: ['Seasonal', 'Dorm'],
    icon: PartyPopper,
    seller: { name: 'Lily A.', verified: true },
    isBarter: false
  },
  {
    id: 24,
    title: 'Halloween Decorations',
    description: 'Spooky lights & props set',
    credits: 8,
    images: [
      'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1080',
      'https://images.unsplash.com/photo-1570921477374-bf2ab7b2e408?w=1080'
    ],
    tags: ['Seasonal'],
    icon: PartyPopper,
    seller: { name: 'Noah V.', verified: true },
    isBarter: false
  },
  {
    id: 25,
    title: 'Art Supplies Kit',
    description: 'Paints, brushes, & canvas included',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1080',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1080'
    ],
    tags: ['Dorm'],
    icon: Paintbrush,
    seller: { name: 'Ava M.', verified: true },
    isBarter: true
  },
  {
    id: 26,
    title: 'Polaroid Camera',
    description: 'Instant film, vintage vibes',
    credits: 28,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1080',
      'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=1080'
    ],
    tags: ['Electronics'],
    icon: Camera,
    seller: { name: 'Isabella N.', verified: true },
    isBarter: false
  }

     */
];

const eventFilters = [
  { id: 'halloween', label: 'Halloween', color: 'from-orange-500 to-orange-600' },
  { id: 'finals', label: 'Finals', color: 'from-blue-500 to-blue-600' },
  { id: 'movein', label: 'Move-Out', color: 'from-green-500 to-green-600' },
  { id: 'graduation', label: 'Graduation', color: 'from-purple-500 to-purple-600' }
];

export default function HomeScreen({ navigateTo, notificationCount = 0 }: any) {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  const { darkMode } = useDarkMode();
  const [mode, setMode] = useState<'credits' | 'trade'>('credits');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    return (localStorage.getItem('viewMode') as 'list' | 'grid') || 'list';
  });
  const [showCreditModal, setShowCreditModal] = useState(false);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleEvent = (eventId: string) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(e => e !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  const setAndPersistViewMode = (mode: 'list' | 'grid') => {
    setViewMode(mode);
    localStorage.setItem('viewMode', mode);
  };

    /*useEffect(() => {
        async function fetchListings() {
            try {
                const response = await axios.get('https://yourserver.com/api/listings');
                setListings(response.data);

            } catch (err: any) {
                setError('Failed to load listings.');
            } finally {
                setLoading(false);
            }
        }

        fetchListings();
    }, []);*/



    useEffect(() => {
        async function fetchListings() {
            try {
                console.log("Fetching listings...");
                const snapshot = await getDocs(collection(db, "listings"));
                console.log("Snapshot:", snapshot);
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Fetched data:", data);
                setListings(data);
            } catch (err) {
                console.error("🔥 Firestore error:", err);
                setError("Failed to load listings.");
            } finally {
                setLoading(false);
            }
        }

        fetchListings();
    }, []);

    if (loading) return <div>Loading listings...</div>;
    if (error) return <div>{error}</div>;

  const filteredListings = listings.filter(item => {
    if (mode === 'trade' && !item.isBarter) return false;
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedTags.length > 0 && !item.tags.some(tag => selectedTags.includes(tag))) return false;
    return true;
  });

  const errorMsg = "no listing found";
  //currently just sets credits to a certain amount
    const { credits, setCredits } = useCredits();

  return (
    <div className={`min-h-screen pb-8 ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Top Bar */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b shadow-sm`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Logo Icon */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                    <img
                        src={SnagLogo}
                        className="w-10 h-10 object-contain"
                        alt="Snag logo"
                    />
                </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreditModal(true)}
                className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/40'} rounded-full px-3 py-1.5 border shadow-sm flex items-center gap-2 hover:opacity-80 transition-opacity`}
              >
                <Coins className="w-4 h-4 text-yellow-500" />
                <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>{credits}</span>
              </button>
              <button
                onClick={() => navigateTo('notifications')}
                className={`relative p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
              >
                <Bell className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
                {notificationCount > 0 && (
                  <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-[#888]'}`} />
            <input
              type="text"
              placeholder="Search items or descriptions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' : 'bg-white/80 border-white/60 text-[#222] placeholder:text-[#888]'} border shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50`}
            />
          </div>

          {/* Pill Toggle */}
          <div className="mb-3">
            <PillToggle value={mode} onChange={setMode} />
          </div>

          {/* Event Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
            {eventFilters.map((event) => (
              <button
                key={event.id}
                onClick={() => toggleEvent(event.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
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

          {/* View Toggle & Tag Bar */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex-1 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full border transition-all text-xs font-medium whitespace-nowrap ${
                      selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-md'
                        : darkMode
                          ? 'bg-white/10 text-gray-300 border-white/20 hover:bg-white/15'
                          : 'backdrop-blur-xl bg-white/60 text-[#555] border-white/60 hover:bg-white/80'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className={`flex items-center gap-1 ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/60 border-white/60'} border rounded-full p-0.5 flex-shrink-0`}>
              <button
                onClick={() => setAndPersistViewMode('list')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : darkMode ? 'text-gray-300' : 'text-[#555]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setAndPersistViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-600 text-white' : darkMode ? 'text-gray-300' : 'text-[#555]'
                }`}
              >
                <Grid3x3 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* Listings Feed */}
        <div className="max-w-md mx-auto px-4 mt-4">
            {filteredListings.length !== 0 ? (
                viewMode === 'list' ? (
                    <div className="space-y-3">
                        {filteredListings.map((item) => (
                            <CompactMarketplaceCard
                                key={item.id}
                                item={item}
                                navigateTo={navigateTo}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {filteredListings.map((item) => (
                            <GridMarketplaceCard
                                key={item.id}
                                item={item}
                                navigateTo={navigateTo}
                                darkMode={darkMode}
                            />
                        ))}
                    </div>
                )
            ) : (
                <div>
                    {errorMsg}
                </div>
            )}
        </div>

      {/* Credit Explanation Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreditModal(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div 
            className={`relative w-full max-w-sm ${darkMode ? 'bg-gray-900 border-white/20' : 'bg-white'} rounded-3xl p-6 border shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowCreditModal(false)}
                className={`p-1 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} transition-colors`}
              >
                <X className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Coins className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`text-center font-semibold text-xl mb-3 ${darkMode ? 'text-white' : 'text-[#222]'}`}>What Are Credits?</h3>
            <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>
              Credits are Snag's currency system. You earn credits by posting items, completing trades, or helping others. Use them to purchase items from other students!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowCreditModal(false)}
                className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-lg transition-transform active:scale-95"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add trust scores to mock data
const addTrustData = (item: any) => ({
  ...item,
  seller: {
    ...item.seller,
    trustScore: item.seller?.trustScore || (4.5 + Math.random() * 0.5).toFixed(1),
    trades: item.seller?.trades || Math.floor(10 + Math.random() * 30)
  },
  location: item.location || ['Main Library', 'Student Union', 'Campus Center', 'Library Entrance'][Math.floor(Math.random() * 4)],
  postedTime: item.postedTime || ['2h ago', '5h ago', '1d ago', '3h ago'][Math.floor(Math.random() * 4)]
});

function CompactMarketplaceCard({ item, navigateTo, darkMode }: any) {
    if (!item.status) return null;
    // Fix: ensure there's always a valid icon component
    const iconKey = typeof item.icon === "string" ? item.icon : undefined;
    const IconComponent = ICON_MAP[iconKey || "Package"] || Package;


    console.log("Badge:", Badge);
    console.log("Avatar:", Avatar);
    console.log("AvatarFallback:", AvatarFallback);
    console.log("Coins icon:", Coins);
    console.log("ArrowLeftRight icon:", ArrowLeftRight);
  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className={`w-full backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/70 border-white/60 hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)]'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden transition-all active:scale-[0.98]`}
    >
      {/* Image - Reduced Height */}
      <div className="relative h-40">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        {item.isBarter && (
          <div className="absolute top-2 left-2">
            <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5 py-1">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              <span className="text-xs">Trade</span>
            </Badge>
          </div>
        )}
        {!item.isBarter && (
          <div className="absolute top-2 right-2">
            <div className={`backdrop-blur-xl ${darkMode ? 'bg-black/60' : 'bg-white/90'} rounded-full px-2.5 py-1 border border-white/60 shadow-md flex items-center gap-1`}>
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.credits}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content - Compact */}
      <div className="p-3 text-left">
        {/* Title - Truncated to 1-2 lines */}
        <h3 className={`font-semibold text-sm mb-1 line-clamp-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.title}</h3>
        
        {/* Primary Tags Only */}
        <div className="flex items-center gap-1.5 mb-2">
            {item.tags.slice(0, 2).map((tag: string) => (
                <div
                    key={tag}
                    className="backdrop-blur-xl bg-purple-100/60 rounded-full px-2 py-0.5 border border-purple-200/60 flex items-center gap-1"
                >
                    <IconComponent className="w-3 h-3 text-purple-600" />
                    <span className="text-purple-700 text-[10px] font-medium">{tag}</span>
                </div>
            ))}
        </div>

          {/* Seller with Trust Score - Single Line */}
          <div
              onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('user-profile', item.seller);
              }}
              className="flex items-center gap-1.5 mb-1.5 hover:opacity-80 transition-opacity cursor-pointer"
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
              <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-[#999]'}`}>
    • {item.seller.rating} ⭐ • {item.seller.trades} trades
  </span>
          </div>

        {/* Location & Time - Single Compact Line */}
        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-[#999]'}`}>{item.meetingSpot} • {item.meetingTime}</p>
      </div>
    </button>
  );
}

function GridMarketplaceCard({ item, navigateTo, darkMode }: any) {
    if (!item.status) return null;

  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/70 border-white/60 hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)]'} rounded-2xl border shadow-[0_4px_16px_rgba(139,92,246,0.08)] overflow-hidden transition-all active:scale-[0.98]`}
    >
      {/* Image - Square Aspect */}
      <div className="relative aspect-square">
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
        {item.isBarter && (
          <div className="absolute top-2 left-2">
            <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-md font-medium flex items-center gap-1 py-0.5 px-2">
              <ArrowLeftRight className="w-3 h-3" />
              <span className="text-[10px]">Trade</span>
            </Badge>
          </div>
        )}
        {!item.isBarter && (
          <div className="absolute top-2 right-2">
            <div className={`backdrop-blur-xl ${darkMode ? 'bg-black/60' : 'bg-white/90'} rounded-full px-2 py-0.5 border border-white/60 shadow-md flex items-center gap-0.5`}>
              <Coins className="w-3 h-3 text-yellow-500" />
              <span className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.credits}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content - Minimal */}
      <div className="p-2.5">
        <h3 className={`font-semibold text-xs mb-1 line-clamp-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.title}</h3>
        <div className="flex items-center gap-1">
          <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-[#999]'}`}>{item.seller.rating} ⭐</span>
          <span className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-[#999]'}`}>• {item.seller.trades}</span>
        </div>
      </div>
    </button>
  );
}
