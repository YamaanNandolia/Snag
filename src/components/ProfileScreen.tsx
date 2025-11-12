import { Settings, ChevronRight, Coins, Shield, Package, History } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TrustDetailsDrawer from './TrustDetailsDrawer';
import BadgeInfoModal from './BadgeInfoModal';
import { useDarkMode } from '../contexts/DarkModeContext';
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, query, where, getDocs  } from "firebase/firestore";

const creditHistory = [
  { id: 1, type: 'earned', amount: 15, item: 'Calculus Textbook', date: '2 days ago' },
  { id: 2, type: 'spent', amount: 25, item: 'Desk Chair', date: '5 days ago' },
  { id: 3, type: 'earned', amount: 20, item: 'Winter Jacket', date: '1 week ago' },
  { id: 4, type: 'earned', amount: 12, item: 'Desk Lamp', date: '2 weeks ago' }
];

export default function ProfileScreen({ navigateTo, myListings = [] }: any) {
    const { darkMode } = useDarkMode();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [userListings, setUserListings] = useState<any[]>([]);
    const [loadingListings, setLoadingListings] = useState(true);
    const [showTrustDrawer, setShowTrustDrawer] = useState(false);
    const [showBadgeModal, setShowBadgeModal] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState<'verified' | 'trades' | null>(null);

    const openBadgeInfo = (badgeType: 'verified' | 'trades') => {
        setSelectedBadge(badgeType);
        setShowBadgeModal(true);
    };

    useEffect(() => {
        async function fetchUser() {
            setLoadingListings(true);
            try {
                const user = auth.currentUser;
                if (!user) {
                    setError("No user logged in");
                    setLoadingListings(false);
                    return;
                }

                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setUserData({ id: user.uid, ...data });

                    // 🟣 Fetch the user's listings via stored IDs
                    const listingIds = data.myListings || [];
                    if (listingIds.length > 0) {
                        const batchSize = 10;
                        const fetchedListings: any[] = [];

                        for (let i = 0; i < listingIds.length; i += batchSize) {
                            const batch = listingIds.slice(i, i + batchSize);
                            const q = query(collection(db, "listings"), where("id", "in", batch));
                            const snap = await getDocs(q);
                            snap.forEach((doc) => fetchedListings.push({ id: doc.id, ...doc.data() }));
                        }

                        setUserListings(fetchedListings);
                    } else {
                        setUserListings([]);
                    }
                } else {
                    console.warn("No profile found for this user in Firestore");
                }
            } catch (err) {
                console.error("Error fetching user profile:", err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
                setLoadingListings(false);
            }
        }

        fetchUser();
    }, []);

    console.log("User: ", userData);
  return (
    <div className={`min-h-screen pb-8 ${darkMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 backdrop-blur-xl ${darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'} border-b`}>
        <div className="max-w-md mx-auto px-4 py-4">
          <h2 className={`font-semibold text-xl ${darkMode ? 'text-purple-400' : 'text-[#9333ea]'}`}>Profile</h2>
        </div>
      </div>

      {/* Profile Header */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/30'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)] mb-6`}>
          {/* Avatar & Info */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-2xl font-semibold">
                  {userData?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-[#222]'}`}>{userData?.name}</h2>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>{userData?.email}</p>
              
              {/* Interactive Badges */}
                <div className="flex flex-wrap gap-2">
                    {/* 🎓 Only show if email ends with .edu */}
                    {userData?.email?.toLowerCase().endsWith('.edu') && (
                        <button
                            onClick={() => openBadgeInfo('verified')}
                            className="backdrop-blur-xl bg-blue-100/60 text-blue-700 border border-blue-200/60 font-medium rounded-full px-3 py-1.5 text-sm transition-all hover:bg-blue-200/60 active:scale-95"
                        >
                            🎓 .edu Verified
                        </button>
                    )}

                    {/* ✨ Only show if user has 10 or more trades */}
                    {userData?.trades >= 10 && (
                        <button
                            onClick={() => openBadgeInfo('trades')}
                            className="backdrop-blur-xl bg-purple-100/60 text-purple-700 border border-purple-200/60 font-medium rounded-full px-3 py-1.5 text-sm transition-all hover:bg-purple-200/60 active:scale-95"
                        >
                            ✨ 10+ Trades
                        </button>
                    )}
                </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className={`text-center p-3 backdrop-blur-xl ${darkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/60 border-purple-200/40'} rounded-2xl border`}>
              <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{userData?.credits}</div>
              <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>Credits</div>
            </div>
            <div className={`text-center p-3 backdrop-blur-xl ${darkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/60 border-purple-200/40'} rounded-2xl border`}>
              <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#222]'}`}>{userData?.trades}</div>
              <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>Trades</div>
            </div>
            <button
              onClick={() => setShowTrustDrawer(true)}
              className={`text-center p-3 backdrop-blur-xl ${darkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-purple-50/60 border-purple-200/40 hover:bg-purple-100/60'} rounded-2xl border transition-all active:scale-95`}
            >
              <div className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-[#222]'}`}>98%</div>
              <div className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>Trust</div>
            </button>
          </div>
        </div>

        {/* Interests Section */}
        <div className={`backdrop-blur-xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/30'} rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)] mb-6`}>
          <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-[#222]'}`}>Your Interests</h3>
          <div className="flex flex-wrap gap-2">
            {['Electronics', 'Clothing', 'Textbooks'].map((interest) => (
              <span
                key={interest}
                className={`${darkMode ? 'bg-purple-600/20 text-purple-300 border-purple-500/30' : 'bg-purple-100 text-purple-700 border-purple-300'} px-3 py-1 rounded-full border text-sm`}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/70 border-white/60 hover:shadow-[0_8px_24px_rgba(139,92,246,0.12)]'} rounded-2xl p-4 border shadow-sm transition-all active:scale-[0.98] text-center`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-2">
              <Coins className="w-5 h-5 text-purple-600" />
            </div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>Credit Wallet</p>
          </button>
          <button
            onClick={() => setShowTrustDrawer(true)}
            className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white/70 border-white/60 hover:shadow-[0_8px_24px_rgba(139,92,246,0.12)]'} rounded-2xl p-4 border shadow-sm transition-all active:scale-[0.98] text-center`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>Trust & Badges</p>
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className={`w-full backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} border rounded-2xl p-1 mb-4`}>
            <TabsTrigger value="listings" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium">
              My Listings
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium">
              Credit History
            </TabsTrigger>
          </TabsList>

            <TabsContent value="listings" className="space-y-3">
                {loadingListings ? (
                    <div className="text-center py-8 text-gray-400">Loading listings...</div>
                ) : userListings.length > 0 ? (
                    <>
                        {userListings
                            .filter((listing: any) => listing.status === true)
                            .slice(0, 3)
                            .map((listing: any) => (
                                <button
                                    key={listing.id}
                                    onClick={() => navigateTo("full-listing-view", listing)}
                                    className={`w-full backdrop-blur-2xl ${
                                        darkMode
                                            ? "bg-white/10 border-white/20 hover:bg-white/15"
                                            : "bg-white/70 border-white/60 hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)]"
                                    } rounded-2xl p-4 border shadow-sm transition-all active:scale-[0.98] text-left`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h3
                                            className={`font-medium ${darkMode ? "text-white" : "text-[#222]"}`}
                                        >
                                            {listing.title}
                                        </h3>
                                        <Badge className="bg-green-100 text-green-700 border-green-200 font-medium">
                                            Active
                                        </Badge>
                                    </div>

                                    <div
                                        className={`flex items-center gap-4 text-sm ${
                                            darkMode ? "text-gray-400" : "text-[#555]"
                                        }`}
                                    >
              <span className="flex items-center gap-1">
                <Coins className="w-4 h-4" />
                  {listing.credits} Cr
              </span>
                                        <span>👁️ {listing.views || 0} views</span>
                                    </div>
                                </button>
                            ))}

                        {userListings.filter((l: any) => l.status === true).length > 3 && (
                            <button
                                onClick={() => navigateTo("my-listings")}
                                className={`w-full py-3 rounded-2xl ${
                                    darkMode
                                        ? "bg-white/10 text-purple-400 border-purple-400/60"
                                        : "backdrop-blur-xl bg-white/80 text-purple-600 border-purple-200/60"
                                } font-medium border shadow-sm transition-transform active:scale-[0.98] flex items-center justify-center gap-2`}
                            >
                                <span>View All Listings</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        )}
                    </>
                ) : (
                    <div
                        className={`backdrop-blur-2xl ${
                            darkMode ? "bg-white/10 border-white/20" : "bg-white/70 border-white/60"
                        } rounded-3xl p-12 border shadow-[0_8px_24px_rgba(139,92,246,0.12)] text-center`}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
                            <Package className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-[#222]"}`}>
                            No active listings
                        </h3>
                        <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-[#555]"}`}>
                            Start selling items to see them here
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => navigateTo("create")}
                                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]"
                            >
                                Create Listing
                            </button>
                        </div>
                    </div>
                )}
            </TabsContent>

          <TabsContent value="wallet" className="space-y-3">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-6 mb-4 text-white shadow-[0_8px_24px_rgba(139,92,246,0.3)]">
              <p className="text-white/90 mb-2 font-light">Current Balance</p>
              <div className="flex items-center gap-2">
                <Coins className="w-8 h-8" />
                <span className="text-4xl font-semibold">42</span>
                <span className="text-2xl font-medium">Credits</span>
              </div>
            </div>

            {creditHistory.map((transaction) => (
              <div
                key={transaction.id}
                className={`backdrop-blur-2xl ${darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'} rounded-2xl p-4 border shadow-sm`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned'
                          ? 'bg-gradient-to-br from-green-100 to-green-200'
                          : 'bg-gradient-to-br from-red-100 to-red-200'
                      }`}
                    >
                      {transaction.type === 'earned' ? (
                        <span className="text-green-600 font-semibold">+</span>
                      ) : (
                        <span className="text-red-600 font-semibold">-</span>
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-[#222]'}`}>{transaction.item}</p>
                      <p className={`text-sm font-light ${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>{transaction.date}</p>
                    </div>
                  </div>
                  <div
                    className={`text-lg font-semibold ${
                      transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'earned' ? '+' : '-'}
                    {transaction.amount}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Edit Profile Button - Centered */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigateTo('edit-profile')}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modals */}
      <TrustDetailsDrawer isOpen={showTrustDrawer} onClose={() => setShowTrustDrawer(false)} />
      <BadgeInfoModal 
        isOpen={showBadgeModal} 
        onClose={() => {
          setShowBadgeModal(false);
          setSelectedBadge(null);
        }} 
        badgeType={selectedBadge} 
      />
    </div>
  );
}
