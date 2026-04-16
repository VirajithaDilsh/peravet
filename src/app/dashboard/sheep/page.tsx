"use client";
{/*import AddAnimalButton from "@/components/AddAnimalButton";*/}
import SheepTable from "@/components/tables/SheepTable";
import { getCattle } from "@/utils/animalStatus";
import { useAnimalContext } from "@/context/AnimalContext";



export default function Home() {



    const { animals } = useAnimalContext();
    const cattleStats = getCattle(animals);//sheep



    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Sheep Records</h1>
                </div>
            </main>

            <div  id="table" className="flex  p-4 sm:p-6">
                <SheepTable />
            </div>
        </div>
    );
}
