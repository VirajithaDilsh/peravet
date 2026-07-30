import { createTaskAPI } from "@/services/taskApi";
import type { NewTaskInput, Task, TaskType } from "@/types/Task";
import type { Animal } from "@/types/animals";

export interface SyncableTaskFields {
    type: TaskType;
    dueDate?: string;
    nextDate?: string;
    comment?: string;
    drug?: string;
    feedType?: "Starter" | "Grower" | "Layer Feed";
    feedIntake?: string;
    feedRequirement?: string;
    waterIntake?: string;
    waterRequirement?: string;
    chlorinating?: string;
}

const isBlank = (value?: string) => !value || value.trim() === "";

const hasContent = (fields: SyncableTaskFields) =>
    !isBlank(fields.dueDate) || !isBlank(fields.feedIntake) || !isBlank(fields.waterIntake);

const sameValue = (a?: string, b?: string) => (a || undefined) === (b || undefined);

const matchesExistingTask = (task: Task, fields: SyncableTaskFields) =>
    task.type === fields.type &&
    sameValue(task.dueDate?.slice(0, 10), fields.dueDate) &&
    sameValue(task.comment, fields.comment) &&
    sameValue(task.drug, fields.drug) &&
    sameValue(task.feedType, fields.feedType) &&
    sameValue(task.feedIntake, fields.feedIntake) &&
    sameValue(task.feedRequirement, fields.feedRequirement) &&
    sameValue(task.waterIntake, fields.waterIntake) &&
    sameValue(task.waterRequirement, fields.waterRequirement) &&
    sameValue(task.chlorinating, fields.chlorinating);

// Creates a Task for every health-record row that doesn't already have a
// matching Task, so records entered directly into a health management table
// also show up in the animal's Tasks list. Returns true if any were created.
export async function syncHealthRowsToTasks(
    animalTag: string,
    rows: SyncableTaskFields[],
    existingTasks: Task[]
): Promise<boolean> {
    const toCreate = rows
        .filter(hasContent)
        .filter(
            (row) =>
                !existingTasks.some(
                    (task) => task.animalTag === animalTag && matchesExistingTask(task, row)
                )
        );

    if (toCreate.length === 0) return false;

    await Promise.all(
        toCreate.map((row) =>
            createTaskAPI({
                animalTag,
                assignType: "all_students",
                assignedUsers: [],
                ...row,
            } as NewTaskInput)
        )
    );

    return true;
}

const isPoultrySpecies = (species: string) => species === "Layer" || species === "Broiler";
const isAltDiseaseShapeSpecies = (species: string) =>
    species === "Pig" || species === "Goat" || species === "Sheep";

// Appends a row derived from a newly created Task to the animal's matching
// health-management table, so the table stays in sync with tasks created
// from the Add Task page. Returns null when the task type has no
// corresponding table for this animal's species.
export function appendTaskToHealthRecords<T extends Animal>(
    animal: T,
    fields: SyncableTaskFields
): T | null {
    if (isPoultrySpecies(animal.species)) {
        const a = animal as Animal & {
            vaccinations?: unknown[];
            feedManagement?: unknown[];
            waterManagement?: unknown[];
        };

        if (fields.type === "Vaccination") {
            return {
                ...animal,
                vaccinations: [
                    ...(a.vaccinations || []),
                    {
                        vaccine: fields.comment || "Vaccination",
                        date: fields.dueDate,
                        nextDate: fields.nextDate,
                        route: "",
                    },
                ],
            } as T;
        }

        if (fields.type === "Feed") {
            return {
                ...animal,
                feedManagement: [
                    ...(a.feedManagement || []),
                    {
                        type: fields.feedType || "Starter",
                        feedIntake: fields.feedIntake || "",
                        feedRequirement: fields.feedRequirement,
                    },
                ],
            } as T;
        }

        if (fields.type === "Water") {
            return {
                ...animal,
                waterManagement: [
                    ...(a.waterManagement || []),
                    {
                        waterIntake: fields.waterIntake || "",
                        waterRequirement: fields.waterRequirement,
                        chlorinating: fields.chlorinating,
                    },
                ],
            } as T;
        }

        return null;
    }

    const a = animal as Animal & { vaccinations?: unknown[]; deworming?: unknown[]; diseases?: unknown[] };

    if (fields.type === "Vaccination") {
        return {
            ...animal,
            vaccinations: [
                ...(a.vaccinations || []),
                {
                    type: fields.comment || "Vaccination",
                    dueDate: fields.dueDate,
                    nextDate: fields.nextDate,
                    comment: fields.comment,
                },
            ],
        } as T;
    }

    if (fields.type === "Deworming") {
        return {
            ...animal,
            deworming: [
                ...(a.deworming || []),
                {
                    type: fields.comment || "Deworming",
                    dueDate: fields.dueDate,
                    nextDate: fields.nextDate,
                    comment: fields.comment,
                },
            ],
        } as T;
    }

    if (fields.type === "Disease") {
        if (isAltDiseaseShapeSpecies(animal.species)) {
            return {
                ...animal,
                diseases: [
                    ...(a.diseases || []),
                    {
                        date: fields.dueDate,
                        condition: fields.comment || "Disease",
                        medication: fields.drug,
                        withdrawalDate: fields.nextDate,
                    },
                ],
            } as T;
        }

        return {
            ...animal,
            diseases: [
                ...(a.diseases || []),
                {
                    type: fields.comment || "Disease",
                    treatment: fields.drug,
                    dueDate: fields.dueDate,
                    nextDate: fields.nextDate,
                    comment: fields.comment,
                },
            ],
        } as T;
    }

    return null;
}
