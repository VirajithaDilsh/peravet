export type TaskType =
    | "Vaccination"
    | "Deworming"
    | "Artificial Insemination"
    | "Expected Calving";

export type TaskSourceField =
    | "nextVaccinationDate"
    | "nextDewormingDate"
    | "nextAiDate"
    | "expectedCalvingDate";

export interface Task {
    key: string; // unique key -> species:tag:type:dueDate
    animalTag: string;
    species: string;
    type: TaskType;
    sourceField: TaskSourceField;
    dueDate: string; // ISO (YYYY-MM-DD)
}

export type TaskStatus = "overdue" | "due-soon" | "upcoming" | "completed";