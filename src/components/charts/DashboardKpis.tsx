"use client";

import { useAnimalContext } from "@/context/AnimalContext";
import { useProduction } from "@/context/ProductionContext";
import { getTotalAnimals, getTotalPregnantAnimals } from "@/utils/animalStatus";

interface KpiCardProps {
    title: string;
    value: number | string;
}

const KpiCard = ({ title, value }: KpiCardProps) => (
    <div className="flex flex-col justify-center p-5 rounded-xl shadow-lg bg-white">
        <p className="text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
);

export default function DashboardKpis() {
    const { animals } = useAnimalContext();
    const { records } = useProduction();
    const today = new Date().toISOString().split("T")[0];

    const TotalStats = getTotalAnimals(animals);
    const totalPregnant = getTotalPregnantAnimals(animals);

    // Milk today
    const totalMilk = records
        .filter(
            (r) =>
                ["Cattle", "Buffalo", "Goat", "Sheep"].includes(r.species) &&
                r.date === today
        )
        .reduce((sum, r) => sum + r.quantity, 0);

// Eggs today
    const totalEggs = records
        .filter(
            (r) =>
                r.species === "Layer" &&
                r.date === today
        )
        .reduce((sum, r) => sum + r.quantity, 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
            <KpiCard title="Milk Today" value={`${totalMilk} L`} />
            <KpiCard title="Eggs Today" value={totalEggs} />
        </div>
    );
}
