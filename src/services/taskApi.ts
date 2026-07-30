import api from "@/lib/axios";
import { API_TASKS } from "@/config/api";
import { NewTaskInput, Task } from "@/types/Task";

// GET ALL
export const getTasksAPI = async (): Promise<Task[]> => {
    const res = await api.get(API_TASKS);
    return res.data;
};

// CREATE
export const createTaskAPI = async (task: NewTaskInput): Promise<Task> => {
    const res = await api.post(API_TASKS, task);
    return res.data;
};

// UPDATE
export const updateTaskAPI = async (id: string, task: Partial<Task>): Promise<Task> => {
    const res = await api.put(`${API_TASKS}/${id}`, task);
    return res.data;
};

// DELETE
export const deleteTaskAPI = async (id: string): Promise<void> => {
    await api.delete(`${API_TASKS}/${id}`);
};

// COMPLETE
export const completeTaskAPI = async (id: string): Promise<Task> => {
    const res = await api.patch(`${API_TASKS}/${id}/complete`);
    return res.data;
};

// UNDO
export const undoTaskAPI = async (id: string): Promise<Task> => {
    const res = await api.patch(`${API_TASKS}/${id}/undo`);
    return res.data;
};

// SNOOZE
export const snoozeTaskAPI = async (id: string, days: number): Promise<Task> => {
    const res = await api.patch(`${API_TASKS}/${id}/snooze`, { days });
    return res.data;
};
