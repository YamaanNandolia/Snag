import { Settings, ChevronRight, Coins, Shield, Package, History } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import TrustDetailsDrawer from './TrustDetailsDrawer';
import BadgeInfoModal from './BadgeInfoModal';

const creditHistory = [
  { id: 1, type: 'earned', amount: 15, item: 'Calculus Textbook', date: '2 days ago' },
  { id: 2, type: 'spent', amount: 25, item: 'Desk Chair', date: '5 days ago' },
  { id: 3, type: 'earned', amount: 20, item: 'Winter Jacket', date: '1 week ago' },
  { id: 4, type: 'earned', amount: 12, item: 'Desk Lamp', date: '2 weeks ago' }
];

export default function ProfileScreen({ navigateTo, myListings = [] }: any) {
  const [showTrustDrawer, setShowTrustDrawer] = useState(false);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<'verified' | 'trades' | null>(null);

  const openBadgeInfo = (badgeType: 'verified' | 'trades') => {
    setSelectedBadge(badgeType);
    setShowBadgeModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100 pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-white/10 border-b border-white/30">
        <div className="max-w-md mx-auto px-4 py-4">
          <h2 className="text-[#9333ea] font-semibold text-xl">Profile</h2>
        </div>
      </div>

      {/* Profile Header */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/30 shadow-[0_8px_24px_rgba(139,92,246,0.12)] mb-6">
          {/* Avatar & Info */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-2xl font-semibold">
                RM
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-[#222] font-semibold">Ryan Mehta</h2>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <p className="text-[#555] mb-3">@ryanmehta</p>
              
              {/* Interactive Badges */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => openBadgeInfo('verified')}
                  className="backdrop-blur-xl bg-blue-100/60 text-blue-700 border border-blue-200/60 font-medium rounded-full px-3 py-1.5 text-sm transition-all hover:bg-blue-200/60 active:scale-95"
                >
                  🎓 .edu Verified
                </button>
                <button
                  onClick={() => openBadgeInfo('trades')}
                  className="backdrop-blur-xl bg-purple-100/60 text-purple-700 border border-purple-200/60 font-medium rounded-full px-3 py-1.5 text-sm transition-all hover:bg-purple-200/60 active:scale-95"
                >
                  ✨ 10+ Trades
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 backdrop-blur-xl bg-purple-50/60 rounded-2xl border border-purple-200/40">
              <div className="text-[#222] font-semibold mb-1">42</div>
              <div className="text-[#555] text-xs font-medium">Credits</div>
            </div>
            <div className="text-center p-3 backdrop-blur-xl bg-purple-50/60 rounded-2xl border border-purple-200/40">
              <div className="text-[#222] font-semibold mb-1">12</div>
              <div className="text-[#555] text-xs font-medium">Trades</div>
            </div>
            <button
              onClick={() => setShowTrustDrawer(true)}
              className="text-center p-3 backdrop-blur-xl bg-purple-50/60 rounded-2xl border border-purple-200/40 transition-all hover:bg-purple-100/60 active:scale-95"
            >
              <div className="text-[#222] font-semibold mb-1">98%</div>
              <div className="text-[#555] text-xs font-medium">Trust</div>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="backdrop-blur-2xl bg-white/70 rounded-2xl p-4 border border-white/60 shadow-sm hover:shadow-[0_8px_24px_rgba(139,92,246,0.12)] transition-all active:scale-[0.98] text-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-2">
              <Coins className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-[#222] font-medium">Credit Wallet</p>
          </button>
          <button
            onClick={() => setShowTrustDrawer(true)}
            className="backdrop-blur-2xl bg-white/70 rounded-2xl p-4 border border-white/60 shadow-sm hover:shadow-[0_8px_24px_rgba(139,92,246,0.12)] transition-all active:scale-[0.98] text-center"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-2">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-[#222] font-medium">Trust & Badges</p>
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="w-full backdrop-blur-2xl bg-white/70 border border-white/60 rounded-2xl p-1 mb-4">
            <TabsTrigger value="listings" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium">
              My Listings
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white font-medium">
              Credit History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-3">
            {myListings.length > 0 ? (
              <>
                {myListings.slice(0, 3).map((listing: any) => (
                  <button
                    key={listing.id}
                    onClick={() => navigateTo('full-listing-view', listing)}
                    className="w-full backdrop-blur-2xl bg-white/70 rounded-2xl p-4 border border-white/60 shadow-sm hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] transition-all active:scale-[0.98] text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[#222] font-medium">{listing.title}</h3>
                      <Badge
                        className={
                          listing.status === 'active'
                            ? 'bg-green-100 text-green-700 border-green-200 font-medium'
                            : 'bg-gray-100 text-gray-700 border-gray-200 font-medium'
                        }
                      >
                        {listing.status || 'active'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-[#555] text-sm">
                      <span className="flex items-center gap-1">
                        <Coins className="w-4 h-4" />
                        {listing.credits} Cr
                      </span>
                      <span>👁️ {listing.views || 0} views</span>
                    </div>
                  </button>
                ))}
                {myListings.length > 3 && (
                  <button
                    onClick={() => navigateTo('my-listings')}
                    className="w-full py-3 rounded-2xl backdrop-blur-xl bg-white/80 text-purple-600 font-medium border border-purple-200/60 shadow-sm transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>View All Listings</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </>
            ) : (
              <div className="backdrop-blur-2xl bg-white/70 rounded-3xl p-12 border border-white/60 shadow-[0_8px_24px_rgba(139,92,246,0.12)] text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-purple-500" />
                </div>
                <h3 className="text-[#222] font-semibold mb-2">No listings yet</h3>
                <p className="text-[#555] mb-4">Start selling items to see them here</p>
                <button
                  onClick={() => navigateTo('create')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold shadow-[0_8px_24px_rgba(139,92,246,0.4)] transition-transform active:scale-[0.98]"
                >
                  Create Listing
                </button>
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
                className="backdrop-blur-2xl bg-white/70 rounded-2xl p-4 border border-white/60 shadow-sm"
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
                      <p className="text-[#222] font-medium">{transaction.item}</p>
                      <p className="text-[#555] text-sm font-light">{transaction.date}</p>
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

        {/* Settings Links */}
        <div className="backdrop-blur-2xl bg-white/70 rounded-2xl border border-white/60 shadow-sm mt-6 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors border-b border-purple-100/40">
            <span className="text-[#222] font-medium">Campus Settings</span>
            <ChevronRight className="w-5 h-5 text-[#555]" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors border-b border-purple-100/40">
            <span className="text-[#222] font-medium">Notifications</span>
            <ChevronRight className="w-5 h-5 text-[#555]" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors">
            <span className="text-[#222] font-medium">Privacy & Safety</span>
            <ChevronRight className="w-5 h-5 text-[#555]" />
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