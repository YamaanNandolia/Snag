import { useState } from 'react';
import { Calendar, BookOpen, Armchair, ShoppingBag, Coins, ArrowLeftRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import ImageCarousel from './ImageCarousel';

const events = [
  {
    id: 1,
    title: 'Halloween Week',
    date: 'Oct 25 - Oct 31',
    description: 'Costumes, decorations & spooky items',
    color: 'from-orange-500 to-orange-600',
    tag: 'Halloween'
  },
  {
    id: 2,
    title: 'Finals Prep',
    date: 'Dec 10 - Dec 20',
    description: 'Textbooks, study guides & coffee makers',
    color: 'from-blue-500 to-blue-600',
    tag: 'Finals'
  },
  {
    id: 3,
    title: 'Move-In Week',
    date: 'Aug 15 - Aug 21',
    description: 'Furniture, dorm essentials & decor',
    color: 'from-green-500 to-green-600',
    tag: 'MoveIn'
  }
];

const eventListings = [
  {
    id: 1,
    title: 'Halloween Costume',
    description: 'Vampire costume, complete set',
    credits: 18,
    images: [
      'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1080',
      'https://images.unsplash.com/photo-1570021974549-5cc5a8f4ad00?w=1080',
      'https://images.unsplash.com/photo-1531596606393-0b8d2e3e7b33?w=1080'
    ],
    tags: ['Apparel', 'Event'],
    eventTag: 'Halloween',
    icon: ShoppingBag,
    seller: { name: 'Alex P.', verified: true },
    isBarter: false
  },
  {
    id: 2,
    title: 'Study Guide Set',
    description: 'Complete set for Engineering 101',
    credits: 20,
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1080',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1080',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1080'
    ],
    tags: ['Textbook', 'School'],
    eventTag: 'Finals',
    icon: BookOpen,
    seller: { name: 'Jordan T.', verified: true },
    isBarter: false
  },
  {
    id: 3,
    title: 'Mini Fridge',
    description: 'Perfect for dorm, works great',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1080',
      'https://images.unsplash.com/photo-1571175351820-23e7131fdbfd?w=1080',
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=1080'
    ],
    tags: ['Furniture', 'Dorm'],
    eventTag: 'MoveIn',
    icon: Armchair,
    seller: { name: 'Sarah K.', verified: true },
    isBarter: true
  },
  {
    id: 4,
    title: 'Spooky Decorations',
    description: 'Full Halloween decoration set',
    credits: 15,
    images: [
      'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1080',
      'https://images.unsplash.com/photo-1570021974549-5cc5a8f4ad00?w=1080',
      'https://images.unsplash.com/photo-1531596606393-0b8d2e3e7b33?w=1080'
    ],
    tags: ['Decor', 'Event'],
    eventTag: 'Halloween',
    icon: ShoppingBag,
    seller: { name: 'Mike R.', verified: true },
    isBarter: false
  },
  {
    id: 5,
    title: 'Calculus Textbook',
    description: 'Perfect for finals prep',
    credits: 25,
    images: [
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1080',
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1080',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1080'
    ],
    tags: ['Textbook', 'School'],
    eventTag: 'Finals',
    icon: BookOpen,
    seller: { name: 'Emma L.', verified: true },
    isBarter: false
  },
  {
    id: 6,
    title: 'Desk & Chair Set',
    description: 'Great for new dorm room',
    credits: 0,
    images: [
      'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=1080',
      'https://images.unsplash.com/photo-1571175351820-23e7131fdbfd?w=1080',
      'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=1080'
    ],
    tags: ['Furniture', 'Dorm'],
    eventTag: 'MoveIn',
    icon: Armchair,
    seller: { name: 'Chris M.', verified: true },
    isBarter: true
  }
];

export default function EventsScreen({ navigateTo }: any) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const toggleEvent = (eventTag: string) => {
    if (selectedEvents.includes(eventTag)) {
      setSelectedEvents(selectedEvents.filter(e => e !== eventTag));
    } else {
      setSelectedEvents([...selectedEvents, eventTag]);
    }
  };

  const filteredListings = selectedEvents.length > 0
    ? eventListings.filter(item => selectedEvents.includes(item.eventTag))
    : eventListings;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-2xl bg-white/70 border-b border-white/40">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-[#9333ea] font-semibold text-xl">Events</h1>
        </div>
      </div>

      {/* Event Selector */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="space-y-3 mb-6">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => toggleEvent(event.tag)}
              className={`w-full backdrop-blur-2xl rounded-3xl p-5 border transition-all ${
                selectedEvents.includes(event.tag)
                  ? 'bg-white/80 border-white/80 shadow-[0_8px_24px_rgba(139,92,246,0.15)]'
                  : 'bg-white/60 border-white/40 shadow-sm hover:bg-white/70'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${event.color} flex items-center justify-center flex-shrink-0 text-2xl`}>
                  {event.title.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#222] font-semibold mb-1">{event.title}</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#555]" />
                    <span className="text-[#555] text-sm">{event.date}</span>
                  </div>
                  <p className="text-[#555] text-sm font-light">{event.description}</p>
                </div>
                {selectedEvents.includes(event.tag) && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Event Listings */}
        <h3 className="text-[#222] font-semibold mb-4 px-2">
          {selectedEvents.length > 0 ? 'Filtered Items' : 'All Event Items'}
        </h3>
        <div className="space-y-4">
          {filteredListings.map((item) => (
            <EventListingCard key={item.id} item={item} navigateTo={navigateTo} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EventListingCard({ item, navigateTo }: any) {
  const IconComponent = item.icon;

  return (
    <button
      onClick={() => navigateTo('item-detail', item)}
      className="w-full backdrop-blur-2xl bg-white/70 rounded-3xl border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] overflow-hidden hover:shadow-[0_12px_32px_rgba(139,92,246,0.2)] transition-all active:scale-[0.98]"
    >
      {/* Image Carousel */}
      <div className="relative">
        <ImageCarousel images={item.images} alt={item.title} />
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
        <div className="flex items-center gap-2 mb-3">
          {item.tags.map((tag: string) => (
            <div
              key={tag}
              className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1 border border-purple-200/60 flex items-center gap-1.5"
            >
              <IconComponent className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-purple-700 text-xs font-medium">{tag}</span>
            </div>
          ))}
        </div>

        {/* Seller Info */}
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-xs font-medium">
              {item.seller.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-[#555] text-sm">{item.seller.name}</span>
          {item.seller.verified && (
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-[10px]">✓</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}