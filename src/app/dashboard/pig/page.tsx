"use client";
import AddAnimalButton from "@/components/AddAnimalButton";
import PigTable from "@/components/tables/PigTable";
import { getPig } from "@/utils/animalStatus"; //count
import { useAnimalContext } from "@/app/context/AnimalContext";



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
            {/*Total cattle box*/}
            <div className="w-full max-w-5xl bg-green-300 rounded-lg text-black p-2">
                <div className="grid grid-cols-4 divide-x divide-black text-center">

                    <div className="px-2">
                        <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                            Male
                        </p>
                        <span className="text-sm sm:text-base md:text-lg font-bold">{pigStats.males}</span>
                    </div>

                    <div className="px-2">
                        <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                            Female
                        </p>
                        <span className="text-sm sm:text-base md:text-lg font-bold">{pigStats.females}</span>
                    </div>

                    <div className="px-2">
                        <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                            Pregnant
                        </p>
                        <span className="text-sm sm:text-base md:text-lg font-bold">{pigStats.pregnant}</span>
                    </div>

                    <div className="px-2">
                        <p className="text-xs sm:text-sm md:text-base font-medium leading-tight">
                            Total Pigs
                        </p>
                        <span className="text-sm sm:text-base md:text-lg font-bold">{pigStats.total}</span>
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
