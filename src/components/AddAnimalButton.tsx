"use client";
import { useRouter } from "next/navigation";

interface AddAnimalButtonProps {
    animalType: string;
    className?: string;
}

export default function AddAnimalButton({ animalType }: AddAnimalButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/animals/new-animal?species=${animalType}`);
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className="
                bg-green-600 text-white
                px-3 py-1 text-sm         /* default mobile */
                sm:px-4 sm:py-2 sm:text-base /* small screens */
                md:px-5 md:py-3 md:text-lg   /* medium screens */
                lg:px-6 lg:py-2 lg:text-base /* large screens limit size */
                rounded-2xl
                hover:bg-green-700
                transition-colors duration-200
            "
        >
            Add {animalType}
        </button>
    );
}
