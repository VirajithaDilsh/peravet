"use client";
import { useParams, useRouter } from "next/navigation";
import { useAnimalContext } from "@/context/AnimalContext";
import keyDisplayNames from "@/constants/animalFieldLabels";
import {
    Animal,
    Cattle,
    Buffalo,
    Pig,
    Goat,
    Sheep,
    Layer,
    Broiler,
    Treatment,
} from "@/types/animals";
import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import PoultryHealthTables from "@/components/tables/PoultryHealthTables";
import BroilerHealthTables from "@/components/tables/BroilerHealthTables";


type AnimalKeys = keyof (Cattle & Buffalo & Pig & Goat & Sheep & Layer & Broiler);
type TreatmentField = keyof Treatment;

// Type guards
function isCattle(animal: Animal): animal is Cattle {
    return animal.species === "Cattle";
}
function isBuffalo(animal: Animal): animal is Buffalo {
    return animal.species === "Buffalo";
}
function isLayer(animal: Animal): animal is Layer {
    return animal.species === "Layer";
}
function isBroiler(animal: Animal): animal is Broiler {
    return animal.species === "Broiler";
}

const pregnancyOptions = ["Pregnant", "Not Pregnant", "To be Check", "Infertile"];
const lactationOptions = ["Early", "Mid", "Late", "Dry"];

export default function AnimalDetailPage() {
    const { tag } = useParams();
    const { animals, deleteAnimal, editAnimal } = useAnimalContext();
    const router = useRouter();

    const animal = animals.find((a) => a.tag === tag);

    const [reproValues, setReproValues] = useState<Partial<Cattle>>({});
    const [editingRepro, setEditingRepro] = useState<Partial<Record<keyof Cattle, boolean>>>({});
    const [editingDisease, setEditingDisease] = useState(false);
    const [diseaseValue, setDiseaseValue] = useState("");
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    // Flock state for Layer & Broiler
    const [initialFlockSize, setInitialFlockSize] = useState<number>(0);
    const [currentFlockSize, setCurrentFlockSize] = useState<number>(0);
    const [mortalityRate, setMortalityRate] = useState<number>(0);

    // Initialize state
    useEffect(() => {
        if (!animal) return;

        if (isCattle(animal) || isBuffalo(animal)) {
            setReproValues({
                lastCalvingDate: animal.lastCalvingDate,
                lactationStage: animal.lactationStage,
                lastAiDate: animal.lastAiDate,
                nextAiDate: animal.nextAiDate,
                pregnancyStatus: animal.pregnancyStatus,
                ageOfPregnancy: animal.ageOfPregnancy,
                expectedCalvingDate: animal.expectedCalvingDate,
                lastHeatDate: animal.lastHeatDate,
                reproductiveComment: animal.reproductiveComment,
            });
        }

        setDiseaseValue(animal.diseaseComment || "");
        setTreatments(animal.treatments || []);

        if (isLayer(animal) || isBroiler(animal)) {
            setInitialFlockSize(animal.initialFlockSize || 0);
            setCurrentFlockSize(animal.currentFlockSize || 0);
            setMortalityRate(
                animal.initialFlockSize && animal.currentFlockSize
                    ? ((animal.initialFlockSize - animal.currentFlockSize) / animal.initialFlockSize) * 100
                    : 0
            );
        }
    }, [animal]);

    // Update mortalityRate whenever flock size changes
    useEffect(() => {
        if (initialFlockSize > 0) {
            setMortalityRate(((initialFlockSize - currentFlockSize) / initialFlockSize) * 100);
        }
    }, [initialFlockSize, currentFlockSize]);

    if (!animal) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-gray-500">
                <p className="text-lg">Animal not found 🐄</p>
            </div>
        );
    }

    const handleDelete = (animal: { tag: string; species: string }) => {
        if (confirm(`Are you sure you want to delete ${animal.tag}?`)) {
            deleteAnimal(animal.tag);
            router.push(`/dashboard/${animal.species.toLowerCase()}`);
        }
    };

    const handleReproChange = <K extends keyof Cattle>(key: K, value: Cattle[K]) => {
        setReproValues({ ...reproValues, [key]: value });
    };

    const saveReproField = <K extends keyof Cattle>(key: K) => {
        if (isCattle(animal) || isBuffalo(animal)) {
            editAnimal({ ...animal, [key]: reproValues[key] });
            setEditingRepro({ ...editingRepro, [key]: false });
        }
    };

    const handleDiseaseSave = () => {
        editAnimal({ ...animal, diseaseComment: diseaseValue });
        setEditingDisease(false);
    };

    const handleTreatmentChange = (index: number, field: TreatmentField, value: string) => {
        const newTreatments = [...treatments];
        newTreatments[index] = { ...newTreatments[index], [field]: value };
        setTreatments(newTreatments);
    };

    const saveTreatments = () => {
        editAnimal({ ...animal, treatments });
    };

    const addTreatment = () => {
        setTreatments([...treatments, { type: "", treatment: "", dueDate: "", nextDate: "", comment: "" }]);
    };

    const deleteTreatment = (index: number) => {
        setTreatments(treatments.filter((_, i) => i !== index));
    };

    const isValuePresent = (value: unknown) =>
        value != null && value !== "" && value !== "undefined";

    const fieldGroups: Record<string, AnimalKeys[]> = {
        "Basic Information": ["species", "tag", "breed", "gender", "weight", "age", "status"],
        "Birth Information": ["dam", "sire", "birthDate", "birthWeight"],
        "Flock Information": ["initialFlockSize", "currentFlockSize", "mortalityRate"],
        "Reproductive Information": [
            "lastCalvingDate",
            "lactationStage",
            "lastAiDate",
            "nextAiDate",
            "pregnancyStatus",
            "ageOfPregnancy",
            "expectedCalvingDate",
            "lastHeatDate",
            "reproductiveComment",
        ],
        "Health Information": ["treatments", "diseaseComment"],
    };

    const getLabel = (key: string) => {
        const speciesKey = animal.species in keyDisplayNames ? animal.species : "default";
        return keyDisplayNames[speciesKey]?.[key] || keyDisplayNames.default[key] || key;
    };

    return (
        <div className="w-full min-h-screen p-4 md:p-6 text-black bg-gray-50 overflow-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 md:mb-6 border-b pb-2 md:pb-3">
                    ID: {animal.tag}
                </h1>

                {Object.entries(fieldGroups).map(([groupName, keys]) => {
                    let visibleFields: string[] = [];

                    if (groupName === "Reproductive Information") {
                        if (!isCattle(animal) && !isBuffalo(animal)) return null;
                        visibleFields = keys.filter((key) => isValuePresent(animal[key as keyof Cattle]));
                    } else if (groupName === "Flock Information") {
                        if (!isLayer(animal) && !isBroiler(animal)) return null;
                        visibleFields = keys;
                    } else {
                        visibleFields = keys.filter((key) => isValuePresent(animal[key as keyof Animal]));
                    }

                    if (visibleFields.length === 0) return null;

                    // Reproductive group
                    if (groupName === "Reproductive Information") {
                        return (
                            <div key={groupName} className="mb-4 md:mb-6">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 border-b">
                                    {groupName}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    {visibleFields.map((key) => {
                                        const isEditing = editingRepro[key as keyof Cattle];
                                        const value = reproValues[key as keyof Cattle] ?? "";
                                        const isDateField = key.toLowerCase().includes("date");
                                        const isSelectField = key === "pregnancyStatus" || key === "lactationStage";

                                        return (
                                            <div key={key} className="bg-gray-100 p-3 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between">
                                                <div className="flex-1">
                                                    <p className="text-sm md:text-base font-semibold text-gray-500">{getLabel(key)}</p>
                                                    {isEditing ? (
                                                        isDateField ? (
                                                            <input type="date" value={value as string} onChange={(e) => handleReproChange(key as keyof Cattle, e.target.value)} className="border rounded px-2 py-1 mt-1 w-full" />
                                                        ) : isSelectField ? (
                                                            <select value={value as string} onChange={(e) => handleReproChange(key as keyof Cattle, e.target.value)} className="border rounded px-2 py-1 mt-1 w-full">
                                                                {(key === "pregnancyStatus" ? pregnancyOptions : lactationOptions).map((opt) => (
                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <textarea
                                                                value={reproValues.reproductiveComment || ""}
                                                                onChange={(e) =>
                                                                    setReproValues({ ...reproValues, reproductiveComment: e.target.value })
                                                                }
                                                                className="w-full border rounded px-2 py-1 mt-1 text-sm md:text-base h-24 overflow-auto break-words"
                                                            />


                                                        )
                                                    ) : (
                                                        <div className="h-24 overflow-y-auto break-words mt-1">
                                                            <p className="text-base md:text-lg text-gray-800">{String(value) || "No comment"}</p>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="mt-2 sm:mt-0 sm:ml-2 flex-shrink-0">
                                                    {isEditing ? (
                                                        <button onClick={() => saveReproField(key as keyof Cattle)} className="text-green-600 font-bold text-sm md:text-base">Save</button>
                                                    ) : (
                                                        <Pencil className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => setEditingRepro({...editingRepro, [key as keyof Cattle]: true})} />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }

                    // Health group
                    if (groupName === "Health Information") {
                        return (
                            <div key={groupName} className="mb-4 md:mb-6">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 border-b">{groupName}</h2>
                                <div className="overflow-x-auto w-full mb-3">
                                    <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                                        <thead className="bg-gray-100">
                                        <tr>
                                            {["Type", "Treatment", "Due Date", "Next Date", "Comment", "Actions"].map(h => (
                                                <th key={h} className="border p-1 md:p-2">{h}</th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {treatments.map((t, i) => (
                                            <tr key={i} className="even:bg-gray-50">
                                                {(["type", "treatment", "dueDate", "nextDate", "comment"] as TreatmentField[]).map(f => (
                                                    <td key={f} className="border p-1 md:p-2">
                                                        <input type={f.toLowerCase().includes("date") ? "date" : "text"} value={t[f]} onChange={(e) => handleTreatmentChange(i, f, e.target.value)} className="w-full border rounded px-1 py-0.5" />
                                                    </td>
                                                ))}
                                                <td className="border p-1 md:p-2">
                                                    <Trash2 className="w-4 h-4 text-red-600 cursor-pointer" onClick={() => deleteTreatment(i)} />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <button onClick={addTreatment} className="flex items-center gap-1 text-blue-600 text-sm md:text-base"><Plus className="w-4 h-4" /> Add Treatment</button>
                                        <button onClick={saveTreatments} className="px-3 py-1 bg-green-500 text-white rounded text-sm md:text-base">Save Treatments</button>
                                    </div>
                                </div>
                                <div className="mt-2 bg-gray-100 p-3 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">Disease Comment</p>
                                        {editingDisease ? (
                                            <textarea value={diseaseValue} onChange={(e) => setDiseaseValue(e.target.value)} className="w-full border rounded px-2 py-1 mt-1 text-sm md:text-base h-24 overflow-y-auto" />
                                        ) : (
                                            <div className="h-24 overflow-y-auto break-words mt-1">
                                                <p className="text-base md:text-lg text-gray-800">{diseaseValue || "No comment"}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2 sm:mt-0 sm:ml-2 flex-shrink-0">
                                        {editingDisease ? (
                                            <button onClick={handleDiseaseSave} className="text-green-600 font-bold text-sm md:text-base">Save</button>
                                        ) : (
                                            <Pencil className="w-5 h-5 text-blue-600 cursor-pointer" onClick={() => setEditingDisease(true)} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Flock group
                    if (groupName === "Flock Information") {
                        return (
                            <div key={groupName} className="mb-4 md:mb-6">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 border-b">{groupName}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">{getLabel("initialFlockSize")}</p>
                                        <input type="number" value={initialFlockSize} onChange={(e) => setInitialFlockSize(Number(e.target.value))} className="border rounded px-2 py-1 mt-1 w-full" />
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">{getLabel("currentFlockSize")}</p>
                                        <input type="number" value={currentFlockSize} onChange={(e) => setCurrentFlockSize(Number(e.target.value))} className="border rounded px-2 py-1 mt-1 w-full" />
                                    </div>
                                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">{getLabel("mortalityRate")}</p>
                                        <p className="text-base md:text-lg font-medium text-gray-800">{mortalityRate.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    // Default group
                    return (
                        <div key={groupName} className="mb-4 md:mb-6">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 border-b">{groupName}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                {visibleFields.map((key) => (
                                    <div key={key} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">{getLabel(key)}</p>
                                        <p className="text-base md:text-lg font-medium text-gray-800">{String(animal[key as keyof Animal] ?? "")}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {isLayer(animal) && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">Poultry Health Management</h2>
                        <PoultryHealthTables animal={animal} onUpdate={(updatedLayer) => editAnimal(updatedLayer)} />
                    </div>
                )}
                {isBroiler(animal) && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">Broiler Health Management</h2>
                        <BroilerHealthTables animal={animal} onUpdate={(updatedLayer) => editAnimal(updatedLayer)} />
                    </div>
                )}

                <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
                    <button onClick={() => router.push(`/animals/edit/${animal.tag}`)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 md:px-5 md:py-2 rounded-lg shadow-md transition text-sm md:text-base">✏️ Edit Full</button>
                    <button onClick={() => handleDelete(animal)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 md:px-5 md:py-2 rounded-lg shadow-md transition text-sm md:text-base">🗑 Delete</button>
                </div>
            </div>
        </div>
    );
}
