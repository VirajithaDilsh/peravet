export type Animal =
    | Cattle
    | Buffalo
    | Pig
    | Goat
    | Sheep
    | Layer
    | Broiler;

// ------------------- Assignment -------------------
export type AssignRole = "student" | "employee" | "doctor";

export type TaskAssignType =
    | "all_students"
    | "all_employees"
    | "all_doctors"
    | "specific_users";


export interface AssignedUser {
    id: string;
    name: string;
    role: AssignRole;
}

export interface AssignmentInfo {
    assignType?: TaskAssignType;
    assignedUsers?: AssignedUser[];
}

// ------------------- Treatment -------------------
export interface Treatment extends AssignmentInfo {
    type?: string;
    treatment?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;

    // Layer-specific
    drug?: string;
    dosage?: number;
    route?: string;
    prescribe?: string;
}

export interface Vaccine extends AssignmentInfo {
    type?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;
}

export interface Deworming extends AssignmentInfo {
    type?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;
}

export interface Disease extends AssignmentInfo {
    type?: string;
    treatment?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;

    // Pig-specific
    date?: string;
    condition?: string;
    medication?: string;
    dosage?: string;
    withdrawalDate?: string;
}

// ------------------- Layer / Broiler -------------------
export interface PoultryVaccination extends AssignmentInfo {
    date?: string;
    nextDate?: string;
    vaccine?: string;
    route?: string;
}

export interface PoultryFeedManagement extends AssignmentInfo {
    type: "Starter" | "Grower" | "Layer Feed";
    feedRequirement?: string;
    feedIntake: string;
}

export interface WaterManagement extends AssignmentInfo {
    waterRequirement?: string;
    waterIntake: string;
    chlorinating?: string;
}

export interface ReproductionInfo extends AssignmentInfo {
    lastCalvingDate?: string;
    lactationStage?: string;
    lastAiDate?: string;
    nextAiDate?: string;
    pregnancyStatus?: string;
    ageOfPregnancy?: number;
    expectedCalvingDate?: string;
    lastHeatDate?: string;

    parity?: number;
    matingDate?: string;
    breedingMethod?: "Natural Mating" | "AI";
    boarId?: string;
    aiDate?: string;
    farrowingDate?: string;
    bornAlive?: number;
    bornDead?: number;
    mummified?: number;
    weaningDate?: string;

    reproductiveComment?: string;
}

// ------------------- Base -------------------
export interface BaseAnimal {
    _id?: string;
    species: string;
    tag: string; // flock ID (birds)
    breed: string; // strains (birds)
    gender: string;
    weight?: number;
    age?: number; // age of flock (birds)
    status: string;
    treatments?: Treatment[];
    diseaseComment?: string;
}

// ------------------- Cattle -------------------
export interface Cattle extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;
    vaccinations?: Vaccine[];
    deworming?: Deworming[];
    diseases?: Disease[];
    reproduction?: ReproductionInfo[];
}

// ------------------- Buffalo -------------------
export interface Buffalo extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;
    reproduction?: ReproductionInfo[];
    vaccinations?: Vaccine[];
    deworming?: Deworming[];
    diseases?: Disease[];
}

// ------------------- Pig -------------------
export interface Pig extends BaseAnimal {
    dam: string;
    sire: string;
    birthWeight: number;
    birthDate: string;
    dateOfEntry: string;
    vaccinations?: Vaccine[];
    deworming?: Deworming[];
    diseases?: Disease[];
    reproduction?: ReproductionInfo[];
}

// ------------------- Goat -------------------
export interface Goat extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;
    expectedKiddingDate?: string;
    lastAiDate?: string;
    pregnancyStatus?: string;
    diseases?: Disease[];
    reproduction?: ReproductionInfo[];
    vaccinations?: Vaccine[];
    deworming?: Deworming[];
}

// ------------------- Sheep -------------------
export interface Sheep extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;
    expectedLambingDate?: string;
    lastAiDate?: string;
    pregnancyStatus?: string;
    diseases?: Disease[];
    reproduction?: ReproductionInfo[];
    vaccinations?: Vaccine[];
    deworming?: Deworming[];
}

// ------------------- Layer -------------------
export interface Layer extends BaseAnimal {
    initialFlockSize?: number;
    currentFlockSize?: number;
    mortalityRate: number;
    vaccinations?: PoultryVaccination[];
    feedManagement?: PoultryFeedManagement[];
    waterManagement?: WaterManagement[];
    diseases?: Disease[];
}

// ------------------- Broiler -------------------
export interface Broiler extends BaseAnimal {
    initialFlockSize?: number;
    currentFlockSize?: number;
    mortalityRate: number;
    vaccinations?: PoultryVaccination[];
    feedManagement?: PoultryFeedManagement[];
    waterManagement?: WaterManagement[];
    diseases?: Disease[];
}