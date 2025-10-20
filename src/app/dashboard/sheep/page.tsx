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
                    {/* Left side: Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Sheep</h1>

                    {/* Right side: Button */}
                    {/*<AddAnimalButton species="Sheep" text={"Add Sheep"} className="ml-2 sm:ml-4 md:ml-0" /> */}

                </div>
            </main>
            {/* Total Cattle Stats */}
            <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">

                    {/* Cow */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-green-600 text-[10px] sm:text-lg font-bold truncate">{cattleStats.cow}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Cow</p>
                    </div>

                    {/* Heifers */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-blue-600 text-[10px] sm:text-lg font-bold truncate">{cattleStats.heifers}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Heifers</p>
                    </div>

                    {/* Dry */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-yellow-600 text-[10px] sm:text-lg font-bold truncate">{cattleStats.dry}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Dry</p>
                    </div>

                    {/* Milking */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-pink-600 text-[10px] sm:text-lg font-bold truncate">{cattleStats.milking}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Milking</p>
                    </div>

                    {/* Pregnant */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-purple-600 text-[10px] sm:text-lg font-bold truncate">{cattleStats.pregnant}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Pregnant</p>
                    </div>

                    {/* Bulls */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-red-600 text-[10px] sm:text-lg font-bold truncate">{cattleStats.males}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Bulls</p>
                    </div>

                    {/* Total Cattle */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-black text-[10px] sm:text-lg font-bold truncate">{cattleStats.total}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Total Cattle</p>
                    </div>

                </div>
            </div>

            <div  id="table" className="flex  p-4 sm:p-6">
                <SheepTable />
            </div>
        </div>
    );
}
