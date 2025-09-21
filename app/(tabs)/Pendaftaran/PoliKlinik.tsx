import api from '@/src/api/api';
import BackNavbar from '@/src/components/BackNavbar'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ActivityIndicator, Alert, FlatList, SafeAreaView, Text, TouchableOpacity, Platform,
  View, Modal, ImageBackground, ScrollView
} from 'react-native'
import { router, useNavigation } from 'expo-router'
import DateTimePicker, { DateTimePickerEvent, } from "@react-native-community/datetimepicker";
import { Ionicons } from '@expo/vector-icons';
import PoliItemCard from '@/src/components/PoliItemCard';



function PoliKlinik() {
  const navigation = useNavigation();
  const [poliList, setPoliList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal & date picker state
  const [showModal, setShowModal] = useState(false)
  const [selectedPoliId, setSelectedPoliId] = useState<number | null>(null)
  const [selectPoliName, setSelectPoliName] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [showPicker, setShowPicker] = useState(false)


  // Dari naufal 
  const [selectedPoli, setSelectedPoli] = useState<string | null>(null);
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false); // modal putih kamu
  const [showRNPicker, setShowRNPicker] = useState(false); // dialog native Android
  const [date, setDate] = useState(new Date());
  const handleToday = () => setDate(new Date());

  const fmt = (d: Date) => {
    const bulan = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleSelectPoli = (name: string) => {
    setSelectedPoli(name);
    setCalendarModalOpen(true); // buka modal putih SEKALI
  };

  const onAndroidChange = (e: DateTimePickerEvent, d?: Date) => {
    // dialog native Android -> tutup setelah ada hasil apapun
    if (e.type === "set" && d) setDate(d);
    setShowRNPicker(false); // PENTING: jangan biarkan tetap true
  };

  const handleCancel = () => {
    setCalendarModalOpen(false);
    setSelectedPoli(null);
    setShowRNPicker(false);
  };

  const handlePick = () => {
    if (!selectedPoli) return;
    setCalendarModalOpen(false);
    setShowRNPicker(false);
    router.push({
      pathname: "/Pendaftaran/PilihDokter",
      params: { poli: selectedPoli, tgl: date.toISOString() },
    });
  };



  const getPoli = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "Token tidak ditemukan, silahkan login dulu!");
        return;
      }
      setLoading(true);
      const res = await api.get('/poli/index', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "Application/json"
        }
      });

      setPoliList(res.data.data ?? res.data)
    } catch (err: any) {
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPoli();
  }, [])

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

      {/* Body + watermark */}
      <ImageBackground
        source={require("../../../assets/images/bgprofilee.png")}
        resizeMode="contain"
        imageStyle={{ opacity: 0.06 }}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 24, paddingTop: 6 }}
        >
          {poliList.map((p) => (
            <PoliItemCard
              key={p.id_list_poli}
              title={p.nama}
              onPress={() => handleSelectPoli(p.nama)}
            />
          ))}
        </ScrollView>
      </ImageBackground>

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
                // iOS: inline (tidak membuka dialog kedua)
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="inline"
                  onChange={(_, d) => d && setDate(d)}
                />
              ) : (
                <>
                  {/* Android: tombol untuk membuka dialog native */}
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowRNPicker(true)}
                    className="w-full bg-gray-100 rounded-lg px-4 py-3"
                  >
                    <Text className="text-gray-800">{fmt(date)}</Text>
                  </TouchableOpacity>

                  {/* Dialog native Android: render hanya saat diminta */}
                  {showRNPicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="calendar"
                      onChange={onAndroidChange} // SELALU menutup dialog
                      minimumDate={new Date()}
                    />
                  )}
                </>
              )}
            </View>

            {/* Actions */}
            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={handleCancel}
                className="flex-1 mr-2 bg-gray-100 rounded-xl py-3 items-center"
              >
                <Text className="font-semibold text-gray-700">Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePick}
                className="flex-1 ml-2 bg-[#1F5EA8] rounded-xl py-3 items-center"
              >
                <Text className="font-extrabold text-white">Pilih</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default PoliKlinik
