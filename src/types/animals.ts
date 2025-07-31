
export type Animal =
    | Cattle
    | Buffalo
    | Pig
    | Goat
    | Sheep
    | Layer
    | Broiler;

export interface BaseAnimal {
    species: string;
    tag: string;
    breed: string;
    gender: string;
    weight: number;
    age?: number;// optional
    status: string;
}

export interface Cattle extends BaseAnimal {
    dam: string;
    sire: string;
    birthWeight: number;
    lastCalvingDate?: string;
    lactationStage?: string;
    lastAiDate?: string;
    nextAiDate?: string;
    pregnancyStatus?: string;
    ageOfPregnancy?: number;
    expectedCalvingDate?: string;
    lastHeatDate?: string;
    reproductiveComment?: string;
    vaccinationType: string;
    vaccinationDate: string;
    nextVaccinationDate: string;
    dewormingType: string;
    lastDewormingDate: string;
    nextDewormingDate: string;
    diseaseComment?: string;
    treatmentComment?: string;

}

export interface Buffalo extends BaseAnimal {
    dam: string;
    sire: string;
}

export interface Pig extends BaseAnimal {
    dam: string;
    sire: string;
}
export interface Goat extends BaseAnimal {
    dam: string;
    sire: string;
}
export interface Sheep extends BaseAnimal {
    dam: string;
    sire: string;
}
export interface Layer extends BaseAnimal {
    dam: string;
    sire: string;
}
export interface Broiler extends BaseAnimal {
    dam: string;
    sire: string;
}

