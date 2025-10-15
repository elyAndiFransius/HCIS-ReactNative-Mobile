import api from '@/src/api/api';
import BackNavbar from '@/src/components/BackNavbar';
import Loading from '@/src/components/Loading';
import TopBar from '@/src/components/TopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '@/src/components/Button';
import SuccessModal from '@/src/components/SuccessModal';



function DetailTransaksiScreen() {

  const { dataTransaksi, pasien,  tanggal } = useLocalSearchParams();

  const DataPasien = pasien ? JSON.parse(pasien as string) : null;
  const Data = dataTransaksi ? JSON.parse(dataTransaksi as string) : null;

  const [open, setOpen] = useState(false);

  //Fungsi untuk deadline
  const deadlineCheckin = (nowDate: string): string => {
    const date = new Date(nowDate);

    // Tambahkan 3 hari
    date.setDate(date.getDate() + 3);

    // Format hasil ke YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const result = `${year}-${month}-${day}`;

    return result;
  }

  const today = new Date().toISOString().split("T")[0];
  const limit_waktu = deadlineCheckin(today);


  const handlerStore = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Token tidak di temukan silahkan Login dulu");
        return;
      }
      const payload = {
        limit_waktu: limit_waktu,
        status: "belum",
        tanggal: tanggal,
        kode: DataPasien.kode,
        id_list_poli: Data.id_list_poli,
        id_dokter: Data?.dokter_list?.[0]?.id_dokter,
      };

      const res = await api.post("/booking/store", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.data.success === true) {
        const DataBooking = res.data.data;
        setOpen(true)
        router.push({
          pathname: "/Pendaftaran/NoAntrian",
          params: {
            booking: JSON.stringify(DataBooking),
            id: res.data.data.booking.id
          }
        })

      } else {
        Alert.alert("Gagal", res.data.message || "Terjadi kesalahan");
      }
    } catch (err: any) {
      console.log("Error", err.response?.data || err.message);
      Alert.alert("Error", err.message);
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-[#2563eb]">
      <TopBar label="Detail Booking" />
      <View className="flex-1 bg-gray-50 mt-32 py-14">
        <View className="items-center -mt-36">
          <Image
            source={require('../../../assets/images/RumahSakit/rsbt.png')}
            resizeMode='contain'
            className='border-2 rounded-md border-blue-500'
          />
        </View>
        <View className=' ml-10 mr-10 mt-5 items-center '>
          <Text className='text-lg font-semibold text-gray-800'>📍Rumah sakit Bakti Timah Pangkal Pinang</Text>
          <Text className='font-normal text-center text-gray-500'>Jl. Bukit Baru No.1, Kel.Taman Bunga Kec.Gerunggang Kota Pangkal Pinang Prov.Kep.Bangka Belitung</Text>
        </View>

        <View className='flex-row ml-5 mr-5 bg-slate-200 mt-10 px-5 py-5 rounded-lg'>
          <View className='flex-row'>
            <Image
              source={require('../../../assets/images/RumahSakit/vector_dokter.png')}
              className='w-16 h-16 border  border-[##2563eb] rounded-full'
            />
            <View className='ml-5 '>
              <TouchableOpacity onPress={() => router.push('/Auth/User')} >
                <Text className='font-normal text-sm mr-1 text-gray-900'>Dokter </Text>
                <Text className='font-semibold text-base text-gray-900 mr-1'>{Data?.dokter_list?.[0]?.nama}</Text>
                <View className='flex-row'>
                  <Text className='text-base text-[#2563eb]'>Lihat informasi dokter</Text>
                  <Ionicons name='chevron-forward-outline' size={15} color="#2563eb" style={{ paddingTop: 2.5 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className='flex-row ml-5 mr-5 bg-slate-200 mt-1 px-5 py-5 rounded-lg'>
          <View className='flex-row'>
            <Image
              source={require('../../../assets/icons/ic_poli.png')}
              resizeMode='contain'
              className='w-16 h-16 border  border-[#2563eb] rounded-full'
            />
            <View className='ml-5 '>
              <TouchableOpacity onPress={() => router.push('/Auth/User')} >
                <Text className='font-normal text-sm mr-1 text-gray-900'>Jenis Poli </Text>
                <Text className='font-semibold text-base text-gray-900 mr-1'>{Data.nama_poli}</Text>
                <View className='flex-row'>
                  <Text className='text-base text-blue-500'>Lihat informasi dokter</Text>
                  <Ionicons name='chevron-forward-outline' size={15} color="#2563eb" style={{ paddingTop: 2.5 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className='flex-row ml-5 mr-5 bg-slate-200 mt-1 px-5 py-5 rounded-lg'>
          <View className='flex-row'>
            <Image
              source={require('../../../assets/images/event/kalender.png')}
              resizeMode='contain'
              className='w-16 h-16 border  border-[#2563eb] rounded-full'
            />
            <View className='ml-5 mt-2'>
              <TouchableOpacity onPress={() => router.push('/Auth/User')} >
                <Text className='font-semibold mr-1'>Tanggal </Text>
                <View className='flex-row'>
                  <Text className='text-base text-[#2563eb]'>{tanggal}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className='ml-5 mr-5'>
          <Button label="Buat Janji Temu"
            onPress={() => handlerStore()} />
        </View>


      </View>

      {/* Modal Berhasil */}
      <SuccessModal
        visible={open}
        onClose={() => {
          setOpen(false);
        }}
        message="Data berhasil disimpan!"
      />
    </SafeAreaView>


  );

}

export default DetailTransaksiScreen