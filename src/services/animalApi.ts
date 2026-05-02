import axios from "axios";
import { Animal } from "@/types/animals";

const API ="https://silver-memory-g4pp67xgrx6v39rqw-5000.app.github.dev/api/animals";

// GET ALL
export const getAnimalsAPI = async () => {
    const res = await axios.get(API);
    return res.data;
};

// CREATE
export const createAnimalAPI = async (animal: Animal) => {
    const res = await axios.post(API, animal);
    return res.data;
};

// UPDATE
export const updateAnimalAPI = async (tag: string, animal: Animal) => {
    const res = await axios.put(`${API}/${tag}`, animal);
    return res.data;
};

// DELETE
export const deleteAnimalAPI = async (tag: string) => {
    const res = await axios.delete(`${API}/${tag}`);
    return res.data;
};