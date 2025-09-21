"use client";
import React, { useEffect } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { AnimalForm } from "@/types/AnimalForm";
import keyDisplayNames from "@/constants/animalFieldLabels";

interface StepFormProps {
    step: number;
    steps: { title: string; fields: (keyof AnimalForm)[] }[];
    methods: UseFormReturn<AnimalForm>;
    onNext: () => void;
    onBack: () => void;
    disableSpecies?: boolean;
}

const speciesFieldsMap: Record<string, (keyof AnimalForm)[]> = {
    Cattle: [
        "species","tag","status","breed","gender","dam","sire","birthDate","birthWeight",
        "lastCalvingDate","lactationStage","lastAiDate","nextAiDate",
        "pregnancyStatus","expectedCalvingDate","treatments","diseaseComment","weight","lastHeatDate","reproductiveComment"
    ],
    Buffalo: [
        "species","tag","status","breed","gender","dam","sire","birthDate","birthWeight",
        "lastCalvingDate","expectedCalvingDate","lastAiDate","nextAiDate","pregnancyStatus","treatments","diseaseComment","treatmentComment"
    ],
    Pig: [
        "species","tag","status","breed","gender","dam","sire","birthDate","birthWeight",
        "litterSize","lastFarrowingDate","nextExpectedFarrowingDate","pregnancyStatus",
        "parity","weaningDate","currentWeight","weaningWeight","vaccinationType",
        "vaccinationDate","nextVaccinationDate","dewormingType","lastDewormingDate",
        "nextDewormingDate","treatments","diseaseComment","treatmentComment","generalComment"
    ],
    Goat: ["species","tag","status","breed","gender","dam","sire","diseaseComment","treatmentComment"],
    Sheep: ["species","tag","breed","gender","dam","sire","diseaseComment","treatmentComment"],
    Layer: [
        "species","tag","status","breed","gender","initialFlockSize","currentFlockSize","treatments","diseaseComment","treatmentComment"
    ],
    Broiler: [
        "species","tag","status","breed","gender","initialFlockSize","currentFlockSize"
       ,"treatments","diseaseComment","treatmentComment"
    ],
};


const StepForm: React.FC<StepFormProps> = ({ step, steps, methods, onNext, onBack, disableSpecies = false }) => {
    const searchParams = useSearchParams();
    const speciesFromURL = searchParams.get("species");

    useEffect(() => {
        if (speciesFromURL) {
            methods.setValue("species", speciesFromURL, { shouldValidate: true });
        }
    }, [speciesFromURL, methods]);

    const species = methods.watch("species") || "Cattle";
    const currentStep = steps[step];
    const filteredFields = currentStep.fields.filter(f => speciesFieldsMap[species]?.includes(f));

    const { fields: treatmentFields, append, remove } = useFieldArray({
        control: methods.control,
        name: "treatments" as const,
    });

    const progressPercentage = ((step + 1) / steps.length) * 100;

    return (
        <div className="max-w-5xl mx-auto p-6 sm:p-8 bg-gray-50 rounded-3xl shadow-xl">
            {/* Step Progress */}
            <div className="mb-6">
                <div className="flex justify-between mb-2 text-gray-700 text-sm sm:text-base font-medium">
                    {steps.map((s, i) => (
                        <span key={i} className={`${i === step ? "font-bold text-blue-600" : ""}`}>{s.title}</span>
                    ))}
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full transition-all" style={{ width: `${progressPercentage}%` }} />
                </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">{currentStep.title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {filteredFields.map((field) => {
                    const label = keyDisplayNames?.[species]?.[field] || keyDisplayNames.default?.[field] || field;

                    // ---------- Select Fields ----------
                    if (["species", "gender", "lactationStage", "pregnancyStatus"].includes(field)) {
                        // Hide gender for Layer or Broiler
                        if (field === "gender" && (species === "Layer" || species === "Broiler")) {
                            return null;
                        }

                        let options: { value: string; label: string }[] = [];

                        if (field === "species") {
                            options = Object.keys(speciesFieldsMap).map(s => ({ value: s, label: s }));
                        } else if (field === "gender") {
                            options = [
                                { value: "Male", label: "Male" },
                                { value: "Female", label: "Female" },
                            ];
                        } else if (field === "lactationStage") {
                            options = [
                                { value: "Early", label: "Early" },
                                { value: "Mid", label: "Mid" },
                                { value: "Late", label: "Late" },
                                { value: "Dry", label: "Dry" },
                            ];
                        } else if (field === "pregnancyStatus") {
                            options = [
                                { value: "Pregnant", label: "Pregnant" },
                                { value: "Not Pregnant", label: "Not Pregnant" },
                                { value: "To be Check", label: "To be Check" },
                                { value: "Infertile", label: "Infertile" },
                            ];
                        }else if (species === "Layer" || species === "Broiler") {
                            steps.push(
                                { title: "Poultry Vaccination", fields: ["vaccinationSchedule"] },
                                { title: "Feed Management", fields: ["feedManagement"] },
                                { title: "Water Management", fields: ["waterManagement"] }
                            );
                        }


                        return (
                            <div key={field} className="w-full">
                                <label className="block mb-2 text-gray-700 font-medium">{label}</label>
                                <select
                                    {...methods.register(field as keyof AnimalForm, { required: true })}
                                    disabled={field === "species" && disableSpecies}
                                    className="w-full border-2 border-gray-300 rounded-2xl p-3 bg-white text-black focus:outline-none focus:border-blue-400"
                                >
                                    <option value="">Select {label}</option>
                                    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                                </select>
                                {methods.formState.errors[field] && <p className="text-red-500 text-sm mt-1">{label} is required</p>}
                            </div>
                        );
                    }

                    // ---------- Treatments ----------
                    if (field === "treatments") {
                        return (
                            <div key={field} className="col-span-full">
                                <label className="block mb-4 text-gray-700 font-medium">{label}</label>
                                <div className="flex flex-col gap-4">
                                    {treatmentFields.map((item, index) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white text-black rounded-2xl shadow-sm items-center flex-wrap">
                                            <select {...methods.register(`treatments.${index}.type` as const)} className="border rounded-xl p-2 flex-1 min-w-[120px]">
                                                <option value="">Type</option>
                                                <option value="Vaccination">Vaccination</option>
                                                <option value="Deworming">Deworming</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <input {...methods.register(`treatments.${index}.treatment` as const)} placeholder="Treatment" className="border rounded-xl p-2 flex-1 min-w-[120px]" />
                                            <input type="date" {...methods.register(`treatments.${index}.dueDate` as const)} className="border rounded-xl p-2 flex-1 min-w-[120px]" />
                                            <input type="date" {...methods.register(`treatments.${index}.nextDate` as const)} className="border rounded-xl p-2 flex-1 min-w-[120px]" />
                                            <input {...methods.register(`treatments.${index}.comment` as const)} placeholder="Comment" className="border rounded-xl p-2 flex-1 min-w-[120px]" />
                                            <button type="button" onClick={() => remove(index)} className="text-red-500 font-bold hover:underline mt-2 sm:mt-0">Delete</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => append({ type: "", treatment: "", dueDate: "", nextDate: "", comment: "" })} className="px-6 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition self-start">Add Treatment</button>
                                </div>
                            </div>
                        );
                    }

                    // ---------- Text/Date Inputs ----------
                    return (
                        <div key={field} className="w-full">
                            <label className="block mb-2 text-gray-700 font-medium">{label}</label>
                            <input
                                type={field.toLowerCase().includes("date") ? "date" : "text"}
                                {...methods.register(field as keyof AnimalForm)}
                                placeholder=""
                                className="w-full text-black border-2 border-gray-300 rounded-2xl p-3 bg-white focus:outline-none focus:border-blue-400"
                            />
                            {methods.formState.errors[field] && <p className="text-red-500 text-sm mt-1">{label} is required</p>}
                        </div>
                    );
                })}
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between mt-10 gap-4 sm:gap-0">
                {step > 0 && <button type="button" onClick={onBack} className="px-8 py-3 bg-gray-300 rounded-full hover:bg-gray-400 transition w-full sm:w-auto">Back</button>}
                {step < steps.length - 1 && <button type="button" onClick={onNext} className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition w-full sm:w-auto">Next</button>}
            </div>
        </div>
    );
};

export default StepForm;
