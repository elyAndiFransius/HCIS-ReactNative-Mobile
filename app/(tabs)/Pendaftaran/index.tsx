import CategoryCard from "@/src/components/CategoryCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function index() {

  const routeMap: Record<string, string> = {
  Pendaftaran: "../pasien-umum", // file: app/(tabs)/Pendaftaran.tsx
  // jika nanti ada halaman lain, tambahkan di sini
};
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header sederhana */}
     {/* Header biru */}
<View
  className="flex-row items-center justify-between px-4 pb-3"
  style={{
    backgroundColor: "#0D4D8F",
    paddingTop: 40, // biar agak turun dari status bar
  }}
>
  <View className="flex-row items-center">
    <Ionicons
      name="chevron-back"
      size={24}
      color="#fff"             // ubah jadi putih
      onPress={() => router.back()}
    />
    <Text className="ml-2 text-lg font-extrabold text-white">
      Pendaftaran Online
    </Text>
  </View>
  <Ionicons
    name="information-circle-outline"
    size={20}
    color="#fff"               // ubah jadi putih
  />
</View>


      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
       
      >
        {/* Panel utama, dengan watermark lembut di belakang */}
        {/* <View
          className="w-full rounded-2xl p-5 bg-white"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 3 },
            elevation: 3,
          }}
        > */}
          <ImageBackground
            source={require("../../../assets/images/event/bgevent.png")} // pakai gambar tipis sebagai watermark
            resizeMode="contain"
            imageStyle={{ opacity: 0.08 }}
            className="rounded-2xl"
          >
            {/* Logo dan judul */}
            <View className="items-center mt-2 mb-6">
              <Image
                source={require("../../../assets/images/icon.png")} // ganti dengan logo IHC jika ada
                className="w-24 h-24 mb-2"
                resizeMode="contain"
              />
              <Text className="text-center text-[15px] font-semibold text-gray-900">
                Anjungan Pendaftaran Mandiri{"\n"}RS. Bakti Timah Pangkalpinang
              </Text>
            </View>

            {/* Grid 2 kolom, kartu kotak */}
            <View className="flex-row justify-between flex-wrap px-1 pb-2">
              <CategoryCard
                title="PASIEN UMUM"
                imageSource={require("../../../assets/images/event/pendaftaran.png")}
                imageSize={58}
                onPress={() => router.push("/(tabs)/Pendaftaran/pasien-umum")}
              />
              <CategoryCard
                title="PASIEN PT. TIMAH"
                imageSource={require("../../../assets/images/event/rumah_sakit.png")} // ganti dengan logo timah jika ada
                imageSize={58}
                onPress={() => router.push("/pendaftaran/pasien-pt-timah")}
              />
              <CategoryCard
                title="ASURANSI LAINNYA"
                imageSource={require("../../../assets/images/event/mcu.png")}
                imageSize={58}
                onPress={() => router.push("/pendaftaran/asuransi-lainnya")}
              />
              <CategoryCard
                title="PASIEN BPJS"
                imageSource={require("../../../assets/images/event/poli.png")} // ganti dengan logo BPJS jika ada
                imageSize={58}
                onPress={() => router.push("/pendaftaran/pasien-bpjs")}
              />
            </View>
          </ImageBackground>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
