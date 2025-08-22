"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useAnimalContext } from "@/context/AnimalContext";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#0EA5E9", "#14B8A6"];

export default function AnimalPieChart() {
    const { animals } = useAnimalContext();

    // Count animals by species
    const speciesCounts = animals.reduce((acc: Record<string, number>, animal) => {
        if (animal.species) {
            acc[animal.species] = (acc[animal.species] || 0) + 1;
        }
        return acc;
    }, {});

    const data = Object.entries(speciesCounts).map(([species, count]) => ({
        name: species,
        value: count,
    }));

    const totalAnimals = animals.length;
    console.log("All animals:", animals);
    console.log("Animals count:", animals.length);

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full max-w-2xl mx-auto">
            <h2 className="text-black text-xl font-bold mb-2">Animal Distribution by Species</h2>
            <p className="text-sm text-gray-600 mb-4">Total Animals: <span className="font-semibold">{totalAnimals}</span></p>

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
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
