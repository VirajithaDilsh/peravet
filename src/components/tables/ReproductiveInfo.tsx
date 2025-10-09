"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Cattle, Buffalo, ReproductionInfo } from "@/types/animals";
import { useAnimalContext } from "@/context/AnimalContext"; // ✅ add this

const lactationOptions = [
    { value: "Early", label: "Early" },
    { value: "Mid", label: "Mid" },
    { value: "Late", label: "Late" },
    { value: "Dry", label: "Dry" },
];

const pregnancyOptions = [
    { value: "Pregnant", label: "Pregnant" },
    { value: "Not Pregnant", label: "Not Pregnant" },
    { value: "To be Check", label: "To be Check" },
    { value: "Infertile", label: "Infertile" },
];

type Props = {
    animal: Cattle | Buffalo;
};

export default function ReproductionPage({ animal }: Props) {
    const { updateAnimal } = useAnimalContext(); // ✅ access context
    const defaultValues: ReproductionInfo = animal.reproduction?.[0] || {};
    const { register, handleSubmit, reset } = useForm<ReproductionInfo>({
        defaultValues,
    });

    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = (data: ReproductionInfo) => {
        console.log("Saved reproduction info:", data);

        // ✅ Update animal in context & localStorage
        updateAnimal(animal.tag, (prev) => ({
            ...prev,
            reproduction: [data], // store as array of one entry
        }));

        setIsEditing(false);
    };

    return (
        <div className="p-6 w-full">
            <div className="w-full bg-white shadow-md rounded-lg p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Edit
                        </button>
                    ) : null}
                </div>

                {/* Display / Edit Form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 divide-y divide-gray-200"
                >
                    {[
                        { label: "Last Calving Date", name: "lastCalvingDate", type: "date" },
                        {
                            label: "Lactation Stage",
                            name: "lactationStage",
                            type: "select",
                            options: lactationOptions,
                        },
                        { label: "Last AI Date", name: "lastAiDate", type: "date" },
                        { label: "Next AI Date", name: "nextAiDate", type: "date" },

                        {
                            label: "Pregnancy Status",
                            name: "pregnancyStatus",
                            type: "select",
                            options: pregnancyOptions,
                        },
                        { label: "Age of Pregnancy (days)", name: "ageOfPregnancy", type: "number" },
                        { label: "Expected Calving Date", name: "expectedCalvingDate", type: "date" },
                        { label: "Last Heat Date", name: "lastHeatDate", type: "date" },
                    ].map((field) => (
                        <div
                            key={field.name}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2"
                        >
                            <label className="w-full sm:w-1/4 text-sm font-medium text-gray-600">
                                {field.label}
                            </label>
                            <div className="w-full sm:w-3/4 mt-2 sm:mt-0">
                                {!isEditing ? (
                                    <p className="text-gray-800">
                                        {defaultValues[field.name as keyof ReproductionInfo] || "-"}
                                    </p>
                                ) : field.type === "select" ? (
                                    <select
                                        {...register(field.name as keyof ReproductionInfo)}
                                        className="w-full border p-2 rounded"
                                    >
                                        <option value="">Select</option>
                                        {field.options?.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={field.type}
                                        {...register(field.name as keyof ReproductionInfo)}
                                        className="w-full border p-2 rounded"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Comment */}
                    <div className="flex flex-col py-2">
                        <label className="text-sm font-medium text-gray-600">Comment</label>
                        {!isEditing ? (
                            <p className="mt-1 text-gray-800">
                                {defaultValues.reproductiveComment || "-"}
                            </p>
                        ) : (
                            <textarea
                                {...register("reproductiveComment")}
                                rows={3}
                                className="w-full border p-2 rounded mt-1"
                            />
                        )}
                    </div>

                    {/* Actions */}
                    {isEditing && (
                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    reset(defaultValues);
                                    setIsEditing(false);
                                }}
                                className="px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
