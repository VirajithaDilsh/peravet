"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAnimalContext } from "@/app/context/AnimalContext";
import { Buffalo } from "@/types/animals";
import { Trash2,SquarePen,Eye  } from "lucide-react";
import { useRouter } from "next/navigation";


export default function BuffaloTable() {
    const { animals, deleteAnimal } = useAnimalContext();
    const [search, setSearch] = useState("");
    const router = useRouter();
    const buffaloOnly = animals.filter(
        (a): a is Buffalo => a.species === "Buffalo"
    );

    const filteredBuffalo = buffaloOnly.filter(
        (animal) =>
            animal.tag.toLowerCase().includes(search.toLowerCase()) ||
            animal.breed.toLowerCase().includes(search.toLowerCase()) ||
            animal.gender.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 text-black">
            <h2 className="text-xl font-bold mb-4">Buffalo Records</h2>

            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search by tag, breed, gender..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 w-full max-w-sm rounded-lg bg-white border border-gray-300"
                />
            </div>

            {/* Scrollable container with fixed height */}
            <div className="overflow-x-auto border rounded shadow-sm">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-[800px] w-full table-fixed border-collapse">
                        <thead className="bg-gray-200">
                        <tr>
                            {/* Sticky headers */}
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Tag No
                            </th>
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Breed
                            </th>
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Gender
                            </th>
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Weight
                            </th>
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Last AI Date
                            </th>
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Pregnancy Status
                            </th>
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Expected Calving Date
                            </th>
                            <th className="sticky top-0 z-10 bg-gray-200 py-2 px-4 border border-gray-300 text-sm md:text-base">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredBuffalo.length > 0 ? (
                            filteredBuffalo.map((animal) => (
                                <tr
                                    key={animal.tag}
                                    className="hover:bg-gray-50 transition cursor-pointer"
                                >
                                    <td className="py-2 px-4 border border-gray-300 text-sm md:text-base">
                                        {animal.tag}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-sm md:text-base">
                                        {animal.breed}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-sm md:text-base">
                                        {animal.gender}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-sm md:text-base">
                                        {animal.weight}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-sm md:text-base">
                                        {animal.lastAiDate || "-"}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-sm md:text-base">
                                        {animal.pregnancyStatus || "-"}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 text-sm md:text-base">
                                        {animal.expectedCalvingDate || "-"}
                                    </td>
                                    <td className="py-2 px-4 border border-gray-300 whitespace-nowrap text-sm md:text-base">
                                        <div className={"flex items-center justify-center"}>
                                            <Link
                                                href={`/animals/${animal.tag}`}
                                                className="text-blue-600 hover:underline mr-2"
                                            >
                                                <Eye className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    router.push(`/edit/${animal.tag}`);
                                                }}
                                                className="text-yellow-600 hover:text-yellow-800"
                                            >
                                                <SquarePen className="h-5 w-5" />
                                            </button>

                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            `Are you sure you want to delete ${animal.tag}?`
                                                        )
                                                    ) {
                                                        deleteAnimal(animal.tag);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center py-4 text-sm md:text-base"
                                >
                                    No buffalo records found.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
