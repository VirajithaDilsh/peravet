"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton: React.FC = () => {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 bg-gray-300 rounded-full hover:bg-gray-400 transition w-full sm:w-auto"
        >
            Back
        </button>
    );
};

export default BackButton;
