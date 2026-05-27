import axios, { AxiosError } from "axios";

const API = "https://peravtf-express-backend.onrender.com/api/users";

export type User = {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

type LoginBody = {
  email: string;
  password: string;
};

type UserBody = User & {
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
};

type BackendErrorResponse = {
  message?: string;
  error?: string;
};

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// LOGIN
export const loginUserAPI = async (user: LoginBody) => {
  try {
    const res = await axios.post(`${API}/login`, user);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<BackendErrorResponse>;

    console.log("Backend login error:", error.response?.data);

    throw error;
  }
};

// CREATE USER
export const createUserAPI = async (user: User) => {
  const res = await axios.post(API, user, getAuthHeader());
  return res.data;
};

// GET ALL USERS
export const getUsersAPI = async () => {
  const res = await axios.get(API, getAuthHeader());
  return res.data;
};

// GET USER BY ID
export const getUserByIdAPI = async (id: string) => {
  const res = await axios.get(`${API}/${id}`, getAuthHeader());
  return res.data;
};

// UPDATE USER
export const updateUserAPI = async (id: string, user: UserBody) => {
  const cleanUser = { ...user };

  delete cleanUser._id;
  delete cleanUser.__v;
  delete cleanUser.createdAt;
  delete cleanUser.updatedAt;

  // If password is empty, do not send it to backend
  if (!cleanUser.password) {
    delete cleanUser.password;
  }

  const res = await axios.put(`${API}/${id}`, cleanUser, getAuthHeader());
  return res.data;
};

// DELETE USER
export const deleteUserAPI = async (id: string) => {
  const res = await axios.delete(`${API}/${id}`, getAuthHeader());
  return res.data;
};