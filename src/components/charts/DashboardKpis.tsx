"use client";

import { useAnimalContext } from "@/context/AnimalContext";
import { useProduction } from "@/context/ProductionContext";
import {
    getTotalAnimals,
    getTotalPregnantAnimals,
} from "@/utils/animalStatus";

interface KpiCardProps {
    title: string;
    value: number | string;
}

const KpiCard = ({ title, value }: KpiCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
    </div>
);

export default function DashboardKpis() {
    const { animals } = useAnimalContext();
    const { records } = useProduction();

    // --- Animal Stats ---
    const totalAnimals = getTotalAnimals(animals);
    const totalPregnant = getTotalPregnantAnimals(animals);

    // --- Production Stats (Today Only) ---
    const today = new Date().toISOString().slice(0, 10);

    const todayRecords = records.filter((r) => r.date === today);

    const totalMilk = todayRecords
        .filter((r) => ["Cattle", "Buffalo", "Goat", "Sheep"].includes(r.species))
        .reduce((sum, r) => sum + r.quantity, 0);

    const totalEggs = todayRecords
        .filter((r) => r.species === "Layer")
        .reduce((sum, r) => sum + r.quantity, 0);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <KpiCard title="Total Animals" value={totalAnimals} />
            <KpiCard title="Pregnant Animals" value={totalPregnant} />
            <KpiCard title="Milk Today" value={`${totalMilk} L`} />
            <KpiCard title="Eggs Today" value={totalEggs} />
        </div>
    );
}
