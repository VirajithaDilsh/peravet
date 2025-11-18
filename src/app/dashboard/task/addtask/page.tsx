"use client";

import { useState } from "react";
import { useAnimalContext } from "@/context/AnimalContext";
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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Combobox } from "@headlessui/react";

// ---------------- TYPE GUARDS ----------------
const isCattle = (animal: Animal): animal is Cattle => animal.species === "Cattle";
const isBuffalo = (animal: Animal): animal is Buffalo => animal.species === "Buffalo";
const isGoat = (animal: Animal): animal is Goat => animal.species === "Goat";
const isSheep = (animal: Animal): animal is Sheep => animal.species === "Sheep";
const isPig = (animal: Animal): animal is Pig => animal.species === "Pig";
const isLayerOrBroiler = (animal: Animal): animal is Layer | Broiler =>
    animal.species === "Layer" || animal.species === "Broiler";

// ---------------- COMPONENT ----------------
export default function AddTaskPage() {
    const { animals, updateAnimal } = useAnimalContext();

    const [selectedTag, setSelectedTag] = useState(""); // cannot be null
    const [animalInput, setAnimalInput] = useState(""); // typed input
    const [taskType, setTaskType] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [nextDate, setNextDate] = useState("");
    const [comment, setComment] = useState("");

    // Treatment-specific fields
    const [drug, setDrug] = useState("");
    const [dosage, setDosage] = useState<number | "">("");
    const [route, setRoute] = useState("");
    const [prescribe, setPrescribe] = useState("");

    // Feed fields
    const [feedType, setFeedType] = useState<"Starter" | "Grower" | "Layer Feed">("Starter");
    const [feedIntake, setFeedIntake] = useState("");
    const [feedRequirement, setFeedRequirement] = useState("");

    // Water fields
    const [waterIntake, setWaterIntake] = useState("");
    const [waterRequirement, setWaterRequirement] = useState("");
    const [chlorinating, setChlorinating] = useState("");

    const selectedAnimal = animals.find((a) => a.tag === selectedTag);

    // ------------------ TASK OPTIONS ------------------
    const getTaskOptions = () => {
        if (!selectedAnimal) return [];
        const { species, gender } = selectedAnimal;

        if (isLayerOrBroiler(selectedAnimal)) {
            return ["Treatment", "Vaccination", "Disease", "Feed", "Water"];
        }

        const commonTasks = ["Vaccination", "Deworming", "Disease"];
        if (species === "Cattle" && gender === "Female") {
            return [...commonTasks, "Artificial Insemination", "Expected Calving"];
        }
        return commonTasks;
    };

    // ------------------ ADD TASK HANDLER ------------------
    const handleAddTask = () => {
        if (!selectedTag || !taskType) return alert("Please select an animal and task type");

        updateAnimal(selectedTag, (animal) => {
            const updatedAnimal: Animal = { ...animal };

            switch (taskType) {
                case "Treatment":
                    if (isLayerOrBroiler(updatedAnimal)) {
                        updatedAnimal.treatments = [
                            ...(updatedAnimal.treatments || []),
                            { dueDate, nextDate, comment, drug, dosage: dosage || undefined, route, prescribe } as Treatment,
                        ];
                    } else {
                        alert(`${updatedAnimal.species} cannot have Treatment task`);
                    }
                    break;

                case "Vaccination":
                    if (isLayerOrBroiler(updatedAnimal)) {
                        updatedAnimal.vaccinations = [
                            ...(updatedAnimal.vaccinations || []),
                            { date: dueDate, nextDate, vaccine: comment, route } as PoultryVaccination,
                        ];
                    } else if (isCattle(updatedAnimal) || isBuffalo(updatedAnimal) || isGoat(updatedAnimal) || isSheep(updatedAnimal) || isPig(updatedAnimal)) {
                        updatedAnimal.vaccinations = [
                            ...(updatedAnimal.vaccinations || []),
                            { dueDate, nextDate, type: comment } as Vaccine,
                        ];
                    }
                    break;

                case "Deworming":
                    if (isCattle(updatedAnimal) || isBuffalo(updatedAnimal) || isGoat(updatedAnimal) || isSheep(updatedAnimal) || isPig(updatedAnimal)) {
                        updatedAnimal.deworming = [...(updatedAnimal.deworming || []), { dueDate, nextDate, comment } as Deworming];
                    } else {
                        alert(`${updatedAnimal.species} cannot have Deworming task`);
                    }
                    break;

                case "Disease":
                    if (isCattle(updatedAnimal) || isBuffalo(updatedAnimal) || isGoat(updatedAnimal) || isSheep(updatedAnimal)) {
                        updatedAnimal.diseases = [...(updatedAnimal.diseases || []), { dueDate, nextDate, comment, treatment: drug } as Disease];
                    } else {
                        alert(`${updatedAnimal.species} cannot have Disease task`);
                    }
                    break;

                case "Artificial Insemination":
                case "Expected Calving":
                    if (isCattle(updatedAnimal) || isBuffalo(updatedAnimal)) {
                        updatedAnimal.reproduction = [
                            ...(updatedAnimal.reproduction || []),
                            {
                                lastAiDate: taskType === "Artificial Insemination" ? dueDate : undefined,
                                nextAiDate: taskType === "Artificial Insemination" ? nextDate : undefined,
                                expectedCalvingDate: taskType === "Expected Calving" ? nextDate : undefined,
                                reproductiveComment: comment,
                            } as ReproductionInfo,
                        ];
                    } else {
                        alert(`${updatedAnimal.species} cannot have Reproduction task`);
                    }
                    break;

                case "Feed":
                    if (isLayerOrBroiler(updatedAnimal)) {
                        updatedAnimal.feedManagement = [
                            ...(updatedAnimal.feedManagement || []),
                            { type: feedType, feedIntake, feedRequirement } as PoultryFeedManagement,
                        ];
                    } else {
                        alert(`${updatedAnimal.species} cannot have Feed task`);
                    }
                    break;

                case "Water":
                    if (isLayerOrBroiler(updatedAnimal)) {
                        updatedAnimal.waterManagement = [
                            ...(updatedAnimal.waterManagement || []),
                            { waterIntake, waterRequirement, chlorinating } as WaterManagement,
                        ];
                    } else {
                        alert(`${updatedAnimal.species} cannot have Water task`);
                    }
                    break;

                default:
                    alert("Invalid task type");
            }

            return updatedAnimal;
        });

        alert("Task Added Successfully!");
        resetForm();
    };

    const resetForm = () => {
        setSelectedTag("");
        setAnimalInput("");
        setTaskType("");
        setDueDate("");
        setNextDate("");
        setComment("");
        setDrug("");
        setDosage("");
        setRoute("");
        setPrescribe("");
        setFeedType("Starter");
        setFeedIntake("");
        setFeedRequirement("");
        setWaterIntake("");
        setWaterRequirement("");
        setChlorinating("");
    };

    // ------------------ RENDER TASK FIELDS ------------------
    const renderTaskFields = () => {
        if (!taskType) return null;

        switch (taskType) {
            case "Treatment":
                return (
                    <>
                        <Input placeholder="Drug" value={drug} onChange={(e) => setDrug(e.target.value)} className="rounded-xl h-11" />
                        <Input type="number" placeholder="Dosage" value={dosage} onChange={(e) => setDosage(Number(e.target.value))} className="rounded-xl h-11" />
                        <Input placeholder="Route" value={route} onChange={(e) => setRoute(e.target.value)} className="rounded-xl h-11" />
                        <Input placeholder="Prescribed By" value={prescribe} onChange={(e) => setPrescribe(e.target.value)} className="rounded-xl h-11" />
                        <textarea rows={4} className="w-full rounded-xl border p-3 resize-none" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </>
                );

            case "Feed":
                return (
                    <>
                        <Select onValueChange={(v) => setFeedType(v as "Starter" | "Grower" | "Layer Feed")} value={feedType}>
                            <SelectTrigger className="w-full rounded-xl h-11">
                                <SelectValue placeholder="Select Feed Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Starter">Starter</SelectItem>
                                <SelectItem value="Grower">Grower</SelectItem>
                                <SelectItem value="Layer Feed">Layer Feed</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input placeholder="Feed Intake" value={feedIntake} onChange={(e) => setFeedIntake(e.target.value)} className="rounded-xl h-11" />
                        <Input placeholder="Feed Requirement" value={feedRequirement} onChange={(e) => setFeedRequirement(e.target.value)} className="rounded-xl h-11" />
                    </>
                );

            case "Water":
                return (
                    <>
                        <Input placeholder="Water Intake" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} className="rounded-xl h-11" />
                        <Input placeholder="Water Requirement" value={waterRequirement} onChange={(e) => setWaterRequirement(e.target.value)} className="rounded-xl h-11" />
                        <Input placeholder="Chlorinating" value={chlorinating} onChange={(e) => setChlorinating(e.target.value)} className="rounded-xl h-11" />
                    </>
                );

            case "Disease":
            case "Vaccination":
            case "Deworming":
            case "Artificial Insemination":
            case "Expected Calving":
                return (
                    <textarea rows={4} className="w-full rounded-xl border p-3 resize-none" placeholder="Comment / Details..." value={comment} onChange={(e) => setComment(e.target.value)} />
                );

            default:
                return null;
        }
    };

    // Filtered animals for autocomplete
    const filteredAnimals = animalInput
        ? animals.filter((a) => a.tag.toLowerCase().includes(animalInput.toLowerCase()))
        : animals;

    // ------------------ JSX ------------------
    return (
        <div className="w-full flex justify-center py-10">
            <Card className="w-full max-w-5xl shadow-lg rounded-2xl p-4 bg-white">
                <CardHeader className="border-b pb-4">
                    <CardTitle className="text-2xl font-bold">New Task</CardTitle>
                </CardHeader>

                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            {/* Animal Selector with Autocomplete */}
                            <div className="space-y-2">
                                <label className="font-medium">Associated Animal</label>
                                <Combobox value={selectedTag} onChange={(value) => setSelectedTag(value || "")}>
                                    <div className="relative">
                                        <Combobox.Input
                                            className="w-full rounded-xl h-11 border px-3"
                                            placeholder="Type or select animal"
                                            onChange={(e) => setAnimalInput(e.target.value)}
                                        />
                                        {filteredAnimals.length > 0 && (
                                            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-xl max-h-60 overflow-auto">
                                                {filteredAnimals.map((a) => (
                                                    <Combobox.Option
                                                        key={a.tag}
                                                        value={a.tag}
                                                        className={({ active }) =>
                                                            `cursor-pointer select-none p-2 ${active ? "bg-blue-500 text-white" : ""}`
                                                        }
                                                    >
                                                        {a.tag} ({a.species})
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        )}
                                    </div>
                                </Combobox>
                            </div>

                            {/* Dynamic Task Fields */}
                            <div className="space-y-2">{renderTaskFields()}</div>
                        </div>

                        <div className="space-y-6">
                            {/* Task Type Selector */}
                            <div className="space-y-2">
                                <label className="font-medium">Task Type</label>
                                <Select onValueChange={setTaskType} value={taskType}>
                                    <SelectTrigger className="w-full rounded-xl h-11">
                                        <SelectValue placeholder="Select Task Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedAnimal &&
                                            getTaskOptions().map((task) => (
                                                <SelectItem key={task} value={task}>
                                                    {task}
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <label className="font-medium">
                                    {taskType === "Expected Calving"
                                        ? "Expected Date"
                                        : taskType === "Artificial Insemination"
                                            ? "AI Date"
                                            : "Date"}
                                </label>
                                <Input type="date" className="rounded-xl h-11" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                            </div>

                            {/* Next Date */}
                            <div className="space-y-2">
                                <label className="font-medium">
                                    {taskType === "Artificial Insemination"
                                        ? "Next AI Date"
                                        : taskType === "Expected Calving"
                                            ? "Calving Expected Date"
                                            : "Next Date"}
                                </label>
                                <Input type="date" className="rounded-xl h-11" value={nextDate} onChange={(e) => setNextDate(e.target.value)} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-10 border-t pt-5">
                        <Button variant="outline" className="rounded-xl px-6" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button className="rounded-xl px-8 bg-green-600 hover:bg-green-700 text-white" onClick={handleAddTask}>
                            Create Task
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
