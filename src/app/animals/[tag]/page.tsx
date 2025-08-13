"use client";
import { useParams, useRouter } from "next/navigation";
import { useAnimalContext } from "@/app/context/AnimalContext";
import keyDisplayNames from "@/constants/animalFieldLabels";
import type { Animal, Cattle, Buffalo, Pig, Goat, Sheep, Layer, Broiler } from "@/types/animals";

// All possible keys from any Animal subtype
type AnimalKeys = keyof (Cattle & Buffalo & Pig & Goat & Sheep & Layer & Broiler);

export default function AnimalDetailPage() {
    const { tag } = useParams();
    const { animals, deleteAnimal } = useAnimalContext();
    const animal = animals.find((a) => a.tag === tag);
    const router = useRouter();


    if (!animal) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-gray-500">
                <p className="text-lg">Animal not found 🐄</p>
            </div>
        );
    }

    const isValuePresent = (value: unknown) =>
        value != null && value !== "" && value !== "undefined";

    const fieldGroups: Record<string, AnimalKeys[]> = {
        "Basic Information": ["species", "tag", "breed", "gender", "weight", "age", "status"],
        "Birth Information": ["dam", "sire", "birthWeight"],
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
        "Health Information": [
            "vaccinationType",
            "vaccinationDate",
            "nextVaccinationDate",
            "dewormingType",
            "lastDewormingDate",
            "nextDewormingDate",
            "diseaseComment",
            "treatmentComment",
        ],
    };

    return (
        <div className="w-full min-h-screen p-6 text-black bg-gray-50 overflow-auto">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-3">
                   ID: {animal.tag}
                </h1>

                {Object.entries(fieldGroups).map(([groupName, keys]) => {
                    const visibleFields = keys.filter((key) =>
                        isValuePresent(animal[key as keyof Animal])
                    );
                    if (visibleFields.length === 0) return null;

                    return (
                        <div key={groupName} className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b">
                                {groupName}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {visibleFields.map((key) => (
                                    <div
                                        key={key}
                                        className="bg-gray-100 p-4 rounded-lg shadow-sm"
                                    >
                                        <p className="text-sm font-semibold text-gray-500">
                                            {keyDisplayNames[key as string] || key}
                                        </p>
                                        <p className="text-lg font-medium text-gray-800">
                                            {String(animal[key as keyof Animal] ?? "")}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        onClick={() => router.push(`/animals/edit/${animal.tag}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow-md transition"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={() => {
                            if (
                                confirm(
                                    `Are you sure you want to delete ${animal.tag}?`
                                )
                            ) {
                                deleteAnimal(animal.tag);
                            }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition"
                    >
                        🗑 Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
