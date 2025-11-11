import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function sendNotification({
                                           userId,
                                           title,
                                           message,
                                           type,
                                           relatedItemId,
                                           metadata = {},
                                       }: {
    userId: string;
    title: string;
    message: string;
    type: string;
    relatedItemId?: string;
    metadata?: Record<string, any>;
}) {
    if (!userId) throw new Error("❌ sendNotification: userId is required");

    const notifRef = collection(db, "users", userId, "notifications");
    await addDoc(notifRef, {
        title,
        message,
        type,
        relatedItemId: relatedItemId || null,
        metadata: metadata || {},
        createdAt: serverTimestamp(),
        unread: true,
    });

    console.log(`✅ Notification sent to ${userId}`);
}