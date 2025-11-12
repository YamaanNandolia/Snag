import { ArrowLeft, Star, MapPin, Calendar, Coins, ArrowLeftRight, Shield } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import ImageCarousel from './ImageCarousel';
import { useDarkMode } from '../contexts/DarkModeContext';
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebaseConfig";
import {useEffect, useState} from "react";

export default function ItemDetailScreen({ item, navigateTo }: any) {
    const { darkMode } = useDarkMode();
    const [listing, setListing] = useState<any>(item); // start with passed item
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // if the passed item came with an ID, fetch the full Firestore version
        if (!item?.id) return;

        async function fetchItem() {
            setLoading(true);
            try {
                const ref = doc(db, "listings", item.id);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setListing({ id: snap.id, ...snap.data() });
                }
            } catch (err) {
                console.error("Failed to fetch item:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchItem();
    }, [item]);
  const IconComponent = item.icon;
    console.log("item: ", item);
  // Ensure seller has default values

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-2xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/70 border-white/40'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigateTo('home')}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-white/50'} transition-colors`}
          >
            <ArrowLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-[#222]'}`} />
          </button>
          <h2 className={`font-semibold text-xl ${darkMode ? 'text-purple-400' : 'text-[#9333ea]'}`}>Item Details</h2>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto pb-32">
        {/* Image Carousel */}
        <div className="relative">
          <ImageCarousel 
            images={item.images || [item.image]}
            alt={item.title}
            aspectRatio="aspect-square"
          />
          {item.isBarter ? (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="backdrop-blur-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg font-medium flex items-center gap-1.5">
                <ArrowLeftRight className="w-4 h-4" />
                <span>Trade Only</span>
              </Badge>
            </div>
          ) : (
            <div className="absolute top-4 right-4 z-10">
              <div className={`backdrop-blur-xl ${darkMode ? 'bg-black/60 border-white/20' : 'bg-white/90 border-white/60'} rounded-2xl px-4 py-2.5 border shadow-lg`}>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-500" />
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.credits} Credits</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Details Card */}
        <div className="p-4 space-y-4">
          <div className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}>
            <h1 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.title}</h1>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>{item.description}</p>

            {/* Tags */}
            {listing.tags && listing.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                {listing.tags.map((tag: string) => (
                  <div
                    key={tag}
                    className="backdrop-blur-xl bg-purple-100/60 rounded-full px-3 py-1.5 border border-purple-200/60 flex items-center gap-1.5"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4 text-purple-600" />}
                    <span className="text-purple-700 text-sm font-medium">{tag}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Seller Info with Trust Indicators */}
            <div className={`flex items-center justify-between pt-4 border-t ${darkMode ? 'border-white/10' : 'border-purple-200/40'}`}>
              <button
                onClick={() => navigateTo('user-profile', item.seller)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-500 text-white font-medium">
                    {item.seller.name.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.seller.name}</span>
                    {item.seller.verified && (
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  {/* Trust Score + Completed Trades */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>{item.seller.rating}</span>
                    </div>
                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-[#999]'}`}>•</span>
                    <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>{item.seller.trades} trades</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)] space-y-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className={`text-sm font-light ${darkMode ? 'text-gray-400' : 'text-[#888]'}`}>Pickup Location</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.meetingSpot}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className={`text-sm font-light ${darkMode ? 'text-gray-400' : 'text-[#888]'}`}>Posted</p>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>{item.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA - Centered Button */}
      <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-2xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/70 border-white/40'} border-t p-4`}>
        <div className="max-w-md mx-auto flex justify-center">
          {item.isBarter ? (
            <button
              onClick={() => navigateTo('trade-offer', item)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ArrowLeftRight className="w-5 h-5" strokeWidth={2.5} />
              <span>Offer to Trade</span>
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
