import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// ======================
// Konfigurasi dasar API
// ======================
const api = axios.create({
  baseURL:
    Platform.OS === "android"
      ? "http://10.56.130.204:8000/api"
      : "http://10.56.130.204:8000/api",
  timeout: 5000,
});

// URL untuk gambar / file
export const STORAGE_URL =
  Platform.OS === "android"
    ? "http://10.56.130.204:8000/storage/foto_dokter/"
    : "http://10.56.130.204:8000/storage/foto_dokter/";

// =======================================
// Interceptor untuk menambahkan token ke header
// =======================================
api.interceptors.request.use(
  async (config: any) => {
    const token = await AsyncStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// =======================================
// Interceptor untuk auto refresh token
// =======================================
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // Jika token expired (401) dan belum dicoba refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token && originalRequest.headers) {
              originalRequest.headers["Authorization"] = "Bearer " + token;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("No refresh token found");

        const res = await axios.post(
          `${api.defaults.baseURL}/refresh`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        const newToken = (res.data as any).access_token;
        await AsyncStorage.setItem("token", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refresh_token");
        router.replace("/Auth/LoginScreen")
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
