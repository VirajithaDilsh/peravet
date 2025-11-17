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

    const TotalStats = getTotalAnimals(animals);
    const totalPregnant = getTotalPregnantAnimals(animals);

    // Calculate total milk (liters)
    const totalMilk = records
        .filter((r) => ["Cattle", "Buffalo", "Goat", "Sheep"].includes(r.species))
        .reduce((sum, r) => sum + r.quantity, 0);

    // Calculate total eggs
    const totalEggs = records
        .filter((r) => r.species === "Layer")
        .reduce((sum, r) => sum + r.quantity, 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <KpiCard title="Total Animals" value={TotalStats} />
            <KpiCard title="Pregnants" value={totalPregnant} />
            <KpiCard title="Milk Today" value={`${totalMilk} L`} />
            <KpiCard title="Eggs Today" value={totalEggs} />
        </div>
    );
}
