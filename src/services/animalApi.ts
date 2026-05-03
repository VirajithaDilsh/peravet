import axios from "axios";
import { Animal } from "@/types/animals";

const API =
    "https://silver-memory-g4pp67xgrx6v39rqw-5000.app.github.dev/api/animals";

type AnimalBody = Animal & {
    _id?: string;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
};

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
// UPDATE
export const updateAnimalAPI = async (id: string, animal: AnimalBody) => {
    const cleanAnimal = { ...animal };

    delete cleanAnimal._id;
    delete cleanAnimal.__v;
    delete cleanAnimal.createdAt;
    delete cleanAnimal.updatedAt;

    const res = await axios.put(`${API}/${id}`, cleanAnimal);
    return res.data;
};

// DELETE
export const deleteAnimalAPI = async (id: string) => {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
};