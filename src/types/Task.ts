
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
    _id: string;
    animal: string;
    type: TaskType;
    species: string;
    animalTag: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;

    drug?: string;
    dosage?: number;
    route?: string;
    prescribe?: string;

    feedType?: "Starter" | "Grower" | "Layer Feed";
    feedIntake?: string;
    feedRequirement?: string;

    waterIntake?: string;
    waterRequirement?: string;
    chlorinating?: string;

    assignType?: TaskAssignType;
    assignedUsers?: AssignedUser[];

    status: "pending" | "completed";
    completedAt?: string;
    completedBy?: { id: string; name: string };
    createdBy?: { id: string; name: string };
}

export type NewTaskInput = Omit<
    Task,
    "_id" | "animal" | "species" | "status" | "completedAt" | "completedBy" | "createdBy"
> & { animalTag: string };