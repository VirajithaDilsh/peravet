"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, sampleUsers } from "@/types/users";

interface UserContextProps {
    users: User[];
    currentUser: User | null;
    loading: boolean; // ✅ expose loading state

    login: (email: string, password: string) => boolean;
    logout: () => void;
    addUser: (user: User) => void;
    editUser: (user: User) => void;
    deleteUser: (id: string) => void;
    getUserById: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load users + currentUser from localStorage
    useEffect(() => {
        const storedUsers = localStorage.getItem("userData");
        const dynamicUsers = storedUsers ? JSON.parse(storedUsers) : [];

        // ✅ Combine sampleUsers + dynamic users
        setUsers([...sampleUsers, ...dynamicUsers]);

        const storedCurrentUser = localStorage.getItem("currentUser");
        if (storedCurrentUser) setCurrentUser(JSON.parse(storedCurrentUser));

        setLoading(false);
    }, []);

    // Persist only dynamic users
    useEffect(() => {
        const dynamicUsers = users.filter(
            u => !sampleUsers.some(su => su.id === u.id) // skip sampleUsers
        );
        localStorage.setItem("userData", JSON.stringify(dynamicUsers));
    }, [users]);

    // Persist currentUser
    useEffect(() => {
        if (currentUser) localStorage.setItem("currentUser", JSON.stringify(currentUser));
        else localStorage.removeItem("currentUser");
    }, [currentUser]);

    const login = (email: string, password: string): boolean => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return true;
        }
        return false;
    };

    const logout = () => setCurrentUser(null);

    const addUser = (user: User) => setUsers(prev => [...prev, user]);

    const editUser = (updatedUser: User) =>
        setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));

    const deleteUser = (id: string) =>
        setUsers(prev => prev.filter(u => u.id !== id));

    const getUserById = (id: string): User | undefined =>
        users.find(u => u.id === id);

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
