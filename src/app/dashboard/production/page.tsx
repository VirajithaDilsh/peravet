"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import { toast } from "sonner";

import { ProductionRecord } from "@/types/Production";
import { useAnimalContext } from "@/context/AnimalContext"; // adjust path

export default function ProductionPage() {
    const { animals } = useAnimalContext(); // get animals from context
    const { register, handleSubmit, reset, watch, setValue } = useForm<ProductionRecord>();
    const [records, setRecords] = useState<ProductionRecord[]>(() => {
        const saved = localStorage.getItem("productionRecords");
        return saved ? JSON.parse(saved) : [];
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const animalId = watch("animalId");
    const species = watch("species");

    // Auto-fill species & unit when animal selected
    useEffect(() => {
        const selectedAnimal = animals.find((a) => a.tag === animalId);
        if (selectedAnimal) {
            setValue("species", selectedAnimal.species);

            const unit =
                ["Cattle", "Buffalo", "Goat", "Sheep"].includes(selectedAnimal.species)
                    ? "L"
                    : ["Layer", "Broiler"].includes(selectedAnimal.species)
                        ? "count"
                        : "kg";
            setValue("unit", unit);
        } else {
            setValue("species", "");
            setValue("unit", "");
        }
    }, [animalId, animals, setValue]);

    // Persist records
    useEffect(() => {
        localStorage.setItem("productionRecords", JSON.stringify(records));
    }, [records]);

    const onSubmit = (data: ProductionRecord) => {
        if (editingId) {
            setRecords((prev) =>
                prev.map((rec) => (rec.id === editingId ? { ...data, id: editingId } : rec))
            );
            toast.success("Record updated successfully");
            setEditingId(null);
        } else {
            const newRecord = { ...data, id: Date.now().toString() };
            setRecords((prev) => [...prev, newRecord]);
            toast.success("Record added successfully");
        }
        reset();
    };

    const onEdit = (record: ProductionRecord) => {
        setEditingId(record.id);
        reset(record);
    };

    const onDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this record?")) {
            setRecords((prev) => prev.filter((r) => r.id !== id));
            toast.success("Record deleted");
        }
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(records);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Production");
        XLSX.writeFile(wb, "DailyProduction.xlsx");
        toast.success("Excel exported successfully");
    };

    return (
        <div className="p-6 space-y-8 text-black">
            <h1 className="text-3xl font-bold mb-4">Daily Production Management</h1>

            {/* Add/Edit Form */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <h2 className="text-xl font-semibold">{editingId ? "Edit Production Record" : "Add New Production"}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                            type="date"
                            {...register("date", { required: true })}
                            defaultValue={new Date().toISOString().split("T")[0]}
                            className="border rounded px-3 py-2 w-full"
                        />
                    </div>

                    {/* Animal Select */}
                    <div>
                        <label className="block text-sm font-medium">Animal / Flock ID</label>
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


                    {/* Species */}
                    <div>
                        <label className="block text-sm font-medium">Species</label>
                        <input
                            {...register("species")}
                            readOnly
                            className="border rounded px-3 py-2 w-full bg-gray-100 text-black"
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium">
                            {["Cattle", "Buffalo", "Goat", "Sheep"].includes(species)
                                ? "Milk Yield (L)"
                                : ["Layer", "Broiler"].includes(species)
                                    ? "Eggs Produced (count)"
                                    : "Quantity"}
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("quantity", { required: true, valueAsNumber: true })}
                            className="border rounded px-3 py-2 w-full text-black"
                        />
                    </div>

                    {/* Unit */}
                    <div>
                        <label className="block text-sm font-medium">Unit</label>
                        <input
                            {...register("unit")}
                            readOnly
                            className="border rounded px-3 py-2 w-full bg-gray-100 text-black"
                        />
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium">Notes</label>
                        <input
                            placeholder="Optional notes"
                            {...register("notes")}
                            className="border rounded px-3 py-2 w-full text-black"
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="sm:col-span-2 md:col-span-3 flex justify-end gap-3 mt-4">
                        <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                            {editingId ? "Update Record" : "Add Record"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
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
            <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold">Production Records</h2>
                    <button
                        onClick={exportToExcel}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
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
                                    <td className="border p-2 flex justify-center gap-2">
                                        <Button variant="outline" onClick={() => onEdit(record)}>
                                            Edit
                                        </Button>
                                        <Button variant="destructive" onClick={() => onDelete(record.id)}>
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
    );
}
