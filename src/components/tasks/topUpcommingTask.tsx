"use client";

import { useTasks } from "@/context/TasksContext";
import { useUserContext } from "@/context/UserContext";
import type { Task, AssignedUser } from "@/types/Task";
import { format, isAfter } from "date-fns";

export default function UpcomingTasksCard() {
    const { tasks, completed, markCompleted, showCompleted } = useTasks();
    const { currentUser } = useUserContext();

    const now = new Date();

    const canViewTask = (task: Task) => {
        if (!currentUser) return false;

        // admin can see all tasks
        if (currentUser.role === "admin") return true;

        // non-admin users only see assigned tasks
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

    const upcomingTasks = tasks
        .filter(
            (task) =>
                task.nextDate &&
                (showCompleted || !completed[task.key]) &&
                canViewTask(task)
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
                    const isDone = !!completed[task.key];
                    const isOverdue = task.nextDate
                        ? !isAfter(new Date(task.nextDate), now)
                        : false;

                    return (
                        <li
                            key={task.key}
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