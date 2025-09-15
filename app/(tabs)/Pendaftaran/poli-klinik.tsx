// app/(tabs)/Pendaftaran/pilih-poli.tsx
import PoliItemCard from "@/src/components/PoliItemCard";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const POLI = [
  {
    id: 1,
    title: "Control Rehabilitic Control",
    icon: require("../../../assets/images/randomize 1.png"),
  },
  {
    id: 2,
    title: "Poli Kulit dan Kelamin",
    icon: require("../../../assets/images/pkk2 1.png"),
  },
  {
    id: 3,
    title: "Laboratorium",
    icon: require("../../../assets/images/science 1.png"),
  },
  {
    id: 4,
    title: "Radiologi",
    icon: require("../../../assets/images/radiology 1.png"),
  },
  {
    id: 5,
    title: "Poli Internis",
    icon: require("../../../assets/images/internis 1.png"),
  },
  {
    id: 6,
    title: "Poli Fisioterapi",
    icon: require("../../../assets/images/physical-therapy 1.png"),
  },
  {
    id: 7,
    title: "Terapi Wicara",
    icon: require("../../../assets/images/wicara 1.png"),
  },
  { id: 8, title: "Gizi", icon: require("../../../assets/images/gizi.png") },
  {
    id: 9,
    title: "Poli Anak",
    icon: require("../../../assets/images/anak.png"),
  },
  {
    id: 10,
    title: "Kemoterapi",
    icon: require("../../../assets/images/kemo.png"),
  },
  {
    id: 11,
    title: "Poli Bedah Mulut",
    icon: require("../../../assets/images/bedahmulut.png"),
  },
  {
    id: 12,
    title: "Poli KIA",
    icon: require("../../../assets/images/kia.png"),
  },
  {
    id: 13,
    title: "Poli Jantung",
    icon: require("../../../assets/images/jantung.png"),
  },
  {
    id: 14,
    title: "Poli Konservasi Gigi",
    icon: require("../../../assets/images/gigi.png"),
  },
  {
    id: 15,
    title: "Poli Bedah Umum",
    icon: require("../../../assets/images/bedahumum.png"),
  },
  {
    id: 16,
    title: "Poli Ginjal",
    icon: require("../../../assets/images/ginjal.png"),
  },
  {
    id: 17,
    title: "Hemodialisa",
    icon: require("../../../assets/images/hemodialysis-machine 1.png"),
  },
  {
    id: 18,
    title: "Poli Mata",
    icon: require("../../../assets/images/mata.png"),
  },
  {
    id: 19,
    title: "Orthopedi",
    icon: require("../../../assets/images/orthopedi.png"),
  },
  {
    id: 20,
    title: "Poli Penyakit Mulut",
    icon: require("../../../assets/images/pemulut.png"),
  },
  {
    id: 21,
    title: "Poli Paru",
    icon: require("../../../assets/images/paru.png"),
  },
  {
    id: 22,
    title: "Akupuntur Medic",
    icon: require("../../../assets/images/akupuntur.png"),
  },
  { id: 23, title: "Saraf", icon: require("../../../assets/images/saraf.png") },
  //   { id: 24, title: "Poli Mata", icon: require("../../../assets/images/wicara 1.png") },
];

function fmt(d: Date) {
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
}

export default function PilihPoliScreen() {
  const [isCalendarModalOpen, setCalendarModalOpen] = useState(false); // modal putih kamu
  const [showRNPicker, setShowRNPicker] = useState(false); // dialog native Android
  const [date, setDate] = useState(new Date());
  const [selectedPoli, setSelectedPoli] = useState<string | null>(null);

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

  const handleToday = () => setDate(new Date());

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
    setCalendarModalOpen(false); // tutup modal putih
    setShowRNPicker(false); // pastikan dialog tertutup
    router.push({
      pathname: "/Pendaftaran/pilih-dokter",
      params: { poli: selectedPoli, tgl: date.toISOString() },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-10 pb-3 bg-white">
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back"
            size={24}
            color="#0D4D8F"
            onPress={() => router.push("/(tabs)/Pendaftaran/data_pasien")}
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
          {POLI.map((p) => (
            <PoliItemCard
              key={p.id}
              title={p.title}
              icon={p.icon}
              onPress={() => handleSelectPoli(p.title)}
            />
          ))}
        </ScrollView>
      </ImageBackground>

      {/* Modal Kalender */}
      {/* ===== Modal Kalender ===== */}
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
  );
}
