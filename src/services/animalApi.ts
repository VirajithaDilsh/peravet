import axios from "axios";
import { Animal } from "@/types/animals";

const API_URL = "http://localhost:5000/api/animals";

// GET all animals
export const getAnimals = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

// CREATE animal
export const createAnimal = async (animal: Animal) => {
    const res = await axios.post(API_URL, animal);
    return res.data;
};

// UPDATE animal
export const updateAnimal = async (tag: string, animal: Animal) => {
    const res = await axios.put(`${API_URL}/${tag}`, animal);
    return res.data;
};

// DELETE animal
export const deleteAnimal = async (tag: string) => {
    const res = await axios.delete(`${API_URL}/${tag}`);
    return res.data;
};