"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AddUserButton from "@/components/AddUserButton";
import UsersTable from "@/components/tables/UsersTable";
import AnimalPieChart from "@/components/AnimalPieChart";
import UserPieChart from "@/components/UserPieChart";
import AddAnimalButton from "@/components/AddAnimalButton";
import AnimalTable from "@/components/tables/AnimalTable";

export default function AdminPage() {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <div className="flex">
                <main className="flex-1 p-4 text-black">
                    <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
                    <div className="flex flex-col md:flex-row items-start gap-10">
                        <div className="w-full max-w-md">
                            <AnimalPieChart />
                        </div>
                        <div className="w-full max-w-md">
                            <UserPieChart />
                        </div>
                    </div>
                    <div className="w-full max-w-md">
                        <AddUserButton />
                        <AddAnimalButton />
                    </div>

                </div>
                <div id={"userTable"}>
                    <UsersTable />
                </div>
                <div id={"animalTable"}>
                    <AnimalTable />

                </div>


                    <UsersTable />
                </main>
            </div>
        </ProtectedRoute>
    );
}
