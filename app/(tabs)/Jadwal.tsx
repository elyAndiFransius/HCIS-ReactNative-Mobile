import api from '@/src/api/api';
import TopBar from '@/src/components/TopBar';
import TopBarNormal from '@/src/components/TopBarNormal';
import { getAntrianList } from '@/src/services/antrianService';
import { getbookingList } from '@/src/services/bookingService';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { push } from 'expo-router/build/global-state/routing';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
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
      }}>
      <Text className="text-gray-700 text-lg font-bold">
        Jadwal
      </Text>
      <Ionicons name='add' size={20} color={'slate'} />
    </View>
  );
};

function Jadwal() {
  const [bookingData, setBookingData] = useState<any[]>([]);
  const [antrianData, setAntrianData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'booking' | 'antrian'>('booking');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bookings, antrians] = await Promise.all([getbookingList(), getAntrianList()]);
      setBookingData(bookings);
      setAntrianData(antrians);
      console.log("=======booking======", bookings)
      console.log("====antrian=========", antrians)
    } catch (err: any) {
      console.log("Error", err.response?.data || err.message);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = activeTab === 'booking' ? bookingData : antrianData;

  if (loading) {
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

        <View className='items-center -mt-24 bg-gray-50 py-5 px-10 ml-5 mr-5 rounded-md  justify-center shadow'>
          <View className='flex-row w-full items-center justify-between'>
            <TouchableOpacity onPress={() => setActiveTab('booking')}>
              <Text className={`text-lg font-semibold ${activeTab === 'booking' ? 'text-blue-600' : 'text-gray-700'}`}>
                Booking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('antrian')}>
              <Text className={`text-lg font-semibold ${activeTab === 'antrian' ? 'text-blue-600' : 'text-gray-700'}`}>
                Antrian
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) =>
            (item.id ?? item.id_antrian ?? index).toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: '/Pendaftaran/NoAntrian',
              params: { id: item.id }
            })
            }>
              <View className="bg-white p-4 mb-3 rounded-xl ">
                {activeTab === 'booking' ? (
                  <>
                    <Text className="font-bold text-blue-700">Kode Booking: {item.id}</Text>
                    <Text>Limit Waktu checkin: {item.limit_waktu}</Text>
                    <Text>Tanggal: {item.tanggal}</Text>
                  </>
                ) : (
                  <>
                    <Text className="font-bold text-green-700">Nomor Antrian: {item.id_antrian}</Text>
                    <Text>Status: {item.status}</Text>
                    <Text>Tanggal: {item.poli}</Text>
                  </>
                )}
              </View>
            </TouchableOpacity>
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
