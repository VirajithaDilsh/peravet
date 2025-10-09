"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Task } from "@/types/Task";
import { buildTasksFromAnimals } from "@/utils/buildTasksFromAnimals";
import { useAnimalContext } from "@/context/AnimalContext";
import { Animal, Cattle, Buffalo, Goat, Sheep, Vaccine, Deworming, Treatment } from "@/types/animals";

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

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const { animals, editAnimal } = useAnimalContext();

    const [completed, setCompleted] = useState<Record<string, string>>({});
    const [snoozed, setSnoozed] = useState<Record<string, string>>({});
    const [showCompleted, setShowCompleted] = useState<boolean>(false);

    const rawTasks = useMemo(() => buildTasksFromAnimals(animals), [animals]);

    const tasks = useMemo(
        () =>
            rawTasks.map((t) => ({
                ...t,
                nextDate: snoozed[t.key] || t.nextDate,
            })),
        [rawTasks, snoozed]
    );

    const markCompleted = (task: Task) => {
        setCompleted((c) => ({ ...c, [task.key]: new Date().toISOString() }));

        const animal = animals.find((a) => a.tag === task.animalTag);
        if (!animal) return;

        // Clone animal
        const updatedAnimal: Animal = { ...animal };

        // Remove task safely using TS types
        switch (task.type) {
            case "Vaccination":
                if ("vaccinations" in animal && Array.isArray(animal.vaccinations)) {
                    updatedAnimal.vaccinations = animal.vaccinations.filter(
                        (v: Vaccine) => v.nextDate !== task.dueDate
                    );
                }
                break;

            case "Deworming":
                if ("deworming" in animal && Array.isArray(animal.deworming)) {
                    (updatedAnimal as Cattle | Buffalo | Goat | Sheep).deworming =
                        animal.deworming.filter((d: Deworming) => d.nextDate !== task.dueDate);
                }
                break;

            case "Treatment":
                if ("treatments" in animal && Array.isArray(animal.treatments)) {
                    updatedAnimal.treatments = animal.treatments.filter(
                        (t: Treatment) => t.nextDate !== task.dueDate
                    );
                }
                break;

            case "Disease":
                if ("diseases" in animal) {
                    (updatedAnimal as Cattle ).diseases = undefined;
                }
                break;


            case "Artificial Insemination":
                if ("nextAiDate" in animal) {
                    (updatedAnimal as Cattle | Buffalo | Goat | Sheep).nextAiDate = undefined;
                }
                break;

            case "Expected Calving":
                if ("expectedCalvingDate" in animal) {
                    (updatedAnimal as Cattle | Buffalo | Goat | Sheep).expectedCalvingDate = undefined;
                }
                break;
        }

        editAnimal(updatedAnimal);
    };

    const undoCompleted = (task: Task) => {
        setCompleted((c) => {
            const rest = { ...c };
            delete rest[task.key];
            return rest;
        });
    };

    const snooze = (key: string, days: number) => {
        setSnoozed((s) => {
            const task = rawTasks.find((t) => t.key === key);
            if (!task || !task.nextDate) return s;
            const newDate = new Date(task.nextDate);
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
