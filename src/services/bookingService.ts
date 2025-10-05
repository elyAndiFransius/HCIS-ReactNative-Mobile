import api from '@/src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getbookingList = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await api.get('/booking/show', {
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

export const getbookingById = async (id: string) => {
    const token = await AsyncStorage.getItem('token');
    const res = await api.get(`/booking/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return res.data.data ?? res.data;
};

export const getAntrianById = async (id: string) => {
    const token = await AsyncStorage.getItem('token');
    const res = await api.get(`/booking/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });
    return res.data.data ?? res.data;
};
