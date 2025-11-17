import { Animal, Treatment, Vaccine, Deworming, Disease, PoultryVaccination } from "@/types/animals";
import { Task } from "@/types/Task";

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
                    nextDate: t.nextDate,
                    comment: t.comment,
                });
            }
        });

        // ---------------- Vaccines (Cattle/Buffalo/Goat/Sheep) ----------------
        if ("vaccinations" in a && Array.isArray(a.vaccinations)) {
            if (a.species === "Cattle" || a.species === "Buffalo" || a.species === "Goat" || a.species === "Sheep") {
                (a.vaccinations as Vaccine[]).forEach((v) => {
                    if (v.dueDate || v.nextDate) {
                        tasks.push({
                            key: `${a.tag}-Vaccine-${v.dueDate}`,
                            type: "Vaccination",
                            species: a.species,
                            animalTag: a.tag,
                            dueDate: v.dueDate || "",
                            nextDate: v.nextDate,
                            comment: v.comment,
                        });
                    }
                });
            }
        }

        // ---------------- Poultry Vaccinations (Layer/Broiler) ----------------
        if ("vaccinations" in a && Array.isArray(a.vaccinations)) {
            if (a.species === "Layer" || a.species === "Broiler") {
                (a.vaccinations as PoultryVaccination[]).forEach((v) => {
                    if (v.date || v.nextDate) {
                        tasks.push({
                            key: `${a.tag}-PoultryVaccination-${v.date}`,
                            type: "Vaccination",
                            species: a.species,
                            animalTag: a.tag,
                            dueDate: v.date || "",
                            nextDate: v.nextDate,
                            comment: undefined,
                        });
                    }
                });
            }
        }

        // ---------------- Deworming ----------------
        if ("deworming" in a && Array.isArray(a.deworming)) {
            (a.deworming as Deworming[]).forEach((d: Deworming) => {
                if (d.dueDate || d.nextDate) {
                    tasks.push({
                        key: `${a.tag}-Deworming-${d.nextDate || d.dueDate}`,
                        type: "Deworming",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: d.dueDate || "",
                        nextDate: d.nextDate,
                        comment: d.comment,
                    });
                }
            });
        }


        // ---------------- Diseases ----------------
        if ("diseases" in a && Array.isArray(a.diseases)) {
            (a.diseases as Disease[]).forEach((d) => {
                if (d.dueDate || d.nextDate) {
                    tasks.push({
                        key: `${a.tag}-Disease-${d.nextDate || d.dueDate}`,
                        type: "Disease",
                        species: a.species,
                        animalTag: a.tag,
                        dueDate: d.dueDate || "",
                        nextDate: d.nextDate,
                        comment: d.comment,
                    });
                }
            });
        }


        // ---------------- Reproduction ----------------
        if ("nextAiDate" in a && a.nextAiDate) {
            tasks.push({
                key: `${a.tag}-Artificial Insemination-${a.nextAiDate}`,
                type: "Artificial Insemination",
                species: a.species,
                animalTag: a.tag,
                dueDate: a.nextAiDate,
                nextDate: a.nextAiDate,
            });
        }

        if ("expectedCalvingDate" in a && a.expectedCalvingDate) {
            tasks.push({
                key: `${a.tag}-Expected Calving-${a.expectedCalvingDate}`,
                type: "Expected Calving",
                species: a.species,
                animalTag: a.tag,
                dueDate: a.expectedCalvingDate,
                nextDate: a.expectedCalvingDate,
            });
        }
    });

    return tasks;
}
