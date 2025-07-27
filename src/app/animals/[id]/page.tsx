import { cattleData } from "@/data/CattleData";
import { notFound } from "next/navigation";

export default function AnimalDetailPage({ params }: { params: { id: string } }) {
    const animalId = Number(params.id);

    const animal = cattleData.find((a) => a.id === animalId);

    if (!animal) return notFound();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{animal.id}</h1>
            <p><strong>Gender:</strong> {animal.id}</p>
            <p><strong>Age:</strong> {animal.age} years</p>
            <p><strong>Weight:</strong> {animal.weight} years</p>
            <p><strong>Breed:</strong> {animal.breed}</p>
            <p><strong>Status:</strong> {animal.status}</p>
        </div>
    );
}
