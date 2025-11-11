import { useEffect, useState } from "react";
import {ArrowLeft, Package, CheckCircle, MapPin, ShoppingBag, CheckCheck, Clock} from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { auth, db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner@2.0.3";
import { sendNotification } from "../utils/sendNotifications";

export default function NotificationsScreen({ navigateTo }: any) {
    const { darkMode } = useDarkMode();
    const [notifications, setNotifications] = useState<any[]>([]);

    // 🔥 Fetch notifications in realtime for the logged-in user
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const q = query(collection(db, "users", user.uid, "notifications"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                time: "Just now", // Simplified time display
            }));
            setNotifications(data);
        });

        return () => unsubscribe();
    }, []);

    // ✅ Handle meeting acceptance
    const handleAcceptMeeting = async (notification: any) => {
        try {
            const listingRef = doc(db, "listings", notification.relatedItemId);

            await updateDoc(listingRef, {
                status: false,
                meetingSpot: notification.metadata?.proposedSpot,
                meetingTime: notification.metadata?.proposedTime,
                pendingConfirmation: false,
            });

            await sendNotification({
                userId: notification.metadata?.buyerId,
                title: "✅ Meeting Accepted!",
                message: `${auth.currentUser?.displayName || "The seller"} accepted your meeting proposal for "${
                    notification.title
                }".\n📍 Location: ${notification.metadata?.proposedSpot}\n🕒 Time: ${notification.metadata?.proposedTime}`,
                type: "trade",
            });

            // ✅ Delete notification after accepting
            const notifRef = doc(db, "users", auth.currentUser?.uid || "", "notifications", notification.id);
            await deleteDoc(notifRef);

            toast.success("Meeting proposal accepted!");
        } catch (err) {
            console.error("🔥 Accept meeting error:", err);
            toast.error("Failed to accept meeting proposal.");
        }
    };

    const handleDenyMeeting = async (notification: any) => {
        try {
            const listingRef = doc(db, "listings", notification.relatedItemId);

            await updateDoc(listingRef, {
                status: true,
                pendingConfirmation: false,
            });

            await sendNotification({
                userId: notification.metadata?.buyerId,
                title: "❌ Meeting Denied",
                message: `${auth.currentUser?.displayName || "The seller"} declined your meeting proposal for "${
                    notification.title
                }". The listing has been reopened.`,
                type: "trade",
            });

            // ✅ Delete notification after denying
            const notifRef = doc(db, "users", auth.currentUser?.uid || "", "notifications", notification.id);
            await deleteDoc(notifRef);

            toast.warning("Meeting proposal denied and listing reopened.");
        } catch (err) {
            console.error("🔥 Deny meeting error:", err);
            toast.error("Failed to deny meeting proposal.");
        }
    };

    return (
        <div
            className={`min-h-screen pb-8 ${
                darkMode ? "bg-black" : "bg-gradient-to-br from-purple-50 via-lavender-50 to-purple-100"
            }`}
        >
            {/* Header */}
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
                            } transition-colors`}
                        >
                            <ArrowLeft className={`w-6 h-6 ${darkMode ? "text-white" : "text-[#222]"}`} />
                        </button>
                        <h2 className={`font-semibold text-xl ${darkMode ? "text-purple-400" : "text-[#9333ea]"}`}>
                            Notifications
                        </h2>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            {notifications.length > 0 ? (
                <div className="max-w-md mx-auto px-4 py-4 space-y-6">
                    <div className="space-y-3">
                        <h3 className={`font-semibold px-2 ${darkMode ? "text-white" : "text-[#222]"}`}>Today</h3>
                        {notifications.map((notification) => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                                darkMode={darkMode}
                                onClick={() => console.log("Clicked:", notification)}
                                onAccept={handleAcceptMeeting}
                                onDeny={handleDenyMeeting}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="max-w-md mx-auto px-4 py-16 text-center">
                    <div
                        className={`backdrop-blur-2xl ${
                            darkMode ? "bg-white/10 border-white/20" : "bg-white/70 border-white/60"
                        } rounded-3xl p-12 border shadow-[0_8px_24px_rgba(139,92,246,0.12)]`}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4">
                            <CheckCheck className="w-10 h-10 text-purple-500" />
                        </div>
                        <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-[#222]"}`}>All caught up!</h3>
                        <p className={darkMode ? "text-gray-300" : "text-[#555]"}>You have no new notifications</p>
                    </div>
                </div>
            )}
        </div>
    );
}

/* -------------------------------
   NotificationCard Component
--------------------------------*/
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