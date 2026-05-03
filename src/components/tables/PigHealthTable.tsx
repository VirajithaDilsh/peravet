"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Pig, Vaccine, Deworming, Disease } from "@/types/animals";

type FieldConfig<T> = {
    key: keyof T;
    type: string;
    placeholder?: string;
    displayName?: string;
};

// ✅ ONLY ADD THIS
const formatDateForInput = (date?: string | Date) => {
    if (!date) return "";

    if (date instanceof Date) {
        return date.toISOString().split("T")[0];
    }

    return date.split("T")[0];
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
        return key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase());
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

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm md:text-base table-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            {fields.map((f) => (
                                <th key={String(f.key)} className="border-r px-3 py-2 text-left">
                                    {formatHeader(String(f.key), f.displayName)}
                                </th>
                            ))}
                            <th className="px-3 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className="border-b hover:bg-gray-50">
                                {fields.map((f) => (
                                    <td key={String(f.key)} className="px-3 py-2">
                                        <input
                                            type={f.type}
                                            placeholder={f.placeholder}
                                            value={
                                                f.type === "date"
                                                    ? formatDateForInput(row[f.key] as string | Date)
                                                    : (row[f.key] as string) || ""
                                            }
                                            onChange={(e) =>
                                                handleChange(data, setData, i, f.key, e.target.value)
                                            }
                                            className="w-full px-2 py-1 border rounded"
                                        />
                                    </td>
                                ))}
                                <td className="text-center">
                                    <button
                                        onClick={() =>
                                            setData(data.filter((_, idx) => idx !== i))
                                        }
                                    >
                                        <Trash2 className="text-red-500 w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden mt-4 space-y-3">
                {data.map((row, i) => (
                    <div key={i} className="border p-4 rounded bg-gray-50">
                        {fields.map((f) => (
                            <div key={String(f.key)} className="mb-2">
                                <label className="text-xs">
                                    {formatHeader(String(f.key), f.displayName)}
                                </label>
                                <input
                                    type={f.type}
                                    value={
                                        f.type === "date"
                                            ? formatDateForInput(row[f.key] as string | Date)
                                            : (row[f.key] as string) || ""
                                    }
                                    onChange={(e) =>
                                        handleChange(data, setData, i, f.key, e.target.value)
                                    }
                                    className="w-full border px-2 py-1 rounded"
                                />
                            </div>
                        ))}
                        <button
                            onClick={() =>
                                setData(data.filter((_, idx) => idx !== i))
                            }
                            className="text-red-500 text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Add Row */}
            <button
                onClick={() =>
                    setData([...data, Object.fromEntries(fields.map((f) => [f.key, ""])) as T])
                }
                className="mt-4 flex items-center gap-1 text-blue-600"
            >
                <Plus className="w-4 h-4" /> Add Row
            </button>
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
                    { key: "type", type: "text" },
                    { key: "dueDate", type: "date" },
                    { key: "nextDate", type: "date" },
                    { key: "comment", type: "text" },
                ]
            )}

            {renderTable<Deworming>(
                "Deworming Schedule",
                deworming,
                setDeworming,
                "deworming",
                [
                    { key: "type", type: "text" },
                    { key: "dueDate", type: "date" },
                    { key: "nextDate", type: "date" },
                    { key: "comment", type: "text" },
                ]
            )}

            {renderTable<Disease>(
                "Disease Records",
                diseases,
                setDiseases,
                "diseases",
                [
                    { key: "date", type: "date" },
                    { key: "condition", type: "text" },
                    { key: "medication", type: "text" },
                    { key: "dosage", type: "text" },
                    { key: "withdrawalDate", type: "date" },
                    { key: "comment", type: "text" },
                ]
            )}
        </div>
    );
}