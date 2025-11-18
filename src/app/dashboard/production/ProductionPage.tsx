// src/app/dashboard/production/ProductionPage.tsx
"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

import { ProductionRecord } from "@/types/Production";
import { useAnimalContext } from "@/context/AnimalContext";
import { useProduction } from "@/context/ProductionContext";

export default function ProductionPage() {
    const { animals } = useAnimalContext();
    const { records, addRecord, updateRecord, deleteRecord } = useProduction();
    const { register, handleSubmit, reset, watch, setValue } = useForm<ProductionRecord>();
    const [editingId, setEditingId] = useState<string | null>(null);

    const animalId = watch("animalId");
    const species = watch("species");

    // Auto-fill species and unit
    useEffect(() => {
        const selectedAnimal = animals.find((a) => a.tag === animalId);
        if (selectedAnimal) {
            setValue("species", selectedAnimal.species);
            const unit =
                ["Cattle", "Buffalo", "Goat", "Sheep"].includes(selectedAnimal.species)
                    ? "L"
                    : ["Layer"].includes(selectedAnimal.species)
                        ? "count"
                        : ["Broiler", "Pig"].includes(selectedAnimal.species)
                            ? "kg"
                            : "";
            setValue("unit", unit);
        } else {
            setValue("species", "");
            setValue("unit", "");
        }
    }, [animalId, animals, setValue]);

    const onSubmit = (data: ProductionRecord) => {
        if (editingId) {
            updateRecord(editingId, data);
            setEditingId(null);
        } else {
            addRecord(data);
        }
        reset();
    };

    const onEdit = (record: ProductionRecord) => {
        setEditingId(record.id);
        reset(record);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(records);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Production");
        XLSX.writeFile(wb, "DailyProduction.xlsx");
    };

    const getQuantityLabel = (sp: string) => {
        if (["Cattle", "Buffalo", "Goat", "Sheep"].includes(sp)) return "Milk Yield (L)";
        if (["Layer"].includes(sp)) return "Eggs Produced (count)";
        if (["Broiler", "Pig"].includes(sp)) return "Meat Production (kg)";
        return "Quantity";
    };

    return (
        <ProtectedRoute allowedRoles={["admin", "employee"]}>
            <div className="p-4 sm:p-6 space-y-6 text-black">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Daily Production</h1>

                {/* Add/Edit Form */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-4">
                    <h2 className="text-lg sm:text-xl font-semibold">
                        {editingId ? "Edit Production Record" : "Add New Production"}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <input
                                type="date"
                                {...register("date", { required: true })}
                                defaultValue={new Date().toISOString().split("T")[0]}
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Animal / Flock ID</label>
                            <input
                                list="animal-list"
                                value={animalId || ""}
                                onChange={(e) => setValue("animalId", e.target.value)}
                                placeholder="Enter or search ID"
                                className="border rounded px-3 py-2 w-full text-black"
                            />
                            <datalist id="animal-list">
                                {animals.map((a) => (
                                    <option key={a.tag} value={a.tag}>
                                        {a.tag} ({a.species})
                                    </option>
                                ))}
                            </datalist>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Species</label>
                            <input
                                {...register("species")}
                                readOnly
                                className="border rounded px-3 py-2 w-full bg-gray-100 text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">{getQuantityLabel(species)}</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("quantity", {
                                    required: true,
                                    valueAsNumber: true,
                                    validate: (v) => v === undefined || !isNaN(v) || "Please enter a valid number",
                                })}
                                className="border rounded px-3 py-2 w-full text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Unit</label>
                            <input
                                {...register("unit")}
                                readOnly
                                className="border rounded px-3 py-2 w-full bg-gray-100 text-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Notes</label>
                            <input
                                placeholder="Optional notes"
                                {...register("notes")}
                                className="border rounded px-3 py-2 w-full text-black"
                            />
                        </div>

                        <div className="sm:col-span-2 md:col-span-3 flex flex-col sm:flex-row justify-end gap-2 mt-2 sm:mt-4">
                            <Button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                            >
                                {editingId ? "Update Record" : "Add Record"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    reset();
                                    setEditingId(null);
                                }}
                            >
                                Clear
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Production Table */}
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
                        <h2 className="text-lg font-semibold">Production Records</h2>
                        <button
                            onClick={exportToExcel}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded w-full sm:w-auto"
                        >
                            Export Excel
                        </button>
                    </div>
                    {records.length === 0 ? (
                        <p className="text-gray-500 text-center">No records found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full border border-gray-200 text-sm">
                                <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-2 border">Date</th>
                                    <th className="p-2 border">Animal ID / Flock</th>
                                    <th className="p-2 border">Species</th>
                                    <th className="p-2 border">Quantity</th>
                                    <th className="p-2 border">Unit</th>
                                    <th className="p-2 border">Notes</th>
                                    <th className="p-2 border">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {records.map((record) => (
                                    <tr key={record.id} className="text-center hover:bg-gray-50">
                                        <td className="border p-2">{record.date}</td>
                                        <td className="border p-2">{record.animalId}</td>
                                        <td className="border p-2">{record.species}</td>
                                        <td className="border p-2">{record.quantity}</td>
                                        <td className="border p-2">{record.unit}</td>
                                        <td className="border p-2">{record.notes || "-"}</td>
                                        <td className="border p-2 flex flex-col sm:flex-row justify-center gap-1 sm:gap-2">
                                            <Button
                                                variant="outline"
                                                className="w-full sm:w-auto"
                                                onClick={() => onEdit(record)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="w-full sm:w-auto"
                                                onClick={() => deleteRecord(record.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
