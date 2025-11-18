import {
    Animal,
    Cattle,
    Buffalo,
    Pig,
    Goat,
    Sheep,
    Layer,
    Broiler,
    ReproductionInfo,
} from "@/types/animals";

// ======================================================
//  GENERIC COUNTS
// ======================================================
export function countBySpecies(animals: Animal[], species: string): number {
    return animals.filter(a => a.species === species).length;
}

export function countBySpeciesAndGender(
    animals: Animal[],
    species: string,
    gender: string
): number {
    return animals.filter(a => a.species === species && a.gender === gender).length;
}

// ======================================================
//  TOTAL ANIMALS
// ======================================================
export function getTotalAnimals(animals: Animal[]): number {
    return animals.length;
}

// ======================================================
//  TOTAL PREGNANT ANIMALS
// ======================================================
export function getTotalPregnantAnimals(animals: Animal[]): number {
    return animals.filter(a => {
        // Species with reproduction array
        if (["Cattle", "Buffalo", "Goat", "Sheep"].includes(a.species)) {
            const repro = (a as Cattle | Buffalo | Goat | Sheep).reproduction;
            return Array.isArray(repro) && repro.some((r: ReproductionInfo) => r.pregnancyStatus === "Pregnant");
        }

        // Pig pregnancy handled via status
        if (a.species === "Pig") {
            return (a as Pig).status?.toLowerCase() === "pregnant";
        }

        // Layer & Broiler have no pregnancy
        return false;
    }).length;
}

// ======================================================
//  SPECIES-SPECIFIC COUNTS
// ======================================================
export function getCattle(animals: Animal[]) {
    const cattle = animals.filter((a): a is Cattle => a.species === "Cattle");

    return {
        total: cattle.length,
        males: cattle.filter(c => c.gender === "Male").length,
        females: cattle.filter(c => c.gender === "Female").length,
        pregnant: cattle.filter(c => c.reproduction?.some((r: ReproductionInfo) => r.pregnancyStatus === "Pregnant")).length,
        milking: cattle.filter(c => c.reproduction?.some((r: ReproductionInfo) => ["Early", "Mid", "Late"].includes(r.lactationStage ?? ""))).length,
        dry: cattle.filter(c => c.reproduction?.some((r: ReproductionInfo) => r.lactationStage === "Dry")).length,
        heifers: cattle.filter(c => c.gender === "Female" && c.reproduction?.every((r: ReproductionInfo) => !r.ageOfPregnancy || r.ageOfPregnancy === 0)).length,
        cows: cattle.filter(c => c.reproduction?.some((r: ReproductionInfo) => (r.ageOfPregnancy ?? 0) > 0)).length
    };
}

export function getBuffalo(animals: Animal[]) {
    const buffalo = animals.filter((a): a is Buffalo => a.species === "Buffalo");

    return {
        total: buffalo.length,
        males: buffalo.filter(c => c.gender === "Male").length,
        females: buffalo.filter(c => c.gender === "Female").length,
        pregnant: buffalo.filter(c => c.reproduction?.some((r: ReproductionInfo) => r.pregnancyStatus === "Pregnant")).length,
        milking: buffalo.filter(c => c.reproduction?.some((r: ReproductionInfo) => ["Early", "Mid", "Late"].includes(r.lactationStage ?? ""))).length,
        dry: buffalo.filter(c => c.reproduction?.some((r: ReproductionInfo) => r.lactationStage === "Dry")).length,
        heifers: buffalo.filter(c => c.gender === "Female" && c.reproduction?.every((r: ReproductionInfo) => !r.ageOfPregnancy || r.ageOfPregnancy === 0)).length,
        cows: buffalo.filter(c => c.reproduction?.some((r: ReproductionInfo) => (r.ageOfPregnancy ?? 0) > 0)).length
    };
}

export function getPig(animals: Animal[]) {
    const pigs = animals.filter((a): a is Pig => a.species === "Pig");

    return {
        total: pigs.length,
        males: pigs.filter(c => c.gender === "Male").length,
        females: pigs.filter(c => c.gender === "Female").length,
        pregnant: pigs.filter(c => c.status?.toLowerCase() === "pregnant").length
    };
}

export function getGoat(animals: Animal[]) {
    const goats = animals.filter((a): a is Goat => a.species === "Goat");

    return {
        total: goats.length,
        males: goats.filter(c => c.gender === "Male").length,
        females: goats.filter(c => c.gender === "Female").length,
        pregnant: goats.filter(c => c.reproduction?.some((r: ReproductionInfo) => r.pregnancyStatus === "Pregnant")).length
    };
}

export function getSheep(animals: Animal[]) {
    const sheep = animals.filter((a): a is Sheep => a.species === "Sheep");

    return {
        total: sheep.length,
        males: sheep.filter(c => c.gender === "Male").length,
        females: sheep.filter(c => c.gender === "Female").length,
        pregnant: sheep.filter(c => c.reproduction?.some((r: ReproductionInfo) => r.pregnancyStatus === "Pregnant")).length
    };
}

export function getLayer(animals: Animal[]) {
    const layer = animals.filter((a): a is Layer => a.species === "Layer");

    return {
        total: layer.length,
        flockSize: layer.reduce((sum, b) => sum + (b.currentFlockSize ?? 0), 0)
    };
}

export function getBroiler(animals: Animal[]) {
    const broiler = animals.filter((a): a is Broiler => a.species === "Broiler");

    return {
        total: broiler.length,
        flockSize: broiler.reduce((sum, b) => sum + (b.currentFlockSize ?? 0), 0)
    };
}

// ======================================================
//  FULL DASHBOARD SUMMARY
// ======================================================
export function getAnimalSummary(animals: Animal[]) {
    return {
        totalAnimals: getTotalAnimals(animals),
        totalPregnantAnimals: getTotalPregnantAnimals(animals),
        cattle: getCattle(animals),
        buffalo: getBuffalo(animals),
        pigs: getPig(animals),
        goats: getGoat(animals),
        sheep: getSheep(animals),
        layer: getLayer(animals),
        broiler: getBroiler(animals)
    };
}
