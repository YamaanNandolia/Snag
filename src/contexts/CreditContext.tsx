"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CreditContextType {
    credits: number;
    setCredits: React.Dispatch<React.SetStateAction<number>>;
}

// create context
const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider = ({ children }: { children: ReactNode }) => {
    const [credits, setCredits] = useState(40); // default value or fetch from Firestore later

    return (
        <CreditContext.Provider value={{ credits, setCredits }}>
            {children}
        </CreditContext.Provider>
    );
};

// simple hook for convenience
export const useCredits = () => {
    const context = useContext(CreditContext);
    if (!context)
        throw new Error("useCredits must be used within a CreditProvider");
    return context;
};