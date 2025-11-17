import TaskTable from "@/components/tables/TaskTable";

export default function Home() {
    return (
        <div className="flex flex-col">
            <main className="flex-1 p-4">
                <h1 className="text-3xl text-black font-bold mb-4">Tasks</h1>
            </main>
            <div>
                <TaskTable />
            </div>
        </div>
    );
}
