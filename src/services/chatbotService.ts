import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export const sendChat = async (message: string) => {
    try {
        const token = await AsyncStorage.getItem("token");

        const res = await api.post(
            "/chatbot/index",
            { message: message },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        return res.data; // { reply: "..." }
    } catch (err: any) {
        console.error("Error chatbot:", err.response?.data || err.message);
        throw err;
    }
};