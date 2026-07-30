// src/types/users.ts
export type Role = "admin" | "doctor" | "student" | "employee";

// Base User
// `password` is never present on a user loaded from the backend (it's hashed
// server-side and stripped from every response) — it only appears transiently
// when submitting a create/change-password form.
interface BaseUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: Role;
}

// Role-specific extensions
export interface AdminUser extends BaseUser { role: "admin"; }
export interface DoctorUser extends BaseUser { role: "doctor"; }
export interface StudentUser extends BaseUser { role: "student"; department: string; year: number; }
export interface EmployeeUser extends BaseUser { role: "employee"; }

// Union type
export type User = AdminUser | DoctorUser | StudentUser | EmployeeUser;

// Form type (for React Hook Form)
export interface FormValues {
    name: string;
    email: string;
    password: string;
    role: Role;
    department?: string; // only for students
    year?: number;       // only for students
    confirmPassword?: string;
}

