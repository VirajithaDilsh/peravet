"use client";

import { useTasks } from "@/context/TasksContext";
import { format, isAfter } from "date-fns";

export default function UpcomingTasksCard() {
    // The backend only ever returns tasks this user is allowed to see, so no
    // client-side role filtering is needed here.
    const { tasks, markCompleted, showCompleted } = useTasks();

    const now = new Date();

    const upcomingTasks = tasks
        .filter(
            (task) =>
                task.nextDate && (showCompleted || task.status !== "completed")
        )
        .sort(
            (a, b) =>
                new Date(a.nextDate!).getTime() - new Date(b.nextDate!).getTime()
        )
        .slice(0, 5);

    return (
        <div className="bg-white rounded-xl shadow p-4 w-full max-w-md mx-auto">
            <h2 className="text-black text-xl font-bold mb-2">Upcoming Tasks</h2>
            <p className="text-sm text-gray-600 mb-4">Next 5 tasks to complete</p>

            {upcomingTasks.length === 0 && (
                <p className="text-gray-500 text-sm">No upcoming tasks.</p>
            )}

            <ul className="space-y-3">
                {upcomingTasks.map((task) => {
                    const isDone = task.status === "completed";
                    const isOverdue = task.nextDate
                        ? !isAfter(new Date(task.nextDate), now)
                        : false;

                    return (
                        <li
                            key={task._id}
                            className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition ${
                                isOverdue && !isDone ? "bg-red-100" : "bg-gray-50"
                            } ${isDone ? "opacity-60" : ""}`}
                        >
                            <div>
                                <p className="text-sm text-black font-medium">
                                    {task.type} - {task.animalTag}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {task.nextDate
                                        ? format(new Date(task.nextDate), "yyyy-MM-dd")
                                        : ""}
                                </p>
                            </div>

                            {!isDone && (
                                <button
                                    onClick={() => markCompleted(task)}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-medium"
                                >
                                    Done
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}