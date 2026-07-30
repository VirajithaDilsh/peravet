import axios from "@/lib/axios";
import { ProductionRecord } from "@/types/Production";
import { API_PRODUCTION as API } from "@/config/api";

type ProductionRecordBody = Omit<ProductionRecord, "id"> & {
    id?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
};

// GET ALL
export const getProductionRecordsAPI = async () => {
    const res = await axios.get(API);
    return res.data;
};

// CREATE
export const createProductionRecordAPI = async (
    record: Omit<ProductionRecord, "id">
) => {
    const res = await axios.post(API, record);
    return res.data;
};

// UPDATE
export const updateProductionRecordAPI = async (
    id: string,
    record: ProductionRecordBody
) => {
    const cleanRecord = { ...record };

    delete cleanRecord.id;
    delete cleanRecord._id;
    delete cleanRecord.createdAt;
    delete cleanRecord.updatedAt;

    const res = await axios.put(`${API}/${id}`, cleanRecord);
    return res.data;
};

// DELETE
export const deleteProductionRecordAPI = async (id: string) => {
    const res = await axios.delete(`${API}/${id}`);
    return res.data;
};
