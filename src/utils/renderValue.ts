import { AssignedUser } from "@/types/animals";

export function renderValue(
    value: string | number | AssignedUser[] | undefined | null
): string {
    if (value === null || value === undefined) return "-";

    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }

    if (Array.isArray(value)) {
        return value.map((u) => u.name).join(", ");
    }

    return "-";
}