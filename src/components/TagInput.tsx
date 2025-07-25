"use client";
import React from "react";

interface TagInputProps {
    label?: string;
    placeholder?: string;
    value: string | number;
    onChangeAction: (newValue: string) => void;
    type?: "text" | "number" | "date";
    step?: string;
    className?: string; // ✅ allow custom styles too
}

export default function TagInput({
                                     label = "Tag No:",
                                     placeholder = "Enter value",
                                     value,
                                     onChangeAction,
                                     type = "text",
                                     step,
                                     className,
                                 }: TagInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeAction(e.target.value);
    };

    return (
        <div
            className={`flex flex-col space-y-1 sm:space-y-2 w-full ${className || ""}`}
        >
            {/* Responsive label */}
            <label
                htmlFor="tagInput"
                className="text-xs sm:text-sm md:text-base font-semibold text-black"
            >
                {label}
            </label>

            {/* Responsive input */}
            <div className="relative">
                <input
                    id="tagInput"
                    type={type}
                    value={value}
                    step={type === "number" ? step || "any" : undefined}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="
            appearance-none w-full
            px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5
            border border-gray-300 rounded-lg
            text-xs sm:text-sm md:text-base
            focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
}
