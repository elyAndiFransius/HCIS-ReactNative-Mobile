import { Ionicons } from "@expo/vector-icons";
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

// Baris info rapi: label kiri, nilai kanan
function InfoRow({ label, value }: { label: string; value?: string }) {
    return (
        <View className="flex-row items-start py-3">
            <Text className="w-32 text-[13px] font-extrabold text-[#1F5EA8]" style={{ lineHeight: 52 }}>
                {label}
            </Text>
            <Text className="flex-1 text-right font-semibold text-gray-900" style={{ lineHeight: 52 }}>
                {value || "-"}
            </Text>
        </View>
    );
}




// Hitung umur dari "DD-MM-YYYY"
function getAgeFromDDMMYYYY(dob?: string) {
    if (!dob) return "";
    const [dd, mm, yyyy] = dob.split("-").map((s) => parseInt(s, 10));
    if (!dd || !mm || !yyyy) return "";
    const today = new Date();
    let age = today.getFullYear() - yyyy;
    const beforeBirthday =
        today.getMonth() + 1 < mm || (today.getMonth() + 1 === mm && today.getDate() < dd);
    if (beforeBirthday) age -= 1;
    return `${age} Tahun`;
}

export default function DataPasienScreen() {
    const { nik, dob, rm, name, gender, status } = useLocalSearchParams<{
        nik?: string;
        dob?: string; // "DD-MM-YYYY"
        rm?: string;
        name?: string;
        gender?: string;
        status?: string;
    }>();

    const data = useMemo(() => {
        const fallback = {
            rm: "12023498",
            nik: "121098129",
            name: "Kevin Abas Surya",
            dob: "17-08-1986",
            gender: "Laki - laki",
            status: "Menikah",
        };
        return {
            rm: rm || fallback.rm,
            nik: nik || fallback.nik,
            name: name || fallback.name,
            dob: dob || fallback.dob,
            gender: gender || fallback.gender,
            status: status || fallback.status,
        };
    }, [rm, nik, name, dob, gender, status]);

    const umur = getAgeFromDDMMYYYY(data.dob);
    const dobLong = useMemo(() => {
        if (!data.dob) return "-";
        const [d, m, y] = data.dob.split("-").map((s) => parseInt(s, 10));
        const bulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember",
        ];
        return bulan[m - 1] ? `${d} ${bulan[m - 1]} ${y}` : data.dob;
    }, [data.dob]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View
                className="px-5 pb-3"
                style={{
                    backgroundColor: "#0D4D8F",
                    paddingTop: 40, // atur jarak supaya header turun
                }}
            >
                <View className="flex-row items-center">
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#fff" // ubah jadi putih
                        onPress={() => router.push("/(tabs)/Pendaftaran/PasienUmum")}
                    />
                    <Text className="ml-2 text-lg font-extrabold text-white">
                        Data Pasien
                    </Text>
                </View>
            </View>

            {/* Background bergambar + konten di TENGAH */}
            <ImageBackground
                source={require("@/assets/images/icon.png")} // ganti jika mau
                resizeMode="contain"
                imageStyle={{ opacity: 0.06 }}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "flex-start", // dorong ke atas
                        alignItems: "center",         // tetap center horizontal
                        paddingHorizontal: 20,
                        paddingTop: 12,               // kasih jarak kecil dari header
                        paddingBottom: 20,
                    }}
                >
                    <View className="bg-white rounded-2xl w-full max-w-md px-5 py-6 mb-6">
                        <InfoRow label="Nomor RM" value={data.rm} />
                        <InfoRow label="NIK" value={data.nik} />
                        <InfoRow label="Nama Lengkap" value={data.name} />
                        <InfoRow label="Tanggal Lahir" value={dobLong} />
                        <InfoRow label="Jenis Kelamin" value={data.gender} />
                        <InfoRow label="Umur" value={umur} />
                        <InfoRow label="Status" value={data.status} />
                    </View>

                    <View className="w-full max-w-md">
                        <TouchableOpacity className="bg-[#1F5EA8] rounded-xl items-center py-3 mb-3">
                            <Text className="text-white font-extrabold text-base" onPress={() => router.push("/(tabs)/Pendaftaran/PoliKlinik")}>Pilih Poli Tujuan</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-gray-200 rounded-xl items-center py-3">
                            <Text className="text-[#1F5EA8] font-extrabold text-base" onPress={() => router.back()}>Kembali</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


            </ImageBackground>
        </SafeAreaView>
    );
}