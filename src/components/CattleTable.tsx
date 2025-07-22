"use client";

import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function CattleTable() {
    const router = useRouter();

    const animalData = [
        { id: 1, name: "Cow", age: 4, vaccine: "FMD", status: "Vaccinated" },
        { id: 2, name: "Goat", age: 2, vaccine: "PPR", status: "Pending" },
        { id: 3, name: "Sheep", age: 3, vaccine: "Enterotoxemia", status: "Vaccinated" },
        { id: 4, name: "Buffalo", age: 5, vaccine: "FMD", status: "Pending" },
        { id: 5, name: "Calf", age: 1, vaccine: "HS", status: "Vaccinated" },
        { id: 6, name: "Horse", age: 6, vaccine: "Tetanus", status: "Pending" },
        { id: 7, name: "Pig", age: 2, vaccine: "Swine Fever", status: "Vaccinated" },
        { id: 8, name: "Donkey", age: 7, vaccine: "Rabies", status: "Vaccinated" },
        { id: 9, name: "Duck", age: 1, vaccine: "Duck Plague", status: "Pending" },
        { id: 10, name: "Hen", age: 2, vaccine: "NDV", status: "Vaccinated" },
        { id: 11, name: "Turkey", age: 3, vaccine: "Fowlpox", status: "Pending" },
        { id: 12, name: "Rabbit", age: 1, vaccine: "Myxomatosis", status: "Vaccinated" },
    ];

    const handleIdClick = (id: number) => {
        router.push(`/cattle/${id}`);
    };

    return (
        <div className="p-4 sm:p-6">
            {/* Flex container: heading left, search bar right */}
            <div className="flex flex-row items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-black m-0">Cattle Details</h2>
                </div>

                <div className="w-48 sm:w-96 md:w-[28rem] lg:w-[48rem]">
                    <SearchBar />
                </div>
            </div>

            {/* Responsive scrollable container */}
            <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto overflow-x-auto mt-4">
                <table className="min-w-[500px] sm:min-w-full border-collapse text-xs sm:text-sm">
                    <thead className="bg-gray-200 sticky top-0 text-xs sm:text-sm">
                    <tr className="text-black">
                        <th className="border px-2 py-1 sm:px-4 sm:py-2">ID</th>
                        <th className="border px-2 py-1 sm:px-4 sm:py-2">Name</th>
                        <th className="border px-2 py-1 sm:px-4 sm:py-2">Age</th>
                        <th className="border px-2 py-1 sm:px-4 sm:py-2">Vaccine</th>
                        <th className="border px-2 py-1 sm:px-4 sm:py-2">Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {animalData.map((animal) => (
                        <tr key={animal.id} className="text-center text-black hover:bg-gray-100">
                            <td
                                className="border px-2 py-1 sm:px-4 sm:py-2 text-blue-600 underline cursor-pointer hover:text-blue-800"
                                onClick={() => handleIdClick(animal.id)}
                            >
                                {animal.id}
                            </td>

                            <td className="border px-2 py-1 sm:px-4 sm:py-2">{animal.name}</td>
                            <td className="border px-2 py-1 sm:px-4 sm:py-2">{animal.age}</td>
                            <td className="border px-2 py-1 sm:px-4 sm:py-2">{animal.vaccine}</td>
                            <td
                                className={`border px-2 py-1 sm:px-4 sm:py-2 ${
                                    animal.status === "Vaccinated" ? "text-green-600 font-bold" : "text-red-600"
                                }`}
                            >
                                {animal.status}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
