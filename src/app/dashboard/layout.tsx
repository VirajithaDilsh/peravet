"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import GlobalSearchBar from "@/components/GlobalSearchBar";
import ProfileSidebar from "@/components/ProfileSidebar";
import UnionIcon from "@/icons/union.svg";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <ProtectedRoute>
            <div className="relative flex">
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 min-h-screen bg-[#D7F5DC] p-6 relative z-10">
                    <header className="p-0 bg-[#D7F5DC] border-b relative z-10">
                        {/* Desktop */}
                        <div className="hidden sm:flex items-center justify-between h-16">
                            <GlobalSearchBar />

                            {/* Desktop Profile Icon */}
                            <div
                                className="hidden md:block lg:block cursor-pointer"
                                onClick={() => setIsProfileOpen(true)}
                            >
                                <UnionIcon className="w-8 h-8 hover:scale-105 transition-transform" />
                            </div>

                        </div>

                        {/* Mobile */}
                        <div className="sm:hidden flex items-center h-16 px-4 gap-4">
                            <div className="flex-shrink-0">
                                <Image
                                    src="/logo-mobile.png"
                                    alt="Mobile Logo"
                                    width={45}
                                    height={45}
                                    className="rounded-2xl"
                                />
                            </div>

                            <div className="flex-grow">
                                <GlobalSearchBar />
                            </div>

                            <button
                                onClick={() => console.log("Open sidebar")}
                                className="flex-shrink-0 p-2 rounded-md hover:bg-green-200"
                            />
                        </div>
                    </header>

                    {/* Children pages */}
                    {children}
                </main>

                {/* Overlay */}
                {isProfileOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
                        onClick={() => setIsProfileOpen(false)}
                    />
                )}

                {/* Profile Sidebar */}
                <div
                    className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 
                    transform transition-transform duration-300
                    ${isProfileOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                    <ProfileSidebar
                        isOpen={isProfileOpen}
                        onClose={() => setIsProfileOpen(false)}
                    />
                </div>
            </div>
        </ProtectedRoute>
    );
}
