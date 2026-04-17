"use client";

import StudentTable from "@/components/tables/StudentTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { sampleUsers } from "@/types/users";

export default function Home() {
    // Only pass students to the table
    const studentUsers = sampleUsers.filter(user => user.role === "student");

    return (
        <ProtectedRoute allowedRoles={["admin","doctor"]}>
            <div className="flex">
                <main className="flex-1 p-4 text-black">
                    <h1 className="text-2xl font-semibold mb-4">Students Records</h1>
                    <StudentTable users={studentUsers} />
                </main>
            </div>
        </ProtectedRoute>
    );
}
