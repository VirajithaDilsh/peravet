"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Task } from "@/types/Task";
import { buildTasksFromAnimals } from "@/utils/buildTasksFromAnimals";
import { useAnimalContext } from "@/context/AnimalContext";
import {
    Animal,
    Vaccine,
    Deworming,
    Treatment,
    Disease,
} from "@/types/animals";

// --------------------------------------------------------
// Context Types
// --------------------------------------------------------
interface TasksContextValue {
    tasks: Task[];
    completed: Record<string, string>;
    markCompleted: (task: Task) => void;
    undoCompleted: (task: Task) => void;
    snooze: (key: string, days: number) => void;
    showCompleted: boolean;
    setShowCompleted: (value: boolean) => void;
}

const TasksContext = createContext<TasksContextValue | null>(null);

// --------------------------------------------------------
// Provider
// --------------------------------------------------------
export function TasksProvider({ children }: { children: React.ReactNode }) {
    const { animals, editAnimal } = useAnimalContext();

    const [completed, setCompleted] = useState<Record<string, string>>({});
    const [snoozed, setSnoozed] = useState<Record<string, string>>({});
    const [showCompleted, setShowCompleted] = useState<boolean>(false);

    // Build tasks from animals
    const rawTasks = useMemo(() => buildTasksFromAnimals(animals), [animals]);

    const tasks = useMemo(
        () =>
            rawTasks.map((t) => ({
                ...t,
                nextDate: snoozed[t.key] || t.nextDate,
            })),
        [rawTasks, snoozed]
    );

    // --------------------------------------------------------
    // markCompleted()
    // --------------------------------------------------------
    const markCompleted = (task: Task) => {
        setCompleted((c) => ({ ...c, [task.key]: new Date().toISOString() }));

        const animal = animals.find((a) => a.tag === task.animalTag);
        if (!animal) return;

        // Deep clone to avoid mutation
        const updatedAnimal: Animal = JSON.parse(JSON.stringify(animal));

        const targetDate = task.nextDate || task.dueDate;

        // ------------------- Vaccination -------------------
        if (task.type === "Vaccination") {
            if ("vaccinations" in updatedAnimal && Array.isArray(updatedAnimal.vaccinations)) {
                updatedAnimal.vaccinations = updatedAnimal.vaccinations.filter(
                    (v: Vaccine | undefined) => v?.nextDate !== targetDate
                );
            }
        }

        // ------------------- Deworming -------------------
        if (task.type === "Deworming") {
            if ("deworming" in updatedAnimal && Array.isArray(updatedAnimal.deworming)) {
                updatedAnimal.deworming = updatedAnimal.deworming.filter(
                    (d: Deworming | undefined) => d?.nextDate !== targetDate
                );
            }
        }

        // ------------------- Treatment -------------------
        if (task.type === "Treatment") {
            if ("treatments" in updatedAnimal && Array.isArray(updatedAnimal.treatments)) {
                updatedAnimal.treatments = updatedAnimal.treatments.filter(
                    (t: Treatment | undefined) => t?.nextDate !== targetDate
                );
            }
        }

        // ------------------- Disease -------------------
        if (task.type === "Disease") {
            if ("diseases" in updatedAnimal && Array.isArray(updatedAnimal.diseases)) {
                updatedAnimal.diseases = updatedAnimal.diseases.filter(
                    (d: Disease | undefined) => d?.nextDate !== targetDate
                );
            }
        }

        // ------------------- Artificial Insemination -------------------
        if (task.type === "Artificial Insemination") {
            if ("reproduction" in updatedAnimal && Array.isArray(updatedAnimal.reproduction)) {
                updatedAnimal.reproduction = updatedAnimal.reproduction.map((r) => {
                    if (r.nextAiDate === targetDate) {
                        return { ...r, nextAiDate: undefined };
                    }
                    return r;
                });
            }
        }

        // ------------------- Expected Calving -------------------
        if (task.type === "Expected Calving") {
            if ("reproduction" in updatedAnimal && Array.isArray(updatedAnimal.reproduction)) {
                updatedAnimal.reproduction = updatedAnimal.reproduction.map((r) => {
                    if (r.expectedCalvingDate === targetDate) {
                        return { ...r, expectedCalvingDate: undefined };
                    }
                    return r;
                });
            }
        }

        editAnimal(updatedAnimal);
    };

    // --------------------------------------------------------
    // undoCompleted()
    // --------------------------------------------------------
    const undoCompleted = (task: Task) => {
        setCompleted((c) => {
            const rest = { ...c };
            delete rest[task.key];
            return rest;
        });
    };

    // --------------------------------------------------------
    // snooze()
    // --------------------------------------------------------
    const snooze = (key: string, days: number) => {
        setSnoozed((s) => {
            const task = rawTasks.find((t) => t.key === key);
            if (!task || !task.nextDate) return s;
            const newDate = new Date(task.nextDate);
            newDate.setDate(newDate.getDate() + days);
            return { ...s, [key]: newDate.toISOString() };
        });
    };

    // --------------------------------------------------------
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

// --------------------------------------------------------
export function useTasks() {
    const ctx = useContext(TasksContext);
    if (!ctx) throw new Error("useTasks must be used within TasksProvider");
    return ctx;
}
