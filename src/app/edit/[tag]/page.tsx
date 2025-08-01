"use client";

import { useParams, useRouter } from "next/navigation";
import { useAnimalContext } from "@/app/context/AnimalContext";
import AnimalEntryForm from "@/components/AnimalEntryForm";

export default function EditPage() {
    const { tag } = useParams();
    const router = useRouter();
    const { getAnimalByTag, editAnimal } = useAnimalContext();

    const animal = getAnimalByTag(tag as string);

    if (!animal) return <p>Animal not found.</p>;

    return (
        <div className="w-screen h-screen overflow-auto bg-white p-6">
            <h1 className={"justify-left font-bold mb-4 text-black text-2xl"}>
                Edit Animal
            </h1>
            <AnimalEntryForm
                defaultValues={animal}
                isEdit={true}
                onSubmit={(updatedAnimal) => {
                    editAnimal(updatedAnimal);
                    router.push(`/dashboard/${updatedAnimal.species.toLowerCase()}`);
                }}
            />
        </div>
    );
}
