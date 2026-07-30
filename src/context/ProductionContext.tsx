"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductionRecord } from "@/types/Production";
import { useUserContext } from "@/context/UserContext";
import {
    getProductionRecordsAPI,
    createProductionRecordAPI,
    updateProductionRecordAPI,
    deleteProductionRecordAPI,
} from "@/services/productionApi";

interface ProductionContextType {
    records: ProductionRecord[];
    addRecord: (record: ProductionRecord) => Promise<void>;
    updateRecord: (id: string, record: ProductionRecord) => Promise<void>;
    deleteRecord: (id: string) => Promise<void>;
}

const ProductionContext = createContext<ProductionContextType | undefined>(undefined);

// Mongo docs come back as { _id, date: <ISO datetime>, ... } — normalize to
// the `id` + yyyy-mm-dd shape the form/table already expect.
const toRecord = (doc: ProductionRecord & { _id: string }): ProductionRecord => ({
    ...doc,
    id: doc._id,
    date: doc.date ? String(doc.date).split("T")[0] : doc.date,
});

export const ProductionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useUserContext();
    const [records, setRecords] = useState<ProductionRecord[]>([]);

    // ------------------------------------------------
    // Load records (requests need a JWT, so (re)load once a user is
    // actually logged in rather than once on initial mount)
    // ------------------------------------------------
    useEffect(() => {
        const loadRecords = async () => {
            try {
                const data = await getProductionRecordsAPI();
                setRecords(data.map(toRecord));
            } catch (err) {
                console.error("Load production records error:", err);
            }
        };

        if (currentUser) {
            loadRecords();
        } else {
            setRecords([]);
        }
    }, [currentUser]);

    // ------------------------------------------------
    // Add Record
    // ------------------------------------------------
    const addRecord = async (record: ProductionRecord) => {
        try {
            const created = await createProductionRecordAPI(record);
            setRecords((prev) => [...prev, toRecord(created)]);
        } catch (err) {
            console.error("Add production record error:", err);
        }
    };

    // ------------------------------------------------
    // Update Record
    // ------------------------------------------------
    const updateRecord = async (id: string, record: ProductionRecord) => {
        try {
            const updated = await updateProductionRecordAPI(id, record);
            setRecords((prev) =>
                prev.map((r) => (r.id === id ? toRecord(updated) : r))
            );
        } catch (err) {
            console.error("Update production record error:", err);
        }
    };

    // ------------------------------------------------
    // Delete Record
    // ------------------------------------------------
    const deleteRecord = async (id: string) => {
        try {
            await deleteProductionRecordAPI(id);
            setRecords((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
            console.error("Delete production record error:", err);
        }
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