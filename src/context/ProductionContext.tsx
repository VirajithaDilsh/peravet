"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductionRecord } from "@/types/Production";

interface ProductionContextType {
    records: ProductionRecord[];
    addRecord: (record: ProductionRecord) => void;
    updateRecord: (id: string, record: ProductionRecord) => void;
    deleteRecord: (id: string) => void;
}

const ProductionContext = createContext<ProductionContextType | undefined>(undefined);

export const ProductionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [records, setRecords] = useState<ProductionRecord[]>([]);

    // Load records from localStorage on client
    useEffect(() => {
        const saved = localStorage.getItem("productionRecords");
        if (saved) setRecords(JSON.parse(saved));
    }, []);

    // Save records to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("productionRecords", JSON.stringify(records));
    }, [records]);

    const addRecord = (record: ProductionRecord) => {
        const newRecord = { ...record, id: Date.now().toString() };
        setRecords((prev) => [...prev, newRecord]);
    };

    const updateRecord = (id: string, record: ProductionRecord) => {
        setRecords((prev) => prev.map((r) => (r.id === id ? { ...record, id } : r)));
    };

    const deleteRecord = (id: string) => {
        setRecords((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <ProductionContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
            {children}
        </ProductionContext.Provider>
    );
};

export const useProduction = () => {
    const context = useContext(ProductionContext);
    if (!context) throw new Error("useProduction must be used within ProductionProvider");
    return context;
};