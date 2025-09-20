"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useAnimalContext } from "@/context/AnimalContext";
import StepForm from "@/components/StepForm";
import { AnimalForm } from "@/types/AnimalForm";
import { Animal, Treatment } from "@/types/animals";

interface AnimalEntryFormProps {
    defaultValues?: Partial<AnimalForm>;
    isEdit?: boolean;
    onSubmit?: (animal: Animal) => void;
}

const AnimalEntryForm: React.FC<AnimalEntryFormProps> = ({
                                                             defaultValues,
                                                             isEdit = false,
                                                             onSubmit,
                                                         }) => {
    const params = useParams();
    const router = useRouter();
    const { addAnimal, editAnimal } = useAnimalContext();
    const [step, setStep] = useState(0);

    // ✅ Detect species from URL if available
    const speciesFromUrl = params?.species
        ? (params.species as string).charAt(0).toUpperCase() +
        (params.species as string).slice(1)
        : "";

    const methods = useForm<AnimalForm>({
        defaultValues: defaultValues || { species: speciesFromUrl },
    });

    const gender = methods.watch("gender") || defaultValues?.gender;

    // ✅ Steps config
    let steps: { title: string; fields: (keyof AnimalForm)[] }[] = [
        {
            title: "Basic Information",
            fields: ["species", "tag", "breed", "gender","initialFlockSize","currentFlockSize","mortilityRate"],
        },
        {
            title: "Birth Info",
            fields: ["dam", "sire", "birthDate", "birthWeight"],
        },
        {
            title: "Reproductive Info",
            fields: ["lastCalvingDate","lactationStage","weight", "lastAiDate", "nextAiDate", "pregnancyStatus","lastHeatDate","reproductiveComment"],
        },
    ];

    // ✅ Only show reproductive info for female
    const species = methods.watch("species") || defaultValues?.species;

    const poultryHides = new Set(["Birth Info" , "Health Info"]);

    steps = steps.filter((s) =>
        !(
            (s.title === "Reproductive Info" && gender !== "Female") ||
            ((species === "Layer" || species === "Broiler") && poultryHides.has(s.title))
        )
    );



    const handleNext = () => {
        const required: (keyof AnimalForm)[] = ["species", "tag", "breed"]; // always needed

        const species = methods.getValues("species");

        // only require gender if not Layer or Broiler
        if (species !== "Layer" && species !== "Broiler") {
            required.push("gender");
        }

        const valid = required.every((f) => !!methods.getValues(f));
        if (!valid) {
            alert(`Please fill required fields: ${required.join(", ")} before continuing.`);
            return;
        }

        setStep((s) => s + 1);
    };

    const handleBack = () => setStep((s) => s - 1);

    const submitHandler = (data: AnimalForm) => {
        if (!data.species) return;

        const animal: Animal = {
            ...data,
            status: data.status || "Alive",
            treatments: data.treatments as Treatment[],
        } as Animal;

        if (isEdit) editAnimal(animal);
        else addAnimal(animal);

        if (onSubmit) onSubmit(animal);

        // ✅ Redirect back to species page
        router.push(`/dashboard/${data.species.toLowerCase()}`);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(submitHandler)}>
                <StepForm
                    step={step}
                    steps={steps}
                    methods={methods}
                    onNext={handleNext}
                    onBack={handleBack}
                    disableSpecies={!!speciesFromUrl} // auto-lock species if from URL
                />

                {/* ✅ Only show submit on last step */}
                {step === steps.length - 1 && (
                    <div className="mt-4 text-right">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};

export default AnimalEntryForm;
