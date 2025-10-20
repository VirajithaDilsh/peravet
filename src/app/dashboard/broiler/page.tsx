"use client";
//import { useState } from "react";
{/*import AddAnimalButton from "@/components/AddAnimalButton";*/}
import BroilerTable from "@/components/tables/BroilerTable";
import { getBroiler } from "@/utils/animalStatus";
import { useAnimalContext } from "@/context/AnimalContext";



export default function Home() {

    const { animals } = useAnimalContext();
    const broilerStats = getBroiler(animals);



    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Broiler</h1>

                    {/* Right side: Button */}
                    {/*<AddAnimalButton species="Broiler" text={"Add Broiler"} className="ml-2 sm:ml-4 md:ml-0" />*/}

                </div>
            </main>
            {/* Total Broiler Stats */}
            <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
                <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">

                    {/* Broiler */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-green-600 text-[15px] sm:text-lg font-bold truncate">{broilerStats.total}</span>
                        <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Total Flocks</p>
                    </div>

                </div>
            </div>




            <div  id="table" className="flex  p-4 sm:p-6">
                <BroilerTable />
            </div>
        </div>
    );
}
