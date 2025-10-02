// app/(tabs)/Pendaftaran/pilih-dokter.tsx
import DoctorCard from "@/src/components/DoctorCard";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

type Doctor = {
  id: number;
  name: string;
  avatar: string;
  day: string;
  time: string;
};

const DOCTORS: Doctor[] = [
  { id: 1, name: "dr. Klara Yuliarti, Sp.A (K)", avatar: "https://i.pravatar.cc/100?img=1", day: "Senin", time: "Jam 07.00 S.D 12.00" },
  { id: 2, name: "dr. Shinta Rispasari",        avatar: "https://i.pravatar.cc/100?img=2", day: "Senin", time: "Jam 12.00 S.D 15.00" },
  { id: 3, name: "dr. Lina Ameliana",           avatar: "https://i.pravatar.cc/100?img=3", day: "Senin", time: "Jam 15.00 S.D 16.00" },
  { id: 4, name: "dr. Dani Wiranto",            avatar: "https://i.pravatar.cc/100?img=4", day: "Senin", time: "Jam 13.00 S.D 17.00" },
];

export default function PilihDokter() {
  const { poli, tgl } = useLocalSearchParams<{ poli?: string; tgl?: string }>();

  const tanggalLabel = useMemo(() => {
    if (!tgl) return "";
    const d = new Date(tgl);
    const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }, [tgl]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="px-5 pb-4" style={{ backgroundColor: "#0D4D8F", paddingTop: 40 }}>
        <View className="flex-row items-center">
          <Ionicons name="chevron-back" size={24} color="#fff" onPress={() => router.back()} />
          <Text className="ml-2 text-lg font-extrabold text-white">
            {`Silahkan Pilih Dokter Poli ${poli || ""}`}
          </Text>
        </View>
        {!!tanggalLabel && (
          <Text className="ml-8 mt-1 text-sm text-white">
            Jadwal: {tanggalLabel}
          </Text>
        )}
      </View>

      <ImageBackground
        source={require("../../../assets/images/bgprofilee.png")}
        resizeMode="cover"
        imageStyle={{ opacity: 0.06 }}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 28 }}>
          {DOCTORS.map(d => (
            <DoctorCard
              key={d.id}
              name={d.name}
              avatar={d.avatar}
              day={d.day}
              time={d.time}
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/Pendaftaran/detail_book",
                  params: { dokter: d.name, doctorId: String(d.id), poli, tgl, jam: d.time },
                });
              }}
            />
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
