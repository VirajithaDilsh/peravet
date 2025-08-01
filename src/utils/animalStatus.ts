import { Animal,Cattle } from "@/types/animals";

// Count total animals by species
export function countBySpecies(animals: Animal[], species: string): number {
    return animals.filter(a => a.species === species).length;
}
// Get cattle counts
export function getCattle(animals: Animal[]) {
    const cattle = animals.filter((a): a is Cattle => a.species === "Cattle");
    return {
        total: cattle.length,
        males: cattle.filter(c => c.gender === "Male").length,
        females: cattle.filter(c => c.gender === "Female").length,
        pregnant: cattle
            .filter(c => c.gender === "Female")
            .filter(c => c.pregnancyStatus === "Pregnant").length,
        milking: cattle
            .filter(c =>
                ["Early", "Mid", "Late"].includes(c.lactationStage ?? "")
            ).length,
        dry: cattle
            .filter(c =>
                ["Dry"].includes(c.lactationStage ?? "")
            ).length,
        heifers: cattle.filter(
            c => (Number(c.ageOfPregnancy) === 0 || c.ageOfPregnancy === undefined) && c.gender === "Female"
        ).length,
        cow: cattle.filter(c => Number(c.ageOfPregnancy) > 0).length,
    };
}

// Generic function to count by species and gender
export function countBySpeciesAndGender(
    animals: Animal[],
    species: string,
    gender: string
): number {
    return animals.filter(a => a.species === species && a.gender === gender).length;
}
