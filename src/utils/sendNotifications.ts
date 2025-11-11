import { db } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function sendNotification({
                                           userId,
                                           title,
                                           message,
                                           type = "default",
                                           relatedItemId = null,
                                       }: {
    userId: string;
    title: string;
    message: string;
    type?: string;
    relatedItemId?: string | null;
}) {
    try {
        await addDoc(collection(db, "users", userId, "notifications"), {
            title,
            message,
            type,
            relatedItemId,
            unread: true,
            createdAt: serverTimestamp(),
        });
        console.log("Notification sent to user:", userId);
    } catch (err) {
        console.error("Error sending notification:", err);
    }
}