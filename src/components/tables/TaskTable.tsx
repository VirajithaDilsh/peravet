"use client";

import { useTasks } from "@/context/TasksContext";
import { useUserContext } from "@/context/UserContext";
import type { Task, AssignedUser } from "@/types/Task";
import { isAfter, format } from "date-fns";
import { useRouter } from "next/navigation";

export default function TasksPage() {
    const {
        tasks,
        completed,
        markCompleted,
        undoCompleted,
        showCompleted,
        setShowCompleted,
    } = useTasks();

    const { currentUser } = useUserContext();
    const now = new Date();
    const router = useRouter();

    const canViewTask = (task: Task) => {
        if (!currentUser) return false;

        // admin can see all tasks
        if (currentUser.role === "admin") return true;

        if (!task.assignType) return false;

        if (task.assignType === "all_students" && currentUser.role === "student") {
            return true;
        }

        if (task.assignType === "all_employees" && currentUser.role === "employee") {
            return true;
        }

        if (task.assignType === "all_doctors" && currentUser.role === "doctor") {
            return true;
        }

        if (task.assignType === "specific_users") {
            return (task.assignedUsers || []).some(
                (assignedUser: AssignedUser) => assignedUser.id === currentUser.id
            );
        }

        return false;
    };

    const canSeeAssignmentDetails =
        currentUser?.role === "admin" || currentUser?.role === "doctor";

    const getAssignedToText = (task: Task) => {
        if (task.assignType === "all_students") return "All Students";
        if (task.assignType === "all_employees") return "All Employees";
        if (task.assignType === "all_doctors") return "All Doctors";

        if (task.assignType === "specific_users") {
            if (!task.assignedUsers || task.assignedUsers.length === 0) {
                return "No specific users";
            }

            return task.assignedUsers.map((user) => user.name).join(", ");
        }

        return "Not assigned";
    };

    const filtered = tasks.filter((task) => {
        const visibleByCompleted = showCompleted || !completed[task.key];
        const visibleByRole = canViewTask(task);
        return visibleByCompleted && visibleByRole;
    });

    return (
        <div className="p-4 md:p-6 lg:p-8 min-h-screen">
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="hidden md:table min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Tag
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Species
                        </th>

                        {canSeeAssignmentDetails && (
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                Assigned To
                            </th>
                        )}

                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                            Date
                        </th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                            Actions
                        </th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                    {filtered.map((task) => {
                        const isDone = !!completed[task.key];
                        const isOverdue = task.nextDate
                            ? !isAfter(new Date(task.nextDate), now)
                            : false;

                        return (
                            <tr
                                key={task.key}
                                onClick={() => router.push(`/animals/${task.animalTag}`)}
                                className={`cursor-pointer transition duration-200 hover:bg-gray-50 ${
                                    isOverdue && !isDone ? "bg-red-100" : ""
                                } ${isDone ? "opacity-60" : ""}`}
                            >
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {task.type}
                                </td>

                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {task.animalTag}
                                </td>

                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {task.species}
                                </td>

                                {canSeeAssignmentDetails && (
                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs">
                                        <div className="whitespace-normal break-words">
                                            {getAssignedToText(task)}
                                        </div>
                                    </td>
                                )}

                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {task.nextDate
                                        ? format(new Date(task.nextDate), "yyyy-MM-dd")
                                        : ""}
                                </td>

                                <td
                                    className="px-4 py-3 flex flex-wrap justify-center gap-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {!isDone ? (
                                        <button
                                            onClick={() => markCompleted(task)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Done
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => undoCompleted(task)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Undo
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                <div className="md:hidden divide-y divide-gray-200">
                    {filtered.map((task) => {
                        const isDone = !!completed[task.key];
                        const isOverdue = task.nextDate
                            ? !isAfter(new Date(task.nextDate), now)
                            : false;

                        return (
                            <div
                                key={task.key}
                                onClick={() => router.push(`/animals/${task.animalTag}`)}
                                className={`p-4 space-y-2 transition rounded-lg m-2 shadow-sm cursor-pointer ${
                                    isOverdue && !isDone ? "bg-red-100" : "bg-white"
                                } ${isDone ? "opacity-60" : ""} hover:shadow-md`}
                            >
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-800">{task.type}</p>
                                    <p className="text-sm text-gray-500">
                                        {task.nextDate
                                            ? format(new Date(task.nextDate), "yyyy-MM-dd")
                                            : ""}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Tag:</span> {task.animalTag}
                                </p>

                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Species:</span> {task.species}
                                </p>

                                {canSeeAssignmentDetails && (
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Assigned To:</span>{" "}
                                        {getAssignedToText(task)}
                                    </p>
                                )}

                                <div
                                    className="flex gap-2 pt-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {!isDone ? (
                                        <button
                                            onClick={() => markCompleted(task)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Done
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => undoCompleted(task)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Undo
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-gray-500 mt-6">No tasks to show.</p>
            )}
        </div>
    );
}