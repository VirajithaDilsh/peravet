"use client";

import { useTasks } from "@/context/TasksContext";
import { useUserContext } from "@/context/UserContext";
import type { Task } from "@/types/Task";
import { isAfter, format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TasksPage() {
    const {
        tasks,
        markCompleted,
        undoCompleted,
        snooze,
        deleteTask,
        showCompleted,
        setShowCompleted,
    } = useTasks();

    const { currentUser } = useUserContext();
    const now = new Date();
    const router = useRouter();

    // Visibility is already enforced server-side (GET /api/tasks only returns
    // what this user is allowed to see) — this is just the "hide completed" view filter.
    const canManage = currentUser?.role === "admin" || currentUser?.role === "doctor";

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

    const handleComplete = async (task: Task) => {
        try {
            await markCompleted(task);
            toast.success("Task marked as done");
        } catch {
            toast.error("Could not update task");
        }
    };

    const handleUndo = async (task: Task) => {
        try {
            await undoCompleted(task);
        } catch {
            toast.error("Could not update task");
        }
    };

    const handleSnooze = async (task: Task) => {
        try {
            await snooze(task._id, 3);
            toast.success("Snoozed 3 days");
        } catch {
            toast.error("This task has no date to snooze");
        }
    };

    const handleDelete = async (task: Task) => {
        if (!confirm(`Delete this ${task.type} task for ${task.animalTag}?`)) return;
        try {
            await deleteTask(task._id);
            toast.success("Task deleted");
        } catch {
            toast.error("Could not delete task");
        }
    };

    const filtered = tasks.filter((task) => showCompleted || task.status !== "completed");

    const renderActions = (task: Task) => (
        <>
            {task.status !== "completed" ? (
                <button
                    onClick={() => handleComplete(task)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                >
                    Done
                </button>
            ) : (
                <button
                    onClick={() => handleUndo(task)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                >
                    Undo
                </button>
            )}

            {canManage && task.status !== "completed" && task.nextDate && (
                <button
                    onClick={() => handleSnooze(task)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                >
                    Snooze 3d
                </button>
            )}

            {canManage && (
                <button
                    onClick={() => handleDelete(task)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                >
                    Delete
                </button>
            )}
        </>
    );

    return (
        <div className="p-4 md:p-6 lg:p-8 min-h-screen">
            <div className="flex justify-end mb-4">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={showCompleted}
                        onChange={(e) => setShowCompleted(e.target.checked)}
                    />
                    Show completed
                </label>
            </div>

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

                        {canManage && (
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
                        const isDone = task.status === "completed";
                        const isOverdue = task.nextDate
                            ? !isAfter(new Date(task.nextDate), now)
                            : false;

                        return (
                            <tr
                                key={task._id}
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

                                {canManage && (
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
                                    {renderActions(task)}
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>

                <div className="md:hidden divide-y divide-gray-200">
                    {filtered.map((task) => {
                        const isDone = task.status === "completed";
                        const isOverdue = task.nextDate
                            ? !isAfter(new Date(task.nextDate), now)
                            : false;

                        return (
                            <div
                                key={task._id}
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

                                {canManage && (
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Assigned To:</span>{" "}
                                        {getAssignedToText(task)}
                                    </p>
                                )}

                                <div
                                    className="flex flex-wrap gap-2 pt-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {renderActions(task)}
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
