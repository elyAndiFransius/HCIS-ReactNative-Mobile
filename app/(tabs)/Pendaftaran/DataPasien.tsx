import React, { useMemo } from "react";
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

// Komponen baris info rapi
function InfoRow({ label, value }: { label: string; value?: string }) {
    return (
        <View className="flex-row items-start py-3">
            <Text
                className="w-32 text-[13px] font-extrabold text-[#1F5EA8]"
                style={{ lineHeight: 52 }}
            >
                {label}
            </Text>
            <Text
                className="flex-1 text-right font-semibold text-gray-900"
                style={{ lineHeight: 52 }}
            >
                {value || "-"}
            </Text>
        </View>
    );
}

// Hitung umur dari format YYYY-MM-DD
function getAgeFromYYYYMMDD(dob?: string) {
    if (!dob) return "";
    const [yyyy, mm, dd] = dob.split("-").map((s: string) => parseInt(s, 10));
    if (!yyyy || !mm || !dd) return "";
    const today = new Date();
    let age = today.getFullYear() - yyyy;
    const beforeBirthday =
        today.getMonth() + 1 < mm ||
        (today.getMonth() + 1 === mm && today.getDate() < dd);
    if (beforeBirthday) age -= 1;
    return `${age} Tahun`;
}

function DataPasien() {
    const { pasien } = useLocalSearchParams();
    const data = pasien ? JSON.parse(pasien as string) : null;

    const umur = getAgeFromYYYYMMDD(data?.tgl_lahir);

    const dobLong = useMemo(() => {
        if (!data?.tgl_lahir) return "-";
        const [y, m, d] = data.tgl_lahir
            .split("-")
            .map((s: string) => parseInt(s, 10));
        const bulan = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];
        return bulan[m - 1] ? `${d} ${bulan[m - 1]} ${y}` : data.tgl_lahir;
    }, [data?.tgl_lahir]);

    if (!data) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text className="text-red-600">Data pasien tidak ditemukan</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-5 pt-10 pb-3 bg-white">
                <View className="flex-row items-center">
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#000000"
                        onPress={() => router.back()}
                    />
                    <Text className="ml-2 text-lg font-extrabold text-[#000000]">
                        Data Pasien
                    </Text>
                </View>
            </View>

            {/* Background bergambar + konten */}
            <ImageBackground
                source={require("@/assets/images/icon.png")} // ganti sesuai kebutuhan
                resizeMode="contain"
                imageStyle={{ opacity: 0.06 }}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        paddingTop: 12,
                        paddingBottom: 20,
                    }}
                >
                    {/* Data Pasien */}
                    <View className="bg-white rounded-2xl w-full max-w-md px-5 py-6 mb-6">
                        <InfoRow label="Nomor RM" value={data.no_rm} />
                        <InfoRow label="NIK" value={data.no_ktp} />
                        <InfoRow label="Nama Lengkap" value={data.nama} />
                        <InfoRow label="Tanggal Lahir" value={dobLong} />
                        <InfoRow label="Jenis Kelamin" value={data.jenis_kelamin} />
                        <InfoRow label="Umur" value={umur} />
                        <InfoRow label="Status" value={data.status} />
                    </View>

                    {/* Tombol Aksi */}
                    <View className="w-full max-w-md">
                        <TouchableOpacity
                            className="bg-[#1F5EA8] rounded-xl items-center py-3 mb-3"
                            onPress={() =>
                                router.push({
                                    pathname: "/Pendaftaran/PoliKlinik",
                                    params: { pasien },
                                })}
                        >
                            <Text className="text-white font-extrabold text-base">
                                Pilih Poli Tujuan
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-gray-200 rounded-xl items-center py-3"
                            onPress={() => router.back()}
                        >
                            <Text className="text-[#1F5EA8] font-extrabold text-base">
                                Kembali
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView >
    );
}

export default DataPasien;
