"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Animal } from "@/types/animals";

import {
    getAnimalsAPI,
    createAnimalAPI,
    updateAnimalAPI,
    deleteAnimalAPI,
} from "@/services/animalApi";

// ======================
// CONTEXT TYPE
// ======================
interface AnimalContextProps {
    animals: Animal[];

    addAnimal: (animal: Animal) => Promise<void>;
    deleteAnimal: (id: string) => Promise<void>;
    editAnimal: (animal: Animal) => Promise<void>;

    getAnimalById: (id: string) => Animal | undefined;

    updateAnimal: (
        id: string,
        updater: (animal: Animal) => Animal
    ) => Promise<void>;

    reloadAnimals: () => Promise<void>;
}

const AnimalContext = createContext<AnimalContextProps | undefined>(
    undefined
);

// ======================
// PROVIDER
// ======================
export const AnimalProvider = ({
                                   children,
                               }: {
    children: React.ReactNode;
}) => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    // ======================
    // LOAD FROM BACKEND
    // ======================
    const reloadAnimals = async () => {
        try {
            const data = await getAnimalsAPI();
            setAnimals(data);
        } catch (err) {
            console.log("Load error:", err);
        }
    };

    useEffect(() => {
        reloadAnimals();
    }, []);

    // ======================
    // ADD ANIMAL
    // ======================
    const addAnimal = async (animal: Animal) => {
        try {
            console.log("🚀 Sending animal to backend:", animal); // 👈 ADD THIS

            const created = await createAnimalAPI(animal);

            setAnimals((prev) => [...prev, created]);
        } catch (err) {
            console.log(err);
        }
    };

    // ======================
    // DELETE ANIMAL
    // ======================
    const deleteAnimal = async (id: string) => {
        try {
            await deleteAnimalAPI(id);
            setAnimals((prev) => prev.filter((a: any) => a._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    // ======================
    // EDIT ANIMAL
    // ======================
    const editAnimal = async (animal: Animal & { _id?: string }) => {
        try {
            const updated = await updateAnimalAPI(
                (animal as any)._id,
                animal
            );

            setAnimals((prev) =>
                prev.map((a: any) =>
                    a._id === (animal as any)._id ? updated : a
                )
            );
        } catch (err) {
            console.log(err);
        }
    };

    // ======================
    // GET BY ID
    // ======================
    const getAnimalById = (id: string) => {
        return animals.find((a: any) => a._id === id);
    };

    // ======================
    // UPDATE WITH FUNCTION
    // ======================
    const updateAnimal = async (
        id: string,
        updater: (animal: Animal) => Animal
    ) => {
        try {
            const current = animals.find((a: any) => a._id === id);
            if (!current) return;

            const updatedAnimal = updater(current);

            const updated = await updateAnimalAPI(id, updatedAnimal);

            setAnimals((prev) =>
                prev.map((a: any) => (a._id === id ? updated : a))
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AnimalContext.Provider
            value={{
                animals,
                addAnimal,
                deleteAnimal,
                editAnimal,
                getAnimalById,
                updateAnimal,
                reloadAnimals,
            }}
        >
            {children}
        </AnimalContext.Provider>
    );
};

// ======================
// HOOK
// ======================
export const useAnimalContext = () => {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error(
            "useAnimalContext must be used within AnimalProvider"
        );
    }
    return context;
};