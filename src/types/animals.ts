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
    type?:string;
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
    type?:string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;
}
export interface Deworming {
    type?:string;
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

    // Pig-specific
    date?: string;
    condition?: string;
    medication?: string;
    dosage?: string;
    withdrawalDate?: string;
}


// ------------------- Layer -------------------
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
//for layers and broilers
export interface WaterManagement {
    waterRequirement?: string;
    waterIntake: string;
    chlorinating?: string;
}
export interface ReproductionInfo {
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
    diseases?:Disease[];
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
    diseases?:Disease[];
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
    diseases?:Disease[];
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
    diseases?:Disease[];
    reproduction?: ReproductionInfo[];
    vaccinations?: Vaccine[];
    deworming?: Deworming[];
}

// ------------------- Layer -------------------
export interface Layer extends BaseAnimal {
    initialFlockSize?: number;
    currentFlockSize?: number;
    mortalityRate: number;
    vaccinations?: PoultryVaccination[]; // multiple vaccinations
    feedManagement?: PoultryFeedManagement[]; // multiple feed entries
    waterManagement?: WaterManagement[]; // multiple water entries
}

// ------------------- Broiler -------------------
export interface Broiler extends BaseAnimal {
    initialFlockSize?: number;
    currentFlockSize?: number;
    mortalityRate: number;
    vaccinations?: PoultryVaccination[]; // multiple vaccinations
    feedManagement?: PoultryFeedManagement[]; // multiple feed entries
    waterManagement?: WaterManagement[]; // multiple water entries
}
