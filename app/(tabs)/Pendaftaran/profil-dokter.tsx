// app/(tabs)/Pendaftaran/profil-dokter.tsx
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function ProfilDokter() {
  const { dokter, poli, tgl, jam } = useLocalSearchParams<{
    dokter?: string;
    poli?: string;
    tgl?: string;
    jam?: string;
  }>();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View
        className="px-5 pb-4"
        style={{ backgroundColor: "#0D4D8F", paddingTop: 40 }}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back"
            size={24}
            color="#fff"
            onPress={() => router.back()}
          />
          <Text className="ml-2 text-lg font-extrabold text-white">
            Profil Dokter
          </Text>
        </View>
      </View>

      <ImageBackground
        source={require("../../../assets/images/bgprofilee.png")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.06 }}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 28 }}
        >
          {/* Card Dokter */}
          <View
            className="bg-white rounded-2xl px-4 py-4 mt-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5, // penting untuk Android
            }}
          >
            <View className="flex-row items-center">
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=3" }}
                className="w-16 h-16 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-[15px] font-extrabold text-gray-900">
                  {dokter}
                </Text>
                <Text className="text-[12px] text-gray-600">
                  No. STR: 312.110.03.20.12345
                </Text>
                <Text className="text-[12px] text-gray-600">
                  Pendidikan: Sp.OG – UI, 2014
                </Text>
                <Text className="text-[12px] text-gray-600">
                  Pengalaman: 10 tahun
                </Text>
              </View>
            </View>
          </View>
          <View
            className="bg-white rounded-2xl px-4 py-4 mt-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5, // penting untuk Android
            }}
          >
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../../assets/images/kalender.png")}
                className="w-6 h-6 mr-2"
              />
              <Text className="text-[15px] font-extrabold text-gray-900 text-center">
                Jadwal Dokter
              </Text>
            </View>
          </View>

          {/* Jadwal Dokter */}
        <View
  className="bg-white rounded-2xl mt-4"
  style={{
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4, // untuk Android
  }}
>
  {/* Header Card */}
  {/* <View className="flex-row items-center justify-center border-b border-[#0D4D8F] py-3 bg-[#F0F7FF] rounded-t-2xl">
    <Text className="text-[16px] font-extrabold text-[#0D4D8F]">Jadwal Dokter</Text>
  </View> */}

  {/* Isi Tabel */}
  {[
    { hari: "Senin", waktu: "08:00 - 10:00" },
    { hari: "Selasa", waktu: "15:00 - 17:00" },
    { hari: "Rabu", waktu: "08:00 - 10:00" },
    { hari: "Kamis", waktu: "11:00 - 13:00" },
    { hari: "Jumat", waktu: "14:00 - 18:00" },
  ].map((item, idx, arr) => (
    <View
      key={idx}
      className={`flex-row justify-between px-5 py-3 ${
        idx !== arr.length - 1 ? "border-b border-gray-200" : ""
      }`}
    >
      <Text className="text-[15px] font-semibold text-gray-800">{item.hari}</Text>
      <Text className="text-[15px] font-bold text-gray-900">{item.waktu}</Text>
    </View>
  ))}
</View>


          {/* Lokasi Praktek */}
          <View className="mt-4">
            <Text className="text-[13px] text-gray-600 mb-1">
              Lokasi Praktek
            </Text>
            <View className="bg-white rounded-2xl px-4 py-3 border border-[#E6EEF9]">
              <Text className="text-[13px] font-extrabold text-gray-900">
                RS Bakti Timah Pangkal Pinang
              </Text>
              <Text className="text-[12px] text-gray-700">
                Jl. Bukit Baru No.1, Kel Taman Bunga, Pangkal Pinang
              </Text>
              {poli && (
                <Text className="text-[12px] text-[#0D4D8F] mt-1">
                  Poli {poli}
                  {jam ? `, ${jam}` : ""}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
