"use client";

import React, { useState, MouseEvent, KeyboardEvent } from "react";
import { Trash2, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";
import { StudentUser, User as UserType } from "@/types/users";

export default function AllUsersTable() {
    const { users, deleteUser } = useUserContext();
    const [search, setSearch] = useState("");
    const router = useRouter();

    // Filter users based on search
    const filteredUsers = users.filter((user: UserType) =>
        [user.name, user.email, user.role, (user as StudentUser).department]
            .filter(Boolean)
            .some((field) => field!.toLowerCase().includes(search.toLowerCase()))
    );

    const goToDetails = (id: string) => {
        router.push(`/users/${id}`);
    };

    const stop = (e: MouseEvent | KeyboardEvent) => e.stopPropagation();

    return (
        <div className="p-4 text-black w-full">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>

            {/* Search Input */}
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email, role, department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 w-full max-w-sm rounded-2xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
                <div className="border rounded-lg shadow overflow-x-auto max-h-[500px] w-full">
                    <table className="w-full table-auto border-collapse text-xs md:text-sm min-w-[700px]">
                        <thead className="bg-blue-100 text-left sticky top-0 z-10">
                        <tr>
                            {["Name", "Email", "Role", "Department", "Year", "Actions"].map((head) => (
                                <th
                                    key={head}
                                    className="py-2 px-2 md:py-3 md:px-4 border border-gray-300 font-medium whitespace-nowrap"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, idx) => (
                                <tr
                                    key={user.id}
                                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                    onClick={() => goToDetails(user.id)}
                                >
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {user.name}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {user.email}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {user.role}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {"department" in user ? user.department : "-"}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {"year" in user ? user.year : "-"}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300">
                                        <div className="flex gap-1 md:gap-2 justify-center">
                                            <button
                                                onClick={(e) => {
                                                    stop(e);
                                                    router.push(`/users/edit/${user.id}`);
                                                }}
                                                className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                                                title="Edit"
                                            >
                                                <SquarePen className="h-4 w-4 md:h-5 md:w-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    stop(e);
                                                    if (confirm(`Delete ${user.name}?`)) deleteUser(user.id);
                                                }}
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500 border border-gray-300">
                                    No users found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile - Card View */}
            <div className="md:hidden border rounded-lg shadow overflow-y-auto min-h-[300px] max-h-[500px]">
                <div className="flex flex-col">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => goToDetails(user.id)}
                                className="border-b last:border-b-0 p-3 bg-white hover:bg-blue-50 transition cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-blue-800 text-sm">{user.name}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                stop(e);
                                                router.push(`/users/edit/${user.id}`);
                                            }}
                                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                                        >
                                            <SquarePen className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                stop(e);
                                                if (confirm(`Delete ${user.name}?`)) deleteUser(user.id);
                                            }}
                                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600">Email: {user.email}</p>
                                <p className="text-xs text-gray-600">Role: {user.role}</p>
                                {"department" in user && (
                                    <p className="text-xs text-gray-600">Department: {user.department}</p>
                                )}
                                {"year" in user && (
                                    <p className="text-xs text-gray-600">Year: {user.year}</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 p-4">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
