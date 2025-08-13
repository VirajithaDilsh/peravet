export function isValidISODate(s?: string): s is string {
    if (!s) return false;
    const d = new Date(s);
    return !isNaN(d.getTime()) && /^\d{4}-\d{2}-\d{2}/.test(s);
}

export function daysBetween(a: Date, b: Date) {
    const ms = 24 * 60 * 60 * 1000;
    return Math.floor((a.setHours(0,0,0,0) - b.setHours(0,0,0,0)) / ms);
}

export function toDate(s: string) {
    return new Date(s);
}

export function formatDate(s: string) {
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}