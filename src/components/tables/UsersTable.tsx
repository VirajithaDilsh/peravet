"use client";

import React, { useState, MouseEvent, KeyboardEvent } from "react";
import { Trash2} from "lucide-react";
import { useUserContext } from "@/context/UserContext";
import { User as UserType } from "@/services/userApi";

export default function AllUsersTable() {
  const { users, deleteUser } = useUserContext();
  const [search, setSearch] = useState("");

  const getDepartment = (user: UserType): string => {
    if (user.role !== "student") return "-";

    const department = (user as { department?: string }).department;

    return department ? String(department) : "-";
  };

  const getYear = (user: UserType): string => {
    if (user.role !== "student") return "-";

    const year = (user as { year?: string | number }).year;

    return year ? String(year) : "-";
  };

  const filteredUsers = users.filter((user: UserType) =>
    [
      String(user.name || ""),
      String(user.email || ""),
      String(user.role || ""),
      getDepartment(user),
      getYear(user),
    ].some((field) => field.toLowerCase().includes(search.toLowerCase())),
  );

  const stop = (e: MouseEvent | KeyboardEvent) => e.stopPropagation();

  return (
    <div className="p-4 text-black w-full">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name, email, role, department, year..."
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
                {["Name", "Email", "Role", "Department", "Year", "Actions"].map(
                  (head) => (
                    <th
                      key={head}
                      className="py-2 px-2 md:py-3 md:px-4 border border-gray-300 font-medium whitespace-nowrap"
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {user.name}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap capitalize">
                      {user.role}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {getDepartment(user)}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                      {getYear(user)}
                    </td>

                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300">
                        <button
                          onClick={(e) => {
                            stop(e);
                            if (!user._id) return;

                            if (confirm(`Delete ${user.name}?`)) {
                              deleteUser(user._id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-gray-500 border border-gray-300"
                  >
                    No users found.
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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user._id}
                className="border-b last:border-b-0 p-3 bg-white hover:bg-blue-50 transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-blue-800 text-sm">
                    {user.name}
                  </h3>

                  <button
                    onClick={(e) => {
                      stop(e);
                      if (!user._id) return;

                      if (confirm(`Delete ${user.name}?`)) {
                        deleteUser(user._id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-600">Email: {user.email}</p>

                <p className="text-xs text-gray-600 capitalize">
                  Role: {user.role}
                </p>

                <p className="text-xs text-gray-600">
                  Department: {getDepartment(user)}
                </p>

                <p className="text-xs text-gray-600">Year: {getYear(user)}</p>
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
