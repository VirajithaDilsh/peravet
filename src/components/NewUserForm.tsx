"use client";

import React, { useState } from "react";
import { useUserContext } from "@/context/UserContext";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormValues, Role, User } from "@/types/users";

interface UserStepFormProps {
    step: number;
    steps: { title: string; fields: (keyof FormValues)[] }[];
    methods: UseFormReturn<FormValues>;
    onNext: () => void;
    onBack: () => void;
    errors: { [key: string]: string };
}

const UserStepForm: React.FC<UserStepFormProps> = ({
                                                       step,
                                                       steps,
                                                       methods,
                                                       onNext,
                                                       onBack,
                                                       errors,
                                                   }) => {
    const currentStep = steps[step];
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-black">{currentStep.title}</h2>
            <div className="space-y-4 text-black">
                {currentStep.fields.map((field) => {
                    const isNumber = field === "year";
                    return (
                        <div key={field} className="flex flex-col">
                            <label className="mb-1 capitalize">
                                {field === "id" ? "User ID" : field.replace(/([A-Z])/g, " $1")}
                            </label>
                            {field === "role" ? (
                                <select
                                    {...methods.register(field)}
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">Select role</option>
                                    <option value="admin">Admin</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="student">Student</option>
                                    <option value="employee">Employee</option>
                                </select>
                            ) : (
                                <input
                                    type={isNumber ? "number" : "text"}
                                    {...methods.register(field)}
                                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            )}
                            {errors[field] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex justify-between">
                {step > 0 && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition"
                    >
                        Back
                    </button>
                )}
                {step < steps.length - 1 && (
                    <button
                        type="button"
                        onClick={onNext}
                        className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

interface NewUserFormProps {
    defaultValues?: Partial<FormValues>;
    isEdit?: boolean;
    onSubmit?: (user: User) => void;
}

export default function NewUserForm({ defaultValues, isEdit = false, onSubmit }: NewUserFormProps) {
    const { addUser, users } = useUserContext();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const methods = useForm<FormValues>({
        defaultValues: defaultValues || { role: "" as Role },
    });

    const role = methods.watch("role") || defaultValues?.role;

    // Steps configuration
    let stepsConfig: { title: string; fields: (keyof FormValues)[] }[] = [
        { title: "Basic Information", fields: ["id", "name", "email", "password", "role"] },
        { title: "Student Information", fields: ["department", "year"] },
    ];

    // Only show student step for student role
    stepsConfig = stepsConfig.filter(
        (s) => !(s.title === "Student Information" && role !== "student")
    );

    const validateStep = (): boolean => {
        const currentFields = stepsConfig[step].fields;
        let valid = true;
        const newErrors: { [key: string]: string } = {};

        currentFields.forEach((f) => {
            const value = methods.getValues(f);
            if (!value) {
                newErrors[f] = "This field is required";
                valid = false;
            } else {
                newErrors[f] = "";
            }
        });

        // Check duplicate ID and email
        const idValue = methods.getValues("id");
        const emailValue = methods.getValues("email");
        if (users.some((u) => u.id === idValue && u.id !== defaultValues?.id)) {
            newErrors["id"] = "This ID is already taken";
            valid = false;
        }
        if (users.some((u) => u.email === emailValue && u.id !== defaultValues?.id)) {
            newErrors["email"] = "This email is already registered";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleNext = () => {
        if (!validateStep()) return;
        setStep((s) => s + 1);
    };

    const handleBack = () => setStep((s) => s - 1);

    const submitHandler = (data: FormValues) => {
        if (!validateStep()) return;

        const user: User =
            data.role === "student"
                ? {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role: "student",
                    department: data.department!,
                    year: data.year!,
                }
                : {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    role: data.role as Exclude<Role, "student">,
                };

        if (isEdit) onSubmit?.(user);
        else addUser(user);

        router.push("/dashboard/admin#userTable");
    };

    return (
        <div className="min-h-screen bg-green-500 flex justify-center items-start py-10">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(submitHandler)}
                    className="bg-white shadow-md rounded-2xl p-6 max-w-xl w-full"
                >
                    <UserStepForm
                        step={step}
                        steps={stepsConfig}
                        methods={methods}
                        onNext={handleNext}
                        onBack={handleBack}
                        errors={errors}
                    />

                    {step === stepsConfig.length - 1 && (
                        <div className="mt-6 text-right">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition"
                            >
                                {isEdit ? "Update User" : "Submit"}
                            </button>
                        </div>
                    )}
                </form>
            </FormProvider>
        </div>
    );
}
