"use client";

import React, { useState, MouseEvent, KeyboardEvent } from "react";
import { User, StudentUser } from "@/types/users";
import { Trash2, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

interface StudentTableProps {
    users: User[]; // dynamic users passed from parent
}

export default function StudentTable({ users }: StudentTableProps) {
    const [search, setSearch] = useState("");
    const router = useRouter();

    // Filter only students
    const studentOnly = (users || []).filter((u): u is StudentUser => u.role === "student");

    // Search filter
    const filteredStudents = studentOnly.filter((student) =>
        [student.name, student.email, student.department].some((field) =>
            field?.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const goToDetails = (id: string) => router.push(`/students/${id}`);
    const stop = (e: MouseEvent | KeyboardEvent) => e.stopPropagation();

    return (
        <div className="p-4 text-black w-full">
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email, department..."
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
                            {["Name", "Email", "Department", "Year", "Actions"].map((head) => (
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
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student, idx) => (
                                <tr
                                    key={student.id}
                                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                    onClick={() => goToDetails(student.id)}
                                >
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {student.name}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {student.email}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {student.department}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {student.year}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300">
                                        <div className="flex gap-1 md:gap-2 justify-center">
                                            <button
                                                onClick={(e) => {
                                                    stop(e);
                                                    router.push(`/students/edit/${student.id}`);
                                                }}
                                                className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                                                title="Edit"
                                            >
                                                <SquarePen className="h-4 w-4 md:h-5 md:w-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    stop(e);
                                                    if (confirm(`Delete ${student.name}?`)) {
                                                        // Implement delete logic
                                                        alert(`Deleted ${student.name}`);
                                                    }
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
                                <td colSpan={5} className="text-center py-4 text-gray-500 border border-gray-300">
                                    No student records found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden border rounded-lg shadow overflow-y-auto min-h-[300px] max-h-[500px]">
                <div className="flex flex-col">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                onClick={() => goToDetails(student.id)}
                                className="border-b last:border-b-0 p-3 bg-white hover:bg-blue-50 transition cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-blue-800 text-sm">{student.name}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                stop(e);
                                                router.push(`/students/edit/${student.id}`);
                                            }}
                                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                                        >
                                            <SquarePen className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                stop(e);
                                                if (confirm(`Delete ${student.name}?`)) {
                                                    alert(`Deleted ${student.name}`);
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600">Email: {student.email}</p>
                                <p className="text-xs text-gray-600">Department: {student.department}</p>
                                <p className="text-xs text-gray-600">Year: {student.year}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 p-4">No student records found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
