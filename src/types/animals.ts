// ------------------- Union Type -------------------
export type Animal =
    | Cattle
    | Buffalo
    | Pig
    | Goat
    | Sheep
    | Layer
    | Broiler;

// ------------------- Treatment -------------------
export interface Treatment {
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

export interface Vaccine {
    type?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;
}

export interface Deworming {
    type?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;
}

export interface Disease {
    type?: string;
    treatment?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;
}

// ------------------- Poultry -------------------
export interface PoultryVaccination {
    date?: string;
    nextDate?: string;
    vaccine?: string;
    route?: string;
}

export interface PoultryFeedManagement {
    type: "Starter" | "Grower" | "Layer Feed";
    feedRequirement?: string;
    feedIntake: string;
}

export interface WaterManagement {
    waterRequirement?: string;
    waterIntake: string;
    chlorinating?: string;
}

// ------------------- Reproduction -------------------
export interface ReproductionInfo {
    lastCalvingDate?: string;
    lactationStage?: string;
    lastAiDate?: string;
    nextAiDate?: string;
    pregnancyStatus?: string;
    ageOfPregnancy?: number;
    expectedCalvingDate?: string;
    lastHeatDate?: string;
    reproductiveComment?: string;
}

// ------------------- Base Animal -------------------
export interface BaseAnimal {
    species: string;
    tag: string;       // Ear tag OR flock ID
    breed: string;     // Breed / strain
    gender: string;
    weight?: number;
    age?: number;      // Age OR flock age
    status: string;

    // Common fields
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
    reproduction?: ReproductionInfo |null;
}

// ------------------- Buffalo -------------------
export interface Buffalo extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;

    reproduction?: ReproductionInfo |null;
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
}

// ------------------- Goat -------------------
export interface Goat extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;

    // Inline reproduction fields (legacy)
    reproduction?: ReproductionInfo |null;
    treatmentComment?: string;

    diseases?: Disease[];
    vaccinations?: Vaccine[];
    deworming?: Deworming[];
}

// ------------------- Sheep -------------------
export interface Sheep extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;
    diseases?: Disease[];
    vaccinations?: Vaccine[];
    reproduction?: ReproductionInfo |null;
    deworming?: Deworming[];
}

// ------------------- Poultry: Layer -------------------
export interface Layer extends BaseAnimal {
    initialFlockSize?: number;
    currentFlockSize?: number;
    mortalityRate: number;

    treatments?: Treatment[];
    vaccinations?: PoultryVaccination[];
    feedManagement?: PoultryFeedManagement[];
    waterManagement?: WaterManagement[];
}

// ------------------- Poultry: Broiler -------------------
export interface Broiler extends BaseAnimal {
    initialFlockSize?: number;
    currentFlockSize?: number;
    mortalityRate: number;

    treatments?: Treatment[];
    vaccinations?: PoultryVaccination[];
    feedManagement?: PoultryFeedManagement[];
    waterManagement?: WaterManagement[];
}
