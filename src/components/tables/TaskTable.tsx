"use client";

import { useTasks } from "@/context/TasksContext";
import { isAfter, format } from "date-fns";

export default function TasksPage() {
    const {
        tasks,
        completed,
        markCompleted,
        undoCompleted,
        snooze,
        showCompleted,
        setShowCompleted,
    } = useTasks();

    const now = new Date();
    const filtered = tasks.filter(t => showCompleted || !completed[t.key]);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <label className="flex items-center gap-3 mb-6 text-gray-800 font-medium">
                <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={e => setShowCompleted(e.target.checked)}
                    className="accent-blue-500 w-5 h-5"
                />
                Show completed tasks
            </label>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tag</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Species</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filtered.map(task => {
                        const isDone = !!completed[task.key];
                        const isOverdue = task.nextDate ? !isAfter(new Date(task.nextDate), now) : false;

                        return (
                            <tr
                                key={task.key}
                                className={`transition duration-200 hover:bg-gray-50 ${
                                    isOverdue && !isDone ? "bg-red-100" : ""
                                } ${isDone ? "opacity-60" : ""}`}
                            >
                                <td className="px-4 py-3 text-sm text-gray-700 ">{task.type}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{task.animalTag}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">{task.species}</td>
                                <td className="px-4 py-3 text-sm text-gray-700">
                                    {task.nextDate ? format(new Date(task.nextDate), "yyyy-MM-dd") : ""}
                                </td>
                                <td className="px-4 py-3 flex flex-wrap justify-center gap-2">
                                    {!isDone ? (
                                        <button
                                            onClick={() => markCompleted(task.key)}
                                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Done
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => undoCompleted(task.key)}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                        >
                                            Undo
                                        </button>
                                    )}
                                    <button
                                        onClick={() => snooze(task.key, 7)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                                    >
                                        Snooze 7d
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {filtered.length === 0 && (
                <p className="text-center text-gray-500 mt-6">
                    No tasks to show.
                </p>
            )}
        </div>
    );
}
