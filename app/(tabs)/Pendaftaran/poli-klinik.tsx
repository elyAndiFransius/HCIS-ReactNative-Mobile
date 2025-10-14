// app/(tabs)/Pendaftaran/pilih-poli.tsx
import PoliItemCard from "@/src/components/PoliItemCard";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const POLI = [
  { id: 1, title: "Control Rehabilitic Control", icon: require("../../../assets/images/randomize 1.png") },
  { id: 2, title: "Poli Kulit dan Kelamin", icon: require("../../../assets/images/pkk2 1.png") },
  { id: 3, title: "Laboratorium", icon: require("../../../assets/images/science 1.png") },
  { id: 4, title: "Radiologi", icon: require("../../../assets/images/radiology 1.png") },
  { id: 5, title: "Poli Internis", icon: require("../../../assets/images/internis 1.png") },
  { id: 6, title: "Poli Fisioterapi", icon: require("../../../assets/images/physical-therapy 1.png") },
  { id: 7, title: "Terapi Wicara", icon: require("../../../assets/images/wicara 1.png") },
  { id: 8, title: "Gizi", icon: require("../../../assets/images/gizi.png") },
  { id: 9, title: "Poli Anak", icon: require("../../../assets/images/anak.png") },
  { id: 10, title: "Kemoterapi", icon: require("../../../assets/images/kemo.png") },
  { id: 11, title: "Poli Bedah Mulut", icon: require("../../../assets/images/bedahmulut.png") },
  { id: 12, title: "Poli KIA", icon: require("../../../assets/images/kia.png") },
  { id: 13, title: "Poli Jantung", icon: require("../../../assets/images/jantung.png") },
  { id: 14, title: "Poli Konservasi Gigi", icon: require("../../../assets/images/gigi.png") },
  { id: 15, title: "Poli Bedah Umum", icon: require("../../../assets/images/bedahumum.png") },
  { id: 16, title: "Poli Ginjal", icon: require("../../../assets/images/ginjal.png") },
  { id: 17, title: "Hemodialisa", icon: require("../../../assets/images/hemodialysis-machine 1.png") },
  { id: 18, title: "Poli Mata", icon: require("../../../assets/images/mata.png") },
  { id: 19, title: "Orthopedi", icon: require("../../../assets/images/orthopedi.png") },
  { id: 20, title: "Poli Penyakit Mulut", icon: require("../../../assets/images/pemulut.png") },
  { id: 21, title: "Poli Paru", icon: require("../../../assets/images/paru.png") },
  { id: 22, title: "Akupuntur Medic", icon: require("../../../assets/images/akupuntur.png") },
  { id: 23, title: "Saraf", icon: require("../../../assets/images/saraf.png") },
];

function fmt(d: Date) {
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

export default function PilihPoliScreen() {
  // Ambil tanggal dari Data Pasien
  const { tgl } = useLocalSearchParams<{ tgl?: string }>();
  const tabBarHeight = useBottomTabBarHeight();

  const tanggalTerpilih = useMemo(() => {
    if (!tgl) return null;
    const d = new Date(tgl);
    return isNaN(d.getTime()) ? null : d;
  }, [tgl]);

  const handleSelectPoli = (name: string) => {
    router.push({
      pathname: "/Pendaftaran/pilih-dokter",
      params: {
        poli: name,
        tgl: tanggalTerpilih ? tanggalTerpilih.toISOString() : "",
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View
        className="px-5 pb-3"
        style={{ backgroundColor: "#0D4D8F", paddingTop: 40 }}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back"
            size={24}
            color="#fff"
            onPress={() => router.push("/(tabs)/Pendaftaran/data_pasien")}
          />
          <Text className="ml-2 text-lg font-extrabold text-white">
            Pilih tujuan poli anda
          </Text>
        </View>

        {tanggalTerpilih && (
          <Text className="mt-2 ml-8 text-xs font-semibold text-white">
            Tanggal kunjungan {fmt(tanggalTerpilih)}
          </Text>
        )}
      </View>

      {/* Body */}
      <ImageBackground
        source={require("../../../assets/images/bgprofilee.png")}
        resizeMode="contain"
        imageStyle={{ opacity: 0.06 }}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingTop: 6, paddingBottom: tabBarHeight + 16 }}
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
    </SafeAreaView>
  );
}
