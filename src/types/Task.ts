
export type UserRole = "admin" | "student" | "employee" | "doctor";

export type TaskAssignType =
    | "all_students"
    | "all_employees"
    | "all_doctors"
    | "specific_users";

export interface AssignedUser {
    id: string;
    name: string;
    role: UserRole;
}

export type TaskType =
    | "Treatment"
    | "Vaccination"
    | "Deworming"
    | "Disease"
    | "Artificial Insemination"
    | "Expected Calving"
    | "Feed"
    | "Water";

export interface Task {
    key: string;
    type: TaskType;
    species: string;
    animalTag: string;
    dueDate: string;
    nextDate?: string;
    comment?: string;
    assignType?: TaskAssignType;
    assignedUsers?: AssignedUser[];
}