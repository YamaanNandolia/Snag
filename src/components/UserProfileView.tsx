import { ArrowLeft, Star, CheckCircle, ArrowLeftRight } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useEffect, useState } from 'react';
import { db } from "../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

interface UserProfileViewProps {
    navigateTo: (screen: string, data?: any) => void;
    user: {
        id: string;   // <-- IMPORTANT: must include ID
    };
}

export default function UserProfileView({ navigateTo, user }: UserProfileViewProps) {
    const { darkMode } = useDarkMode();

    const [seller, setSeller] = useState<any>(null);
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Fetch seller profile from Firestore
    useEffect(() => {
        async function fetchSeller() {
            try {
                if (!user?.id) return;

                const userRef = doc(db, "users", user.id);
                const snap = await getDoc(userRef);

                if (snap.exists()) {
                    const sellerData = { id: snap.id, ...snap.data() };
                    setSeller(sellerData);

                    // 🔥 Load user's listings using myListings array
                    const listingIds = sellerData.myListings || [];

                    if (listingIds.length > 0) {
                        const q = query(
                            collection(db, "listings"),
                            where("id", "in", listingIds.slice(0, 10)) // Firestore "in" limit = 10
                        );

                        const listingSnaps = await getDocs(q);
                        const fetched = listingSnaps.docs.map(d => ({ id: d.id, ...d.data() }));
                        setListings(fetched);
                    }
                }
            } catch (err) {
                console.error("Error loading seller profile:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchSeller();
    }, [user?.id]);

    if (loading) return <div className="p-6 text-center">Loading...</div>;
    if (!seller) return <div className="p-6 text-center">Seller not found.</div>;

    console.log(seller)
    return (
        <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
            {/* Back Button */}
            <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70' : 'bg-white/10'} border-b`}>
                <div className="max-w-md mx-auto px-4 py-4">
                    <button
                        onClick={() => navigateTo('home')}
                        className="p-2 rounded-full hover:bg-white/10 transition"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Profile */}
            <div className="max-w-md mx-auto px-4 py-6 space-y-6">
                <div className={`backdrop-blur-xl rounded-3xl p-6 border shadow-lg ${darkMode ? 'bg-white/10' : 'bg-white/70'}`}>
                    <div className="flex flex-col items-center text-center">
                        <Avatar className="w-24 h-24 mb-4">
                            <AvatarFallback className="bg-purple-500 text-white text-3xl">
                                {seller.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <h2 className="text-2xl font-semibold">{seller.name}</h2>

                        {seller.verified && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1">
                                <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                        )}

                        <p className="text-sm opacity-80 mt-3">{seller.bio || "Campus student selling items"}</p>

                        {/* Stats */}
                        <div className="flex gap-6 mt-4">
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                                    <span className="text-xl font-semibold">{seller.trustScore}</span>
                                </div>
                                <p className="text-xs opacity-70">Trust</p>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                    <ArrowLeftRight className="w-5 h-5 text-purple-500" />
                                    <span className="text-xl font-semibold">{seller.trades}</span>
                                </div>
                                <p className="text-xs opacity-70">Trades</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ⭐ Listing Section */}
                <div>
                    <h3 className="text-lg font-semibold px-2 mb-3">
                        Active Listings ({listings.length})
                    </h3>

                    <div className="space-y-3">
                        {listings.map(listing => (
                            <button
                                key={listing.id}
                                onClick={() => navigateTo('item-detail', { ...listing, seller })}
                                className="w-full backdrop-blur-xl border rounded-2xl p-3 flex gap-3 hover:shadow-lg"
                            >
                                <div className="w-20 h-20 rounded-xl overflow-hidden">
                                    <img src={listing.images[0]} className="w-full h-full object-cover" />
                                </div>

                                <div className="text-left flex-1">
                                    <h4 className="font-semibold">{listing.title}</h4>
                                    {listing.isTrade ? (
                                        <Badge className="bg-purple-600 text-white flex gap-1 w-fit mt-1">
                                            <ArrowLeftRight className="w-3 h-3" />
                                            Trade
                                        </Badge>
                                    ) : (
                                        <p className="opacity-70">{listing.credits} credits</p>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}