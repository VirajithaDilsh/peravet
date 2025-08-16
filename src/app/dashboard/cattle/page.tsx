"use client";
import { useState } from "react";
import AddAnimalButton from "@/components/AddAnimalButton";
import CattleTable from "@/components/tables/CattleTable";
import TagInput from "@/components/TagInput";
import { getCattle } from "@/utils/animalStatus";
import { useAnimalContext } from "@/app/context/AnimalContext";



export default function Home() {

    const [date, setDate] = useState("");
    const [milker, setMilker] = useState("");

    const handleSubmit = () => {
        const formData = {
            date,
            milker,
        };
        console.log("Form Data:", formData);

        // 👉 You can send this data to an API
        // await fetch("/api/save", { method: "POST", body: JSON.stringify(formData) })
    };

    const { animals } = useAnimalContext();
    const cattleStats = getCattle(animals);



    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Cattle</h1>

                    {/* Right side: Button */}
                        <AddAnimalButton animalType="Cattle" className="ml-2 sm:ml-4 md:ml-0" />

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

            {/*Milk production update*/}
            <div className="flex justify-start p-4 sm:p-6">
                <h2 className="text-black text-lg sm:text-xl">Milk Production</h2>
            </div>

            <div className="flex-col w-full max-w-[743px] bg-[#DDF4EF] rounded-xl text-black px-4 sm:px-6 py-3 sm:py-4 ml-2 sm:ml-4">
                <div className="flex flex-row flex-wrap items-end gap-2 sm:gap-4 w-full">

                    <div className="flex-1 min-w-[100px] sm:min-w-[140px]">
                        <TagInput
                            label="Date"
                            placeholder=""
                            value={date}
                            onChangeAction={setDate}
                            type="date"
                        />
                    </div>

                    <div className="flex-1 min-w-[110px] sm:min-w-[150px]">
                        <TagInput
                            label="Total (Milker)"
                            placeholder=""
                            value={milker}
                            onChangeAction={setMilker}
                            type="number"
                            step="0.01"
                        />
                    </div>

                    <div className="mt-4 sm:mt-7">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#08A31A] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base"
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </div>


            <div className="flex  p-4 sm:p-6">
                <CattleTable />
            </div>
        </div>
    );
}
