import { cn } from "@/lib/utils";
import React from "react";

export function Button({
                           className,
                           variant = "default",
                           ...props
                       }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "destructive";
}) {
    const baseStyles =
        "inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors";

    const variantStyles = {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
        destructive: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            className={cn(baseStyles, variantStyles[variant], className)}
            {...props}
        />
    );
}
