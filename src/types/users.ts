// src/types/users.ts

export type Role = "admin" | "doctor" | "student" | "employee";

// Base User
interface BaseUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Role-specific extensions
export interface AdminUser extends BaseUser {
  role: "admin";
}

export interface DoctorUser extends BaseUser {
  role: "doctor";
}

export interface StudentUser extends BaseUser {
  role: "student";
  department?: string;
  year?: number;
}

export interface EmployeeUser extends BaseUser {
  role: "employee";
}

// Union type
export type User = AdminUser | DoctorUser | StudentUser | EmployeeUser;

// Form type
export interface FormValues {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: Role;
  department?: string;
  year?: number;
  confirmPassword?: string;
}