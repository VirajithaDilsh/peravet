import { Animal } from "@/types/animals"; // adjust if your path differs
import { Task, TaskType, TaskSourceField } from "@/types/Task";
import { isValidISODate } from "@/utils/date";

function addTask(
    tasks: Task[],
    animal: Animal,
    type: TaskType,
    sourceField: TaskSourceField,
    dueDate: string
) {
    const key = `${animal.species}:${animal.tag}:${type}:${dueDate}`;
    tasks.push({
        key,
        animalTag: animal.tag,
        species: animal.species,
        type,
        sourceField,
        dueDate,
    });
}

export function buildTasksFromAnimals(animals: Animal[]): Task[] {
    const tasks: Task[] = [];

    animals.forEach((a) => {
        // Vaccination
        if ("nextVaccinationDate" in a && isValidISODate(a.nextVaccinationDate)) {
            addTask(tasks, a, "Vaccination", "nextVaccinationDate", a.nextVaccinationDate);
        }

        // Deworming
        if ("nextDewormingDate" in a && isValidISODate(a.nextDewormingDate)) {
            addTask(tasks, a, "Deworming", "nextDewormingDate", a.nextDewormingDate);
        }

        // AI
        if ("nextAiDate" in a && isValidISODate(a.nextAiDate)) {
            addTask(tasks, a, "Artificial Insemination", "nextAiDate", a.nextAiDate);
        }

        // Expected Calving
        if ("expectedCalvingDate" in a && isValidISODate(a.expectedCalvingDate)) {
            addTask(tasks, a, "Expected Calving", "expectedCalvingDate", a.expectedCalvingDate);
        }
    });

    // Sort ascending by dueDate
    return tasks.sort((x, y) => new Date(x.dueDate).getTime() - new Date(y.dueDate).getTime());
}