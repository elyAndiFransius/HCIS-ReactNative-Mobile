// app/(tabs)/Pendaftaran/pilih-dokter.tsx
import React, { useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import DoctorCard from "@/src/components/DoctorCard";

type Doctor = {
  id: number;
  name: string;
  avatar: string;  // pakai URL di contoh; bisa juga require(...)
  day: string;
  time: string;
};

const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "dr. Klara Yuliarti, Sp.A (K)",
    avatar: "https://i.pravatar.cc/100?img=1",
    day: "Senin",
    time: "Jam 07.00 S.D 12.00",
  },
  {
    id: 2,
    name: "dr. Shinta Rispasari",
    avatar: "https://i.pravatar.cc/100?img=2",
    day: "Senin",
    time: "Jam 12.00 S.D 15.00",
  },
  {
    id: 3,
    name: "dr. Lina Ameliana",
    avatar: "https://i.pravatar.cc/100?img=3",
    day: "Senin",
    time: "Jam 17.00 S.D 16.00",
  },
  {
    id: 4,
    name: "dr. Dani Wiranto",
    avatar: "https://i.pravatar.cc/100?img=4",
    day: "Senin",
    time: "Jam 13.00 S.D 17.00",
  },
];

export default function PilihDokterScreen() {
  const { poli, tgl } = useLocalSearchParams<{ poli?: string; tgl?: string }>();

  const tanggalLabel = useMemo(() => {
    if (!tgl) return "";
    const d = new Date(tgl);
    const bulan = [
      "Januari","Februari","Maret","April","Mei","Juni",
      "Juli","Agustus","September","Oktober","November","Desember",
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }, [tgl]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-5 pt-10 pb-3 bg-white">
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back"
            size={24}
            color="#0D4D8F"
            onPress={() => router.back()}
          />
          <Text className="ml-2 text-lg font-extrabold text-[#0D4D8F]">
            {`Silahkan Pilih Dokter ${poli ? `Poli ${poli}` : "Poli"}`}
          </Text>
        </View>
        {!!tanggalLabel && (
          <Text className="ml-8 mt-1 text-sm text-gray-600">
            Jadwal: {tanggalLabel}
          </Text>
        )}
      </View>

      {/* Body */}
      <ImageBackground
        source={require("../../../assets/images/bgprofilee.png")}
        resizeMode="contain"
        imageStyle={{ opacity: 0.00 }}
        className="flex-1 mt-6"
      >
     <ScrollView
  className="flex-1 px-4"
  contentContainerStyle={{ paddingBottom: 24, paddingTop: 6 }}
>
  {DOCTORS.map((d) => (
    <DoctorCard
      key={d.id}
      name={d.name}
      avatar={d.avatar}
      day={d.day}
      time={d.time}
      onPress={() => {
        // Arahkan ke nomor-antrian.tsx
        router.push({
          pathname: "/(tabs)/Pendaftaran/nomor-antrian",
          params: {
            dokter: d.name,
            poli,          // kirim poli terpilih
            tgl,           // kirim tanggal jadwal
            jam: d.time,   // kirim jam praktek
          },
        });
      }}
    />
  ))}
</ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
}
