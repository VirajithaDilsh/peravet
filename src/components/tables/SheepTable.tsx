"use client";

import React, { useState, MouseEvent, KeyboardEvent } from "react";
import { useAnimalContext } from "@/context/AnimalContext";
import { Sheep } from "@/types/animals";
import { Trash2, SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SheepTable() {
  const { animals, deleteAnimal } = useAnimalContext();
  const [search, setSearch] = useState("");
  const router = useRouter();

  // Filter only sheep with valid _id
  type SheepWithId = Sheep & { _id: string };

  const sheepOnly = animals.filter(
    (a): a is SheepWithId =>
      a.species?.trim().toLowerCase() === "sheep" &&
      typeof a._id === "string"
  );

  const filteredSheep = sheepOnly.filter((animal) =>
    [animal.tag, animal.breed, animal.gender]
      .filter(Boolean)
      .some((field) =>
        field.toString().toLowerCase().includes(search.toLowerCase())
      )
  );

  const goToDetails = (tag: string) => {
    router.push(`/animals/${tag}`);
  };

  const stop = (e: MouseEvent | KeyboardEvent) => e.stopPropagation();

  const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-CA");
  };

  const handleDelete = async (id: string, tag: string) => {
    const confirmed = confirm(`Delete ${tag}?`);

    if (!confirmed) return;

    try {
      await deleteAnimal(id);
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete animal. Please try again.");
    }
  };

  return (
    <div className="p-4 text-black w-full">
      <h2 className="text-2xl font-semibold mb-4">Sheep Records</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by tag, breed, gender..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-full max-w-sm rounded-2xl bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Desktop & Tablet - Table View */}
      <div className="hidden md:block">
        <div className="border rounded-lg shadow overflow-x-auto max-h-[500px] w-full">
          <table className="w-full table-auto border-collapse text-xs md:text-sm min-w-[700px]">
            <thead className="bg-blue-100 text-left sticky top-0 z-10">
              <tr>
                {[
                  "Tag No",
                  "Breed",
                  "Gender",
                  "Weight",
                  "Mating Date",
                  "Pregnancy Status",
                  "Expected Lambing Date",
                  "Actions",
                ].map((head) => (
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
              {filteredSheep.length > 0 ? (
                filteredSheep.map((animal, idx) => {
                  const repro = animal.reproduction?.[0];

                  return (
                    <tr
                      key={animal._id}
                      className={`cursor-pointer hover:bg-blue-50 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                      onClick={() => goToDetails(animal.tag)}
                    >
                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                        {animal.tag}
                      </td>

                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                        {animal.breed ?? "-"}
                      </td>

                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                        {animal.gender ?? "-"}
                      </td>

                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                        {animal.weight ?? "-"}
                      </td>

                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                        {formatDate(repro?.matingDate)}
                      </td>

                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                        {repro?.pregnancyStatus || "-"}
                      </td>

                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300 whitespace-nowrap">
                        {formatDate(repro?.expectedCalvingDate)}
                      </td>

                      <td className="py-1 px-1 md:py-2 md:px-4 border border-gray-300">
                        <div className="flex gap-1 md:gap-2 justify-center">
                          <button
                            onClick={(e) => {
                              stop(e);
                              router.push(`/edit/${animal.tag}`);
                            }}
                            className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                            title="Edit"
                          >
                            <SquarePen className="h-4 w-4 md:h-5 md:w-5" />
                          </button>

                          <button
                            onClick={async (e) => {
                              stop(e);
                              await handleDelete(animal._id, animal.tag);
                            }}
                            className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-gray-500 border border-gray-300"
                  >
                    No sheep records found.
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
          {filteredSheep.length > 0 ? (
            filteredSheep.map((animal) => {
              const repro = animal.reproduction?.[0];

              return (
                <div
                  key={animal._id}
                  onClick={() => goToDetails(animal.tag)}
                  className="border-b last:border-b-0 p-3 bg-white hover:bg-blue-50 transition cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-blue-800 text-sm">
                      Tag No: {animal.tag}
                    </h3>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          stop(e);
                          router.push(`/edit/${animal.tag}`);
                        }}
                        className="text-yellow-600 hover:text-yellow-800 p-1 rounded hover:bg-yellow-100 transition"
                        title="Edit"
                      >
                        <SquarePen className="h-4 w-4" />
                      </button>

                      <button
                        onClick={async (e) => {
                          stop(e);
                          await handleDelete(animal._id, animal.tag);
                        }}
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100 transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600">
                    Breed: {animal.breed ?? "-"}
                  </p>

                  <p className="text-xs text-gray-600">
                    Gender: {animal.gender ?? "-"}
                  </p>

                  <p className="text-xs text-gray-600">
                    Weight: {animal.weight ?? "-"}
                  </p>

                  <p className="text-xs text-gray-600">
                    Mating Date: {formatDate(repro?.matingDate)}
                  </p>

                  <p className="text-xs text-gray-600">
                    Pregnancy Status: {repro?.pregnancyStatus || "-"}
                  </p>

                  <p className="text-xs text-gray-600">
                    Expected Lambing Date:{" "}
                    {formatDate(repro?.expectedCalvingDate)}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 p-4">
              No sheep records found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}