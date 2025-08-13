"use client";
import { useTasks } from "@/context/TasksContext";

export default function TasksSummary() {
    const { overdueCount, dueSoonCount, upcomingCount } = useTasks();
    const Card = ({ label, value }: { label: string; value: number }) => (
        <div className="rounded-2xl shadow p-4 bg-white border">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-3xl font-semibold">{value}</div>
        </div>
    );
    return (
        <div className="grid sm:grid-cols-3 gap-4">
            <Card label="Overdue" value={overdueCount} />
            <Card label="Due soon" value={dueSoonCount} />
            <Card label="Upcoming" value={upcomingCount} />
        </div>
    );
}