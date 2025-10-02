import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";


// Komponen kecil: baris label-nilai
function Row({ left, right }: { left: string; right: string }) {
    return (
        <View className="flex-row justify-between items-center my-2">
            <View className="flex-row items-center">
                <Text className="text-[13px] font-extrabold text-[#1F5EA8]">{left}</Text>
            </View>
            <Text className="text-gray-900 font-semibold">{right}</Text>
        </View>
    );
}

export default function NomorAntrianScreen() {

    const { booking } = useLocalSearchParams<{
        booking?: string;
    }>();

    const DataBooking = booking ? JSON.parse(booking as string) : null;

    console.log("==============DataBooking dari NoAntrian=========", DataBooking)

    // =========================Variable Gopal==================
    // opsional terima param dari halaman sebelumnya
    const params = useLocalSearchParams<{
        poli?: string;
        tanggal?: string; // ISO
        dokter?: string;
        rm?: string;
        rs?: string;
    }>();

    // ---- DUMMY DATA (fallback) ----
    const hospitalName = params.rs || "RSBT PANGKAL PINANG";
    const nomorRM = params.rm || "1290231133543";
    const dokter = params.dokter || "Dr. Lina Ameliana SP.Pd";
    const poli = params.poli || "Anak";
    const visitDate = useMemo(() => {
        const d = params.tanggal ? new Date(params.tanggal) : new Date("2025-09-27T09:08:00");
        const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
    }, [params.tanggal]);
    const queueNo = 27;
    const sisaAntrian = 18;
    const pesertaDilayani = 7;

    // Kode booking dummy → dipakai untuk QR
    const kodeBooking = "202509270908";

    const estimasiWaktu = "27-09-2025 11:50";

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="bg-[#0D4D8F] px-5 pt-10 pb-3">
                <View className="flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()} className="pr-2">
                        <Ionicons name="arrow-back" size={22} color="#fff" onPress={() => router.back()} />
                    </TouchableOpacity>
                    <Text className="flex-1 text-center text-white font-extrabold text-base">
                        {hospitalName}
                    </Text>
                    <View style={{ width: 22 }} />
                </View>
            </View>

            {/* Body dengan watermark + scroll */}
            <ImageBackground
                source={require("../../../assets/images/bgprofilee.png")}
                resizeMode="contain"
                imageStyle={{ opacity: 0.06 }}
                className="flex-1"
            >
                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingTop: 16, paddingBottom: 28 + 64 }}
                >
                    {/* Kartu utama */}
                    <View
                        className="bg-white rounded-2xl px-4 py-5">
                        {/* Garis tipis */}
                        <View className="h-[1px] bg-gray-200 my-3" />

                        {/* Estimasi */}
                        <View className="mt-4 mb-2 items-center">
                            <Text className="text-center font-extrabold text-gray-800">
                                Estimasi Dilayani
                            </Text>
                            <Text className="text-center text-[12px] text-gray-600 mt-1">
                                {estimasiWaktu}
                            </Text>
                        </View>

                        {/* separator dekoratif */}
                        <View className="flex-row items-center my-2">
                            <View className="flex-1 h-[1px] bg-gray-200" />
                            <View className="w-14 h-7 bg-gray-100 rounded-full mx-2" />
                            <View className="flex-1 h-[1px] bg-gray-200" />
                        </View>

                        {/* QR Title */}
                        <Text className="text-center font-extrabold text-gray-900 mt-2">
                            QR Check-in Anda
                        </Text>

                        {/* QR Card */}
                        <View
                            className="bg-white rounded-2xl mt-3 px-4 py-6 self-center">
                            {/* QR code menggunakan kode booking */}
                            <QRCode value={DataBooking.kode_booking} size={200} color="#0D4D8F" />
                        </View>
                    </View>

                    {/* Catatan */}
                    <View className="bg-[#EEF5FF] rounded-lg mt-4 p-3">
                        <Text className="text-[12px] text-gray-700 leading-5">
                            *) Harap datang 60 menit lebih awal guna pencatatan administrasi{"\n\n"}
                            **) Untuk poli tujuan diperlukan identitas diri, pastikan membawa kartu identitas anda{"\n\n"}
                            ***) Harap membawa kartu layanan Anda (cth: Kartu BPJS, Asuransi, dll)
                        </Text>

                        <TouchableOpacity className="mt-3">
                            <Text className="text-[#1F5EA8] underline text-[12px] font-semibold">
                                Lihat Informasi dan Prosedur Lengkap
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}