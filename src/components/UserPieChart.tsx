"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useUserContext } from "@/context/UserContext";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

export default function UserPieChart() {
    const { users } = useUserContext();

    // Count users by role
    const roleCounts = users.reduce((acc: Record<string, number>, user) => {
        if (user.role) {
            acc[user.role] = (acc[user.role] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Capitalize role names
    const data = Object.entries(roleCounts).map(([role, count]) => ({
        name: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
        value: count,
    }));

    const totalUsers = users.length;

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full max-w-2xl mx-auto">
            <h2 className="text-black text-xl font-bold mb-2">
                User Distribution by Role
            </h2>
            <p className="text-sm text-gray-600 mb-4">
                Total Users: <span className="font-semibold">{totalUsers}</span>
            </p>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
