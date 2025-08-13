"use client";

import { useTasks } from "@/context/TasksContext";
import { isAfter } from "date-fns";

export default function TasksPage() {
    const { tasks, completed, markCompleted, undoCompleted, snooze, showCompleted, setShowCompleted } = useTasks();

    const now = new Date();
    const filtered = tasks.filter(t => showCompleted || !completed[t.key]);

    return (
        <div className="p-6">
            <h1 className="text-3xl text-black font-bold mb-4">Upcoming Tasks</h1>

            <label className="flex items-center gap-2 mb-4 text-black">
                <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={e => setShowCompleted(e.target.checked)}
                />
                Show completed tasks
            </label>

            <table className="w-full border border-gray-300 text-black">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Tag</th>
                    <th className="p-2 text-left">Species</th>
                    <th className="p-2 text-left">Due Date</th>
                    <th className="p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filtered.map(task => (
                    <tr
                        key={task.key}
                        className={`border-t ${isAfter(new Date(task.dueDate), now) ? "" : "bg-red-100"}`}
                    >
                        <td className="p-2">{task.type}</td>
                        <td className="p-2">{task.animalTag}</td>
                        <td className="p-2">{task.species}</td>
                        <td className="p-2">{task.dueDate}</td>
                        <td className="p-2 flex gap-2">
                            {!completed[task.key] ? (
                                <button
                                    onClick={() => markCompleted(task.key)}
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Done
                                </button>
                            ) : (
                                <button
                                    onClick={() => undoCompleted(task.key)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                >
                                    Undo
                                </button>
                            )}
                            <button
                                onClick={() => snooze(task.key, 7)}
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                            >
                                Snooze 7d
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
