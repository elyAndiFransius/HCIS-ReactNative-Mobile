import CategoryCard from "@/src/components/CategoryCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {

    const routeMap: Record<string, string> = {
        Pendaftaran: "../pasien-umum", // file: app/(tabs)/Pendaftaran.tsx
        // jika nanti ada halaman lain, tambahkan di sini
    };
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header sederhana */}
            <View className="flex-row items-center justify-between px-4 py-3 mt-10 bg-white">
                <View className="flex-row items-center">
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#0D4D8F"
                        onPress={() => router.back()}
                    />
                    <Text className="ml-2 text-lg font-extrabold text-gray-900">
                        Pendaftaran Online
                    </Text>
                </View>
                <Ionicons name="information-circle-outline" size={20} color="#0D4D8F" />
            </View>

            <ScrollView
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
            >
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
                            imageSource={require("../../../assets/images/Icon/image 80.png")}
                            imageSize={58}
                            onPress={() => router.push("/(tabs)/Pendaftaran/PasienUmum")}
                        />
                        <CategoryCard
                            title="PASIEN PT. TIMAH"
                            imageSource={require("../../../assets/images/Icon/image 79.png")} // ganti dengan logo timah jika ada
                            imageSize={58}
                            onPress={() => router.push("/example/test")}
                        />
                        <CategoryCard
                            title="ASURANSI LAINNYA"
                            imageSource={require("../../../assets/images/Icon/image 83.png")}
                            imageSize={58}
                            onPress={() => router.push("/example/test")}
                        />
                        <CategoryCard
                            title="PASIEN BPJS"
                            imageSource={require("../../../assets/images/Icon/image 84.png")} // ganti dengan logo BPJS jika ada
                            imageSize={58}
                            onPress={() => router.push("/example/test")}
                        />
                    </View>
                </ImageBackground>
                {/* </View> */}
            </ScrollView>
        </SafeAreaView>
    );
}