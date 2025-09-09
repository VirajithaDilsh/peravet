"use client";
import { useRouter } from "next/navigation";

interface AddAnimalButtonProps {
    species?: string;       // used in URL, defaults to "Cattle"
    text?: string;          // button text, defaults to "Add Animal"
    className?: string;
}

export default function AddAnimalButton({ species = "Cattle", text = "Add Animal", className }: AddAnimalButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/animals/new-animal?species=${species}`);
    };

    return (
        <button
            onClick={handleClick}
            type="button"
            className={`
                bg-green-600 text-white
                px-3 py-1 text-sm
                sm:px-4 sm:py-2 sm:text-base
                md:px-5 md:py-3 md:text-lg
                lg:px-6 lg:py-2 lg:text-base
                rounded-2xl
                hover:bg-green-700
                transition-colors duration-200
                ${className || ""}
            `}
        >
            {text}
        </button>
    );
}
