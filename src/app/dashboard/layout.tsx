// app/dashboard/layout.tsx
"use client"
import Sidebar from "@/components/Sidebar";
import GlobalSearchBar from "@/components/GlobalSearchBar";
import React from "react";
import UnionIcon from '@/icons/union.svg';
import Link from "next/link";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 min-h-screen bg-[#D7F5DC] p-6">
                <div className="flex-1">
                    <header className="p-0 bg-[#D7F5DC] border-b">
                        <div className="flex items-center justify-between">
                            <GlobalSearchBar />
                            <Link href="/profile">
                                <UnionIcon className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform" />
                            </Link>
                        </div>
                    </header>

                </div>
                {children}
            </main>
        </div>
    );
}
