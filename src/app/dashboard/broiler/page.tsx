import AddAnimalButton from "@/components/AddAnimalButton";

export default function Home() {
    return (
        <div className="flex">
            <main className="flex flex-col">
                <div className="flex justify-between items-center p-6">
                    {/* Left side: Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">Broiler</h1>

                    {/* Right side: Button */}
                    <AddAnimalButton animalType="Broiler" className="ml-2 sm:ml-4 md:ml-0" />

                </div>
            </main>
        </div>
    );
}