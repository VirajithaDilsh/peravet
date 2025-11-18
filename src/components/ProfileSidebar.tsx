"use client";

import React, { useState, useEffect } from "react";
import { useUserContext } from "@/context/UserContext";
import { User } from "@/types/users";

const tabs = ["profile", "password"] as const;
type Tab = typeof tabs[number];

interface ProfileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
    const { currentUser, editUser, logout, loading } = useUserContext();
    const [activeTab, setActiveTab] = useState<Tab>("profile");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
        year: 0,
    });
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name,
                email: currentUser.email,
                password: currentUser.password,
                confirmPassword: currentUser.password,
                department: currentUser.role === "student" ? currentUser.department || "" : "",
                year: currentUser.role === "student" ? currentUser.year || 0 : 0,
            });
        }
    }, [currentUser]);

    if (loading || !currentUser) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "year" ? Number(value) : value,
        }));
    };

    const handleSaveProfile = () => {
        const updatedUser: User = {
            ...currentUser,
            name: formData.name,
            email: formData.email,
            ...(currentUser.role === "student"
                ? { department: formData.department, year: formData.year }
                : {}),
            password: formData.password,
        };
        editUser(updatedUser);
        setMessage({ text: "Profile updated successfully!", type: "success" });
    };

    const handleChangePassword = () => {
        if (formData.password !== formData.confirmPassword) {
            setMessage({ text: "Passwords do not match!", type: "error" });
            return;
        }
        editUser({ ...currentUser, password: formData.password });
        setMessage({ text: "Password changed successfully!", type: "success" });
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl p-6 sm:p-8 overflow-y-auto transform transition-transform duration-500 z-40
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center tracking-wide">
                    My Profile
                </h2>

                {/* Message */}
                {message && (
                    <div
                        className={`mb-6 p-3 rounded-lg text-center font-medium shadow ${
                            message.type === "success"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Initials Avatar */}
                <div className="flex justify-center mb-6">
                    <div
                        className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg text-white text-4xl font-bold transition-transform duration-300 transform hover:scale-110"
                        style={{ background: `linear-gradient(135deg, #FF6B6B, #5F27CD)` }}
                    >
                        {currentUser.name
                            .split(" ")
                            .map(n => n[0])
                            .join("")
                            .toUpperCase()}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b mb-6 justify-center space-x-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`px-4 py-2 font-semibold transition-colors duration-300 ${
                                activeTab === tab
                                    ? "border-b-4 border-blue-500 text-blue-600"
                                    : "border-b-4 border-transparent text-gray-500 hover:text-blue-500"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === "profile" ? "Profile Info" : "Change Password"}
                        </button>
                    ))}
                </div>

                {/* Profile Tab */}
                {activeTab === "profile" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
                            />
                        </div>
                        {currentUser.role === "student" && (
                            <>
                                <div>
                                    <label className="block font-semibold text-gray-700">Department</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-gray-700">Year</label>
                                    <input
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        className="mt-2 w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
                                    />
                                </div>
                            </>
                        )}
                        <button
                            onClick={handleSaveProfile}
                            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform"
                        >
                            Save Changes
                        </button>
                    </div>
                )}

                {/* Password Tab */}
                {activeTab === "password" && (
                    <div className="space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-700">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="mt-2 w-full px-4 py-3 border rounded-xl shadow-inner focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
                            />
                        </div>
                        <button
                            onClick={handleChangePassword}
                            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform"
                        >
                            Change Password
                        </button>
                    </div>
                )}

                {/* Logout */}
                <div className="mt-8">
                    <button
                        onClick={logout}
                        className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:bg-red-600 transition transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
}
