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

export type TaskSourceField =
    | "nextVaccinationDate"
    | "nextDewormingDate"
    | "nextAiDate"
    | "expectedCalvingDate"
    | "nextTreatmentDate"
    | "nextDiseaseDate";

export type TaskStatus = "overdue" | "due-soon" | "upcoming" | "completed";

// ------------------- Task Interface -------------------
export interface Task {
    key: string;          // unique key for task (animalTag + type + date)
    type: TaskType;       // type of task
    species: string;      // species of animal
    animalTag: string;    // tag/ID of the animal
    dueDate: string;      // date task is due
    nextDate?: string;    // optional next occurrence date
    comment?: string;     // optional comment
}
