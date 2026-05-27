"use client";

import StudentTable from "@/components/tables/StudentTable";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserContext } from "@/context/UserContext";

export default function StudentsPage() {
  const { users } = useUserContext();

  // Only pass students to the table
  const studentUsers = users.filter((user) => user.role === "student");

  return (
    <ProtectedRoute allowedRoles={["admin", "doctor"]}>
      <div className="flex">
        <main className="flex-1 p-4 text-black">
          <h1 className="text-2xl font-semibold mb-4">Students Records</h1>

          <StudentTable users={studentUsers} />
        </main>
      </div>
    </ProtectedRoute>
  );
}