"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "@/types/users";
import {
    loginAPI,
    getUsersAPI,
    createUserAPI,
    updateUserAPI,
    deleteUserAPI,
} from "@/services/userApi";

interface UserContextProps {
    users: User[];
    currentUser: User | null;
    loading: boolean;

    login: (email: string, password: string) => Promise<boolean>;

    logout: () => void;
    addUser: (user: Partial<User>) => Promise<void>;
    editUser: (user: User) => Promise<void>;
    deleteUser: (id: string) => Promise<void>;
    getUserById: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const reloadUsers = async () => {
        try {
            const data = await getUsersAPI();
            setUsers(data);
        } catch (err) {
            console.error("Load users error:", err);
        }
    };

    // Hydrate session from localStorage on first load
    useEffect(() => {
        const storedCurrentUser = localStorage.getItem("currentUser");
        const token = localStorage.getItem("authToken");

        if (storedCurrentUser && token) {
            setCurrentUser(JSON.parse(storedCurrentUser));
            reloadUsers().finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const { token, user } = await loginAPI(email, password);
            localStorage.setItem("authToken", token);
            localStorage.setItem("currentUser", JSON.stringify(user));
            setCurrentUser(user as User);
            await reloadUsers();
            return true;
        } catch {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        setUsers([]);
    };

    const addUser = async (user: Partial<User>) => {
        await createUserAPI(user);
        await reloadUsers();
    };

    const editUser = async (updatedUser: User) => {
        const saved = await updateUserAPI(updatedUser.id, updatedUser);
        setUsers((prev) => prev.map((u) => (u.id === saved.id ? saved : u)));
        if (currentUser?.id === saved.id) {
            const merged = { ...currentUser, ...saved };
            setCurrentUser(merged);
            localStorage.setItem("currentUser", JSON.stringify(merged));
        }
    };

    const deleteUser = async (id: string) => {
        await deleteUserAPI(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    const getUserById = (id: string): User | undefined =>
        users.find((u) => u.id === id);

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
