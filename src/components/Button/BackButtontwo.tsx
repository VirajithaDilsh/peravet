"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackToInventory() {
    const router = useRouter();

    return (
        <div
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-500 cursor-pointer hover:underline mb-4"
        >
            <ArrowLeft className="w-4 h-4" />
            <span>Back </span>
        </div>
    );
}