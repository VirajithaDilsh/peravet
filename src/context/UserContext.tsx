"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/types/users";
import api from "@/utils/api";

interface UserContextProps {
    users: User[];
    currentUser: User | null;
    loading: boolean;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    addUser: (user: User) => Promise<User | null>;
    editUser: (user: User) => Promise<User | null>;
    deleteUser: (id: string) => Promise<boolean>;
    getUserById: (id: string) => Promise<User | null>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch all users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users");
                setUsers(res.data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Login
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const res = await api.post("/login", { email, password });
            setCurrentUser(res.data);
            return true;
        } catch (err) {
            console.error("Login failed", err);
            return false;
        }
    };

    const logout = () => setCurrentUser(null);

    // Add user
    const addUser = async (user: User): Promise<User | null> => {
        try {
            const res = await api.post("/users", user);
            setUsers(prev => [...prev, res.data]);
            return res.data;
        } catch (err) {
            console.error("Failed to add user", err);
            return null;
        }
    };

    // Edit user
    const editUser = async (user: User): Promise<User | null> => {
        try {
            const res = await api.put(`/users/${user.id}`, user);
            setUsers(prev => prev.map(u => (u.id === user.id ? res.data : u)));
            if (currentUser?.id === user.id) setCurrentUser(res.data);
            return res.data;
        } catch (err) {
            console.error("Failed to edit user", err);
            return null;
        }
    };

    // Delete user
    const deleteUser = async (id: string): Promise<boolean> => {
        try {
            await api.delete(`/users/${id}`);
            setUsers(prev => prev.filter(u => u.id !== id));
            if (currentUser?.id === id) setCurrentUser(null);
            return true;
        } catch (err) {
            console.error("Failed to delete user", err);
            return false;
        }
    };

    // Get user by ID
    const getUserById = async (id: string): Promise<User | null> => {
        try {
            const res = await api.get(`/users/${id}`);
            return res.data;
        } catch (err) {
            console.error("Failed to get user", err);
            return null;
        }
    };

    return (
        <UserContext.Provider
            value={{
                users,
                currentUser,
                loading,
                login,
                logout,
                addUser,
                editUser,
                deleteUser,
                getUserById,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Custom hook
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUserContext must be used within UserProvider");
    return context;
};
