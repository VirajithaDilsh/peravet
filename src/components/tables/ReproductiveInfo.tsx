"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Cattle,
  Buffalo,
  Pig,
  Goat,
  Sheep,
  ReproductionInfo,
} from "@/types/animals";

import { useAnimalContext } from "@/context/AnimalContext";
import { renderValue } from "@/utils/renderValue";

// ======================
// DATE HELPER
// ======================
const formatDateForInput = (date?: string) => {
  if (!date) return "";
  return date.split("T")[0];
};

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
  { value: "Heifer", label: "Heifer" },
];

const breedingMethodOptions = [
  { value: "Natural Mating", label: "Natural Mating" },
  { value: "AI", label: "AI" },
];

type Props = {
  animal: Cattle | Buffalo | Pig | Goat | Sheep;
};

export default function ReproductionPage({ animal }: Props) {
  const { updateAnimal } = useAnimalContext();

  const defaultValues: ReproductionInfo =
    animal?.reproduction?.[0] ?? ({} as ReproductionInfo);

  const { register, handleSubmit, reset, watch } = useForm<ReproductionInfo>({
    defaultValues,
  });

  const [isEditing, setIsEditing] = useState(false);

  const breedingMethod = watch("breedingMethod", defaultValues.breedingMethod);

  const species = animal?.species?.trim();

  // ======================
  // RESET WITH DATE FIX
  // ======================
  useEffect(() => {
    reset({
      ...defaultValues,
      lastCalvingDate: formatDateForInput(defaultValues.lastCalvingDate),
      lastAiDate: formatDateForInput(defaultValues.lastAiDate),
      nextAiDate: formatDateForInput(defaultValues.nextAiDate),
      expectedCalvingDate: formatDateForInput(
        defaultValues.expectedCalvingDate,
      ),
      lastHeatDate: formatDateForInput(defaultValues.lastHeatDate),
      matingDate: formatDateForInput(defaultValues.matingDate),
      aiDate: formatDateForInput(defaultValues.aiDate),
      farrowingDate: formatDateForInput(defaultValues.farrowingDate),
      weaningDate: formatDateForInput(defaultValues.weaningDate),
    });
  }, [animal, reset]);

  const onSubmit = async (data: ReproductionInfo) => {
    try {
      await updateAnimal(animal._id!, (prev) => ({
        ...prev,
        reproduction: [data],
      }));

      setIsEditing(false);
    } catch (err) {
      console.log("Update error:", err);
    }
  };

  const cattleBuffaloFields =
    species === "Cattle" || species === "Buffalo"
      ? [
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
          {
            label: "Age of Pregnancy (days)",
            name: "ageOfPregnancy",
            type: "number",
          },
          {
            label: "Expected Calving Date",
            name: "expectedCalvingDate",
            type: "date",
          },
          { label: "Last Heat Date", name: "lastHeatDate", type: "date" },
        ]
      : [];

  const pigFields =
    species === "Pig"
      ? [
          { label: "Parity", name: "parity", type: "number" },
          { label: "Mating Date", name: "matingDate", type: "date" },
          {
            label: "Breeding Method",
            name: "breedingMethod",
            type: "select",
            options: breedingMethodOptions,
          },
          ...(breedingMethod === "Natural Mating"
            ? [{ label: "Boar ID", name: "boarId", type: "text" }]
            : []),
          ...(breedingMethod === "AI"
            ? [{ label: "AI Date", name: "aiDate", type: "date" }]
            : []),
          { label: "Farrowing Date", name: "farrowingDate", type: "date" },
          { label: "Born Alive", name: "bornAlive", type: "number" },
          { label: "Born Dead", name: "bornDead", type: "number" },
          { label: "Mummified", name: "mummified", type: "number" },
          { label: "Weaning Date", name: "weaningDate", type: "date" },
        ]
      : [];

  const smallRuminantFields =
    species === "Goat" || species === "Sheep"
      ? [
          { label: "Mating Date", name: "matingDate", type: "date" },
          {
            label: "Pregnancy Status",
            name: "pregnancyStatus",
            type: "select",
            options: pregnancyOptions,
          },
          {
            label: "Expected Birth Date",
            name: "expectedCalvingDate",
            type: "date",
          },
          { label: "Last Heat Date", name: "lastHeatDate", type: "date" },
        ]
      : [];

  const reproductionFields = [
    ...cattleBuffaloFields,
    ...pigFields,
    ...smallRuminantFields,
  ];

  return (
    <div className="p-6 w-full">
      <div className="w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="flex justify-end">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
            >
              Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 divide-y">
          {reproductionFields.length > 0 ? (
            reproductionFields.map((field) => (
              <div key={field.name} className="flex flex-col sm:flex-row py-2">
                <label className="w-full sm:w-1/4 text-sm font-medium text-gray-600">
                  {field.label}
                </label>

                <div className="w-full sm:w-3/4">
                  {!isEditing ? (
                    <p>
                      {field.type === "date"
                        ? formatDateForInput(
                            defaultValues?.[
                              field.name as keyof ReproductionInfo
                            ] as string,
                          )
                        : renderValue(
                            defaultValues?.[
                              field.name as keyof ReproductionInfo
                            ],
                          )}
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
            ))
          ) : (
            <p className="text-gray-500">
              Reproduction not available for this species
            </p>
          )}

          <div className="py-2">
            <label>Comment</label>

            {!isEditing ? (
              <p>{renderValue(defaultValues.reproductiveComment)}</p>
            ) : (
              <textarea
                {...register("reproductiveComment")}
                className="w-full border p-2 rounded"
                rows={3}
              />
            )}
          </div>

          {isEditing && (
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  reset(defaultValues);
                  setIsEditing(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
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
