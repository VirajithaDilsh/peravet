import { Treatment } from "@/types/animals";
import { PoultryFeedManagement, PoultryWaterManagement, PoultryVaccinationSchedule, PoultryDewormingSchedule, CattleHealthRecord } from "@/types/animalHealth";

export type AnimalForm = Partial<{
    // BaseAnimal
    species: string;
    tag: string;
    breed: string;
    gender: string;
    weight: number;
    age: number;
    status: string;
    treatments: Treatment[];
    diseaseComment: string;

    // Cattle & Buffalo
    dam: string;
    sire: string;
    birthDate: string;
    birthWeight: number;
    lastCalvingDate: string;
    lactationStage: string;
    lastAiDate: string;
    nextAiDate: string;
    pregnancyStatus: string;
    ageOfPregnancy: number;
    expectedCalvingDate: string;
    lastHeatDate: string;
    reproductiveComment: string;
    treatmentComment: string;

    // Pig
    litterSize: number;
    lastFarrowingDate: string;
    nextExpectedFarrowingDate: string;
    parity: number;
    weaningDate: string;
    currentWeight: number;
    weaningWeight: number;
    vaccinationType: string;
    vaccinationDate: string;
    nextVaccinationDate: string;
    dewormingType: string;
    lastDewormingDate: string;
    nextDewormingDate: string;
    generalComment: string;

    // Layer & Broiler
    initialFlockSize: number;
    currentFlockSize: number;
    mortilityRate: number;

    //PoultryHealth
    vaccinationSchedule: PoultryVaccinationSchedule[];
    dewormingSchedule: PoultryDewormingSchedule[];
    feedManagement: PoultryFeedManagement[];
    waterManagement: PoultryWaterManagement[];

    // Cattle health
    cattleHealth: CattleHealthRecord;
}>;
