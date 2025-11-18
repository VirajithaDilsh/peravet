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
import { useProduction } from "@/context/ProductionContext";

export default function DashboardCharts() {
    const { records: ctxRecords } = useProduction();

    const [records, setRecords] = useState<ProductionRecord[]>([]);
    const [milkData, setMilkData] = useState<{ day: string; milk: number }[]>([]);
    const [eggData, setEggData] = useState<{ day: string; eggs?: number; meat?: number }[]>([]);

    const [milkSpecies, setMilkSpecies] = useState("Cattle");
    const [eggSpecies, setEggSpecies] = useState("Layer");

    // 🔁 Load from localStorage OR context
    useEffect(() => {
        const load = () => {
            const saved = localStorage.getItem("productionRecords");
            if (saved) {
                setRecords(JSON.parse(saved));
            } else {
                setRecords(ctxRecords);
            }
        };

        load();
        window.addEventListener("storage", load);

        return () => window.removeEventListener("storage", load);
    }, [ctxRecords]);

    // 🥛 Milk production chart
    useEffect(() => {
        const milkMap: Record<string, number> = {};

        records
            .filter((r) => r.species === milkSpecies && r.type === "Milk")
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

    // 🥚 🥩 Egg / Meat chart
    useEffect(() => {
        const dataMap: Record<string, { eggs?: number; meat?: number }> = {};

        records
            .filter((r) => ["Layer", "Broiler"].includes(r.species))
            .forEach((r) => {
                if (!dataMap[r.date]) dataMap[r.date] = {};

                if (r.species === "Layer") {
                    dataMap[r.date].eggs = (dataMap[r.date].eggs || 0) + r.quantity;
                }
                if (r.species === "Broiler") {
                    dataMap[r.date].meat = (dataMap[r.date].meat || 0) + r.quantity;
                }
            });

        setEggData(
            Object.entries(dataMap).map(([day, values]) => ({
                day,
                ...values,
            }))
        );
    }, [records]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Milk Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Milk Production (Liters)
                </h3>

                <select
                    value={milkSpecies}
                    onChange={(e) => setMilkSpecies(e.target.value)}
                    className="border rounded px-3 py-1 mb-4 text-gray-600"
                >
                    {["Cattle", "Buffalo", "Goat", "Sheep"].map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={milkData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="milk"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#3B82F6" }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Egg / Meat chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {eggSpecies === "Broiler"
                        ? "Meat Production (Kg)"
                        : "Egg Production (Eggs)"}
                </h3>

                <select
                    value={eggSpecies}
                    onChange={(e) => setEggSpecies(e.target.value)}
                    className="border rounded px-3 py-1 mb-4 text-gray-600"
                >
                    <option value="Layer">Layer</option>
                    <option value="Broiler">Broiler</option>
                </select>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={eggData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis
                            label={{
                                value: eggSpecies === "Broiler" ? "Kg" : "Eggs",
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
