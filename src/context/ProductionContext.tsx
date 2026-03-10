"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductionRecord } from "@/types/Production";

// FUTURE: API service (not used yet)
// import {
//   getProductionRecordsAPI,
//   createProductionRecordAPI,
//   updateProductionRecordAPI,
//   deleteProductionRecordAPI,
// } from "@/services/productionApi";

interface ProductionContextType {
    records: ProductionRecord[];
    addRecord: (record: ProductionRecord) => void;
    updateRecord: (id: string, record: ProductionRecord) => void;
    deleteRecord: (id: string) => void;
}

const ProductionContext = createContext<ProductionContextType | undefined>(undefined);

export const ProductionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [records, setRecords] = useState<ProductionRecord[]>([]);

    // ------------------------------------------------
    // Load records
    // ------------------------------------------------
    useEffect(() => {

        // FUTURE BACKEND
        /*
        const loadRecords = async () => {
            const data = await getProductionRecordsAPI();
            setRecords(data);
        };
        loadRecords();
        */

        const saved = localStorage.getItem("productionRecords");
        if (saved) setRecords(JSON.parse(saved));
    }, []);

    // ------------------------------------------------
    // Save records to localStorage
    // ------------------------------------------------
    useEffect(() => {
        localStorage.setItem("productionRecords", JSON.stringify(records));
    }, [records]);

    // ------------------------------------------------
    // Add Record
    // ------------------------------------------------
    const addRecord = (record: ProductionRecord) => {

        const newRecord = { ...record, id: Date.now().toString() };

        // FUTURE BACKEND
        // await createProductionRecordAPI(newRecord);

        setRecords((prev) => [...prev, newRecord]);
    };

    // ------------------------------------------------
    // Update Record
    // ------------------------------------------------
    const updateRecord = (id: string, record: ProductionRecord) => {

        // FUTURE BACKEND
        // await updateProductionRecordAPI(id, record);

        setRecords((prev) =>
            prev.map((r) => (r.id === id ? { ...record, id } : r))
        );
    };

    // ------------------------------------------------
    // Delete Record
    // ------------------------------------------------
    const deleteRecord = (id: string) => {

        // FUTURE BACKEND
        // await deleteProductionRecordAPI(id);

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