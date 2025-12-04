// =========================
// ProfileScreen.tsx
// =========================

import { Settings, ChevronRight, Coins, Shield, Package } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import TrustDetailsDrawer from './TrustDetailsDrawer';
import BadgeInfoModal from './BadgeInfoModal';
import { useDarkMode } from '../contexts/DarkModeContext';
import { toast } from 'sonner@2.0.3';

import { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { sendNotification } from '../utils/sendNotifications';

export default function ProfileScreen({ navigateTo }: any) {
    const { darkMode } = useDarkMode();

    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [userListings, setUserListings] = useState<any[]>([]);
    const [loadingListings, setLoadingListings] = useState(true);

    const [pendingConfirmations, setPendingConfirmations] = useState<any[]>([]);

    const [showTrustDrawer, setShowTrustDrawer] = useState(false);
    const [showBadgeModal, setShowBadgeModal] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState<'verified' | 'trades' | null>(null);

    const openBadgeInfo = (badgeType: 'verified' | 'trades') => {
        setSelectedBadge(badgeType);
        setShowBadgeModal(true);
    };

    // ================================
    // 4-digit partner code input state
    // ================================
    const [partnerCodeInputs, setPartnerCodeInputs] = useState<{ [tradeId: string]: string[] }>({});
    const [codeErrors, setCodeErrors] = useState<{ [tradeId: string]: string }>({});

    const updateCodeDigit = (tradeId: string, index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return; // only digits or empty

        setPartnerCodeInputs((prev) => {
            const existing = prev[tradeId] || ['', '', '', ''];
            const next = [...existing];
            next[index] = value;
            return { ...prev, [tradeId]: next };
        });

        // clear error on change
        setCodeErrors((prev) => ({ ...prev, [tradeId]: '' }));
    };

    // ============================================================
    // Fetch User + Listings + Pending Confirmations
    // ============================================================
    useEffect(() => {
        async function fetchUser() {
            setLoadingListings(true);
            try {
                const user = auth.currentUser;
                if (!user) return;

                const userRef = doc(db, 'users', user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();
                    setUserData({ id: user.uid, ...data });

                    // -------------------------------
                    // Fetch the user's listings
                    // -------------------------------
                    const listingIds = data.myListings || [];
                    if (listingIds.length > 0) {
                        const qListings = query(collection(db, 'listings'), where('id', 'in', listingIds));
                        const snapListings = await getDocs(qListings);
                        setUserListings(snapListings.docs.map((d) => ({ id: d.id, ...d.data() })));
                    } else {
                        setUserListings([]);
                    }

                    // -----------------------------------------------
                    // Fetch pending confirmations (buyer + seller)
                    // -----------------------------------------------
                    const qBuyer = query(
                        collection(db, 'tradeConfirmations'),
                        where('buyerId', '==', user.uid),
                        where('buyerConfirmed', '==', false)
                    );

                    const qSeller = query(
                        collection(db, 'tradeConfirmations'),
                        where('sellerId', '==', user.uid),
                        where('sellerConfirmed', '==', false)
                    );

                    const buyerSnap = await getDocs(qBuyer);
                    const sellerSnap = await getDocs(qSeller);

                    const rawTrades = [
                        ...buyerSnap.docs.map((d) => ({ id: d.id, ...d.data(), role: 'buyer' })),
                        ...sellerSnap.docs.map((d) => ({ id: d.id, ...d.data(), role: 'seller' })),
                    ];

                    // -------------------------------------------------
                    // Hydrate each trade with listing + otherUser data
                    // -------------------------------------------------
                    const hydrated: any[] = [];
                    for (const trade of rawTrades) {
                        const listingRef = doc(db, 'listings', trade.listingId);
                        const listingSnap = await getDoc(listingRef);

                        const otherUserId = trade.role === 'buyer' ? trade.sellerId : trade.buyerId;
                        const otherUserRef = doc(db, 'users', otherUserId);
                        const otherUserSnap = await getDoc(otherUserRef);

                        hydrated.push({
                            ...trade,
                            listing: listingSnap.exists() ? listingSnap.data() : null,
                            otherUser: otherUserSnap.exists() ? otherUserSnap.data() : null,
                        });
                    }

                    setPendingConfirmations(hydrated);
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
            } finally {
                setLoading(false);
                setLoadingListings(false);
            }
        }

        fetchUser();
    }, []);

    async function notifyPresence(trade: any) {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const otherUserId = trade.role === "buyer" ? trade.sellerId : trade.buyerId;

            await sendNotification({
                userId: otherUserId,
                title: "📍 Your partner has arrived",
                message: `${user.displayName || "The other user"} is now at the meeting location.`,
                type: "trade",
                relatedItemId: trade.listingId,
            });

            toast.success("Arrival notification sent!");
        } catch (err) {
            console.error("Error notifying arrival:", err);
            toast.error("Failed to notify arrival.");
        }
    }
    // ------------------------------------------------------------
    // Confirm handler – with partner code & waiting state
    // ------------------------------------------------------------
    async function confirmTrade(trade: any) {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const tradeRef = doc(db, 'tradeConfirmations', trade.id);

            const myRole = trade.role; // 'buyer' or 'seller'
            const myConfirmed = myRole === 'buyer' ? trade.buyerConfirmed : trade.sellerConfirmed;

            if (myConfirmed) {
                toast.info('You already confirmed this trade.');
                return;
            }

            // 1. Build entered code from 4 boxes
            const codeArray = partnerCodeInputs[trade.id] || ['', '', '', ''];
            const enteredCode = codeArray.join('');

            if (enteredCode.length !== 4) {
                setCodeErrors((prev) => ({
                    ...prev,
                    [trade.id]: 'Please enter the 4-digit code from the other person.',
                }));
                toast.error('Enter the full 4-digit code to confirm.');
                return;
            }

            // 2. Determine the expected partner code
            const partnerCode = myRole === 'buyer' ? trade.sellerCode : trade.buyerCode;

            if (!partnerCode) {
                console.warn('No partner code found on trade. Allowing confirmation anyway.');
            } else if (enteredCode !== partnerCode) {
                setCodeErrors((prev) => ({
                    ...prev,
                    [trade.id]: 'Code does not match. Double-check with the other person.',
                }));
                toast.error('Incorrect code. Try again.');
                return;
            }

            // 3. Update confirmation field
            const fieldToUpdate =
                myRole === 'buyer'
                    ? { buyerConfirmed: true }
                    : { sellerConfirmed: true };

            await updateDoc(tradeRef, fieldToUpdate);

            // 4. Re-fetch the trade to check if both confirmed
            const fresh = await getDoc(tradeRef);
            const data = fresh.data();

            if (!data) {
                console.error('Trade doc missing after update.');
                return;
            }

            const bothConfirmed = data.buyerConfirmed && data.sellerConfirmed;

            if (bothConfirmed) {
                // Trade fully complete → delete document
                await deleteDoc(tradeRef);

                // Remove from UI
                setPendingConfirmations((prev) => prev.filter((p) => p.id !== trade.id));

                toast.success('Trade completed! Both sides confirmed.');

                // Optional: notify partner of successful completion
                const partnerId = myRole === 'buyer' ? trade.sellerId : trade.buyerId;
                if (partnerId) {
                    await sendNotification({
                        userId: partnerId,
                        title: 'Trade Completed',
                        message: `Both of you confirmed the trade for "${trade.listing?.title || 'an item'}".`,
                        type: 'trade',
                    });
                }
            } else {
                // Only this user confirmed → keep card, mark waiting
                setPendingConfirmations((prev) =>
                    prev.map((p) =>
                        p.id === trade.id
                            ? {
                                ...p,
                                buyerConfirmed: data.buyerConfirmed,
                                sellerConfirmed: data.sellerConfirmed,
                            }
                            : p
                    )
                );

                toast.success('Code accepted! Waiting for the other person to confirm.');
            }

            // Clear this trade's local code input + error
            setPartnerCodeInputs((prev) => ({ ...prev, [trade.id]: ['', '', '', ''] }));
            setCodeErrors((prev) => ({ ...prev, [trade.id]: '' }));
        } catch (err) {
            console.error('Error confirming trade:', err);
            toast.error('Failed to confirm trade.');
        }
    }

    // ------------------------------------------------------------
    // Deny handler – cancels & lowers trustScore
    // ------------------------------------------------------------
    async function denyTrade(trade: any) {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const myRole = trade.role;

            const tradeRef = doc(db, 'tradeConfirmations', trade.id);
            await deleteDoc(tradeRef);

            // Update local UI
            setPendingConfirmations((prev) => prev.filter((p) => p.id !== trade.id));

            // Decrease trustScore of cancelling user
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);
            const uData = userSnap.data() || {};

            const currentTrust =
                typeof uData.trustScore === 'number' ? uData.trustScore : 5;
            const newTrust = Math.max(0, Number((currentTrust - 0.1).toFixed(2)));

            await updateDoc(userRef, { trustScore: newTrust });

            setUserData((prev: any) =>
                prev ? { ...prev, trustScore: newTrust } : prev
            );

            // Notify the other user that trade was cancelled
            const partnerId = myRole === 'buyer' ? trade.sellerId : trade.buyerId;
            if (partnerId) {
                await sendNotification({
                    userId: partnerId,
                    title: 'Trade Cancelled',
                    message: `${
                        uData.name || 'The other user'
                    } cancelled your trade for "${trade.listing?.title || 'an item'}".`,
                    type: 'trade',
                });
            }

            toast.error('Trade denied. Your trust score has been adjusted.');
        } catch (err) {
            console.error('Error denying trade:', err);
            toast.error('Failed to deny trade.');
        }
    }

    // ============================================================
    //                       UI STARTS HERE
    // ============================================================

    const trustScoreDisplay =
        typeof userData?.trustScore === 'number'
            ? userData.trustScore.toFixed(2)
            : '5.00';

    return (
        <div
            className={`min-h-screen pb-8 ${
                darkMode
                    ? 'bg-black'
                    : 'bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100'
            }`}
        >
            {/* Header */}
            <div
                className={`sticky top-0 z-20 backdrop-blur-xl ${
                    darkMode ? 'bg-black/70 border-white/10' : 'bg-white/10 border-white/30'
                } border-b`}
            >
                <div className="max-w-md mx-auto px-4 py-4">
                    <h2
                        className={`font-semibold text-xl ${
                            darkMode ? 'text-purple-400' : 'text-[#9333ea]'
                        }`}
                    >
                        Profile
                    </h2>
                </div>
            </div>

            {/* Profile Header */}
            <div className="max-w-md mx-auto px-4 py-6">
                <div
                    className={`backdrop-blur-xl ${
                        darkMode ? 'bg-white/10 border-white/20' : 'bg-white/10 border-white/30'
                    } rounded-3xl p-6 border shadow-[0_8px_24px_rgba(139,92,246,0.12)] mb-6`}
                >
                    {/* Avatar + Info */}
                    <div className="flex items-start gap-4 mb-6">
                        <Avatar className="w-20 h-20">
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-purple-600 text-white text-2xl font-semibold">
                                {userData?.name?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h2
                                    className={`font-semibold ${
                                        darkMode ? 'text-white' : 'text-[#222]'
                                    }`}
                                >
                                    {userData?.name}
                                </h2>
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            </div>

                            <p className={`${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>
                                {userData?.email}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {userData?.email?.toLowerCase().endsWith('.edu') && (
                                    <button
                                        onClick={() => openBadgeInfo('verified')}
                                        className="backdrop-blur-xl bg-blue-100/60 text-blue-700 border border-blue-200/60 font-medium rounded-full px-3 py-1.5 text-sm"
                                    >
                                        🎓 .edu Verified
                                    </button>
                                )}

                                {userData?.trades >= 10 && (
                                    <button
                                        onClick={() => openBadgeInfo('trades')}
                                        className="backdrop-blur-xl bg-purple-100/60 text-purple-700 border border-purple-200/60 font-medium rounded-full px-3 py-1.5 text-sm"
                                    >
                                        ✨ 10+ Trades
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className={`text-center p-3 rounded-2xl border backdrop-blur-xl ${
                                darkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/60 border-purple-200/40'
                            }`}
                        >
                            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-[#222]'}`}>
                                {userData?.credits}
                            </div>
                            <div
                                className={`text-xs ${
                                    darkMode ? 'text-gray-400' : 'text-[#555]'
                                }`}
                            >
                                Credits
                            </div>
                        </div>

                        <div
                            className={`text-center p-3 rounded-2xl border backdrop-blur-xl ${
                                darkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/60 border-purple-200/40'
                            }`}
                        >
                            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-[#222]'}`}>
                                {userData?.trades}
                            </div>
                            <div
                                className={`text-xs ${
                                    darkMode ? 'text-gray-400' : 'text-[#555]'
                                }`}
                            >
                                Trades
                            </div>
                        </div>

                        <button
                            onClick={() => setShowTrustDrawer(true)}
                            className={`text-center p-3 rounded-2xl border backdrop-blur-xl ${
                                darkMode ? 'bg-white/5 border-white/10' : 'bg-purple-50/60 border-purple-200/40'
                            }`}
                        >
                            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-[#222]'}`}>
                                {trustScoreDisplay}
                            </div>
                            <div
                                className={`text-xs ${
                                    darkMode ? 'text-gray-400' : 'text-[#555]'
                                }`}
                            >
                                Trust Score
                            </div>
                        </button>
                    </div>
                </div>

                {/* ----------------------------- */}
                {/*           TABS SECTION        */}
                {/* ----------------------------- */}
                <Tabs defaultValue="listings" className="w-full">
                    <TabsList
                        className={`w-full backdrop-blur-2xl ${
                            darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'
                        } border rounded-2xl p-1 mb-4`}
                    >
                        <TabsTrigger
                            value="listings"
                            className="
                flex-1 rounded-xl font-medium
                data-[state=active]:bg-gradient-to-r
                data-[state=active]:from-purple-500
                data-[state=active]:to-purple-600
                data-[state=active]:text-white
                transition-all
              "
                        >
                            My Items
                        </TabsTrigger>

                        <TabsTrigger
                            value="confirmations"
                            className="
                flex-1 rounded-xl font-medium
                data-[state=active]:bg-gradient-to-r
                data-[state=active]:from-purple-500
                data-[state=active]:to-purple-600
                data-[state=active]:text-white
                transition-all
              "
                        >
                            Pending Trades
                        </TabsTrigger>
                    </TabsList>

                    {/* LISTINGS TAB */}
                    <TabsContent value="listings" className="space-y-3">
                        {loadingListings ? (
                            <div className="text-center py-8 text-gray-400">Loading listings...</div>
                        ) : userListings.length > 0 ? (
                            userListings
                                .filter((l: any) => l.status === true)
                                .slice(0, 3)
                                .map((listing: any) => (
                                    <button
                                        key={listing.id}
                                        onClick={() => navigateTo('full-listing-view', listing)}
                                        className={`w-full backdrop-blur-2xl ${
                                            darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'
                                        } rounded-2xl p-4 border text-left`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'}`}>
                                                {listing.title}
                                            </h3>
                                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                                Active
                                            </Badge>
                                        </div>
                                    </button>
                                ))
                        ) : (
                            <div
                                className={`backdrop-blur-2xl rounded-3xl p-12 border text-center ${
                                    darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'
                                }`}
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
                                    <Package className="w-10 h-10 text-purple-500" />
                                </div>
                                <h3 className={`${darkMode ? 'text-white' : 'text-[#222]'}`}>
                                    No active listings
                                </h3>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-[#555]'}`}>
                                    Start selling items to see them here
                                </p>
                                <button
                                    onClick={() => navigateTo('create')}
                                    className="mt-4 px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold"
                                >
                                    Create Listing
                                </button>
                            </div>
                        )}
                    </TabsContent>

                    {/* ------------------------------------------------ */}
                    {/*              PENDING TRADES TAB                 */}
                    {/* ------------------------------------------------ */}
                    <TabsContent value="confirmations" className="space-y-3">
                        {pendingConfirmations.length === 0 ? (
                            <div className="text-center text-gray-400 py-6">
                                No pending trades to confirm.
                            </div>
                        ) : (
                            pendingConfirmations.map((trade: any) => {
                                const myRole = trade.role; // 'buyer' or 'seller'
                                const myCode =
                                    myRole === 'buyer' ? trade.buyerCode : trade.sellerCode;
                                const myConfirmed =
                                    myRole === 'buyer' ? trade.buyerConfirmed : trade.sellerConfirmed;
                                const partnerConfirmed =
                                    myRole === 'buyer' ? trade.sellerConfirmed : trade.buyerConfirmed;
                                const isWaiting = myConfirmed && !partnerConfirmed;

                                const codeArray = partnerCodeInputs[trade.id] || ['', '', '', ''];
                                const errorMsg = codeErrors[trade.id];

                                return (
                                    <div
                                        key={trade.id}
                                        className={`backdrop-blur-2xl rounded-2xl p-4 border shadow-sm ${
                                            darkMode ? 'bg-white/10 border-white/20' : 'bg-white/70 border-white/60'
                                        }`}
                                    >
                                        <h3
                                            className={`font-semibold mb-2 ${
                                                darkMode ? 'text-white' : 'text-[#222]'
                                            }`}
                                        >
                                            Trade Confirmation Needed
                                        </h3>

                                        {/* Item Title */}
                                        <p className={`${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>
                                            <span className="font-semibold">Item:</span>{' '}
                                            {trade.listing?.title || 'Unknown item'}
                                        </p>

                                        {/* Meeting Spot */}
                                        <p className={`${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>
                                            <span className="font-semibold">Location:</span>{' '}
                                            {trade.listing?.meetingSpot || 'Not specified'}
                                        </p>

                                        {/* Meeting Time */}
                                        <p className={`${darkMode ? 'text-gray-300' : 'text-[#555]'}`}>
                                            <span className="font-semibold">Time:</span>{' '}
                                            {trade.listing?.meetingTime || 'Not specified'}
                                        </p>

                                        {/* Other User */}
                                        <p className={`${darkMode ? 'text-gray-300' : 'text-[#555]'} mb-1`}>
                                            <span className="font-semibold">With:</span> {trade.otherUser?.name}
                                        </p>

                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`${darkMode ? 'text-gray-400' : 'text-[#777]'}`}>Trust Score:</span>
                                            <span className="font-semibold text-purple-600">
                                            {trade.otherUser?.trustScore?.toFixed(1) ?? "N/A"} / 5
                                          </span>
                                        </div>

                                        {/* Role */}
                                        <p
                                            className={`${darkMode ? 'text-gray-400' : 'text-[#777]'} text-xs mb-3`}
                                        >
                                            You are the <b>{trade.role}</b> in this trade.
                                        </p>

                                        {/* Your Code Display */}
                                        <div
                                            className={`mb-3 p-2 rounded-xl text-sm ${
                                                darkMode
                                                    ? 'bg-white/5 border border-white/15 text-gray-200'
                                                    : 'bg-purple-50 border border-purple-100 text-[#333]'
                                            }`}
                                        >
                                            <div className="font-semibold mb-1">Your pickup code</div>
                                            <div className="tracking-[0.3em] text-lg font-mono">
                                                {myCode || '----'}
                                            </div>
                                            <p className="text-xs mt-1 opacity-75">
                                                Show this code to the other person. You will enter their code
                                                below to confirm.
                                            </p>
                                        </div>

                                        {/*notification button */}
                                        <button
                                            onClick={() => notifyPresence(trade)}
                                            className={`
                                            w-full py-2 mt-1 rounded-xl font-semibold active:scale-95 transition-all
                                            bg-blue-600 shadow-md border border-blue-700 hover:bg-blue-700
                                        
                                            ${darkMode ? "text-purple-200" : "text-purple-900"}
                                          `}
                                        >
                                            I'm Here — Notify Other User
                                        </button>

                                        {/* Partner Code Input */}
                                        <div className="mb-3 mt-3">
                                            <p
                                                className={`text-xs mb-2 ${
                                                    darkMode ? 'text-gray-300' : 'text-[#555]'
                                                }`}
                                            >
                                                Enter the <b>4-digit code the other person tells you</b>:
                                            </p>
                                            <div className="flex gap-2">
                                                {codeArray.map((digit, idx) => (
                                                    <input
                                                        key={idx}
                                                        maxLength={1}
                                                        inputMode="numeric"
                                                        pattern="[0-9]*"
                                                        disabled={myConfirmed}
                                                        className={`w-10 h-10 text-center rounded-lg border text-lg font-mono ${
                                                            darkMode
                                                                ? 'bg-black/40 border-white/20 text-white'
                                                                : 'bg-white border-gray-300 text-[#222]'
                                                        } ${myConfirmed ? 'opacity-60 cursor-not-allowed' : ''}`}
                                                        value={digit}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, "");
                                                            updateCodeDigit(trade.id, idx, val);

                                                            // auto-advance AFTER state updates
                                                            if (val && idx < 3) {
                                                                setTimeout(() => {
                                                                    const nextInput = document.getElementById(`${trade.id}-code-${idx + 1}`);
                                                                    nextInput?.focus();
                                                                }, 10);
                                                            }
                                                        }}
                                                        onKeyDown={(e) => {
                                                            // Backspace behavior: move left if empty
                                                            if (e.key === "Backspace" && !digit && idx > 0) {
                                                                setTimeout(() => {
                                                                    const prevInput = document.getElementById(`${trade.id}-code-${idx - 1}`);
                                                                    prevInput?.focus();
                                                                }, 10);
                                                            }
                                                        }}
                                                        id={`${trade.id}-code-${idx}`}
                                                    />
                                                ))}
                                            </div>
                                            {errorMsg && (
                                                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                                    ⚠ {errorMsg}
                                                </p>
                                            )}
                                        </div>

                                        {/* Status Pills */}
                                        <div className="flex gap-2 mb-3 flex-wrap text-xs">
                                            {myConfirmed && (
                                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                          You confirmed
                        </span>
                                            )}
                                            {partnerConfirmed && (
                                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">
                          Other user confirmed
                        </span>
                                            )}
                                            {isWaiting && (
                                                <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Waiting for the other user...
                        </span>
                                            )}
                                        </div>

                                        {/* Buttons */}
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={() => confirmTrade(trade)}
                                                disabled={myConfirmed}
                                                className={`flex-1 py-2 rounded-xl text-white font-medium active:scale-95 transition-all ${
                                                    myConfirmed
                                                        ? 'bg-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:shadow-md'
                                                }`}
                                            >
                                                Confirm Completed
                                            </button>

                                            <button
                                                onClick={() => denyTrade(trade)}
                                                disabled={myConfirmed}
                                                className={`flex-1 py-2 rounded-xl font-medium active:scale-95 transition-all ${
                                                    myConfirmed
                                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                        : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                                                }`}
                                            >
                                                Deny
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </TabsContent>
                </Tabs>

                {/* Edit Profile Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => navigateTo('edit-profile')}
                        className="w-full py-4 rounded-2xl bg-purple-600 text-white font-semibold active:scale-95"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* Modals */}
            <TrustDetailsDrawer
                isOpen={showTrustDrawer}
                onClose={() => setShowTrustDrawer(false)}
            />
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