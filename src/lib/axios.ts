import axios from "axios";

const api = axios.create();

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401 && typeof window !== "undefined") {
            localStorage.removeItem("authToken");
            localStorage.removeItem("currentUser");
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(err);
    }
);

export default api;
