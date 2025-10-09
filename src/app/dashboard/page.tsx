"use client"; // Required for Recharts and KPI cards

import UpcomingTasksCard from "@/components/tasks/topUpcommingTask";
import AnimalPieChart from "@/components/AnimalPieChart";
import DashboardCharts from "@/components/charts/DashboardCharts";
import DashboardKpis from "@/components/charts/DashboardKpis";

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-6  min-h-screen">

            {/* Top Row: KPI Cards */}
            <DashboardKpis />

            {/* Middle Row: Tasks & Pie Chart */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <UpcomingTasksCard />
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <AnimalPieChart />
                </div>
            </div>

            {/* Bottom Row: Milk & Egg Line Charts */}
            <DashboardCharts />

        </div>
    );
}
