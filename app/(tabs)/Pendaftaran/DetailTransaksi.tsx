import api from '@/src/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text, Alert } from 'react-native';



function DetailTransaksiScreen() {
  const { dokter } = useLocalSearchParams();
  const DataDokter = dokter ? JSON.parse(dokter as string) : null;

  console.log("======Dokter=====", DataDokter)

  const handlerStore = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Token tidak di temukan silahkan Login dulu");
        return;
      }
      const payload = {
        kode_booking: "BOOK123456",
        limit_waktu: "14:30:00",
        status: "belum",
        tanggal: "2025-09-22",
        kode: 1,
        id_list_poli: "04334b82-971f-3abe-accf-22ac532a95a7",
        id_dokter: "DK064",
        id_antrian: "AT34",
      };

      const res = await api.post("/pembayaran/store", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.data.success === true) {
      } else {
        Alert.alert("Gagal", res.data.message || "Terjadi kesalahan");
      }
    } catch (err: any) {
      console.log("Error", err.response?.data || err.message);
      Alert.alert("Error", err.message);
    }
  };

  console.log(DataDokter)

  // Komponen baris info rapi
  function InfoRow({ label, value }: { label: string; value?: string }) {
    return (
      <View className="flex-row items-start py-3">
        <Text
          className="w-32 text-[13px] font-extrabold text-[#1F5EA8]"
          style={{ lineHeight: 52 }}
        >
          {label}
        </Text>
        <Text
          className="flex-1 text-right font-semibold text-gray-900"
          style={{ lineHeight: 52 }}
        >
          {value || "-"}
        </Text>
      </View>
    );
  }


  return (
    <View>
      <InfoRow label="Nomor RM" value={DataDokter.nama} />
    </View>
  )
}

export default DetailTransaksiScreen