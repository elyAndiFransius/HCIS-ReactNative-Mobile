import { useContext } from "react";
import { AuthContext } from "../api/AuthProvider";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("use harus dipanggil di dalam AuthProvider")
    }
    return context;
}