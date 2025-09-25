import api from '@/src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDokterList = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await api.get('/dokter/index', {
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

export const getDokterById = async (id: string) => {
    const token = await AsyncStorage.getItem('token');
    const res = await api.get(`/dokter/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return res.data.data ?? res.data;
};
