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
  const router = useRouter();
  const currentStep = steps[step];

  const getInputType = (field: keyof FormValues) => {
    if (field === "email") return "email";
    if (field === "password" || field === "confirmPassword") return "password";
    if (field === "year") return "number";
    return "text";
  };

  const getLabel = (field: keyof FormValues) => {
    if (field === "confirmPassword") return "Confirm Password";
    return field.replace(/([A-Z])/g, " $1");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-black">
        {currentStep.title}
      </h2>

      <div className="space-y-4 text-black">
        {currentStep.fields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 capitalize">{getLabel(field)}</label>

            {field === "role" ? (
              <select
                {...methods.register("role")}
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
                type={getInputType(field)}
                {...methods.register(field, {
                  valueAsNumber: field === "year",
                })}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}

            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={() =>
            step === 0 ? router.push("/dashboard/admin") : onBack()
          }
          className="px-4 py-2 rounded-2xl transition bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          {step === 0 ? "Cancel" : "Back"}
        </button>

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

export default function NewUserForm({
  defaultValues,
  isEdit = false,
  onSubmit,
}: NewUserFormProps) {
  const { addUser, users } = useUserContext();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const methods = useForm<FormValues>({
    defaultValues: defaultValues || {
      name: "",
      email: "",
      password: "",
      role: "" as Role,
      department: "",
      year: undefined,
    },
  });

  const role = methods.watch("role") || defaultValues?.role;

  let stepsConfig: { title: string; fields: (keyof FormValues)[] }[] = [
    {
      title: "Basic Information",
      fields: ["name", "email", "password", "role"],
    },
    {
      title: "Student Information",
      fields: ["department", "year"],
    },
  ];

  stepsConfig = stepsConfig.filter(
    (s) => !(s.title === "Student Information" && role !== "student")
  );

  const validateStep = (): boolean => {
    const currentFields = stepsConfig[step].fields;
    let valid = true;
    const newErrors: { [key: string]: string } = {};

    currentFields.forEach((field) => {
      const value = methods.getValues(field);

      if (!value) {
        newErrors[field] = "This field is required";
        valid = false;
      }
    });

    const emailValue = methods.getValues("email");

    if (
      emailValue &&
      users.some(
        (u) =>
          u.email === emailValue &&
          (!isEdit || u._id !== defaultValues?._id)
      )
    ) {
      newErrors.email = "This email is already registered";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    setStep((s) => s - 1);
  };

  const submitHandler = async (data: FormValues) => {
    if (!validateStep()) return;

    const user: User = {
      _id: defaultValues?._id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      department: data.role === "student" ? data.department : undefined,
      year: data.role === "student" ? Number(data.year) : undefined,
    };

    if (isEdit) {
      onSubmit?.(user);
    } else {
      await addUser(user);
    }

    router.push("/dashboard/admin#userTable");
  };

  return (
    <div className="min-h-screen bg-[#D7F5DC] flex justify-center items-start py-10">
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