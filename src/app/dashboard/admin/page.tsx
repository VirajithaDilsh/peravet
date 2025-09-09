"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import AddUserButton from "@/components/AddUserButton";
import UsersTable from "@/components/tables/UsersTable";
import AnimalPieChart from "@/components/AnimalPieChart";
import UserPieChart from "@/components/UserPieChart";
import AddAnimalButton from "@/components/AddAnimalButton";

export default function AdminPage() {
    return (
        <ProtectedRoute allowedRoles={["admin"]}>
            <div>
                <main className="flex-1 p-4 text-black">
                    <h1 className="text-2xl font-semibold mb-4 text-start">Admin Panel</h1>
                </main>
                {/* ✅ Full-width container for right-aligned buttons */}
                <div className="w-full mb-10 flex justify-end space-x-4">
                    <AddUserButton />
                    <AddAnimalButton />
                </div>

                {/* ✅ Center pie charts and make them bigger */}
                <div className="flex flex-col mt-4 mb-4 md:flex-row justify-center items-center gap-10">
                    <div className="w-full max-w-lg">
                        <AnimalPieChart />
                    </div>
                    <div className="w-full max-w-lg">
                        <UserPieChart />
                    </div>
                </div>
                <div id={"userTable"}>
                    <UsersTable />
                </div>


            </div>


        </ProtectedRoute>
    );
}
