// ------------------- Task Types -------------------
export type TaskType =
    | "Treatment"
    | "Vaccination"
    | "Deworming"
    | "Disease"
    | "Artificial Insemination"
    | "Expected Calving"
    | "Feed"
    | "Water";

// ------------------- Task Source Field Mapping -------------------
export type TaskSourceField =
    | "nextVaccinationDate"
    | "nextDewormingDate"
    | "nextAiDate"
    | "expectedCalvingDate"
    | "nextTreatmentDate"
    | "nextDiseaseDate";

// ------------------- Status -------------------
export type TaskStatus = "overdue" | "due-soon" | "upcoming" | "completed";

// ------------------- Task Interface -------------------
export interface Task {
    key: string;            // unique key for task (animalTag + type + date)
    type: TaskType;         // Type of task
    species: string;        // Animal species
    animalTag: string;      // Animal's ear tag
    dueDate: string;        // Date the task must be done
    nextDate?: string;      // Next scheduled date (optional)
    comment?: string;       // Free text / notes
}
