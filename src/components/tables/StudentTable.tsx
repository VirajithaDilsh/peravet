"use client";

import React, { useState} from "react";
import { User, StudentUser } from "@/types/users";

interface StudentTableProps {
  users: User[];
}

export default function StudentTable({ users }: StudentTableProps) {
  const [search, setSearch] = useState("");

  // Filter only students
  const studentOnly = (users || []).filter(
    (u): u is StudentUser => u.role === "student"
  );

  // Search filter
  const filteredStudents = studentOnly.filter((student) =>
    [
      student.name,
      student.email,
      student.department,
      student.year,
    ].some((field) =>
      field?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );


  return (
    <div className="p-4 text-black w-full">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name, email, department, year..."
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
                {["Name", "Email", "Department", "Year"].map(
                  (head) => (
                    <th
                      key={head}
                      className="py-2 px-2 md:py-3 md:px-4 border border-gray-300 font-medium whitespace-nowrap"
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, idx) => (
                  <tr
                    key={student._id}
                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {student.name}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {student.email}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {student.department || "-"}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {student.year || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 border border-gray-300"
                  >
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
                key={student._id}
                className="border-b last:border-b-0 p-3 bg-white hover:bg-blue-50 transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-blue-800 text-sm">
                    {student.name}
                  </h3>

                </div>

                <p className="text-xs text-gray-600">
                  Email: {student.email}
                </p>

                <p className="text-xs text-gray-600">
                  Department: {student.department || "-"}
                </p>

                <p className="text-xs text-gray-600">
                  Year: {student.year || "-"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-4">
              No student records found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}