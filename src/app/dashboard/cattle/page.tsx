"use client";
import { useState } from "react";
import AddAnimalButton from "@/components/AddAnimalButton";
import CattleIcon from '@/icons/pageicon/cattle.svg';

export default function Home() {
    const [animals, setAnimals] = useState<string[]>([]);

    const handleAddAnimal = (animal: string) => {
        setAnimals((prev) => [...prev, animal]);
        console.log("Added:", animal);
    };

    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h1 className="text-2xl font-bold text-black">Cattle</h1>

                    {/* Right side: Button */}
                    <AddAnimalButton animalType="Cattle" onAdd={handleAddAnimal} />
                </div>
            </main>
            <div className="w-[250px] h-[85px] bg-green-300 rounded-xl text-black">
                <div>
                    <CattleIcon />
                </div>
                <h2 className="flex flex-col items-center justify-center p-5">
                    Total Cattle
                    <span className="text-2xl font-bold">4</span>
                </h2>

            </div>
        </div>
    );
}
