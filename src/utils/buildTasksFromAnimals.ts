import {
    Animal,
    Cattle,
    Buffalo,
    Goat,
    Sheep,
    Pig,
    Layer,
    Broiler,
    Treatment,
    Vaccine,
    Deworming,
    Disease,
    ReproductionInfo,
    PoultryVaccination,
    PoultryFeedManagement,
    WaterManagement,
} from "@/types/animals";
import { Task } from "@/types/Task";

// ---------------- Type Guards ----------------
function hasDeworming(a: Animal): a is Cattle | Buffalo | Goat | Sheep | Pig {
    return ["Cattle", "Buffalo", "Goat", "Sheep", "Pig"].includes(a.species);
}

function hasDiseases(a: Animal): a is Cattle | Buffalo | Goat | Sheep {
    return ["Cattle", "Buffalo", "Goat", "Sheep"].includes(a.species);
}

function hasReproduction(a: Animal): a is Cattle | Buffalo | Goat | Sheep {
    return ["Cattle", "Buffalo", "Goat", "Sheep"].includes(a.species);
}

function isPoultry(a: Animal): a is Layer | Broiler {
    return ["Layer", "Broiler"].includes(a.species);
}

// ---------------- Build Tasks ----------------
export function buildTasksFromAnimals(animals: Animal[]): Task[] {
    const tasks: Task[] = [];

    animals.forEach((a) => {
        // ---------------- Treatments ----------------
        a.treatments?.forEach((t: Treatment) => {
            if (t.dueDate || t.nextDate) {
                tasks.push({
                    key: `${a.tag}-Treatment-${t.type}-${t.nextDate || t.dueDate}`,
                    type: "Treatment",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: t.dueDate || "",
                    nextDate: t.nextDate || "",
                    comment: t.comment,
                });
            }
        });

        // ---------------- Vaccinations ----------------
        if (hasDeworming(a)) {
            (a.vaccinations as Vaccine[] | undefined)?.forEach((v) => {
                if (v.dueDate || v.nextDate) {
                    tasks.push({
                        key: `${a.tag}-Vaccine-${v.dueDate}`,
                        type: "Vaccination",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: v.dueDate || "",
                        nextDate: v.nextDate || "",
                        comment: v.comment,
                    });
                }
            });
        }

        // ---------------- Poultry Vaccinations ----------------
        if (isPoultry(a)) {
            (a.vaccinations as PoultryVaccination[] | undefined)?.forEach((v, idx) => {
                if (v.date || v.nextDate) {
                    tasks.push({
                        key: `${a.tag}-PoultryVaccination-${idx}-${v.date}`,
                        type: "Vaccination",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: v.date || "",
                        nextDate: v.nextDate || "",
                        comment: undefined,
                    });
                }
            });

            // ---------------- Feed Management ----------------
            (a.feedManagement as PoultryFeedManagement[] | undefined)?.forEach((f, idx) => {
                tasks.push({
                    key: `${a.tag}-Feed-${idx}-${f.type}`,
                    type: "Feed",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: "",
                    nextDate: "",
                    comment: `Feed Type: ${f.type}, Requirement: ${f.feedRequirement}, Intake: ${f.feedIntake}`,
                });
            });

            // ---------------- Water Management ----------------
            (a.waterManagement as WaterManagement[] | undefined)?.forEach((w, idx) => {
                tasks.push({
                    key: `${a.tag}-Water-${idx}`,
                    type: "Water",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: "",
                    nextDate: "",
                    comment: `Requirement: ${w.waterRequirement}, Intake: ${w.waterIntake}, Chlorinating: ${w.chlorinating}`,
                });
            });
        }

        // ---------------- Deworming ----------------
        if (hasDeworming(a)) {
            a.deworming?.forEach((d: Deworming) => {
                tasks.push({
                    key: `${a.tag}-Deworming-${d.nextDate || d.dueDate}`,
                    type: "Deworming",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: d.dueDate || "",
                    nextDate: d.nextDate || "",
                    comment: d.comment,
                });
            });
        }

        // ---------------- Diseases ----------------
        if (hasDiseases(a) && a.diseases) {
            a.diseases.forEach((d: Disease) => {
                tasks.push({
                    key: `${a.tag}-Disease-${d.nextDate || d.dueDate}`,
                    type: "Disease",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: d.dueDate || "",
                    nextDate: d.nextDate || "",
                    comment: d.comment,
                });
            });
        }

        // ---------------- Reproduction ----------------
        if (hasReproduction(a) && Array.isArray(a.reproduction)) {
            a.reproduction.forEach((r: ReproductionInfo) => {
                if (r.nextAiDate) {
                    tasks.push({
                        key: `${a.tag}-Artificial Insemination-${r.nextAiDate}`,
                        type: "Artificial Insemination",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: r.nextAiDate,
                        nextDate: r.nextAiDate,
                    });
                }
                if (r.expectedCalvingDate) {
                    tasks.push({
                        key: `${a.tag}-Expected Calving-${r.expectedCalvingDate}`,
                        type: "Expected Calving",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: r.expectedCalvingDate,
                        nextDate: r.expectedCalvingDate,
                    });
                }
            });
        }
    });

    return tasks;
}
