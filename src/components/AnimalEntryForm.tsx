"use client";
import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Animal,Cattle } from "@/types/animals"; //
import { useRouter, useSearchParams } from "next/navigation";
import { useAnimalContext } from "@/app/context/AnimalContext";

interface AnimalEntryFormProps {
    defaultValues?: Animal; //
    isEdit?: boolean;
    onSubmit?: (data: Animal) => void; //
}

export default function AnimalEntryForm({
                                            defaultValues,
                                            isEdit = false,
                                            onSubmit,
                                        }: AnimalEntryFormProps) {
    const methods = useForm<Cattle>({
        defaultValues: defaultValues || {},
    });
    const [step, setStep] = useState(0);

    const species = methods.watch("species");
    const gender = methods.watch("gender");

    const isCattle = species === "Cattle";
    const isBuffalo = species === "Buffalo";
    const isPig = species === "Pig";
    const isGoat = species === "Goat";
    const isSheep = species === "Sheep";
    const isLayer = species === "Layer";
    const isBroiler = species === "Broiler";

    const isFemale = gender === "Female";
    const isReproStepRequired = (isCattle || isBuffalo) && isFemale;

    const steps = [
        "Basic Info",
        "Birth Info",
        ...(isReproStepRequired ? ["Reproductive Info"] : []),
        "Health Info",
    ];

    const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const prevStep = () => setStep((s) => Math.max(s - 1, 0));

    const router = useRouter();
    const { addAnimal } = useAnimalContext();

    // If editing, call passed onSubmit, else do add + redirect
    const handleFinalSubmit = (data: Cattle) => {
        if (onSubmit) {
            onSubmit(data);
        } else {
            addAnimal(data);
            router.push(`/dashboard/${data.species.toLowerCase()}`);
        }
    };

    const submitHandler = methods.handleSubmit((data) => {
        if (step < steps.length - 1) {
            nextStep();
        } else {
            handleFinalSubmit(data);
        }
    });

    // Sync defaultValues to form fields if editing and defaultValues changes
    useEffect(() => {
        if (defaultValues) {
            Object.entries(defaultValues).forEach(([key, value]) => {
                methods.setValue(key as keyof Cattle, value);
            });
        }
    }, [defaultValues, methods]);

    // For new entry, optionally get species from URL query param
    const searchParams = useSearchParams();
    const speciesFromURL = searchParams.get("species");
    useEffect(() => {
        if (!isEdit && speciesFromURL) {
            methods.setValue("species", speciesFromURL);
        }
    }, [speciesFromURL, methods, isEdit]);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={submitHandler}
                className="flex flex-col text-black space-y-6 bg-[#D4F2D9] p-6 rounded shadow"
            >
                <h2 className="text-xl font-semibold">{steps[step]}</h2>

                {/* Step 0: Basic Info */}
                {step === 0 && (
                    <>
                        <label>Species:</label>
                        <select
                            {...methods.register("species", { required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full md:w-40 p-2.5"
                            disabled={isEdit} // disable changing species on edit
                        >
                            <option value="">Select</option>
                            <option value="Cattle">Cattle</option>
                            <option value="Buffalo">Buffalo</option>
                            <option value="Pig">Pig</option>
                            <option value="Layer">Layer</option>
                            <option value="Broiler">Broiler</option>
                            <option value="Goat">Goat</option>
                            <option value="Sheep">Sheep</option>
                        </select>

                        {(isCattle || isBuffalo || isPig || isGoat || isSheep) && (
                            <div className="flex flex-col gap-4 md:w-40">
                                <label>Tag No:</label>
                                <input
                                    {...methods.register("tag", { required: true })}
                                    className="border border-gray-700 rounded-lg"
                                    disabled={isEdit} // disable editing tag (unique id)
                                />

                                <label>Breed:</label>
                                <input
                                    {...methods.register("breed", { required: true })}
                                    className="border border-gray-700 rounded-lg"
                                />

                                <label>Gender:</label>
                                <select
                                    {...methods.register("gender", { required: true })}
                                    className="border border-gray-700 rounded-lg"
                                >
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                                <label>Weight:</label>
                                <input
                                    type="number"
                                    {...methods.register("weight", { required: true })}
                                    className="border border-gray-700 rounded-lg"
                                />
                            </div>
                        )}

                        {(isLayer || isBroiler) && (
                            <div className="flex flex-col gap-4 md:w-40">
                                <label>Flock Id:</label>
                                <input
                                    {...methods.register("tag", { required: true })}
                                    className="border border-gray-700 rounded-lg"
                                />
                                <label>Age of Flock:</label>
                                <input
                                    {...methods.register("age", { required: true })}
                                    className="border border-gray-700 rounded-lg"
                                />
                            </div>
                        )}
                    </>
                )}

                {/* Step 1: Birth Info */}
                {(step === 1 && (isCattle || isBuffalo)) && (
                    <div className="flex flex-col gap-4 md:w-40">
                        <label>Dam Tag No:</label>
                        <input
                            {...methods.register("dam")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Sire Tag No:</label>
                        <input
                            {...methods.register("sire")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Birth Weight:</label>
                        <input
                            type="number"
                            {...methods.register("birthWeight")}
                            className="border border-gray-700 rounded-lg"
                        />
                    </div>
                )}

                {/* Step 2: Reproductive Info (conditionally present) */}
                {isReproStepRequired && step === 2 && (
                    <div className="flex flex-col gap-4 md:w-40">
                        <label>Last Calving Date:</label>
                        <input
                            type="date"
                            {...methods.register("lastCalvingDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Lactation Stage:</label>
                        <select
                            {...methods.register("lactationStage")}
                            className="border border-gray-700 rounded-lg"
                        >
                            <option value="">Select</option>
                            <option value="Early">Early</option>
                            <option value="Mid">Mid</option>
                            <option value="Late">Late</option>
                            <option value="Dry">Dry</option>
                        </select>
                        <label>Last AI Date:</label>
                        <input
                            type="date"
                            {...methods.register("lastAiDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Pregnancy Status:</label>
                        <select
                            {...methods.register("pregnancyStatus")}
                            className="border border-gray-700 rounded-lg"
                        >
                            <option value="">Select</option>
                            <option value="Pregnant">Pregnant</option>
                            <option value="Not pregnant">Not pregnant</option>
                            <option value="To be Check">To be Check</option>
                            <option value="Infertile">Infertile</option>
                        </select>
                        <label>Expected Calving Date:</label>
                        <input
                            type="date"
                            {...methods.register("expectedCalvingDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Age of Pregnancy:</label>
                        <input
                            type="number"
                            {...methods.register("ageOfPregnancy")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Last Heat Date:</label>
                        <input
                            type="date"
                            {...methods.register("lastHeatDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Reproductive Comment:</label>
                        <textarea
                            {...methods.register("reproductiveComment")}
                            className="bg-gray-50 w-[600px] border border-gray-300 text-black text-lg rounded-lg p-4"
                        />
                    </div>
                )}

                {/* Final Step (Health Info) - Adjusted for step index */}
                {step === steps.length - 1 && (
                    <div className="flex flex-col gap-4 md:w-40">
                        <label>Vaccination Type:</label>
                        <input
                            {...methods.register("vaccinationType")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Vaccination Date:</label>
                        <input
                            type="date"
                            {...methods.register("vaccinationDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Next Vaccination Date:</label>
                        <input
                            type="date"
                            {...methods.register("nextVaccinationDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Deworming Type:</label>
                        <input
                            {...methods.register("dewormingType")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Last Deworming Date:</label>
                        <input
                            type="date"
                            {...methods.register("lastDewormingDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Next Deworming Date:</label>
                        <input
                            type="date"
                            {...methods.register("nextDewormingDate")}
                            className="border border-gray-700 rounded-lg"
                        />
                        <label>Disease Comment:</label>
                        <textarea
                            {...methods.register("diseaseComment")}
                            className="bg-gray-50 w-[600px] border border-gray-300 text-black text-lg rounded-lg p-4"
                        />
                        <label>Treatments Comment:</label>
                        <textarea
                            {...methods.register("treatmentComment")}
                            className="bg-gray-50 w-[600px] border border-gray-300 text-black text-lg rounded-lg p-4"
                        />

                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                    {step > 0 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="py-2 px-3 border rounded bg-white text-gray-900 hover:bg-blue-400 hover:text-white"
                        >
                            ⪻ Previous
                        </button>
                    )}

                    <button
                        type="submit"
                        className="py-2 px-3 border rounded bg-white text-gray-900 hover:bg-green-400 hover:text-white"
                    >
                        {step < steps.length - 1 ? "Next ⪼" : isEdit ? "✅ Update" : "✅ Submit"}
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
