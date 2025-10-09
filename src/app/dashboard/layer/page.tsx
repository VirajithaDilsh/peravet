"use client";
import { useState } from "react";
{/*import AddAnimalButton from "@/components/AddAnimalButton";*/}
import LayerTable from "@/components/tables/LayerTable";
import TagInput from "@/components/TagInput";
import { getLayer } from "@/utils/animalStatus";
import { useAnimalContext } from "@/context/AnimalContext";



export default function Home() {

    const [date, setDate] = useState("");
    const [tagNo, setTagNo] = useState("");
    const [eggCount, setEggCount] = useState<number | "">("");

    const handleSubmit = () => {
        const formData = {
            date,
            tagNo,
            eggCount: eggCount === "" ? 0 : eggCount, // fallback to 0
        };

        console.log("Egg Production Data:", formData);

        // 👉 Send to API
        // await fetch("/api/egg-production", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(formData),
        // });
    };
    const { animals } = useAnimalContext();
    const layerStats = getLayer(animals);



    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Layer</h1>

                    {/* Right side: Button */}
                    {/*<AddAnimalButton species="Layer" text={"Add Layer"} className="ml-2 sm:ml-4 md:ml-0" />*/}

                </div>
            </main>
            {/* Total Layer Stats */}
            <div className="w-full max-w-5xl mx-auto p-2 sm:p-4">
                <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">

                    {/* Layer */}
                    <div className="flex flex-col items-center bg-white rounded-lg p-1 sm:p-2 shadow hover:shadow-lg transition-shadow overflow-hidden">
                        <span className="text-green-600 text-[10px] sm:text-lg font-bold truncate">{layerStats.total}</span>
                        <p className="text-[8px] sm:text-xs md:text-sm text-gray-600 mt-1 truncate">Total Flocks</p>
                    </div>

                </div>
            </div>

            <div className="flex justify-start p-4 sm:p-6">
                <h2 className="text-black text-lg sm:text-xl">Egg Production</h2>
            </div>

            <div className="flex-col w-full max-w-[743px] bg-[#DDF4EF] rounded-xl text-black px-4 sm:px-6 py-3 sm:py-4 ml-2 sm:ml-4">
                <div className="flex flex-row flex-wrap items-end gap-2 sm:gap-4 w-full">

                    {/* Date */}
                    <div className="flex-1 min-w-[100px] sm:min-w-[140px]">
                        <TagInput
                            label="Date"
                            placeholder=""
                            value={date}
                            onChangeAction={setDate}
                            type="date"
                        />
                    </div>

                    {/* Tag Number */}
                    <div className="flex-1 min-w-[110px] sm:min-w-[150px]">
                        <TagInput
                            label="Flock ID"
                            placeholder="Enter Id"
                            value={tagNo}
                            onChangeAction={setTagNo}
                            type="text"
                        />
                    </div>

                    {/* Egg Count */}
                    <div className="flex-1 min-w-[110px] sm:min-w-[150px]">
                        <TagInput
                            label="Egg Count"
                            placeholder="Enter number of eggs"
                            value={eggCount.toString()}
                            onChangeAction={(val: string) =>
                                setEggCount(val === "" ? "" : Number(val))
                            }
                            type="number"
                        />
                    </div>

                    {/* Submit Button */}
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


            <div  id="table" className="flex  p-4 sm:p-6">
                <LayerTable />
            </div>
        </div>
    );
}
