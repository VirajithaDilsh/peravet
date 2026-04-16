"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Pig, Vaccine, Deworming, Disease } from "@/types/animals";

type FieldConfig<T> = {
    key: keyof T;
    type: string;
    placeholder?: string;
    displayName?: string; // Added for custom display
};

export default function PigHealthTables({
                                               animal,
                                               onUpdateAction,
                                           }: {
    animal: Pig;
    onUpdateAction: (updated: Pig) => void;
}) {
    const [vaccinations, setVaccinations] = useState<Vaccine[]>(animal.vaccinations || []);
    const [deworming, setDeworming] = useState<Deworming[]>(animal.deworming || []);
    const [diseases, setDiseases] = useState<Disease[]>(animal.diseases || []);

    const [editing, setEditing] = useState<{ [key: string]: boolean }>({});

    const handleSave = (type: "vaccinations" | "deworming" | "diseases") => {
        if (type === "vaccinations") onUpdateAction({ ...animal, vaccinations });
        if (type === "deworming") onUpdateAction({ ...animal, deworming });
        if (type === "diseases") onUpdateAction({ ...animal, diseases });
        setEditing({});
    };

    const handleChange = <T extends object>(
        data: T[],
        setData: React.Dispatch<React.SetStateAction<T[]>>,
        i: number,
        key: keyof T,
        value: string
    ) => {
        const copy = [...data];
        copy[i] = { ...copy[i], [key]: value };
        setData(copy);
        setEditing((prev) => ({ ...prev, [`${i}-${String(key)}`]: true }));
    };

    const formatHeader = (key: string, displayName?: string) => {
        if (displayName) return displayName;
        // Convert camelCase to "Title Case"
        return key
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
    };

    const renderTable = <T extends object>(
        title: string,
        data: T[],
        setData: React.Dispatch<React.SetStateAction<T[]>>,
        type: "vaccinations" | "deworming" | "diseases",
        fields: FieldConfig<T>[]
    ) => (
        <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h2>
                <button
                    onClick={() => handleSave(type)}
                    className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                >
                    Save
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm md:text-base table-auto">
                    <thead className="bg-gray-50">
                    <tr>
                        {fields.map((f) => (
                            <th
                                key={String(f.key)}
                                className="border-r border-gray-200 px-3 py-2 text-left font-medium text-gray-700"
                            >
                                {formatHeader(String(f.key), f.displayName)}
                            </th>
                        ))}
                        <th className="px-3 py-2 text-center font-medium text-gray-700 border-l border-gray-200">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, i) => (
                        <tr
                            key={i}
                            className="hover:bg-gray-50 border-b border-gray-200 transition"
                        >
                            {fields.map((f) => (
                                <td key={String(f.key)} className="px-3 py-2 border-r border-gray-200">
                                    <input
                                        type={f.type}
                                        placeholder={f.placeholder}
                                        value={(row[f.key] as string) || ""}
                                        onChange={(e) =>
                                            handleChange(data, setData, i, f.key, e.target.value)
                                        }
                                        className={`w-full rounded-md px-2 py-1 text-sm focus:outline-none ${
                                            editing[`${i}-${String(f.key)}`]
                                                ? "border border-blue-500 focus:ring-2 focus:ring-blue-500"
                                                : "border-none"
                                        }`}
                                    />
                                </td>
                            ))}
                            <td className="text-center border-l border-gray-200">
                                <button
                                    onClick={() => setData(data.filter((_, idx) => idx !== i))}
                                    className="p-1.5 rounded-full hover:bg-red-100"
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden mt-4 space-y-3">
                {data.map((row, i) => (
                    <div
                        key={i}
                        className="border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
                    >
                        {fields.map((f) => (
                            <div key={String(f.key)} className="mb-3">
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    {formatHeader(String(f.key), f.displayName)}
                                </label>
                                <input
                                    type={f.type}
                                    placeholder={f.placeholder}
                                    value={(row[f.key] as string) || ""}
                                    onChange={(e) =>
                                        handleChange(data, setData, i, f.key, e.target.value)
                                    }
                                    className={`w-full rounded-md px-2 py-1 text-sm focus:outline-none ${
                                        editing[`${i}-${String(f.key)}`]
                                            ? "border border-blue-500 focus:ring-2 focus:ring-blue-500"
                                            : "border border-gray-200"
                                    }`}
                                />
                            </div>
                        ))}
                        <button
                            onClick={() => setData(data.filter((_, idx) => idx !== i))}
                            className="flex items-center text-red-500 text-sm mt-2 hover:underline"
                        >
                            <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Row */}
            <div className="mt-4">
                <button
                    onClick={() =>
                        setData([...data, Object.fromEntries(fields.map((f) => [f.key, ""])) as T])
                    }
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <Plus className="w-4 h-4" /> Add Row
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 mt-6">
            {renderTable<Vaccine>(
                "Vaccination Schedule",
                vaccinations,
                setVaccinations,
                "vaccinations",
                [
                    { key: "type", type: "text", placeholder: "Vaccine Type" },
                    { key: "dueDate", type: "date", displayName: "Due Date" },
                    { key: "nextDate", type: "date", displayName: "Next Date" },
                    { key: "comment", type: "text", placeholder: "Comment" },
                ]
            )}

            {renderTable<Deworming>(
                "Deworming Schedule",
                deworming,
                setDeworming,
                "deworming",
                [
                    { key: "type", type: "text", placeholder: "Deworming Type" },
                    { key: "dueDate", type: "date", displayName: "Due Date" },
                    { key: "nextDate", type: "date", displayName: "Next Date" },
                    { key: "comment", type: "text", placeholder: "Comment" },
                ]
            )}

            {renderTable<Disease>(
                "Disease Records",
                diseases,
                setDiseases,
                "diseases",
                [
                    { key: "date", type: "date", displayName: "Date" },
                    { key: "condition", type: "text", placeholder: "Condition" },
                    { key: "medication", type: "text", placeholder: "Medication" },
                    { key: "dosage", type: "text", placeholder: "Dosage" },
                    { key: "withdrawalDate", type: "date", displayName: "Withdrawal Date" },
                    { key: "comment", type: "text", placeholder: "Comment" },
                ]
            )}
        </div>
    );
}
