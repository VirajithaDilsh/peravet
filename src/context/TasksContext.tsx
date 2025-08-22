"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Task } from "@/types/Task";
import { buildTasksFromAnimals } from "@/utils/taskUtils";
import { daysBetween, toDate } from "@/utils/date";
import { useAnimalContext } from "@/context/AnimalContext"; // your existing context

// Local UI state persisted in localStorage
interface CompletedMap { [taskKey: string]: string /* completedAt ISO */ }
interface SnoozedMap { [taskKey: string]: string /* new dueDate ISO */ }

interface TasksContextValue {
    tasks: Task[];              // live derived tasks (with snoozes applied and completed filtered out by default)
    rawTasks: Task[];           // derived tasks before snooze/complete
    completed: CompletedMap;
    snoozed: SnoozedMap;
    overdueCount: number;
    dueSoonCount: number;       // within N days
    upcomingCount: number;
    markCompleted: (key: string) => void;
    undoCompleted: (key: string) => void;
    snooze: (key: string, days: number) => void;
    showCompleted: boolean;
    setShowCompleted: (b: boolean) => void;
    dueSoonWindowDays: number;
    setDueSoonWindowDays: (n: number) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const { animals } = useAnimalContext();

    const [completed, setCompleted] = useState<CompletedMap>(() => {
        if (typeof window === "undefined") return {};
        try { return JSON.parse(localStorage.getItem("completedTasks") || "{}"); } catch { return {}; }
    });

    const [snoozed, setSnoozed] = useState<SnoozedMap>(() => {
        if (typeof window === "undefined") return {};
        try { return JSON.parse(localStorage.getItem("snoozedTasks") || "{}"); } catch { return {}; }
    });

    const [showCompleted, setShowCompleted] = useState(false);
    const [dueSoonWindowDays, setDueSoonWindowDays] = useState(7);

    useEffect(() => {
        localStorage.setItem("completedTasks", JSON.stringify(completed));
    }, [completed]);

    useEffect(() => {
        localStorage.setItem("snoozedTasks", JSON.stringify(snoozed));
    }, [snoozed]);

    const rawTasks = useMemo(() => buildTasksFromAnimals(animals), [animals]);

    // Apply snooze and filter completed (unless showing completed)
    const tasks = useMemo(() => {
        const today = new Date();
        return rawTasks
            .map((t) => {
                const newDue = snoozed[t.key];
                return newDue ? { ...t, dueDate: newDue } : t;
            })
            .filter((t) => showCompleted || !completed[t.key])
            .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    }, [rawTasks, snoozed, completed, showCompleted]);

    const { overdueCount, dueSoonCount, upcomingCount } = useMemo(() => {
        const today = new Date();
        let overdue = 0, soon = 0, up = 0;
        tasks.forEach((t) => {
            const dd = toDate(t.dueDate);
            const delta = daysBetween(dd, today) * -1; // positive means future days
            if (dd < today && !completed[t.key]) overdue++;
            else if (delta >= 0 && delta <= dueSoonWindowDays) soon++;
            else up++;
        });
        return { overdueCount: overdue, dueSoonCount: soon, upcomingCount: up };
    }, [tasks, completed, dueSoonWindowDays]);

    function markCompleted(key: string) {
        setCompleted((m) => ({ ...m, [key]: new Date().toISOString() }));
    }
    function undoCompleted(key: string) {
        setCompleted((m) => { const { [key]: _, ...rest } = m; return rest; });
    }
    function snooze(key: string, days: number) {
        const t = rawTasks.find((x) => x.key === key);
        if (!t) return;
        const base = toDate(t.dueDate);
        const newDate = new Date(base);
        newDate.setDate(base.getDate() + days);
        const iso = newDate.toISOString().slice(0, 10);
        setSnoozed((m) => ({ ...m, [key]: iso }));
    }

    const value: TasksContextValue = {
        tasks,
        rawTasks,
        completed,
        snoozed,
        overdueCount,
        dueSoonCount,
        upcomingCount,
        markCompleted,
        undoCompleted,
        snooze,
        showCompleted,
        setShowCompleted,
        dueSoonWindowDays,
        setDueSoonWindowDays,
    };

    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
    const ctx = useContext(TasksContext);
    if (!ctx) throw new Error("useTasks must be used within <TasksProvider>");
    return ctx;
}