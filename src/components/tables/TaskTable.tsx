"use client";

import { useTasks } from "@/context/TasksContext";
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

    const now = new Date();
    const router = useRouter();

    const filtered = tasks.filter((t) => showCompleted || !completed[t.key]);

    return (
        <div className="p-4 md:p-6 lg:p-8  min-h-screen">
            {/* Toggle completed tasks
            <label className="flex items-center gap-3 mb-6 text-gray-800 font-medium">
                <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                    className="accent-blue-500 w-5 h-5"
                />
                Show completed tasks
            </label> */}

            {/* Table (desktop) + Card list (mobile) */}
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                {/* Desktop Table */}
                <table className="hidden md:table min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tag</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Species</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
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
                                onClick={() =>
                                    router.push(`/animals/${task.animalTag}`)
                                }
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
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {task.nextDate
                                        ? format(
                                            new Date(task.nextDate),
                                            "yyyy-MM-dd"
                                        )
                                        : ""}
                                </td>
                                <td
                                    className="px-4 py-3 flex flex-wrap justify-center gap-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {!isDone ? (
                                        <button
                                            onClick={() =>
                                                markCompleted(task)
                                            }
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Done
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                undoCompleted(task)
                                            }
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

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-gray-200">
                    {filtered.map((task) => {
                        const isDone = !!completed[task.key];
                        const isOverdue = task.nextDate
                            ? !isAfter(new Date(task.nextDate), now)
                            : false;

                        return (
                            <div
                                key={task.key}
                                onClick={() =>
                                    router.push(`/animals/${task.animalTag}`)
                                }
                                className={`p-4 space-y-2 transition rounded-lg m-2 shadow-sm cursor-pointer ${
                                    isOverdue && !isDone
                                        ? "bg-red-100"
                                        : "bg-white"
                                } ${isDone ? "opacity-60" : ""} hover:shadow-md`}
                            >
                                <div className="flex justify-between">
                                    <p className="font-semibold text-gray-800">
                                        {task.type}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {task.nextDate
                                            ? format(
                                                new Date(task.nextDate),
                                                "yyyy-MM-dd"
                                            )
                                            : ""}
                                    </p>
                                </div>

                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">
                                        Tag:
                                    </span>{" "}
                                    {task.animalTag}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">
                                        Species:
                                    </span>{" "}
                                    {task.species}
                                </p>

                                <div
                                    className="flex gap-2 pt-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {!isDone ? (
                                        <button
                                            onClick={() =>
                                                markCompleted(task)
                                            }
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Done
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                undoCompleted(task)
                                            }
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

            {/* Empty State */}
            {filtered.length === 0 && (
                <p className="text-center text-gray-500 mt-6">
                    No tasks to show.
                </p>
            )}
        </div>
    );
}
