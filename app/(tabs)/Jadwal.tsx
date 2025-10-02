import api from '@/src/api/api';
import TopBar from '@/src/components/TopBar';
import TopBarNormal from '@/src/components/TopBarNormal';
import { getbookingList } from '@/src/services/bookingService';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-row bg-white border-b justify-between border-gray-200"
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text className="text-gray-700 text-lg font-bold">
        Jadwal
      </Text>
      <Ionicons name='add' size={20} color={'slate'} />
    </View>
  );
};

function Jadwal() {
  const [Booking, setBooking] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getbooking = async () => {
    try {
      setLoading(true)
      const list = await getbookingList();
      setBooking(list);
    } catch (err: any) {
      console.log("Error", err.response?.data || err.message);
      Alert.alert("Error", err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getbooking();
  }, []);

  if (loading || Booking.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text className="mt-2 text-gray-600">Loading...</Text>
      </View>
    )
  }
  return (
    <SafeAreaView className="flex-1 bg-[#2563eb]">
      <TopBarNormal label="Penjadwalan" />
      <View className="flex-1 bg-gray-100 mt-16 py-14">
        <View className='items-center -mt-24 bg-gray-50 py-10 px-10 ml-5 mr-5 rounded-md  justify-center shadow'>
          <View className='flex-row w-full items-center justify-between'>
            <TouchableOpacity>
              <Text className='text-lg font-semibold'>Booking</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className='text-lg font-semibold '>Antrian</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={Booking}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 rounded-xl shadow">
              <Text className="font-bold text-blue-700">Kode Booking: {item.kode_booking}</Text>
              <Text>Limit Waktu checkin: {item.limit_waktu}</Text>
              <Text>Tanggal: {item.tanggal}</Text>

            </View>
          )}

          ListEmptyComponent={() => (
            <View>
              <View className="flex-1 justify-center m-2  shadow items-center py-10 px-5 bg-slate-200 rounded-lg ">
                <Image
                  source={require("../../assets/images/PagerView/pagerView3-removebg.png")}
                  className="w-52 h-52"
                />
                <View className='flex-1 items-center justify-center'>
                  <Text className="text-lg font-bold text-gray-700">Belum ada jadwal Aktif</Text>
                  <Text className="text-base text-center font-semibold text-gray-500">Semua E-Jadwal miliki mu akan tampil di sini.
                    Yuk renacanakan Jadwal kesehatan mu</Text>
                </View>
              </View>

              <View className="flex-row bg-slate-200 rounded-xl m-2 p-4 shadow-md items-center">
                {/* Logo di kiri */}
                <View className="w-20 h-20 rounded-lg bg-blue-100 justify-center items-center">
                  <Text className="text-blue-600 font-bold">E-Jadwal</Text>
                </View>

                <View className="flex-1 ml-3">
                  <Text className="text-base font-bold text-gray-800">Ada kendala di E-Jadwal?</Text>
                  <Text className="text-sm text-gray-600">
                    Kendala darurat bisa selesai 1 jam. Kamu bisa terhubung dalam 30 detik.
                  </Text>

                  <TouchableOpacity className="mt-1">
                    <Text className="text-blue-600 font-semibold">Hubungi E-Jadwal</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default Jadwal;
