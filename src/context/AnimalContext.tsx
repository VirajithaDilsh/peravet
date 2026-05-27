"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Animal } from "@/types/animals";

import {
  getAnimalsAPI,
  createAnimalAPI,
  updateAnimalAPI,
  deleteAnimalAPI,
} from "@/services/animalApi";

type AnimalWithId = Animal & { _id: string };

interface AnimalContextProps {
  animals: AnimalWithId[];

  addAnimal: (animal: Animal) => Promise<void>;
  deleteAnimal: (id: string) => Promise<void>;
  editAnimal: (animal: AnimalWithId) => Promise<void>;

  getAnimalById: (id: string) => AnimalWithId | undefined;
  getAnimalByTag: (tag: string) => AnimalWithId | undefined;

  updateAnimal: (
    id: string,
    updater: (animal: AnimalWithId) => AnimalWithId,
  ) => Promise<void>;

  reloadAnimals: () => Promise<void>;
}

const AnimalContext = createContext<AnimalContextProps | undefined>(undefined);

export const AnimalProvider = ({ children }: { children: React.ReactNode }) => {
  const [animals, setAnimals] = useState<AnimalWithId[]>([]);

  // ---------------- LOAD ----------------
  const reloadAnimals = async () => {
    try {
      const data = await getAnimalsAPI();
      setAnimals(data);
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  useEffect(() => {
    reloadAnimals();
  }, []);

  // ---------------- ADD ----------------
  const addAnimal = async (animal: Animal) => {
    try {
      const created = await createAnimalAPI(animal);
      setAnimals((prev) => [...prev, created]);
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // ---------------- DELETE ----------------
  const deleteAnimal = async (id: string) => {
  try {
    await deleteAnimalAPI(id);

    setAnimals((prev) => prev.filter((animal) => animal._id !== id));
  } catch (err) {
    console.error("Delete error:", err);
  }
};
  // ---------------- EDIT (full replace) ----------------
  const editAnimal = async (animal: AnimalWithId) => {
    try {
      const updated = await updateAnimalAPI(animal._id, animal);

      setAnimals((prev) =>
        prev.map((a) => (a._id === animal._id ? updated : a)),
      );
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  // ---------------- GET BY ID ----------------
  const getAnimalById = (id: string) => {
    return animals.find((a) => a._id === id);
  };
  // ---------------- GET BY TAG ----------------
  const getAnimalByTag = (tag: string) => {
    return animals.find((a) => a.tag === tag);
  };

  // ---------------- UPDATE (safe partial update) ----------------
  const updateAnimal = async (
    id: string,
    updater: (animal: AnimalWithId) => AnimalWithId,
  ) => {
    try {
      const current = animals.find((a) => a._id === id);

      if (!current) {
        console.error("Animal not found:", id);
        return;
      }

      const updatedAnimal = updater(current);

      // 🔥 IMPORTANT FIX: send only updated fields (safer for MongoDB)
      const updated = await updateAnimalAPI(id, updatedAnimal);

      setAnimals((prev) => prev.map((a) => (a._id === id ? updated : a)));
    } catch (err) {
      console.error("Update error:", err);
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
        getAnimalByTag,
      }}
    >
      {children}
    </AnimalContext.Provider>
  );
};

// ---------------- HOOK ----------------
export const useAnimalContext = () => {
  const context = useContext(AnimalContext);

  if (!context) {
    throw new Error("useAnimalContext must be used within AnimalProvider");
  }

  return context;
};
