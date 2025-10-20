"use client";

import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { ProductionRecord } from "@/types/Production";

export default function DashboardCharts() {
    const [records, setRecords] = useState<ProductionRecord[]>([]);
    const [milkData, setMilkData] = useState<{ day: string; milk: number }[]>([]);
    const [eggData, setEggData] = useState<
        { day: string; eggs?: number; meat?: number }[]
    >([]);
    const [milkSpecies, setMilkSpecies] = useState("Cattle");
    const [eggSpecies, setEggSpecies] = useState("Layer");

    // 🔁 Load and auto-refresh localStorage updates
    useEffect(() => {
        const loadData = () => {
            const saved = localStorage.getItem("productionRecords");
            if (saved) setRecords(JSON.parse(saved));
        };
        loadData();
        window.addEventListener("storage", loadData);
        return () => window.removeEventListener("storage", loadData);
    }, []);

    // 🥛 Milk data
    useEffect(() => {
        const milkMap: Record<string, number> = {};
        records
            .filter(
                (r) =>
                    ["Cattle", "Buffalo", "Goat", "Sheep"].includes(r.species) &&
                    r.species === milkSpecies
            )
            .forEach((r) => {
                milkMap[r.date] = (milkMap[r.date] || 0) + r.quantity;
            });

        setMilkData(
            Object.entries(milkMap).map(([day, milk]) => ({
                day,
                milk,
            }))
        );
    }, [records, milkSpecies]);

    // 🥚 Egg / Meat data
    useEffect(() => {
        const dataMap: Record<string, { eggs?: number; meat?: number }> = {};

        records
            .filter((r) => ["Layer", "Broiler"].includes(r.species))
            .forEach((r) => {
                if (!dataMap[r.date]) dataMap[r.date] = {};
                if (r.species === "Layer") dataMap[r.date].eggs = (dataMap[r.date].eggs || 0) + r.quantity;
                if (r.species === "Broiler") dataMap[r.date].meat = (dataMap[r.date].meat || 0) + r.quantity;
            });

        setEggData(
            Object.entries(dataMap).map(([day, { eggs, meat }]) => ({
                day,
                eggs,
                meat,
            }))
        );
    }, [records]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Milk Production Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Milk Production (Liters)
                </h3>

                <select
                    value={milkSpecies}
                    onChange={(e) => setMilkSpecies(e.target.value)}
                    className="border rounded px-3 py-1 mb-4 text-gray-600"
                >
                    {["Cattle", "Buffalo", "Goat", "Sheep"].map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={milkData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="milk"
                            stroke="#10B981"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#10B981" }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Egg / Meat Production Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {eggSpecies === "Broiler"
                        ? "Meat Production (Kilograms)"
                        : "Egg Production (Eggs)"}
                </h3>

                <select
                    value={eggSpecies}
                    onChange={(e) => setEggSpecies(e.target.value)}
                    className="border rounded px-3 py-1 mb-4 text-gray-600"
                >
                    {["Layer", "Broiler"].map((species) => (
                        <option key={species} value={species}>
                            {species}
                        </option>
                    ))}
                </select>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={eggData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis
                            label={{
                                value: eggSpecies === "Broiler" ? "Kilograms" : "Eggs",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#6b7280",
                            }}
                            stroke="#6b7280"
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey={eggSpecies === "Broiler" ? "meat" : "eggs"}
                            stroke={eggSpecies === "Broiler" ? "#10B981" : "#F59E0B"}
                            strokeWidth={3}
                            dot={{
                                r: 5,
                                fill: eggSpecies === "Broiler" ? "#10B981" : "#F59E0B",
                            }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
