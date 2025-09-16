"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Task } from "@/types/Task";
import { buildTasksFromAnimals } from "@/utils/buildTasksFromAnimals";
import { useAnimalContext } from "@/context/AnimalContext";

interface TasksContextValue {
    tasks: Task[];
    completed: Record<string, string>;
    markCompleted: (key: string) => void;
    undoCompleted: (key: string) => void;
    snooze: (key: string, days: number) => void;
    showCompleted: boolean;                  // <-- added
    setShowCompleted: (value: boolean) => void; // <-- added
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const { animals } = useAnimalContext();

    const [completed, setCompleted] = useState<Record<string, string>>({});
    const [snoozed, setSnoozed] = useState<Record<string, string>>({});
    const [showCompleted, setShowCompleted] = useState<boolean>(false); // <-- added

    const rawTasks = useMemo(() => buildTasksFromAnimals(animals), [animals]);

    const tasks = useMemo(() => {
        return rawTasks.map((t) => ({
            ...t,
            nextDate: snoozed[t.key] || t.nextDate, // <-- use nextDate
        }));
    }, [rawTasks, snoozed]);

    const markCompleted = (key: string) =>
        setCompleted((c) => ({ ...c, [key]: new Date().toISOString() }));

    const undoCompleted = (key: string) =>
        setCompleted((c) => {
            const rest = { ...c };
            delete rest[key];
            return rest;
        });


    const snooze = (key: string, days: number) => {
        setSnoozed((s) => {
            const task = rawTasks.find((t) => t.key === key);
            if (!task || !task.nextDate) return s;
            const newDate = new Date(task.nextDate); // <-- use nextDate
            newDate.setDate(newDate.getDate() + days);
            return { ...s, [key]: newDate.toISOString() };
        });
    };

    return (
        <TasksContext.Provider
            value={{
                tasks,
                completed,
                markCompleted,
                undoCompleted,
                snooze,
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
