import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export const getAntrianList = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await api.get('/antrian/getAntrian', {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
            ? res.data
            : [];

};

export const checkIn = async (id: string) => {
    const token = await AsyncStorage.getItem('token');
    const res = await api.put(`/booking/${id}/check-in`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'Application/json'
        },
    });
    return res.data.data ?? res.data;
}