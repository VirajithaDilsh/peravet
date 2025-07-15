// components/AddAnimalButton.tsx
type AddAnimalButtonProps = {
    animalType: string;
    onAdd: (animal: string) => void;
};

export default function AddAnimalButton({ animalType, onAdd }: AddAnimalButtonProps) {
    return (
        <button
            onClick={() => onAdd(animalType)}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
        >
           +  Add {animalType}
        </button>
    );
}
