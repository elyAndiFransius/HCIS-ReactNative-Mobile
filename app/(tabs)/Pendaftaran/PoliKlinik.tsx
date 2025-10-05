import api from '@/src/api/api';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, Platform,
  View, Modal, ImageBackground
} from 'react-native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import PoliItemCard from '@/src/components/PoliItemCard';
import { getPoliById, getPoliList } from '@/src/services/poliService';
import Loading from '@/src/components/Loading';

function PoliKlinik() {
  const navigation = useNavigation();
  const [poliList, setPoliList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // mengampil data pasien yang di kirimkana dari screen yang sebelumnnya
  const { pasien } = useLocalSearchParams();
  const DataPasien = pasien ? JSON.parse(pasien as string) : null;

  const [selectedPoli, setSelectedPoli] = useState<string | null>(null);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
  const [showRNPicker, setShowRNPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  // Fungsi untuk mengambil tanggal hari ini
  const handleToday = () => setDate(new Date());

  // Fungsi untuk melakukan format tanggal dari anggka -> Nama bukan
  const fmt = (d: Date) => {
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Fungsi untuk Mengambil 1 buat array data
  const handleSelectPoli = (item: any) => {
    setSelectedPoli(item);
    setCalendarModalOpen(true);
  };

  // Funsi untuk mengambil inputan tanggal
  const onAndroidChange = (e: DateTimePickerEvent, d?: Date) => {
    if (e.type === "set" && d) setDate(d);
    setShowRNPicker(false);
  };

  // Fungsi untuk membatalkan inptan tanggal
  const handleCancel = () => {
    setCalendarModalOpen(false);
    setSelectedPoli(null);
    setShowRNPicker(false);
  };
  // fungsi untuk mengambil 1 buah data langsung
  const handleSelectPoliById = async (id: string) => {
    try {
      const poli = await getPoliById(id);
      setSelectedPoli(poli);
      setCalendarModalOpen(false);
      setShowRNPicker(false);
      router.push({
        pathname: "/Pendaftaran/PilihDokter",
        params: {
          poli: JSON.stringify(selectedPoli),
          pasien: JSON.stringify(DataPasien),
          tgl: date.toISOString(),
        },
      });
      console.log("heyy:", poli)
    } catch (err: any) {
      console.log(err.response?.data);
    }
  }


  // Fungsi untuk untuk menggirimkan data ke screen PoliScreen
  const handlePick = () => {
    if (!selectedPoli) return;

    setCalendarModalOpen(false);
    setShowRNPicker(false);

    router.push({
      pathname: "/Pendaftaran/PilihDokter",
      params: {
        poli: JSON.stringify(selectedPoli),   // kirim object poli
        pasien: JSON.stringify(DataPasien),   // kirim data pasien
        tgl: date.toISOString(),              // kirim tanggal
      },
    });
  };

  // Fungsi untuk mengambil data poli selurunya
  const getPoli = async () => {
    try {
      setLoading(true);
      const list = await getPoliList();
      setPoliList(list);
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  }

  // Untuk menampilkan ke emulator semua data yang dari fungsi getPoli
  useEffect(() => {
    getPoli();
  }, []);


  if (loading || poliList.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text className="mt-2 text-gray-600">Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-10 pb-3 bg-white">
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back"
            size={24}
            color="#0D4D8F"
            onPress={() => router.push("/example/test")}
          />
          <Text className="ml-2 text-lg font-extrabold text-[#0D4D8F]">
            Pilih Tujuan Poli Anda
          </Text>
        </View>
      </View>

      {/* Body pakai FlatList + watermark */}
      <View className='ml-5 mr-5'>
        {/* Untuk menampilkan data dari json */}
        <FlatList
          data={poliList}
          keyExtractor={(item) => item.id_list_poli.toString()}
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 6, paddingHorizontal: 16 }}
          renderItem={({ item }) => (

            <PoliItemCard
              title={item.nama}
              onPress={() => handleSelectPoli(item)}
            />
          )}
        />
      </View>

      {/* Modal Kalender */}
      <Modal
        visible={isCalendarModalOpen}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View className="flex-1 bg-black/30 items-center justify-center px-5">
          <View
            className="w-full rounded-2xl bg-white p-4"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            }}
          >
            {/* Judul */}
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-extrabold text-[#0D4D8F]">
                Atur Jadwal Kunjungan Anda
              </Text>
            </View>

            {/* Tanggal + Hari ini */}
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-gray-900">
                {fmt(date)}
              </Text>
              <TouchableOpacity
                onPress={handleToday}
                className="px-3 py-1 rounded-md bg-gray-100"
              >
                <Text className="text-[12px] font-semibold text-gray-700">
                  Hari ini
                </Text>
              </TouchableOpacity>
            </View>

            {/* Area kalender */}
            <View className="rounded-xl border border-gray-200 p-4 items-center">
              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="inline"
                  onChange={(_, d) => d && setDate(d)}
                />
              ) : (
                <>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowRNPicker(true)}
                    className="w-full bg-gray-100 rounded-lg px-4 py-3"
                  >
                    <Text className="text-gray-800">{fmt(date)}</Text>
                  </TouchableOpacity>

                  {showRNPicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="calendar"
                      onChange={onAndroidChange}
                      minimumDate={new Date()}
                    />
                  )}
                </>
              )}
            </View>

            {/* Actions */}
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity onPress={handleCancel} className="flex-1 mr-2 bg-gray-100 rounded-xl py-3 items-center">
                <Text className="font-semibold text-gray-700">Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handlePick} className="flex-1 ml-2 bg-[#1F5EA8] rounded-xl py-3 items-center">
                <Text className="font-extrabold text-white">Pilih</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default PoliKlinik;
