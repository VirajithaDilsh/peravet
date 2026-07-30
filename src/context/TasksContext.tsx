"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Task } from "@/types/Task";
import {
    getTasksAPI,
    completeTaskAPI,
    undoTaskAPI,
    snoozeTaskAPI,
    deleteTaskAPI,
} from "@/services/taskApi";
import { useUserContext } from "@/context/UserContext";

interface TasksContextValue {
    tasks: Task[];
    loading: boolean;
    reloadTasks: () => Promise<void>;
    markCompleted: (task: Task) => Promise<void>;
    undoCompleted: (task: Task) => Promise<void>;
    snooze: (id: string, days: number) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    showCompleted: boolean;
    setShowCompleted: (value: boolean) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const { currentUser } = useUserContext();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCompleted, setShowCompleted] = useState<boolean>(false);

    const reloadTasks = useCallback(async () => {
        try {
            const data = await getTasksAPI();
            setTasks(data);
        } catch (err) {
            console.error("Load tasks error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            reloadTasks();
        } else {
            setTasks([]);
            setLoading(false);
        }
    }, [currentUser, reloadTasks]);

    const markCompleted = async (task: Task) => {
        const updated = await completeTaskAPI(task._id);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    };

    const undoCompleted = async (task: Task) => {
        const updated = await undoTaskAPI(task._id);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    };

    const snooze = async (id: string, days: number) => {
        const updated = await snoozeTaskAPI(id, days);
        setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    };

    const deleteTask = async (id: string) => {
        await deleteTaskAPI(id);
        setTasks((prev) => prev.filter((t) => t._id !== id));
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                loading,
                reloadTasks,
                markCompleted,
                undoCompleted,
                snooze,
                deleteTask,
                showCompleted,
                setShowCompleted,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}

export function useTasks() {
    const ctx = useContext(TasksContext);
    if (!ctx) throw new Error("useTasks must be used within TasksProvider");
    return ctx;
}
