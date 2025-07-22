"use client";
import { useState } from "react";
import AddAnimalButton from "@/components/AddAnimalButton";
import CattleIcon from '@/icons/pageicon/cattle.svg';
import CattleTable from "@/components/CattleTable";
import SearchBar from "@/components/SearchBar";
import TagInput from "@/components/TagInput";


export default function Home() {
    const [animals, setAnimals] = useState<string[]>([]);

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
                    <h1 className="text-2xl font-bold text-black">Cattle</h1>

                    {/* Right side: Button */}
                    <AddAnimalButton animalType="Cattle" onAdd={handleAddAnimal} />
                </div>
            </main>
            {/*Total cattle box*/}
            <div className="w-[250px] h-[85px] bg-green-300 rounded-xl text-black">
                    <div className="flex flex-row">
                        <div className={"flex justify-between items-center p-4 md:p-6"}>
                            <CattleIcon />
                        </div>
                        <h2 className="flex flex-col items-center justify-center ">
                            Total Cattle
                            <span className="text-2xl font-bold">4</span>
                        </h2>
                    </div>
                </div>



            {/*Milk production update*/}
            <div className="flex justify-start p-6">
                <h2 className={"text-black text-xl"}>Milk Production</h2>
            </div>
            <div className={"flex-col w-[743px] h-[105px] bg-[#DDF4EF] rounded-xl text-black  px-6 py-4 ml-4"}>
                <div className="flex flex-row space-x-2 w-full">

                    <TagInput
                        label="Tag No."
                        placeholder="Type tag number here"
                        value={tag}
                        onChangeAction={setTag}
                        type="text"
                    />
                    <TagInput
                        label="Date"
                        placeholder=""
                        value={tag}
                        onChangeAction={setDate}
                        type="date"
                    />
                    <TagInput
                        label="Total(Milker)"
                        placeholder=""
                        value={milker}
                        onChangeAction={setMilker}
                        type="number"
                        step="0.01"
                    />
                    <div className="mt-7">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#08A31A] text-white px-6 py-2 rounded-lg hover:bg-green-700"
                        >
                            Submit
                        </button>
                    </div>

                </div>
            </div>

            {/* Cattle table section */}
            <div>
                {/* Table itself */}
                <CattleTable />
            </div>

        </div>
    );
}
