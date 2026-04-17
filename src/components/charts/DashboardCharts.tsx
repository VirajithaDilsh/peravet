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
import { useProduction } from "@/context/ProductionContext";

type GroupByType = "daily" | "weekly" | "monthly";

export default function DashboardCharts() {
    const { records } = useProduction();

    const [milkData, setMilkData] = useState<{ period: string; milk: number }[]>([]);
    const [eggData, setEggData] = useState<{ period: string; eggs?: number; meat?: number }[]>([]);

    const [milkSpecies, setMilkSpecies] = useState("Cattle");
    const [eggSpecies, setEggSpecies] = useState("Layer");

    const [milkGroupBy, setMilkGroupBy] = useState<GroupByType>("daily");
    const [eggGroupBy, setEggGroupBy] = useState<GroupByType>("daily");

    // format date key
    const getGroupedDate = (dateStr: string, groupBy: GroupByType) => {
        const date = new Date(dateStr);

        if (isNaN(date.getTime())) return dateStr;

        if (groupBy === "daily") {
            return date.toISOString().split("T")[0];
        }

        if (groupBy === "monthly") {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            return `${year}-${month}`;
        }

        // weekly
        const temp = new Date(date);
        const day = temp.getDay(); // 0=Sun, 1=Mon...
        const diff = day === 0 ? -6 : 1 - day; // start week from Monday
        temp.setDate(temp.getDate() + diff);

        const year = temp.getFullYear();
        const month = String(temp.getMonth() + 1).padStart(2, "0");
        const dayOfMonth = String(temp.getDate()).padStart(2, "0");

        return `Week of ${year}-${month}-${dayOfMonth}`;
    };

    // sort periods correctly
    const sortPeriods = (a: string, b: string) => {
        const getSortDate = (value: string) => {
            if (value.startsWith("Week of ")) {
                return new Date(value.replace("Week of ", "")).getTime();
            }
            if (/^\d{4}-\d{2}$/.test(value)) {
                return new Date(`${value}-01`).getTime();
            }
            return new Date(value).getTime();
        };

        return getSortDate(a) - getSortDate(b);
    };

    // Milk data
    useEffect(() => {
        const milkMap: Record<string, number> = {};

        records
            .filter(
                (r) =>
                    ["Cattle", "Buffalo", "Goat", "Sheep"].includes(r.species) &&
                    r.species === milkSpecies
            )
            .forEach((r) => {
                const groupedKey = getGroupedDate(r.date, milkGroupBy);
                milkMap[groupedKey] = (milkMap[groupedKey] || 0) + Number(r.quantity || 0);
            });

        const formattedData = Object.entries(milkMap)
            .map(([period, milk]) => ({
                period,
                milk,
            }))
            .sort((a, b) => sortPeriods(a.period, b.period));

        setMilkData(formattedData);
    }, [records, milkSpecies, milkGroupBy]);

    // Egg / Meat data
    useEffect(() => {
        const dataMap: Record<string, { eggs?: number; meat?: number }> = {};

        records
            .filter((r) => ["Layer", "Broiler"].includes(r.species))
            .forEach((r) => {
                const groupedKey = getGroupedDate(r.date, eggGroupBy);

                if (!dataMap[groupedKey]) dataMap[groupedKey] = {};

                if (r.species === "Layer") {
                    dataMap[groupedKey].eggs =
                        (dataMap[groupedKey].eggs || 0) + Number(r.quantity || 0);
                }

                if (r.species === "Broiler") {
                    dataMap[groupedKey].meat =
                        (dataMap[groupedKey].meat || 0) + Number(r.quantity || 0);
                }
            });

        const formattedData = Object.entries(dataMap)
            .map(([period, { eggs, meat }]) => ({
                period,
                eggs,
                meat,
            }))
            .sort((a, b) => sortPeriods(a.period, b.period));

        setEggData(formattedData);
    }, [records, eggGroupBy]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Milk Production Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    Milk Production (Liters)
                </h3>

                <div className="flex flex-wrap gap-3 mb-4">
                    <select
                        value={milkSpecies}
                        onChange={(e) => setMilkSpecies(e.target.value)}
                        className="border rounded px-3 py-1 text-gray-600"
                    >
                        {["Cattle", "Buffalo", "Goat", "Sheep"].map((species) => (
                            <option key={species} value={species}>
                                {species}
                            </option>
                        ))}
                    </select>

                    <select
                        value={milkGroupBy}
                        onChange={(e) => setMilkGroupBy(e.target.value as GroupByType)}
                        className="border rounded px-3 py-1 text-gray-600"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={milkData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="period" stroke="#6b7280" />
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

                <div className="flex flex-wrap gap-3 mb-4">
                    <select
                        value={eggSpecies}
                        onChange={(e) => setEggSpecies(e.target.value)}
                        className="border rounded px-3 py-1 text-gray-600"
                    >
                        {["Layer", "Broiler"].map((species) => (
                            <option key={species} value={species}>
                                {species}
                            </option>
                        ))}
                    </select>

                    <select
                        value={eggGroupBy}
                        onChange={(e) => setEggGroupBy(e.target.value as GroupByType)}
                        className="border rounded px-3 py-1 text-gray-600"
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={eggData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="period" stroke="#6b7280" />
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