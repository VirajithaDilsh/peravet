import { Animal } from "./animals";

export interface ProductionRecord {
    id: string;
    date: string;
    animalId: string; // tag from animal
    species: Animal["species"];
    quantity: number;
    unit: string;
    notes?: string;
}