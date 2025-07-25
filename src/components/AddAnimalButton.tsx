type AddAnimalButtonProps = {
    animalType: string;
    onAdd: (animal: string) => void;
};

export default function AddAnimalButton({ animalType, onAdd }: AddAnimalButtonProps) {
    return (
        <button
            onClick={() => onAdd(animalType)}
            className="
    px-2 sm:px-3 md:px-4
    py-1 sm:py-1.5
    text-xs sm:text-sm
    bg-green-600 text-white
    rounded-md sm:rounded-lg
    hover:bg-green-700
    transition-all duration-200
  "
        >
            + Add {animalType}
        </button>

    );
}
