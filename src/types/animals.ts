
export type Animal =
    | Cattle
    | Buffalo
    | Pig
    | Goat
    | Sheep
    | Layer
    | Broiler;

export interface Treatment {
    type: "Vaccination" | "Deworming" | "Other" | "";
    treatment?:string;
    dueDate?: string;
    nextDate?: string;
    comment?: string;

    //layer
    drug?: string;
    dosage?:number;
    root?:string;
    prescribe?:string;

}
export interface poultryVaccinations {
    date?: string;
    vaccinations?:string[];
    route?: string;


}

export interface poultryFeedManagement{
    type:"Starter"|"Grower"|"Layer Feed"
    feedRequirement?:string;
    feedIntake:string;
}
export interface poultryWaterManagement{
    waterRequirement?:string;
    waterIntake:string;
    choloring?:string;
}

export interface BaseAnimal {
    species: string;
    tag: string;// flock id(birds)
    breed: string; //strains(birds)
    gender: string;
    weight: number;
    age?: number;// age of flock(birds)
    status: string;
    treatments?: Treatment[];
    diseaseComment?: string;
}

export interface Cattle extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
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
    diseaseComment?: string;

}

export interface Buffalo extends BaseAnimal {
    dam: string;
    sire: string;
    birthDate: string;
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

    treatmentComment?: string;
}

export interface Pig extends BaseAnimal {
    // Birth info
    dam: string; // mother pig ID
    sire: string; // father boar ID
    birthWeight: number; // in kg
    litterSize?: number; // number of piglets in litter
    birthDate: string;

    // Reproductive info (for sows)
    lastFarrowingDate?: string;
    nextExpectedFarrowingDate?: string;
    pregnancyStatus?: string;
    parity?: number; // number of litters the sow has had
    weaningDate?: string;

    // Growth & weight info
    currentWeight?: number; // kg
    weaningWeight?: number;

    // Health info
    vaccinationType?: string;
    vaccinationDate?: string;
    nextVaccinationDate?: string;
    dewormingType?: string;
    lastDewormingDate?: string;
    nextDewormingDate?: string;
    diseaseComment?: string;
    treatmentComment?: string;

    // Optional notes
    generalComment?: string;
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
   initialFlockSize?:number;
   currentFlockSize?:number;
   mortilityRate:number;
   treatments?: Treatment[];
   vaccinations?:poultryVaccinations;
   feedManagement?: poultryFeedManagement;
   waterManagement?: poultryWaterManagement;

}
export interface Broiler extends BaseAnimal {
    initialFlockSize:number;
    currentFlockSize:number;
    mortilityRate:number;
    treatments?: Treatment[];
}

