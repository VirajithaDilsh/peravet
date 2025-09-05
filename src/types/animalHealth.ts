// ==========================
// Shared Health Structures
// ==========================

export interface Treatment {
    type: "Vaccination" | "Deworming" | "Other" | "";
    treatment?: string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;

    // poultry-specific
    drug?: string;
    dosage?: number;
    route?: string;
    prescribe?: string;
}

// ==========================
// Poultry Health
// ==========================

export interface PoultryVaccinationSchedule {
    date?: string;
    nextDate?: string;
    vaccinations?: string[];
    route?: string;
}

export interface PoultryDewormingSchedule {
    date?: string;
    drug?: string;
    dosage?: string; // e.g., "10 mg/bird"
    route?: string;  // Oral, water, feed
    nextDueDate?: string;
    comment?: string;
}

export interface PoultryFeedManagement {
    type: "Starter" | "Grower" | "Layer Feed";
    feedRequirement?: string; // recommended intake
    feedIntake: string;       // actual intake
}

export interface PoultryWaterManagement {
    waterRequirement?: string;
    waterIntake: string;
    chlorination?: string; // yes/no or ppm value
}

// Poultry Health Record
export interface PoultryHealthRecord {
    flockId: string; // tag from BaseAnimal
    vaccinationSchedule?: PoultryVaccinationSchedule[];
    dewormingSchedule?: PoultryDewormingSchedule[];
    feedManagement?: PoultryFeedManagement[];
    waterManagement?: PoultryWaterManagement[];
    diseaseComment?: string;
}

// ==========================
// Cattle & Buffalo Health
// ==========================

export interface CattleVaccination {
    date?: string;
    vaccine: string;
    route?: string;
    nextDueDate?: string;
}

export interface CattleDeworming {
    date?: string;
    drug: string;
    dosage?: string;
    route?: string;
    nextDueDate?: string;
}

export interface CattleReproductiveHealth {
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

export interface CattleHealthRecord {
    tag: string; // from BaseAnimal
    vaccinations?: CattleVaccination[];
    deworming?: CattleDeworming[];
    reproductive?: CattleReproductiveHealth;
    treatments?: Treatment[];
    diseaseComment?: string;
}
