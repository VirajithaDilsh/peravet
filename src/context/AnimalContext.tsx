"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Animal } from "@/types/animals";

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

    // Load animals from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("animalData");
        if (stored) {
            setAnimals(JSON.parse(stored));
        }
    }, []);

    // Sync animals to localStorage on change
    useEffect(() => {
        localStorage.setItem("animalData", JSON.stringify(animals));
    }, [animals]);

    const addAnimal = (animal: Animal) => {
        setAnimals((prev) => [...prev, animal]);
    };

    const deleteAnimal = (tag: string) => {
        setAnimals((prev) => prev.filter((a) => a.tag !== tag));
    };

    const editAnimal = (updatedAnimal: Animal) => {
        setAnimals((prev) =>
            prev.map((a) => (a.tag === updatedAnimal.tag ? updatedAnimal : a))
        );
    };

    const getAnimalByTag = (tag: string): Animal | undefined => {
        return animals.find((a) => a.tag === tag);
    };
    const updateAnimal = (tag: string, updater: (animal: Animal) => Animal) => {
        setAnimals(prev =>
            prev.map(animal =>
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
