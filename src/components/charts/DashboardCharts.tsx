"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const milkData = [
    { day: "Mon", milk: 20 },
    { day: "Tue", milk: 25 },
    { day: "Wed", milk: 22 },
    { day: "Thu", milk: 30 },
    { day: "Fri", milk: 28 },
];

const eggData = [
    { day: "Mon", eggs: 50 },
    { day: "Tue", eggs: 60 },
    { day: "Wed", eggs: 55 },
    { day: "Thu", eggs: 70 },
    { day: "Fri", eggs: 65 },
];

export default function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Milk Production Line Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Milk Production (Liters)
                </h3>
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

            {/* Egg Production Line Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Egg Production (Eggs)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={eggData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="eggs"
                            stroke="#F59E0B"
                            strokeWidth={3}
                            dot={{ r: 5, fill: "#F59E0B" }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
