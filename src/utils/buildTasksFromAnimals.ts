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
        a.treatments?.forEach((t: Treatment, idx: number) => {
            if (t.dueDate || t.nextDate) {
                tasks.push({
                    key: `${a.tag}-Treatment-${idx}-${t.nextDate || t.dueDate || "no-date"}`,
                    type: "Treatment",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: t.dueDate || "",
                    nextDate: t.nextDate || "",
                    comment: t.comment,
                    assignType: t.assignType,
                    assignedUsers: t.assignedUsers || [],
                });
            }
        });

        // ---------------- Vaccinations ----------------
        if (hasDeworming(a)) {
            (a.vaccinations as Vaccine[] | undefined)?.forEach((v, idx: number) => {
                if (v.dueDate || v.nextDate) {
                    tasks.push({
                        key: `${a.tag}-Vaccine-${idx}-${v.dueDate || v.nextDate || "no-date"}`,
                        type: "Vaccination",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: v.dueDate || "",
                        nextDate: v.nextDate || "",
                        comment: v.comment,
                        assignType: v.assignType,
                        assignedUsers: v.assignedUsers || [],
                    });
                }
            });
        }

        // ---------------- Poultry ----------------
        if (isPoultry(a)) {
            (a.vaccinations as PoultryVaccination[] | undefined)?.forEach((v, idx: number) => {
                if (v.date || v.nextDate) {
                    tasks.push({
                        key: `${a.tag}-PoultryVaccination-${idx}-${v.date || v.nextDate || "no-date"}`,
                        type: "Vaccination",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: v.date || "",
                        nextDate: v.nextDate || "",
                        comment: undefined,
                        assignType: v.assignType,
                        assignedUsers: v.assignedUsers || [],
                    });
                }
            });

            (a.feedManagement as PoultryFeedManagement[] | undefined)?.forEach((f, idx: number) => {
                tasks.push({
                    key: `${a.tag}-Feed-${idx}-${f.type || "feed"}`,
                    type: "Feed",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: "",
                    nextDate: "",
                    comment: `Feed: ${f.type}`,
                    assignType: f.assignType,
                    assignedUsers: f.assignedUsers || [],
                });
            });

            (a.waterManagement as WaterManagement[] | undefined)?.forEach((w, idx: number) => {
                tasks.push({
                    key: `${a.tag}-Water-${idx}`,
                    type: "Water",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: "",
                    nextDate: "",
                    comment: `Water`,
                    assignType: w.assignType,
                    assignedUsers: w.assignedUsers || [],
                });
            });
        }

        // ---------------- Deworming ----------------
        if (hasDeworming(a)) {
            a.deworming?.forEach((d: Deworming, idx: number) => {
                tasks.push({
                    key: `${a.tag}-Deworming-${idx}-${d.nextDate || d.dueDate || "no-date"}`,
                    type: "Deworming",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: d.dueDate || "",
                    nextDate: d.nextDate || "",
                    comment: d.comment,
                    assignType: d.assignType,
                    assignedUsers: d.assignedUsers || [],
                });
            });
        }

        // ---------------- Diseases ----------------
        if (hasDiseases(a) && a.diseases) {
            a.diseases.forEach((d: Disease, idx: number) => {
                tasks.push({
                    key: `${a.tag}-Disease-${idx}-${d.nextDate || d.dueDate || "no-date"}`,
                    type: "Disease",
                    species: a.species,
                    animalTag: a.tag,
                    dueDate: d.dueDate || "",
                    nextDate: d.nextDate || "",
                    comment: d.comment,
                    assignType: d.assignType,
                    assignedUsers: d.assignedUsers || [],
                });
            });
        }

        // ---------------- Reproduction ----------------
        if (hasReproduction(a) && Array.isArray(a.reproduction)) {
            a.reproduction.forEach((r: ReproductionInfo, idx: number) => {
                if (r.nextAiDate) {
                    tasks.push({
                        key: `${a.tag}-ArtificialInsemination-${idx}-${r.nextAiDate}`,
                        type: "Artificial Insemination",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: r.nextAiDate,
                        nextDate: r.nextAiDate,
                        assignType: r.assignType,
                        assignedUsers: r.assignedUsers || [],
                    });
                }

                if (r.expectedCalvingDate) {
                    tasks.push({
                        key: `${a.tag}-ExpectedCalving-${idx}-${r.expectedCalvingDate}`,
                        type: "Expected Calving",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: r.expectedCalvingDate,
                        nextDate: r.expectedCalvingDate,
                        assignType: r.assignType,
                        assignedUsers: r.assignedUsers || [],
                    });
                }
            });
        }
    });

    return tasks;
}