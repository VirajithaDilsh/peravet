import api from "@/lib/axios";
import { API_AUTH, API_BASE } from "@/config/api";
import { User } from "@/types/users";

interface LoginResponse {
    message: string;
    token: string;
    user: { id: string; name: string; email: string; role: User["role"] };
}

export const loginAPI = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await api.post(API_AUTH, { email, password });
    return res.data;
};

export const getUsersAPI = async (): Promise<User[]> => {
    const res = await api.get(API_BASE);
    return res.data.map((u: User & { _id?: string }) => ({ ...u, id: u.id || u._id }));
};

export const createUserAPI = async (user: Partial<User>): Promise<User> => {
    const res = await api.post(API_BASE, user);
    return res.data.user;
};

export const updateUserAPI = async (id: string, user: Partial<User>): Promise<User> => {
    const res = await api.put(`${API_BASE}/${id}`, user);
    return res.data;
};

export const deleteUserAPI = async (id: string): Promise<void> => {
    await api.delete(`${API_BASE}/${id}`);
};
