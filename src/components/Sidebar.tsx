"use client";

import React, { useEffect, useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    LogOut,
    Menu,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";

import DashboardIcon from "@/icons/dashboard.svg";
import DairyIcon from "@/icons/dairy.svg";
import TaskIcon from "@/icons/task.svg";
import PigIcon from "@/icons/pig.svg";
import AdminIcon from "@/icons/admin.svg";
import GoatIcon from "@/icons/goat.svg";
import RoosterIcon from "@/icons/rooster.svg";
import UnionIcon from "@/icons/union.svg";
import ProductIcon from "@/icons/Prod.svg";

type MenuKey = "dairy" | "swine" | "poultry" | "ruminants";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { currentUser, logout } = useUserContext();
    const role = currentUser?.role ?? "admin";

    const getInitialOpenMenus = (path: string) => ({
        dairy: path.includes("/cattle") || path.includes("/buffalo"),
        swine: path.includes("/swine") || path.includes("/pig"),
        poultry: path.includes("/layer") || path.includes("/broiler"),
        ruminants: path.includes("/goat") || path.includes("/sheep"),
    });

    const [openMenus, setOpenMenus] = useState<Record<MenuKey, boolean>>(
        getInitialOpenMenus(pathname)
    );
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        setOpenMenus(getInitialOpenMenus(pathname));
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    const toggleMenu = (key: MenuKey) => {
        setOpenMenus((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsMobileOpen(false);
        }
    };

    const linkBase =
        "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200";
    const activeLink =
        "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md";
    const inactiveLink =
        "text-slate-700 hover:bg-green-50 hover:text-green-700";

    const subLinkBase =
        "block rounded-lg px-3 py-2 text-sm transition-all duration-200";
    const activeSubLink = "bg-green-600 text-white shadow-sm";
    const inactiveSubLink = "text-slate-600 hover:bg-green-50 hover:text-green-700";

    const menuButtonBase =
        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-green-50 hover:text-green-700";

    const sectionLabel =
        "px-4 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400";

    return (
        <>
            {/* Mobile menu button */}
            {!isMobileOpen && (
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="fixed top-4 left-4 z-[60] rounded-xl bg-white p-2 text-green-700 shadow-lg ring-1 ring-slate-200 md:hidden"
                >
                    <Menu size={24} />
                </button>
            )}

            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 md:translate-x-0",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="relative border-b border-slate-100 px-5 py-5">
                    <div className="flex items-center justify-between md:hidden">
                        <Link href="/profile" onClick={handleLinkClick}>
                            <UnionIcon className="h-8 w-8 cursor-pointer text-green-700 transition-transform hover:scale-105" />
                        </Link>

                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    <div className="hidden md:flex justify-center">
                        <Link href="/" className="transition-transform hover:scale-[1.02]">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={170}
                                height={80}
                                className="rounded-lg"
                            />
                        </Link>
                    </div>
                </div>
                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <p className={sectionLabel}>Main</p>

                    <nav className="space-y-2">
                        <Link
                            href="/dashboard"
                            onClick={handleLinkClick}
                            className={clsx(
                                linkBase,
                                pathname === "/dashboard" ? activeLink : inactiveLink
                            )}
                        >
                            <DashboardIcon className="h-5 w-5 fill-current" />
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            href="/dashboard/task"
                            onClick={handleLinkClick}
                            className={clsx(
                                linkBase,
                                pathname === "/dashboard/task" ? activeLink : inactiveLink
                            )}
                        >
                            <TaskIcon className="h-5 w-5 fill-current" />
                            <span>Task</span>
                        </Link>

                        {(role === "employee" || role === "admin") && (
                            <Link
                                href="/dashboard/production"
                                onClick={handleLinkClick}
                                className={clsx(
                                    linkBase,
                                    pathname === "/dashboard/production"
                                        ? activeLink
                                        : inactiveLink
                                )}
                            >
                                <ProductIcon className="h-5 w-5 fill-current" />
                                <span>Production</span>
                            </Link>
                        )}
                    </nav>

                    <p className={sectionLabel}>Animal Categories</p>

                    <div className="space-y-2">
                        {/* Dairy */}
                        <div>
                            <button
                                onClick={() => toggleMenu("dairy")}
                                className={menuButtonBase}
                            >
                                <div className="flex items-center gap-3">
                                    <DairyIcon className="h-5 w-5 fill-current" />
                                    <span>Dairy Animals</span>
                                </div>
                                {openMenus.dairy ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </button>

                            {openMenus.dairy && (
                                <div className="ml-6 mt-2 space-y-1 border-l border-slate-200 pl-4">
                                    <Link
                                        href="/dashboard/cattle"
                                        onClick={handleLinkClick}
                                        className={clsx(
                                            subLinkBase,
                                            pathname === "/dashboard/cattle"
                                                ? activeSubLink
                                                : inactiveSubLink
                                        )}
                                    >
                                        Cattle
                                    </Link>
                                    <Link
                                        href="/dashboard/buffalo"
                                        onClick={handleLinkClick}
                                        className={clsx(
                                            subLinkBase,
                                            pathname === "/dashboard/buffalo"
                                                ? activeSubLink
                                                : inactiveSubLink
                                        )}
                                    >
                                        Buffalo
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Swine */}
                        <div>
                            <button
                                onClick={() => toggleMenu("swine")}
                                className={menuButtonBase}
                            >
                                <div className="flex items-center gap-3">
                                    <PigIcon className="h-5 w-5 fill-current" />
                                    <span>Swine</span>
                                </div>
                                {openMenus.swine ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </button>

                            {openMenus.swine && (
                                <div className="ml-6 mt-2 space-y-1 border-l border-slate-200 pl-4">
                                    <Link
                                        href="/dashboard/pig"
                                        onClick={handleLinkClick}
                                        className={clsx(
                                            subLinkBase,
                                            pathname === "/dashboard/pig"
                                                ? activeSubLink
                                                : inactiveSubLink
                                        )}
                                    >
                                        Pig
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Poultry */}
                        <div>
                            <button
                                onClick={() => toggleMenu("poultry")}
                                className={menuButtonBase}
                            >
                                <div className="flex items-center gap-3">
                                    <RoosterIcon className="h-5 w-5 fill-current" />
                                    <span>Poultry</span>
                                </div>
                                {openMenus.poultry ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </button>

                            {openMenus.poultry && (
                                <div className="ml-6 mt-2 space-y-1 border-l border-slate-200 pl-4">
                                    <Link
                                        href="/dashboard/layer"
                                        onClick={handleLinkClick}
                                        className={clsx(
                                            subLinkBase,
                                            pathname === "/dashboard/layer"
                                                ? activeSubLink
                                                : inactiveSubLink
                                        )}
                                    >
                                        Layer
                                    </Link>
                                    <Link
                                        href="/dashboard/broiler"
                                        onClick={handleLinkClick}
                                        className={clsx(
                                            subLinkBase,
                                            pathname === "/dashboard/broiler"
                                                ? activeSubLink
                                                : inactiveSubLink
                                        )}
                                    >
                                        Broiler
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Small Ruminants */}
                        <div>
                            <button
                                onClick={() => toggleMenu("ruminants")}
                                className={menuButtonBase}
                            >
                                <div className="flex items-center gap-3">
                                    <GoatIcon className="h-5 w-5 fill-current" />
                                    <span>Small Ruminants</span>
                                </div>
                                {openMenus.ruminants ? (
                                    <ChevronDown size={16} />
                                ) : (
                                    <ChevronRight size={16} />
                                )}
                            </button>

                            {openMenus.ruminants && (
                                <div className="ml-6 mt-2 space-y-1 border-l border-slate-200 pl-4">
                                    <Link
                                        href="/dashboard/goat"
                                        onClick={handleLinkClick}
                                        className={clsx(
                                            subLinkBase,
                                            pathname === "/dashboard/goat"
                                                ? activeSubLink
                                                : inactiveSubLink
                                        )}
                                    >
                                        Goat
                                    </Link>
                                    <Link
                                        href="/dashboard/sheep"
                                        onClick={handleLinkClick}
                                        className={clsx(
                                            subLinkBase,
                                            pathname === "/dashboard/sheep"
                                                ? activeSubLink
                                                : inactiveSubLink
                                        )}
                                    >
                                        Sheep
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {role === "admin" && (
                        <>
                            <p className={sectionLabel}>Administration</p>
                            <Link
                                href="/dashboard/admin"
                                onClick={handleLinkClick}
                                className={clsx(
                                    linkBase,
                                    pathname === "/dashboard/admin" ? activeLink : inactiveLink
                                )}
                            >
                                <AdminIcon className="h-5 w-5 fill-current" />
                                <span>Admin Panel</span>
                            </Link>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 bg-slate-50 p-4">
                    <button
                        onClick={() => {
                            logout();
                            router.push("/login");
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                        <LogOut size={18} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;