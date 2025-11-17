"use client";

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
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <KpiCard title="Total Animals" value={120} />
            <KpiCard title="Pregnants" value={25} />
            <KpiCard title="Milk Today" value="300 L" />
            <KpiCard title="Eggs Today" value="500" />

        </div>
    );
}
