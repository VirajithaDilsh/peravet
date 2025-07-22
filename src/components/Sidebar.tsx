"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import DashboardIcon from "@/icons/dashboard.svg";
import DairyIcon from "@/icons/dairy.svg";
import TaskIcon from "@/icons/task.svg";
import PigIcon from "@/icons/pig.svg";
import AdminIcon from "@/icons/admin.svg";
import StudentIcon from "@/icons/students.svg";
import SettingsIcon from "@/icons/settings.svg";
import GoatIcon from "@/icons/goat.svg";
import RoosterIcon from "@/icons/rooster.svg";

type MenuKey = "dairy" | "swine" | "poultry" | "ruminants";

const Sidebar = () => {
    const pathname = usePathname();

    const getInitialOpenMenus = (path: string) => ({
        dairy: path.includes("/cattle") || path.includes("/buffalo"),
        swine: path.includes("/swine") || path.includes("/pig"),
        poultry: path.includes("/layer") || path.includes("/broiler"),
        ruminants: path.includes("/goat") || path.includes("/sheep"),
    });

    const [openMenus, setOpenMenus] = useState(() =>
        getInitialOpenMenus(pathname)
    );
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        setOpenMenus(getInitialOpenMenus(pathname));
    }, [pathname]);

    const toggleMenu = (key: MenuKey) =>
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));

    const handleLinkClick = () => {
        if (window.innerWidth < 768) setIsMobileOpen(false);
    };

    const { user } = useAuth();
    const role = user?.role ?? "admin";

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    return (
        <>
            {/* ✅ Floating menu button (ONLY mobile, hide when sidebar is open) */}
            {!isMobileOpen && (
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="absolute top-10 right-0 z-50 p-2 text-green-600 md:hidden"
                >
                    <Menu size={28} />
                </button>
            )}


            {/* ✅ Dark overlay on mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* ✅ Sidebar */}
            <div
                className={clsx(
                    // ✅ On mobile → full width, transparent + blurred
                    "fixed md:static top-0 left-0 min-h-screen md:bg-white bg-white/80 backdrop-blur-md border-r shadow-sm flex flex-col transition-transform duration-300 z-50 w-64 md:w-64",
                    isMobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Close button (mobile only) */}
                <div className="flex justify-end md:hidden p-4">
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="p-2 text-gray-600 hover:text-black"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Logo (desktop only) */}
                <div className="hidden md:flex justify-center items-center p-4 border-b">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={180}
                        height={90}
                        className="rounded"
                    />
                </div>

                {/* Sidebar menu area - scrollable if long */}
                <div className="p-4 flex-grow overflow-y-auto">
                    {/* Dashboard */}
                    <Link
                        href="/dashboard"
                        onClick={handleLinkClick}
                        className={clsx(
                            "block px-4 py-2 rounded",
                            pathname === "/dashboard"
                                ? "bg-green-600 text-white"
                                : "text-gray-700 hover:bg-green-100"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <DashboardIcon className="fill-current" />
                            <span>Dashboard</span>
                        </div>
                    </Link>

                    {/* Task */}
                    <Link
                        href="/dashboard/task"
                        onClick={handleLinkClick}
                        className={clsx(
                            "block px-4 py-2 mt-2 rounded",
                            pathname === "/dashboard/task"
                                ? "bg-green-600 text-white"
                                : "text-gray-700 hover:bg-green-100"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <TaskIcon className="w-5 h-5 fill-current" />
                            <span>Task</span>
                        </div>
                    </Link>

                    {/* Dairy Animals */}
                    <div className="mt-2">
                        <button
                            onClick={() => toggleMenu("dairy")}
                            className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-green-100 rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <DairyIcon className="w-5 h-5 fill-current" />
                                <span>Dairy Animal</span>
                            </div>
                            {openMenus.dairy ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        {openMenus.dairy && (
                            <div className="ml-6 mt-1">
                                <Link
                                    href="/dashboard/cattle"
                                    onClick={handleLinkClick}
                                    className={clsx(
                                        "block px-2 py-1 rounded",
                                        pathname === "/dashboard/cattle"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-700 hover:bg-green-100"
                                    )}
                                >
                                    Cattle
                                </Link>
                                <Link
                                    href="/dashboard/buffalo"
                                    onClick={handleLinkClick}
                                    className={clsx(
                                        "block px-2 py-1 rounded",
                                        pathname === "/dashboard/buffalo"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-700 hover:bg-green-100"
                                    )}
                                >
                                    Buffalo
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Swine */}
                    <div className="mt-2">
                        <button
                            onClick={() => toggleMenu("swine")}
                            className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-green-100 rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <PigIcon className="w-5 h-5 fill-current" />
                                <span>Swine</span>
                            </div>
                            {openMenus.swine ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        {openMenus.swine && (
                            <div className="ml-6 mt-1">
                                <Link
                                    href="/dashboard/pig"
                                    onClick={handleLinkClick}
                                    className={clsx(
                                        "block px-2 py-1 rounded",
                                        pathname === "/dashboard/pig"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-700 hover:bg-green-100"
                                    )}
                                >
                                    Pig
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Poultry */}
                    <div className="mt-2">
                        <button
                            onClick={() => toggleMenu("poultry")}
                            className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-green-100 rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <RoosterIcon className="w-5 h-5 fill-current" />
                                <span>Poultry</span>
                            </div>
                            {openMenus.poultry ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        {openMenus.poultry && (
                            <div className="ml-6 mt-1">
                                <Link
                                    href="/dashboard/layer"
                                    onClick={handleLinkClick}
                                    className={clsx(
                                        "block px-2 py-1 rounded",
                                        pathname === "/dashboard/layer"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-700 hover:bg-green-100"
                                    )}
                                >
                                    Layer
                                </Link>
                                <Link
                                    href="/dashboard/broiler"
                                    onClick={handleLinkClick}
                                    className={clsx(
                                        "block px-2 py-1 rounded",
                                        pathname === "/dashboard/broiler"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-700 hover:bg-green-100"
                                    )}
                                >
                                    Broiler
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Ruminants */}
                    <div className="mt-2">
                        <button
                            onClick={() => toggleMenu("ruminants")}
                            className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-green-100 rounded"
                        >
                            <div className="flex items-center space-x-2">
                                <GoatIcon className="w-5 h-5 fill-current" />
                                <span>Ruminants</span>
                            </div>
                            {openMenus.ruminants ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                        {openMenus.ruminants && (
                            <div className="ml-6 mt-1">
                                <Link
                                    href="/dashboard/goat"
                                    onClick={handleLinkClick}
                                    className={clsx(
                                        "block px-2 py-1 rounded",
                                        pathname === "/dashboard/goat"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-700 hover:bg-green-100"
                                    )}
                                >
                                    Goat
                                </Link>
                                <Link
                                    href="/dashboard/sheep"
                                    onClick={handleLinkClick}
                                    className={clsx(
                                        "block px-2 py-1 rounded",
                                        pathname === "/dashboard/sheep"
                                            ? "bg-green-600 text-white"
                                            : "text-gray-700 hover:bg-green-100"
                                    )}
                                >
                                    Sheep
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Students (only admin or doctor) */}
                    {(role === "admin" || role === "doctor") && (
                        <Link
                            href="/dashboard/students"
                            onClick={handleLinkClick}
                            className={clsx(
                                "block px-4 py-2 mt-2 rounded",
                                pathname === "/dashboard/students"
                                    ? "bg-green-600 text-white"
                                    : "text-gray-700 hover:bg-green-100"
                            )}
                        >
                            <div className="flex items-center space-x-2">
                                <StudentIcon className="w-5 h-5 fill-current" />
                                <span>Students</span>
                            </div>
                        </Link>
                    )}

                    {/* Settings */}
                    <Link
                        href="/dashboard/settings"
                        onClick={handleLinkClick}
                        className={clsx(
                            "block px-4 py-2 mt-2 rounded",
                            pathname === "/dashboard/settings"
                                ? "bg-green-600 text-white"
                                : "text-gray-700 hover:bg-green-100"
                        )}
                    >
                        <div className="flex items-center space-x-2">
                            <SettingsIcon className="w-5 h-5 fill-current" />
                            <span>Settings</span>
                        </div>
                    </Link>

                    {/* Admin Panel */}
                    {role === "admin" && (
                        <Link
                            href="/dashboard/admin"
                            onClick={handleLinkClick}
                            className={clsx(
                                "block px-4 py-2 mt-2 rounded",
                                pathname === "/dashboard/admin"
                                    ? "bg-green-600 text-white"
                                    : "text-gray-700 hover:bg-green-100"
                            )}
                        >
                            <div className="flex items-center space-x-2">
                                <AdminIcon className="w-5 h-5 fill-current" />
                                <span>Admin Panel</span>
                            </div>
                        </Link>
                    )}
                </div>

                {/* Sticky logout at bottom */}
                <div className="sticky bottom-0 bg-white/80 backdrop-blur-sm border-t p-4">
                    <Link
                        href="/login"
                        onClick={handleLinkClick}
                        className="flex items-center text-red-600 hover:underline"
                    >
                        <LogOut size={18} className="mr-2" />
                        <span>Log Out</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
