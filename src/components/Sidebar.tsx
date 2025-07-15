"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";

{/* Sidebar icons */}
import DashboardIcon from '@/icons/dashboard.svg';
import DairyIcon from '@/icons/dairy.svg';
import TaskIcon from '@/icons/task.svg';
import PigIcon from '@/icons/pig.svg';
import AdminIcon from '@/icons/admin.svg';
import StudentIcon from '@/icons/students.svg';
import SettingsIcon from '@/icons/settings.svg';
import GoatIcon from '@/icons/goat.svg';
import RoosterIcon from '@/icons/rooster.svg';






type MenuKey = "dairy" | "swine" | "poultry" | "ruminants";
const Sidebar = () => {
    const pathname = usePathname();

    const getInitialOpenMenus = (path: string) => {
        return {
            dairy: path.includes("/cattle") || path.includes("/buffalo"),
            swine: path.includes("/swine") || path.includes("/pig"),
            poultry: path.includes("/layer") || path.includes("/broiler"),
            ruminants: path.includes("/goat") || path.includes("/sheep"),
        };
    };

    const [openMenus, setOpenMenus] = useState(() => getInitialOpenMenus(pathname));

    useEffect(() => {
        setOpenMenus(getInitialOpenMenus(pathname));
    }, [pathname]);

    const toggleMenu = (key: MenuKey) => {
        setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
    };


    return (
        <div className="w-64 bg-white h-screen border-r shadow-sm flex flex-col justify-between">
            <div className="p-4">
                <div className="flex-shrink-100"> <Image src="/logo.png" alt="logo" width={150} height={50} className="rounded-lg"/></div>

                {/* Dashboard */}
                <Link
                    href="/dashboard"
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
                {/*Task*/}
                <Link
                    href="/dashboard/task"
                    className={clsx(
                        "block px-4 py-2 mt-2 rounded",
                        pathname === "/dashboard/task"
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-100"
                    )}
                >
                    <div className="flex items-center space-x-2">
                        <TaskIcon className="w-5 h-5 fill-current" />
                        <span className="flex-1 text-left">Task</span>
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
                            <span className="flex-1 text-left">Dairy Animal</span>
                        </div>

                        {/* Chevron aligned right by justify-between */}
                        {openMenus.dairy ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    {openMenus.dairy && (
                        <div className="ml-6 mt-1">
                            <Link
                                href="/dashboard/cattle"
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
                            <span className="flex-1 text-left">Swine</span>
                        </div>

                        {/* Chevron aligned right by justify-between */}
                        {openMenus.swine ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {openMenus.swine && (
                        <div className="ml-6 mt-1">
                            <Link
                                href="/dashboard/pig"
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
                            <span className="flex-1 text-left">Poultry</span>
                        </div>

                        {/* Chevron aligned right by justify-between */}
                        {openMenus.poultry ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {openMenus.poultry && (
                        <div className="ml-6 mt-1">
                            <Link
                                href="/dashboard/layer"
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
                            <span className="flex-1 text-left">Ruminants</span>
                        </div>

                        {/* Chevron aligned right by justify-between */}
                        {openMenus.ruminants ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {openMenus.ruminants && (
                        <div className="ml-6 mt-1">
                            <Link
                                href="/dashboard/goat"
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

                {/* Other Pages */}
                <Link
                    href="/dashboard/students"
                    className={clsx(
                        "block px-4 py-2 mt-2 rounded",
                        pathname === "/dashboard/students"
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-100"
                    )}
                >
                    <div className="flex items-center space-x-2">
                        <StudentIcon className="w-5 h-5 fill-current" />
                        <span className="flex-1 text-left">Students</span>
                    </div>
                </Link>

                <Link
                    href="/dashboard/settings"
                    className={clsx(
                        "block px-4 py-2 mt-2 rounded",
                        pathname === "/dashboard/settings"
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-100"
                    )}
                >
                    <div className="flex items-center space-x-2">
                        <SettingsIcon className="w-5 h-5 fill-current" />
                        <span className="flex-1 text-left">Settings</span>
                    </div>
                </Link>

                <Link
                    href="/dashboard/admin"
                    className={clsx(
                        "block px-4 py-2 mt-2 rounded",
                        pathname === "/dashboard/admin"
                            ? "bg-green-600 text-white"
                            : "text-gray-700 hover:bg-green-100"
                    )}
                >
                    <div className="flex items-center space-x-2">
                        <AdminIcon className="w-5 h-5 fill-current" />
                        <span className="flex-1 text-left">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* Logout */}
            <div className="p-4">
                <Link href="/login" className="flex items-center text-red-600 hover:underline">
                    <LogOut size={18} className="mr-2" />
                    Log Out
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
