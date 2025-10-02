// app/(tabs)/Pendaftaran/detail_book.tsx
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";


const DOCTORS = [
  { id: 1, name: "dr. Klara Yuliarti, Sp.A (K)", avatar: "https://i.pravatar.cc/100?img=1", time: "Jam 07.00 S.D 12.00" },
  { id: 2, name: "dr. Shinta Rispasari", avatar: "https://i.pravatar.cc/100?img=2", time: "Jam 12.00 S.D 15.00" },
  { id: 3, name: "dr. Lina Ameliana", avatar: "https://i.pravatar.cc/100?img=3", time: "Jam 15.00 S.D 16.00" },
  { id: 4, name: "dr. Dani Wiranto", avatar: "https://i.pravatar.cc/100?img=4", time: "Jam 13.00 S.D 17.00" },
];

export default function DetailBook() {
  const { poli, tgl, dokter, doctorId, jam } =
    useLocalSearchParams<{ poli?: string; tgl?: string; dokter?: string; doctorId?: string; jam?: string }>();

  const tanggalLabel = useMemo(() => {
    if (!tgl) return "";
    const d = new Date(tgl);
    const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }, [tgl]);

  const selectedDoctor = doctorId
    ? DOCTORS.find(v => v.id === Number(doctorId))
    : DOCTORS.find(v => v.name === dokter);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-5 pb-4" style={{ backgroundColor: "#0D4D8F", paddingTop: 40 }}>
        <View className="flex-row items-center">
          <Ionicons name="chevron-back" size={24} color="#fff" onPress={() => router.back()} />
          <Text className="ml-2 text-lg font-extrabold text-white">Detail Booking Anda</Text>
        </View>
      </View>

      <ImageBackground source={require("../../../assets/images/bgprofilee.png")} resizeMode="cover" imageStyle={{ opacity: 0.06 }} className="flex-1">
        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 28 }}>
          {/* FOTO RS */}
          <Image source={require("../../../assets/images/rsbt.png")} className="w-full h-40 rounded-xl mt-5" />

          {/* Informasi RS */}
          <View className="mt-4">
            <Text className="text-[16px] font-extrabold text-gray-900">Rumah Sakit Bakti Timah Pangkal Pinang</Text>
            <Text className="text-[12px] text-gray-600 mt-1 leading-4">
              Jl. Bukit Baru No.1, Kel. Taman Bunga Kec. Gerunggang, Kota Pangkal Pinang Prov. Kep. Bangka Belitung
            </Text>
            <View className="flex-row items-center mt-3">
              <Ionicons name="location" size={16} color="#0D4D8F" />
              <Text className="ml-2 text-[13px] text-gray-700">
                Jarak dari lokasi anda saat ini <Text className="font-extrabold">3,4Km</Text>
              </Text>
            </View>
          </View>

          {/* CARD DOKTER */}
          <View className="bg-[#F4F5F7] rounded-2xl px-4 py-3 mt-4">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-white items-center justify-center">
                {selectedDoctor?.avatar ? (
                  <Image source={{ uri: selectedDoctor.avatar }} style={{ width: 48, height: 48 }} />
                ) : (
                  <Ionicons name="person-circle-outline" size={40} color="#9CA3AF" />
                )}
              </View>
              <View className="flex-1">
                <Text className="font-extrabold text-[15px] text-gray-900">
                  {selectedDoctor?.name || "Belum memilih dokter"}
                </Text>
                <TouchableOpacity
                  onPress={() => router.push({
                    pathname: "/(tabs)/Pendaftaran/profil-dokter",
                    params: { dokter: selectedDoctor?.name, doctorId, poli, tgl, jam }
                  })}
                >
                  <Text className="text-[13px] text-[#0D4D8F] mt-1">Lihat detail dokter</Text>
                </TouchableOpacity>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </View>

          {/* CARD POLI */}
          <View className="bg-[#F4F5F7] rounded-2xl px-4 py-3 mt-3">
            <Text className="text-[12px] text-gray-600">Poli yang anda pilih</Text>
            <Text className="text-[14px] font-extrabold text-[#0D4D8F]">{poli ? `Poli ${poli}` : "Belum dipilih"}</Text>
          </View>

          {/* CARD TANGGAL */}
          <View className="bg-[#F4F5F7] rounded-2xl px-4 py-3 mt-3">
            <Text className="text-[12px] text-gray-600">Tanggal</Text>
            <Text className="text-[14px] font-extrabold text-gray-900">{tanggalLabel || "Belum dipilih"}</Text>
          </View>

          <View className="w-full max-w-md mt-5">
              <TouchableOpacity className="bg-[#1F5EA8] rounded-xl items-center py-3 mb-3">
                <Text className="text-white font-extrabold text-base" onPress={() => router.push("/(tabs)/Pendaftaran/nomor-antrian")}>Buat Janji Temu</Text>
              </TouchableOpacity>
              </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
