import AnimalPieChart from "@/components/AnimalPieChart";

export default function Home() {
    return (
        <div className="flex">
            <main className="flex-1 p-4 text-black">
                <h1 className="text-2xl font-bold mb-4">Hello, main dashboard!</h1>

                {/* Container to align to right */}
                <div className="flex justify-end">
                    <div className="w-full max-w-md">
                        <AnimalPieChart />
                    </div>
                </div>
            </main>
        </div>
    );
}
