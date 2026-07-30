const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const API_BASE = `${API_ROOT}/users`;       // for GET, POST, etc.
export const API_AUTH = `${API_ROOT}/users/login`; // for login only
export const API_ANIMALS = `${API_ROOT}/animals`;
export const API_PRODUCTION = `${API_ROOT}/production`;
export const API_TASKS = `${API_ROOT}/tasks`;

