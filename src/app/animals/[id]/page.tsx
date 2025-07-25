import { cattleData } from "@/data/CattleData";
import { notFound } from "next/navigation";

interface Props {
    params: { id: string };
}

export default function AnimalDetailPage({ params }: Props) {
    const animalId = Number(params.id);

    // find the clicked animal
    const animal = cattleData.find(a => a.id === animalId);

    if (!animal) return notFound(); // show 404 if no match

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{animal.name}</h1>
            <p><strong>ID:</strong> {animal.id}</p>
            <p><strong>Age:</strong> {animal.age} years</p>
            <p><strong>Vaccine:</strong> {animal.vaccine}</p>
            <p><strong>Status:</strong> {animal.status}</p>
        </div>
    );
}
