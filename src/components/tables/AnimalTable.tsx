"use client";

import React, { useState, MouseEvent, KeyboardEvent } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Animal } from "@/types/animals";
import { useAnimalContext } from "@/context/AnimalContext";

export default function AllAnimalsTable() {
    const { animals, deleteAnimal, editAnimal } = useAnimalContext();
    const [search, setSearch] = useState("");
    const router = useRouter();

    // Filter animals based on search
    const filteredAnimals = animals.filter((animal: Animal) =>
        [animal.tag, animal.species, animal.breed, animal.status]
            .filter(Boolean)
            .some((field) =>
                field!.toLowerCase().includes(search.toLowerCase())
            )
    );

    const goToDetails = (id: string) => {
        router.push(`/animals/${id}`);
    };

    const stop = (e: MouseEvent | KeyboardEvent) => e.stopPropagation();

    // Normalize status for display
    const normalizeStatus = (status: string) => {
        const s = status?.trim().toLowerCase();
        if (s === "alive") return "Alive";
        if (s === "dead") return "Dead";
        if (s === "sick") return "Sick";
        return "";
    };

    const handleStatusChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        animal: Animal
    ) => {
        const newStatus = e.target.value;
        if (newStatus) {
            editAnimal({ ...animal, status: newStatus });
        }
    };

    const getStatusClasses = (status: string) => {
        const s = status?.trim().toLowerCase();
        if (s === "alive") return "border-green-400 text-green-600";
        if (s === "dead") return "border-red-400 text-red-600";
        if (s === "sick") return "border-yellow-400 text-yellow-600";
        return "border-gray-300 text-gray-500";
    };

    return (
        <div className="p-4 text-black w-full">
            <h2 className="text-2xl font-semibold mb-4">All Animals</h2>

            {/* Search Input */}
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search by tag, species, breed, status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 w-full max-w-sm rounded-2xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
                <div className="border rounded-lg shadow overflow-x-auto max-h-[500px] w-full">
                    <h1>Hiiii</h1>
                    <table className="w-full table-auto border-collapse text-xs md:text-sm min-w-[700px]">
                        <thead className="bg-blue-100 text-left sticky top-0 z-10">
                        <tr>
                            {["ID", "Species", "Breed", "Status", "Actions"].map((head) => (
                                <th
                                    key={head}
                                    className="py-2 px-2 md:py-3 md:px-4 border border-gray-300 font-medium whitespace-nowrap"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAnimals.length > 0 ? (
                            filteredAnimals.map((animal, idx) => (
                                <tr
                                    key={animal.tag}
                                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                    onClick={() => goToDetails(animal.tag)}
                                >
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {animal.tag}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {animal.species}
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                                        {animal.breed}
                                    </td>
                                    {/* Compact Status Column */}
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 max-w-[6rem]">
                                        <select
                                            value={normalizeStatus(animal.status)}
                                            onChange={(e) => handleStatusChange(e, animal)}
                                            onClick={stop}
                                            className={`p-1 rounded border focus:outline-none focus:ring-2 text-sm w-full ${getStatusClasses(animal.status)}`}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="Alive">Alive</option>
                                            <option value="Dead">Dead</option>
                                            <option value="Sick">Sick</option>
                                        </select>
                                    </td>
                                    <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300">
                                        <div className="flex gap-1 md:gap-2 justify-center">
                                            <button
                                                onClick={(e) => {
                                                    stop(e);
                                                    router.push(`/animals/edit/${animal.tag}`);
                                                }}
                                                className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                                                title="Edit"
                                            >
                                                <SquarePen className="h-4 w-4 md:h-5 md:w-5" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    stop(e);
                                                    if (confirm(`Delete ${animal.tag}?`))
                                                        deleteAnimal(animal.tag);
                                                }}
                                                className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center py-4 text-gray-500 border border-gray-300"
                                >
                                    No animals found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile - Card View */}
            <div className="md:hidden border rounded-lg shadow overflow-y-auto min-h-[300px] max-h-[500px]">
                <div className="flex flex-col">
                    {filteredAnimals.length > 0 ? (
                        filteredAnimals.map((animal) => (
                            <div
                                key={animal.tag}
                                onClick={() => goToDetails(animal.tag)}
                                className="border-b last:border-b-0 p-3 bg-white hover:bg-blue-50 transition cursor-pointer"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold text-blue-800 text-sm">
                                        {animal.tag} - {animal.species}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => {
                                                stop(e);
                                                router.push(`/animals/edit/${animal.tag}`);
                                            }}
                                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                                        >
                                            <SquarePen className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                stop(e);
                                                if (confirm(`Delete ${animal.tag}?`))
                                                    deleteAnimal(animal.tag);
                                            }}
                                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600">Breed: {animal.breed}</p>
                                <div className="mt-1 flex items-center gap-2">
                                    <label className="text-xs text-gray-500">Status:</label>
                                    <select
                                        value={normalizeStatus(animal.status)}
                                        onChange={(e) => handleStatusChange(e, animal)}
                                        onClick={stop}
                                        className={`p-1 rounded border focus:outline-none focus:ring-2 text-xs w-24 ${getStatusClasses(animal.status)}`}
                                    >
                                        <option value="">Select</option>
                                        <option value="Alive">Alive</option>
                                        <option value="Dead">Dead</option>
                                        <option value="Sick">Sick</option>
                                    </select>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 p-4">No animals found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
