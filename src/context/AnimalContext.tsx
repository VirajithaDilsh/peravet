"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Animal } from "@/types/animals";

// FUTURE: API service (currently not used)
// import {
//     getAnimalsAPI,
//     createAnimalAPI,
//     updateAnimalAPI,
//     deleteAnimalAPI,
// } from "@/services/animalApi";

interface AnimalContextProps {
    animals: Animal[];
    addAnimal: (animal: Animal) => void;
    deleteAnimal: (tag: string) => void;
    editAnimal: (animal: Animal) => void;
    getAnimalByTag: (tag: string) => Animal | undefined;
    updateAnimal: (tag: string, updater: (animal: Animal) => Animal) => void;
}

const AnimalContext = createContext<AnimalContextProps | undefined>(undefined);

export const AnimalProvider = ({ children }: { children: React.ReactNode }) => {
    const [animals, setAnimals] = useState<Animal[]>([]);

    // ------------------------------------------------
    // Load animals (currently from localStorage)
    // ------------------------------------------------
    useEffect(() => {

        // FUTURE BACKEND VERSION
        /*
        const loadAnimals = async () => {
            const data = await getAnimalsAPI();
            setAnimals(data);
        };
        loadAnimals();
        */

        const stored = localStorage.getItem("animalData");
        if (stored) {
            setAnimals(JSON.parse(stored));
        }
    }, []);

    // ------------------------------------------------
    // Sync animals to localStorage
    // ------------------------------------------------
    useEffect(() => {
        localStorage.setItem("animalData", JSON.stringify(animals));
    }, [animals]);

    // ------------------------------------------------
    // Add Animal
    // ------------------------------------------------
    const addAnimal = (animal: Animal) => {

        // FUTURE BACKEND
        // await createAnimalAPI(animal);

        setAnimals((prev) => [...prev, animal]);
    };

    // ------------------------------------------------
    // Delete Animal
    // ------------------------------------------------
    const deleteAnimal = (tag: string) => {

        // FUTURE BACKEND
        // await deleteAnimalAPI(tag);

        setAnimals((prev) => prev.filter((a) => a.tag !== tag));
    };

    // ------------------------------------------------
    // Edit Animal
    // ------------------------------------------------
    const editAnimal = (updatedAnimal: Animal) => {

        // FUTURE BACKEND
        // await updateAnimalAPI(updatedAnimal.tag, updatedAnimal);

        setAnimals((prev) =>
            prev.map((a) => (a.tag === updatedAnimal.tag ? updatedAnimal : a))
        );
    };

    // ------------------------------------------------
    // Get Animal
    // ------------------------------------------------
    const getAnimalByTag = (tag: string): Animal | undefined => {
        return animals.find((a) => a.tag === tag);
    };

    // ------------------------------------------------
    // Update Animal (Updater Pattern)
    // ------------------------------------------------
    const updateAnimal = (tag: string, updater: (animal: Animal) => Animal) => {

        // FUTURE BACKEND
        // const updatedAnimal = updater(animals.find(a => a.tag === tag)!);
        // await updateAnimalAPI(tag, updatedAnimal);

        setAnimals((prev) =>
            prev.map((animal) =>
                animal.tag === tag ? updater(animal) : animal
            )
        );
    };

    return (
        <AnimalContext.Provider
            value={{
                animals,
                addAnimal,
                deleteAnimal,
                editAnimal,
                getAnimalByTag,
                updateAnimal,
            }}
        >
            {children}
        </AnimalContext.Provider>
    );
};

export const useAnimalContext = () => {
    const context = useContext(AnimalContext);
    if (!context) {
        throw new Error("useAnimalContext must be used within AnimalProvider");
    }
    return context;
};