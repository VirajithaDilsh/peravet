"use client";
import { useRouter } from "next/navigation";

interface AddAnimalButtonProps {
    animalType: string; // e.g., "Cattle", "Goat", etc.
}

export default function AddAnimalButton({ animalType }: AddAnimalButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        // Pass animalType as query param
        router.push(`/animals/new-animal?species=${animalType}`);
    };

    return (
        <button
            onClick={handleClick}
            className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700"
            type="button"
        >
            Add {animalType}
        </button>
    );
}
