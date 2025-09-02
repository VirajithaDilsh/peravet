import {Animal, Cattle, Buffalo, Pig, Layer} from "@/types/animals";

// Count total animals by species
export function countBySpecies(animals: Animal[], species: string): number {
    return animals.filter(a => a.species === species).length;
}
// Get cattle counts
export function getCattle(animals: Animal[]) {
    //Cattle
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

//// Get buffalo counts
export function getBuffalo(animals: Animal[]) {
    const buffalo = animals.filter((a): a is Buffalo => a.species === "Buffalo");
    return {
        total: buffalo.length,
        males: buffalo.filter(c => c.gender === "Male").length,
        females: buffalo.filter(c => c.gender === "Female").length,
        pregnant: buffalo
            .filter(c => c.gender === "Female")
            .filter(c => c.pregnancyStatus === "Pregnant").length,
        milking: buffalo
            .filter(c =>
                ["Early", "Mid", "Late"].includes(c.lactationStage ?? "")
            ).length,
        dry: buffalo
            .filter(c =>
                ["Dry"].includes(c.lactationStage ?? "")
            ).length,
        heifers: buffalo.filter(
            c => (Number(c.ageOfPregnancy) === 0 || c.ageOfPregnancy === undefined) && c.gender === "Female"
        ).length,
        cow: buffalo.filter(c => Number(c.ageOfPregnancy) > 0).length,
    };
}
//// Get buffalo counts
export function getPig(animals: Animal[]) {
    const pig = animals.filter((a): a is Pig => a.species === "Pig");
    return {
        total: pig.length,
        males: pig.filter(c => c.gender === "Male").length,
        females: pig.filter(c => c.gender === "Female").length,
        pregnant: pig
            .filter(c => c.gender === "Female")
           // .filter(c => c.pregnancyStatus === "Pregnant").length,
    };
}
export function getLayer(animals: Animal[]) {
    const layer = animals.filter((a): a is Layer => a.species === "Layer");
    return {
        total: layer.length,
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
