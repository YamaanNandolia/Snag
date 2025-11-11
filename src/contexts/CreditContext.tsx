"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

const CreditContext = createContext<any>(null);

export function CreditProvider({ children }: { children: React.ReactNode }) {
    const [credits, setCredits] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait until Firebase Auth has a user
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("✅ Logged in user:", user.uid);
                const userRef = doc(db, "users", user.uid);

                // Real-time sync from Firestore
                const unsubscribeDoc = onSnapshot(userRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.data();
                        setCredits(data.credits || 0);
                    }
                    setLoading(false);
                });

                return () => unsubscribeDoc();
            } else {
                setCredits(40);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    // Function to update credits in both state and Firestore
    const updateCredits = async (amount: number) => {
        const user = auth.currentUser;
        if (!user) return console.warn("⚠️ No user signed in");

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { credits: amount });
        setCredits(amount);
    };

    return (
        <CreditContext.Provider value={{ credits, setCredits: updateCredits, loading }}>
            {children}
        </CreditContext.Provider>
    );
}

export function useCredits() {
    return useContext(CreditContext);
}