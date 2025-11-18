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
            return Array.isArray(repro) && repro.some(r => r.pregnancyStatus === "Pregnant");
        }
        // Pig pregnancy handled via status
        if (a.species === "Pig") {
            return (a as Pig).status?.toLowerCase() === "pregnant";
        }
        // Layer & Broiler cannot be pregnant
        return false;
    }).length;
}

// ======================================================
//  SPECIES-SPECIFIC COUNTS
// ======================================================

function getReproductionCounts<T extends Cattle | Buffalo | Goat | Sheep>(animals: T[]) {
    return {
        total: animals.length,
        males: animals.filter(a => a.gender === "Male").length,
        females: animals.filter(a => a.gender === "Female").length,
        pregnant: animals.filter(a => a.reproduction?.some(r => r.pregnancyStatus === "Pregnant")).length,
        milking: animals.filter(a => a.reproduction?.some(r => ["Early", "Mid", "Late"].includes(r.lactationStage ?? ""))).length,
        dry: animals.filter(a => a.reproduction?.some(r => r.lactationStage === "Dry")).length,
        heifers: animals.filter(a => a.gender === "Female" && a.reproduction?.every(r => !r.ageOfPregnancy || r.ageOfPregnancy === 0)).length,
        cows: animals.filter(a => a.reproduction?.some(r => (r.ageOfPregnancy ?? 0) > 0)).length,
    };
}

export function getCattle(animals: Animal[]) {
    const cattle = animals.filter((a): a is Cattle => a.species === "Cattle");
    return getReproductionCounts(cattle);
}

export function getBuffalo(animals: Animal[]) {
    const buffalo = animals.filter((a): a is Buffalo => a.species === "Buffalo");
    return getReproductionCounts(buffalo);
}

export function getPig(animals: Animal[]) {
    const pigs = animals.filter((a): a is Pig => a.species === "Pig");
    return {
        total: pigs.length,
        males: pigs.filter(p => p.gender === "Male").length,
        females: pigs.filter(p => p.gender === "Female").length,
        pregnant: pigs.filter(p => p.status?.toLowerCase() === "pregnant").length
    };
}

export function getGoat(animals: Animal[]) {
    const goats = animals.filter((a): a is Goat => a.species === "Goat");
    return {
        total: goats.length,
        males: goats.filter(g => g.gender === "Male").length,
        females: goats.filter(g => g.gender === "Female").length,
        pregnant: goats.filter(g => g.reproduction?.some(r => r.pregnancyStatus === "Pregnant")).length
    };
}

export function getSheep(animals: Animal[]) {
    const sheep = animals.filter((a): a is Sheep => a.species === "Sheep");
    return {
        total: sheep.length,
        males: sheep.filter(s => s.gender === "Male").length,
        females: sheep.filter(s => s.gender === "Female").length,
        pregnant: sheep.filter(s => s.reproduction?.some(r => r.pregnancyStatus === "Pregnant")).length
    };
}

export function getLayer(animals: Animal[]) {
    const layers = animals.filter((a): a is Layer => a.species === "Layer");
    return {
        total: layers.length,
        flockSize: layers.reduce((sum, l) => sum + (l.currentFlockSize ?? 0), 0)
    };
}

export function getBroiler(animals: Animal[]) {
    const broilers = animals.filter((a): a is Broiler => a.species === "Broiler");
    return {
        total: broilers.length,
        flockSize: broilers.reduce((sum, b) => sum + (b.currentFlockSize ?? 0), 0)
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
        broiler: getBroiler(animals),
    };
}
