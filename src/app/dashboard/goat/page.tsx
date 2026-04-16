"use client";

{/*import AddAnimalButton from "@/components/AddAnimalButton";*/}
import GoatTable from "@/components/tables/GoatTable";
import { getCattle } from "@/utils/animalStatus";//goat
import { useAnimalContext } from "@/context/AnimalContext"; //Cattle



export default function Home() {


    const { animals } = useAnimalContext();
    const cattleStats = getCattle(animals);//Goat



    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Goat Records</h2>

                </div>
            </main>
            <div  id="table" className="flex  p-4 sm:p-6">
                <GoatTable />
            </div>
        </div>
    );
}
