import api from '@/src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPoliList = async () => {
  const token = await AsyncStorage.getItem('token');
  const res = await api.get('/poli/index', {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return res.data.data ?? res.data;
};

export const getPoliById = async (id: string) => {
  const token = await AsyncStorage.getItem('token');
  const res = await api.get(`/poli/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return res.data.data ?? res.data;
};
