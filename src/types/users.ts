// src/types/users.ts
export type Role = "admin" | "doctor" | "student" | "employee";

// Base User
interface BaseUser {
    id: string;
    name: string;
    email: string;
    password: string;
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
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    department?: string; // only for students
    year?: number;       // only for students
    confirmPassword?: string;
}






// Sample users
export const sampleUsers: User[] = [
    { id: "1", name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" },
    { id: "2", name: "Dr. Smith", email: "doctor@example.com", password: "doctor123", role: "doctor" },
    { id: "3", name: "John Student", email: "student@example.com", password: "student123", role: "student", department: "Veterinary Science", year: 3 },
    { id: "4", name: "Jane Employee", email: "employee@example.com", password: "employee123", role: "employee" },
    { id: "5", name: "Peravtf Admin User", email: "peravtfadm@example.com", password: "2328687Al", role: "admin" },
];
