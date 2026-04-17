"use client";

import TaskTable from "@/components/tables/TaskTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/UserContext";

export default function Home() {
    const router = useRouter();
    const { currentUser } = useUserContext();

    // only admin & doctor can add tasks
    const canAddTask =
        currentUser?.role === "admin" || currentUser?.role === "doctor";

    return (
        <div className="flex flex-col">
            <main className="flex-1 p-4">
                <h1 className="text-3xl text-black font-bold mb-4">Tasks</h1>
            </main>

            {canAddTask && (
                <div className="flex justify-end mb-4 mr-8">
                    <Button
                        className="rounded-xl px-8 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => router.push("/dashboard/task/addtask")}
                    >
                        Add Task
                    </Button>
                </div>
            )}

            <TaskTable />
        </div>
    );
}