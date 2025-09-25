import axios from "axios";
import { Platform } from "react-native";

const api = axios.create({
    baseURL:
        Platform.OS === "android"
            ? "http://192.168.88.7:8000/api" 
            : "http://192.168.88.7:8000/api",
    timeout: 5000,
});

export const STORAGE_URL =
    Platform.OS === "android"
        ? "http://192.168.88.7:8000/storage/foto_dokter/"
        : "http://192.168.88.7:8000/storage/foto_dokter/";

export default api;
