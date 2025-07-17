import axios from "axios";
import { useAuthStore } from "@/context/useAuthStore";

export const apiClient = axios.create({
    baseURL: "https://server.aptech.io/", 
});

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().access_token;
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}); 