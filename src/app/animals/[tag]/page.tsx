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
} from "@/types/animals";
import { useState, useEffect } from "react";
import PoultryHealthTables from "@/components/tables/PoultryHealthTables";
import BroilerHealthTables from "@/components/tables/BroilerHealthTables";
import CattleHealthTables from "@/components/tables/CattleHealthTable";
import ReproductionPage from "@/components/tables/ReproductiveInfo";
import BuffaloHealthTables from "@/components/tables/BuffaloHealthTable";
import PigHealthTables from "@/components/tables/PigHealthTable";
import GoatHealthTables from "@/components/tables/GoatHealthTable";
import SheepHealthTables from "@/components/tables/SheepHealthTable";

// Type guards
function isCattle(animal: Animal): animal is Cattle {
    return animal.species.toLowerCase() === "cattle";
}

function isBuffalo(animal: Animal): animal is Buffalo {
    return animal.species.toLowerCase() === "buffalo";
}

function isLayer(animal: Animal): animal is Layer {
    return animal.species.toLowerCase() === "layer";
}

function isBroiler(animal: Animal): animal is Broiler {
    return animal.species.toLowerCase() === "broiler";
}

function isPig(animal: Animal): animal is Pig {
    return animal.species.toLowerCase() === "pig";
}

function isGoat(animal: Animal): animal is Goat {
    return animal.species.toLowerCase() === "goat";
}

function isSheep(animal: Animal): animal is Sheep {
    return animal.species.toLowerCase() === "sheep";
}

function isReproductiveAnimal(
    animal: Animal
): animal is Cattle | Buffalo | Pig | Goat | Sheep {
    return (
        isCattle(animal) ||
        isBuffalo(animal) ||
        isPig(animal) ||
        isGoat(animal) ||
        isSheep(animal)
    );
}

type AnimalKeys = keyof (Cattle & Buffalo & Pig & Goat & Sheep & Layer & Broiler);

export default function AnimalDetailPage() {
    const { tag } = useParams();
    const { animals, deleteAnimal, editAnimal } = useAnimalContext();
    const router = useRouter();

    const animal = animals.find((a) => a.tag === tag);

    const [initialFlockSize, setInitialFlockSize] = useState<number>(0);
    const [currentFlockSize, setCurrentFlockSize] = useState<number>(0);
    const [mortalityRate, setMortalityRate] = useState<number>(0);

    useEffect(() => {
        if (!animal) return;

        if (isLayer(animal) || isBroiler(animal)) {
            setInitialFlockSize(animal.initialFlockSize || 0);
            setCurrentFlockSize(animal.currentFlockSize || 0);
            setMortalityRate(
                animal.initialFlockSize && animal.currentFlockSize
                    ? ((animal.initialFlockSize - animal.currentFlockSize) /
                        animal.initialFlockSize) *
                    100
                    : 0
            );
        }
    }, [animal]);

    useEffect(() => {
        if (initialFlockSize > 0) {
            setMortalityRate(
                ((initialFlockSize - currentFlockSize) / initialFlockSize) * 100
            );
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

    const isValuePresent = (value: unknown) =>
        value != null && value !== "" && value !== "undefined";

    const fieldGroups: Record<string, AnimalKeys[]> = {
        "Basic Information": ["species", "tag", "breed", "gender", "weight", "age", "status"],
        "Birth Information": ["dam", "sire", "birthDate", "birthWeight"],
        "Flock Information": ["initialFlockSize", "currentFlockSize", "mortalityRate"],
    };

    const getLabel = (key: string) => {
        const speciesKey = animal.species in keyDisplayNames ? animal.species : "default";
        return keyDisplayNames[speciesKey]?.[key] || keyDisplayNames.default[key] || key;
    };

    return (
        <div className="w-full min-h-screen p-4 md:p-6 text-black bg-gray-50 overflow-auto">
            <div className="w-full h-full bg-white rounded-none md:rounded-2xl shadow-lg p-4 md:p-6">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4 md:mb-6 border-b pb-2 md:pb-3">
                    ID: {animal.tag}
                </h1>

                {Object.entries(fieldGroups).map(([groupName, keys]) => {
                    let visibleFields: string[] = [];

                    if (groupName === "Flock Information") {
                        if (!isLayer(animal) && !isBroiler(animal)) return null;
                        visibleFields = keys;
                    } else {
                        visibleFields = keys.filter((key) =>
                            isValuePresent(animal[key as keyof Animal])
                        );
                    }

                    if (visibleFields.length === 0) return null;

                    if (groupName === "Flock Information") {
                        return (
                            <div key={groupName} className="mb-4 md:mb-6">
                                <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 border-b">
                                    {groupName}
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">
                                            {getLabel("initialFlockSize")}
                                        </p>
                                        <input
                                            type="number"
                                            value={initialFlockSize}
                                            onChange={(e) => {
                                                const newVal = Number(e.target.value);
                                                setInitialFlockSize(newVal);
                                                editAnimal({ ...animal, initialFlockSize: newVal });
                                            }}
                                            className="border rounded px-2 py-1 mt-1 w-full"
                                        />
                                    </div>

                                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">
                                            {getLabel("currentFlockSize")}
                                        </p>
                                        <input
                                            type="number"
                                            value={currentFlockSize}
                                            onChange={(e) => {
                                                const newVal = Number(e.target.value);
                                                setCurrentFlockSize(newVal);
                                                editAnimal({ ...animal, currentFlockSize: newVal });
                                            }}
                                            className="border rounded px-2 py-1 mt-1 w-full"
                                        />
                                    </div>

                                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500">
                                            {getLabel("mortalityRate")}
                                        </p>
                                        <p className="text-base md:text-lg font-medium text-gray-800">
                                            {mortalityRate.toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={groupName} className="mb-4 md:mb-6">
                            <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 border-b">
                                {groupName}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                {visibleFields.map((key) => (
                                    <div key={key} className="bg-gray-100 p-3 rounded-lg shadow-sm">
                                        <p className="text-sm md:text-base font-semibold text-gray-500 mb-1">
                                            {getLabel(key)}
                                        </p>

                                        {key === "status" ? (
                                            <div className="relative">
                                                <select
                                                    value={animal.status}
                                                    onChange={(e) =>
                                                        editAnimal({
                                                            ...animal,
                                                            status: e.target.value as
                                                                | "Alive"
                                                                | "Dead"
                                                                | "Sick",
                                                        })
                                                    }
                                                    className="appearance-none w-full bg-white border border-gray-300 rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-medium"
                                                >
                                                    <option value="Alive">Alive</option>
                                                    <option value="Dead">Dead</option>
                                                    <option value="Sick">Sick</option>
                                                </select>
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg
                                                        className="h-5 w-5 text-gray-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        ) : (
                                            <p className="text-base md:text-lg font-medium text-gray-800">
                                                {String(animal[key as keyof Animal] ?? "")}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}

                {isReproductiveAnimal(animal) &&
                    animal.gender?.trim().toLowerCase() === "female" && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                Reproduction Information
                            </h2>
                            <ReproductionPage animal={animal} />
                        </div>
                    )}

                {(isLayer(animal) ||
                    isBroiler(animal) ||
                    isPig(animal) ||
                    isCattle(animal) ||
                    isBuffalo(animal)) ||
                    isGoat(animal) ||
                    isSheep(animal)  && (
                    <>
                        {isLayer(animal) && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                    Poultry Health Management
                                </h2>
                                <PoultryHealthTables animal={animal} onUpdateAction={editAnimal} />
                            </div>
                        )}

                        {isBroiler(animal) && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                    Broiler Health Management
                                </h2>
                                <BroilerHealthTables animal={animal} onUpdateAction={editAnimal} />
                            </div>
                        )}

                        {isCattle(animal) && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                    Cattle Health Management
                                </h2>
                                <CattleHealthTables animal={animal} onUpdateAction={editAnimal} />
                            </div>
                        )}

                        {isBuffalo(animal) && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                    Buffalo Health Management
                                </h2>
                                <BuffaloHealthTables animal={animal} onUpdateAction={editAnimal} />
                            </div>
                        )}

                        {isPig(animal) && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                    Pig Health Management
                                </h2>
                                <PigHealthTables animal={animal} onUpdateAction={editAnimal} />
                            </div>
                        )}
                        {isGoat(animal) && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                    Goat Health Management
                                </h2>
                                <GoatHealthTables animal={animal} onUpdateAction={editAnimal} />
                            </div>
                        )}
                        {isSheep(animal) && (
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b">
                                    Sheep Health Management
                                </h2>
                                <SheepHealthTables animal={animal} onUpdateAction={editAnimal} />
                            </div>
                        )}
                    </>
                )}

                <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
                    <button
                        onClick={() => router.push(`/animals/edit/${animal.tag}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 md:px-5 md:py-2 rounded-lg shadow-md transition text-sm md:text-base"
                    >
                        ✏️ Edit Full
                    </button>
                    <button
                        onClick={() => handleDelete(animal)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 md:px-5 md:py-2 rounded-lg shadow-md transition text-sm md:text-base"
                    >
                        🗑 Delete
                    </button>
                </div>
            </div>
        </div>
    );
}