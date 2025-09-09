"use client";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/types/users";

interface UserStepFormProps {
    step: number;
    steps: { title: string; fields: (keyof FormValues)[] }[];
    methods: UseFormReturn<FormValues>;
    onNext: () => void;
    onBack: () => void;
}

export default function UserStepForm({ step, steps, methods, onNext, onBack }: UserStepFormProps) {
    const currentStep = steps[step];
    const role = methods.watch("role");

    return (
        <div className="p-4 border rounded-md shadow-sm mb-4">
            <h2 className="text-lg font-semibold mb-2">{currentStep.title}</h2>
            <div className="space-y-3">
                {currentStep.fields.map((field) => {
                    // hide student-only fields if role isn't student
                    if ((field === "department" || field === "year") && role !== "student") return null;

                    const inputType = field === "year" ? "number" : "text";

                    return (
                        <input
                            key={field}
                            {...methods.register(field, { required: true })}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            type={inputType}
                            className="w-full border p-2 rounded"
                        />
                    );
                })}
            </div>
            <div className="mt-4 flex justify-between">
                {step > 0 && (
                    <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Back
                    </button>
                )}
                <button type="button" onClick={onNext} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto">
                    Next
                </button>
            </div>
        </div>
    );
}
