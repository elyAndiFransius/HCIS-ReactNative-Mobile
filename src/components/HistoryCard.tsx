import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  date: string;        // contoh: "14 Oktober 2024"
  time: string;        // contoh: "15.09"
  title: string;       // contoh: "Rawat Inap"
  doctorName: string;  // contoh: "dr. Angelica Anastasya"
  specialty: string;   // contoh: "Dokter Umum"
  avatar?: string;     // url gambar dokter
  onPress?: () => void;
};

export default function HistoryCard({
  date,
  time,
  title,
  doctorName,
  specialty,
  avatar = "https://i.pravatar.cc/100",
  onPress,
}: Props) {
  return (
    <View className="bg-white mx-4 mb-3 rounded-xl shadow p-4">
      {/* Baris tanggal dan jam */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="calendar-outline" size={18} color="#0D4D8" />
          <Text className="ml-2 text-xs font-semibold text-gray-700">{date}</Text>
        </View>

        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={18} color="#0D4D8" />
          <Text className="ml-2 text-xs font-bold text-gray-800">{time}</Text>
        </View>
      </View>

      {/* Judul layanan */}
      <Text className="mt-2 text-base font-extrabold text-gray-900">{title}</Text>

      {/* Dokter */}
      <View className="flex-row items-center mt-2">
        <Image
          source={{ uri: avatar }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-800">{doctorName}</Text>
          <Text className="text-xs text-gray-500">{specialty}</Text>
        </View>

        <TouchableOpacity
          onPress={onPress}
          className="bg-blue-600 px-4 py-2 rounded-lg"
          activeOpacity={0.8}
        >
          <Text className="text-white text-xs font-semibold">Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
