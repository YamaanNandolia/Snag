import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Package,
    CheckCircle,
    MapPin,
    ShoppingBag,
    CheckCheck,
    Clock
} from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { auth, db } from "../firebaseConfig";
import {
    collection,
    query,
    orderBy,
    where,
    onSnapshot,
    getDocs,
    writeBatch,
    doc,
    updateDoc,
    deleteDoc,
    setDoc
} from "firebase/firestore";
import { toast } from "sonner@2.0.3";
import { sendNotification } from "../utils/sendNotifications";

/* ------------------------------------------
   Utility: Generate unique 4-digit codes
------------------------------------------- */
function generateTradeCodes() {
    const make = () => Math.floor(1000 + Math.random() * 9000).toString();
    let buyerCode = make();
    let sellerCode = make();

    while (buyerCode === sellerCode) sellerCode = make();

    return { buyerCode, sellerCode };
}

/* ------------------------------------------
   MAIN NOTIFICATIONS SCREEN
------------------------------------------- */
export default function NotificationsScreen({ navigateTo }: any) {
    const { darkMode } = useDarkMode();
    const [notifications, setNotifications] = useState<any[]>([]);

    /* ------------------------------------------
       Mark all notifications as read on open
    ------------------------------------------- */
    async function markAllAsRead() {
        const user = auth.currentUser;
        if (!user) return;

        const ref = collection(db, "users", user.uid, "notifications");
        const q = query(ref, where("read", "==", false));
        const snap = await getDocs(q);

        if (snap.empty) return;

        const batch = writeBatch(db);
        snap.docs.forEach((docSnap) => batch.update(docSnap.ref, { read: true }));
        await batch.commit();
    }

    useEffect(() => {
        markAllAsRead();
    }, []);

    /* ------------------------------------------
       Realtime listener for notifications
    ------------------------------------------- */
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(
            collection(db, "users", user.uid, "notifications"),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
                time: "Just now"
            }));
            setNotifications(data);
        });

        return () => unsubscribe();
    }, []);

    /* ------------------------------------------
       Accept Meeting Request
    ------------------------------------------- */
    const handleAcceptMeeting = async (notif: any) => {
        try {
            const listingRef = doc(db, "listings", notif.relatedItemId);

            await updateDoc(listingRef, {
                status: false,
                pendingConfirmation: false,
                meetingSpot: notif.metadata?.proposedSpot,
                meetingTime: notif.metadata?.proposedTime
            });

            // Create trade confirmation
            const tradeRef = doc(collection(db, "tradeConfirmations"));
            const { buyerCode, sellerCode } = generateTradeCodes();

            await setDoc(tradeRef, {
                listingId: notif.relatedItemId,
                buyerId: notif.metadata?.buyerId,
                sellerId: auth.currentUser?.uid,
                buyerCode,
                sellerCode,
                buyerConfirmed: false,
                sellerConfirmed: false,
                createdAt: Date.now()
            });

            // Notify buyer
            await sendNotification({
                userId: notif.metadata?.buyerId,
                title: "✅ Meeting Accepted!",
                message: `${auth.currentUser?.displayName || "The seller"} accepted your proposal.`,
                type: "trade",
                read: false,
            });

            await deleteDoc(
                doc(db, "users", auth.currentUser!.uid, "notifications", notif.id)
            );

            toast.success("Meeting accepted!");
        } catch (err) {
            console.error(err);
            toast.error("Error accepting meeting.");
        }
    };

    /* ------------------------------------------
       Deny Meeting Request
    ------------------------------------------- */
    const handleDenyMeeting = async (notif: any) => {
        try {
            await updateDoc(doc(db, "listings", notif.relatedItemId), {
                status: true,
                pendingConfirmation: false
            });

            await sendNotification({
                userId: notif.metadata?.buyerId,
                title: "❌ Meeting Denied",
                message: "The seller denied your meeting proposal.",
                type: "trade",
                read: false,
            });

            await deleteDoc(
                doc(db, "users", auth.currentUser!.uid, "notifications", notif.id)
            );

            toast.warning("Meeting denied.");
        } catch (err) {
            console.error(err);
            toast.error("Error denying meeting.");
        }
    };

    /* ------------------------------------------
       RENDER UI
    ------------------------------------------- */
    return (
        <div
            className={`min-h-screen pb-8 ${
                darkMode
                    ? "bg-black"
                    : "bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100"
            }`}
        >
            {/* HEADER */}
            <div
                className={`sticky top-0 z-20 backdrop-blur-xl ${
                    darkMode ? "bg-black/70 border-white/10" : "bg-white/10 border-white/30"
                } border-b`}
            >
                <div className="max-w-md mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigateTo("home")}
                            className={`p-2 rounded-full ${
                                darkMode ? "hover:bg-white/10" : "hover:bg-white/50"
                            }`}
                        >
                            <ArrowLeft
                                className={`w-6 h-6 ${
                                    darkMode ? "text-white" : "text-[#222]"
                                }`}
                            />
                        </button>
                        <h2
                            className={`font-semibold text-xl ${
                                darkMode ? "text-purple-400" : "text-[#9333ea]"
                            }`}
                        >
                            Notifications
                        </h2>
                    </div>
                </div>
            </div>

            {/* LIST */}
            {notifications.length > 0 ? (
                <div className="max-w-md mx-auto px-4 py-4 space-y-6">
                    {notifications.map((n) => (
                        <NotificationCard
                            key={n.id}
                            notification={n}
                            darkMode={darkMode}
                            onAccept={handleAcceptMeeting}
                            onDeny={handleDenyMeeting}
                        />
                    ))}
                </div>
            ) : (
                <div className="max-w-md mx-auto px-4 py-16 text-center">
                    <CheckCheck className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <p className={darkMode ? "text-white" : "text-[#333]"}>
                        You have no notifications.
                    </p>
                </div>
            )}
        </div>
    );
}

/* ------------------------------------------
   Notification Card Component
------------------------------------------- */
function NotificationCard({ notification, onClick, onAccept, onDeny, darkMode }: any) {
    const iconMap: any = {
        meeting: MapPin,
        listing: Package,
        trade: ShoppingBag,
        meeting_request: MapPin,
        default: CheckCircle,
    };

    const colorMap: any = {
        meeting: "from-green-500 to-green-600",
        listing: "from-indigo-500 to-indigo-600",
        trade: "from-purple-500 to-purple-600",
        meeting_request: "from-yellow-400 to-yellow-500",
        default: "from-blue-500 to-blue-600",
    };

    const IconComponent = iconMap[notification.type] || iconMap.default;
    const iconColor = colorMap[notification.type] || colorMap.default;

    // ✅ Debugging output
    console.log("Render notification:", notification.id, notification.type);

    return (
        <div
            onClick={onClick}
            className={`w-full backdrop-blur-xl rounded-2xl p-4 border shadow-sm transition-all hover:shadow-[0_8px_24px_rgba(139,92,246,0.15)] text-left ${
                notification.unread
                    ? darkMode
                        ? "bg-white/15 border-white/30"
                        : "bg-white/20 border-white/40"
                    : darkMode
                        ? "bg-white/5 border-white/10"
                        : "bg-white/10 border-white/30"
            }`}
        >
            <div className="flex gap-3">
                <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${iconColor} flex items-center justify-center flex-shrink-0`}
                >
                    <IconComponent className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3
                        className={`font-medium flex items-center gap-2 ${
                            darkMode ? "text-white" : "text-[#222]"
                        }`}
                    >
                        {notification.title}
                        {notification.unread && (
                            <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                        )}
                    </h3>

                    <p
                        className={`mb-2 text-sm ${
                            darkMode ? "text-gray-300" : "text-[#555]"
                        }`}
                    >
                        {notification.message}
                    </p>

                    {/* ✅ Yellow alert card for meeting_request */}
                    {notification.type?.trim().toLowerCase() === "meeting_request" && (
                        <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-2xl shadow-sm">
                            <p className="text-xs text-yellow-800 font-medium mb-2 flex items-center gap-1">
                                ⚠️ Meeting Proposal:
                            </p>
                            <div className="flex flex-col gap-1 text-sm text-gray-800">
                                <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-yellow-600" />
                                    <span>{notification.metadata?.proposedSpot}</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-yellow-600" />
                                    <span>{notification.metadata?.proposedTime}</span>
                                </p>
                            </div>
                            <div className="flex gap-2 mt-3">
                                {/* ✅ Accept button — now guaranteed visible and clickable */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("✅ Accept clicked:", notification.id);
                                        onAccept?.(notification);
                                    }}
                                    className="px-4 py-1.5 rounded-full bg-green-500 text-black text-xs font-semibold hover:bg-green-600 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                                >
                                    Accept
                                </button>

                                {/* ❌ Deny button */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("❌ Deny clicked:", notification.id);
                                        onDeny?.(notification);
                                    }}
                                    className="px-4 py-1.5 rounded-full bg-red-500 text-white text-xs font-semibold hover:bg-red-600 active:scale-[0.98] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                                >
                                    Deny
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}