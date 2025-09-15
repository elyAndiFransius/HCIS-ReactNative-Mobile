import HistoryCard from "@/src/components/HistoryCard";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";

const DATA = [
  {
    id: "1",
    date: "14 Oktober 2024",
    time: "15.09",
    title: "Rawat Inap",
    doctorName: "dr. Angelica Anastasya",
    specialty: "Dokter Umum",
    avatar: "https://i.pravatar.cc/101",
  },
  {
    id: "2",
    date: "21 Agustus 2024",
    time: "09.12",
    title: "Kemoterapi",
    doctorName: "dr. Hana",
    specialty: "Dokter Spesialis Kanker",
    avatar: "https://i.pravatar.cc/102",
  },
  {
    id: "3",
    date: "14 Juli 2024",
    time: "15.09",
    title: "Konsultasi",
    doctorName: "dr. Erwin Santoso",
    specialty: "Dokter Umum",
    avatar: "https://i.pravatar.cc/103",
  },
  {
    id: "4",
    date: "14 Februari 2024",
    time: "13.32",
    title: "Rawat Inap",
    doctorName: "dr. Hendrik Wiranto",
    specialty: "Dokter Umum",
    avatar: "https://i.pravatar.cc/104",
  },
];

export default function Riwayat() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      {/* Header sederhana, seragam dengan Beranda */}
      <View className="flex-row items-center justify-between px-5 py-3 mt-10 bg-gray-50 shadow">
        <View className="flex-row items-center">
          <Ionicons name="chevron-back" size={22} color="#0D4D8" />
          <Text className="ml-2 text-lg font-extrabold text-gray-900">Riwayat</Text>
        </View>
        <Ionicons name="search-outline" size={20} color="#0D4D8" />
      </View>

      {/* Daftar riwayat */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <HistoryCard
            date={item.date}
            time={item.time}
            title={item.title}
            doctorName={item.doctorName}
            specialty={item.specialty}
            avatar={item.avatar}
            onPress={() => {
              // arahkan ke detail riwayat di sini
              // router.push("/riwayat/[id]") dst
            }}
          />
        )}
        ListHeaderComponent={
          <View className="mx-4 mb-2 mt-1">
            <Text className="text-sm font-bold text-blue-700">Riwayat Kunjungan</Text>
          </View>
        }
        ListEmptyComponent={
          <View className="items-center justify-center mt-16">
            <Ionicons name="documents-outline" size={40} color="#9CA3AF" />
            <Text className="text-gray-500 mt-2">Belum ada riwayat</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
