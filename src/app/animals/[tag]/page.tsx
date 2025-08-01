// app/animals/[tag]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { useAnimalContext } from "@/app/context/AnimalContext";
import keyDisplayNames from "@/constants/animalFieldLabels";

export default function AnimalDetailPage() {
    const { tag } = useParams();
    const { animals, deleteAnimal } = useAnimalContext();
    const animal = animals.find((a) => a.tag === tag);

    if (!animal) return <p>Animal not found</p>;

    return (
        <div className=" w-full h-screen p-6 text-black bg-white">
            <h1 className="text-2xl font-bold mb-4">{animal.tag}</h1>
            <ul className="space-y-4 space-x-2">
                {Object.entries(animal).map(([key, value]) => {
                    const displayName = keyDisplayNames[key] || (key.charAt(0).toUpperCase() + key.slice(1));
                    return (
                        <li key={key}>
                            <strong>{displayName}:</strong> {String(value)}
                        </li>
                    );
                })}
            </ul>

            <button
                onClick={() => alert("Edit functionality coming soon!")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl mr-2 mt-2"
            >
                Edit
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
                className="bg-red-500 text-white px-4 py-2 rounded-xl mt-2"
            >
                Delete
            </button>
        </div>
    );
}
