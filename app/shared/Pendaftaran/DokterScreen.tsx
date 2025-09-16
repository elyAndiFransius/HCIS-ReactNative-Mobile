import api from '@/src/api/api';
import BackNavbar from '@/src/components/BackNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function DokterScreen() {
  const [dokterList, setDokterList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { poliId, date } = useLocalSearchParams<{ poliId: string; date: string }>();

  const [selectDokterId, setSelectDokterId] = useState<number | null>(null);
  const [selectDokterName, setSelectDokterName] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  // buka modal dan simpan dokter yg dipilih
  const handlerModal = (dokterId: number, nama: string) => {
    setSelectDokterId(dokterId);
    setSelectDokterName(nama);
    setShowModal(true);
  };

  // konfirmasi → kirim ke CheckInScreen
  const hanlderConfirm = () => {
    if (selectDokterId) {
      router.push({
        pathname: '/shared/Pendaftaran/CheckInScreen',
        params: {
          dokterId: String(selectDokterId),
          namaDokter: selectDokterName,
          poliId: String(poliId),
          date: String(date),
        },
      });
    }
    setShowModal(false);
  };

  const showDokter = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Error', 'Token tidak ditemukan, silahkan login');
        return;
      }
      setLoading(true);
      const res = await api.get('/dokter/index', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'Application/json',
        },
        params: {
          poli_id: poliId,
          date: date,
        },
      });

      setDokterList(res.data.data ?? res.data);
    } catch (err: any) {
      console.log(err.response?.data ?? err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showDokter();
  }, []);

  return (
    <View className="flex-1 bg-gray-100">
      <BackNavbar />
      <SafeAreaView className="flex-1">
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={dokterList}
            keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <View className="bg-white p-4 mb-3 rounded-xl shadow">
                <TouchableOpacity onPress={() => handlerModal(item.id, item.nama)}>
                  <View className="flex-row items-center">
                    <Image
                      source={{ uri: 'https://i.pravatar.cc/100' }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full"
                      resizeMode="cover"
                    />
                    <View className="ml-4">
                      <Text className="font-bold text-blue-700">{item.nama}</Text>
                      <Text>{date}, 12:00</Text>
                      <Text>Nama Poli,</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={() => (
              <View className="m-2 py-10 px-5 bg-slate-200 rounded-lg shadow items-center">
                <Text className="text-lg font-bold text-gray-700">
                  Dokter belum ditambahkan Admin
                </Text>
                <Text className="text-base text-center font-semibold text-gray-500">
                  Semua data dokter akan ditampilkan di sini
                </Text>
              </View>
            )}
          />
        )}
      </SafeAreaView>

      {/* Modal konfirmasi */}
      <Modal visible={showModal} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-xl w-80">
            <Text className="font-bold text-lg mb-4">Apakah kamu yakin?</Text>
            <Text className="mb-4 text-gray-700">Dokter: {selectDokterName}</Text>

            <View className="flex-row justify-between mt-2">
              <TouchableOpacity
                className="p-3 bg-gray-200 rounded-lg"
                onPress={() => setShowModal(false)}
              >
                <Text>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 bg-blue-500 rounded-lg"
                onPress={hanlderConfirm}
              >
                <Text className="text-white">OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default DokterScreen;
