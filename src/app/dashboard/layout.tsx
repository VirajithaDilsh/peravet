"use client";
import Sidebar from "@/components/Sidebar";
import GlobalSearchBar from "@/components/GlobalSearchBar";
import React from "react";
import UnionIcon from "@/icons/union.svg";
import Link from "next/link";
import Image from "next/image";

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
                        {/* ✅ Desktop layout */}
                        <div className="hidden sm:flex items-center justify-between h-16">
                            <GlobalSearchBar />
                            {/* Profile icon only visible on desktop */}
                            <Link href="/profile" className="hidden lg:block">
                                <UnionIcon className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform" />
                            </Link>
                        </div>

                        {/* ✅ Mobile layout */}
                        <div className="sm:hidden relative flex flex-row items-center h-16 space-x-4">
                            {/* Left: Logo */}
                            <div>
                                <Image
                                    src="/logo-mobile.png"
                                    alt="mobile logo"
                                    width={80}
                                    height={80}
                                    className="rounded-2xl"
                                />
                            </div>

                            {/* Right: Search bar takes remaining space */}
                            <div className="flex-grow max-w-xs w-full mt-4">
                                <GlobalSearchBar />
                            </div>
                        </div>

                    </header>

                </div>

                {children}
            </main>
        </div>
    );
}
