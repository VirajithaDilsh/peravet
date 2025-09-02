"use client";
import AddAnimalButton from "@/components/AddAnimalButton";
import PigTable from "@/components/tables/PigTable";
import { getPig } from "@/utils/animalStatus"; //count
import { useAnimalContext } from "@/context/AnimalContext";



export default function Home() {

    const { animals } = useAnimalContext();
    const pigStats = getPig(animals);


    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Pig</h1>

                    {/* Right side: Button */}
                    <AddAnimalButton animalType="Pig" />
                </div>
            </main>
            <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">

                    {/* Cow */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-green-600 text-[10px] sm:text-lg font-bold truncate">{pigStats.females}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Female</p>
                    </div>

                    {/* Heifers */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-blue-600 text-[10px] sm:text-lg font-bold truncate">{pigStats.males}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Male</p>
                    </div>

                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-black text-[10px] sm:text-lg font-bold truncate">{pigStats.total}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Total Pigs</p>
                    </div>

                </div>
            </div>

            {/* Animals table section */}
            <div className="flexp-4 p-4 sm:p-6">
                {/* Table itself */}
                <PigTable />
            </div>

        </div>
    );
}
