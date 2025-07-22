"use client";
import React from "react";

interface TagInputProps {
    label?: string;
    placeholder?: string;
    value: string | number;
    onChangeAction: (newValue: string) => void;
    type?: "text" | "number" | "date";
    step?: string;
}

export default function TagInput({
                                     label = "Tag No:",
                                     placeholder = "Enter value",
                                     value,
                                     onChangeAction,
                                     type = "text",
                                     step,
                                 }: TagInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeAction(e.target.value);
    };

    return (
        <div className="flex flex-col space-y-2 w-64">
            <label htmlFor="tagInput" className="text-sm font-bold text-black">
                {label}
            </label>

            <div className="relative">
                <input
                    id="tagInput"
                    type={type}
                    value={value}
                    step={type === "number" ? step || "any" : undefined}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={"appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}
                />
            </div>
        </div>
    );
}
