"use client";

import { useUserContext } from "@/context/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { currentUser, editUser } = useUserContext();
    const router = useRouter();

    const [name, setName] = useState(currentUser?.name || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [password, setPassword] = useState(currentUser?.password || "");
    const [department, setDepartment] = useState(
        currentUser?.role === "student" ? currentUser.department : ""
    );
    const [year, setYear] = useState(
        currentUser?.role === "student" ? currentUser.year : 1
    );
    const [message, setMessage] = useState("");

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-600 text-black">
                <p className="p-4 text-red-500">
                    You need to login to view your profile.
                </p>
            </div>
        );
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = {
            ...currentUser,
            name,
            email,
            password,
            ...(currentUser.role === "student" ? { department, year } : {}),
        };
        editUser(updatedUser);
        setMessage("Profile updated successfully!");
        router.push("/profile");
    };

    return (
        <div className="min-h-screen bg-[#D4F2D9] flex items-center justify-center">
            <div className="max-w-xl w-full p-6 bg-white text-black rounded-2xl shadow mt-6">
                <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

                {message && <p className="text-green-600 mb-4">{message}</p>}

                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    {currentUser.role === "student" && (
                        <>
                            <div>
                                <label className="block mb-1 font-medium">Department</label>
                                <input
                                    type="text"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Year</label>
                                <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={year}
                                    onChange={(e) => setYear(Number(e.target.value))}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
