// Backend base URL; trailing slashes are stripped so paths never become "//api/..."
export const API_URL = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
