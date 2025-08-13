import { cn } from "@/lib/utils";
import React from "react";

export function Badge({
                          className,
                          variant = "default",
                          ...props
                      }: React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "outline";
}) {
    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
                variant === "default"
                    ? "bg-blue-600 text-white"
                    : "border border-blue-600 text-blue-600",
                className
            )}
            {...props}
        />
    );
}
