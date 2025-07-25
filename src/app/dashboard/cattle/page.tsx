"use client";
import { useState } from "react";
import AddAnimalButton from "@/components/AddAnimalButton";
import CattleIcon from '@/icons/pageicon/cattle.svg';
import CattleTable from "@/components/CattleTable";
import TagInput from "@/components/TagInput";
import { cattleData } from "@/data/CattleData";


export default function Home() {
    const [, setAnimals] = useState<string[]>([]);

    const handleAddAnimal = (animal: string) => {
        setAnimals((prev) => [...prev, animal]);
        console.log("Added:", animal);
    };
    const [tag, setTag] = useState("");
    const [date, setDate] = useState("");
    const [milker, setMilker] = useState("");

    const handleSubmit = () => {
        const formData = {
            tag,
            date,
            milker,
        };
        console.log("Form Data:", formData);

        // 👉 You can send this data to an API
        // await fetch("/api/save", { method: "POST", body: JSON.stringify(formData) })
    };


    return (
        <div>
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Cattle</h1>

                    {/* Right side: Button */}
                    <AddAnimalButton animalType="Cattle" onAdd={handleAddAnimal} />
                </div>
            </main>
            {/*Total cattle box*/}
            <div
                className="
                            w-[150px]
                            h-[60px]
                            bg-green-300
                            rounded-lg
                            text-black
                            p-2
                          "
            >
                <div className="flex flex-row items-center gap-2">

                    {/* Fixed-size Icon */}
                    <div className="w-10 h-10 flex items-center justify-center">
                        <CattleIcon />
                    </div>

                    {/* Fixed Text */}
                    <h2 className="flex flex-col items-start justify-center text-[15px] leading-tight">
                        Total Cattle
                        <span className="text-lg font-bold leading-none self-center">{cattleData.length}</span>
                    </h2>

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
                            label="Tag No."
                            placeholder="Type tag number here"
                            value={tag}
                            onChangeAction={setTag}
                            type="text"
                        />
                    </div>

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


            {/* Cattle table section */}
            <div className="flexp-4 p-4 sm:p-6">
                {/* Table itself */}
                <CattleTable />
            </div>

        </div>
    );
}
