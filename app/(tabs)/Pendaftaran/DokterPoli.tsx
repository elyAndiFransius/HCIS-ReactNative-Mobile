import api, { STORAGE_URL } from "@/src/api/api";
import DokterPoli from "@/src/components/DokterPoliChart";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

// 🧩 Interface sesuai struktur data dari backend
interface JadwalDokter {
    id_jadwal: string;
    hari: string;
    jam_mulai: string;
    jam_selesai: string;
    status: string;
}

interface Dokter {
    id_dokter: string;
    nama: string;
    foto: string;
    dokter_spes: string;
    jadwal_dokter: JadwalDokter[];
}

interface Poli {
    id_list_poli: string;
    nama_poli: string;
    status_poli: string;
    dokter_list: Dokter[];
}

export default function DokterPoliScreen() {
    const [search, setSearch] = useState("");
    const [Data, setData] = useState<Poli[]>([]);
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState<string | null>(null);


    const { tgl, pasien } = useLocalSearchParams();

    const tanggal = Array.isArray(tgl) ? tgl[0] : tgl || '';
    const DataPasien = pasien ? JSON.parse(pasien as string) : null;


    const handlerShow = async () => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                Alert.alert("Error", "Token tidak ditemukan, silahkan login dulu");
                return;
            }

            setLoading(true);
            setData([]);

            const res = await api.post(
                "/dokter/showPoliDokter",
                { tanggal: tgl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                    timeout: 5000,
                }
            );

            
            const rawData: Poli[] = res.data?.data || [];
            // kita tidak perlu filter karena server sudah kirim hanya yang aktif
            setData(rawData);
        } catch (err: any) {
            console.log("Api Error => ", err.response?.data || err.message);
            Alert.alert("Error", "Gagal memuat data dokter");
        } finally {
            setLoading(false);
        }
    };

    const handlerSelect = (item: any) => {
        setSelect(item)

        router.push({
            pathname: '/Pendaftaran/DetailTransaksi',
            params: {
                dataTransaksi: JSON.stringify(item),
                pasien: JSON.stringify(DataPasien),
                tanggal: tgl
            }
        });
    }

    useEffect(() => {
        handlerShow();
    }, []);

    // Filter pencarian nama dokter / poli
    const filteredData = Data.filter((poli) =>
        poli.nama_poli.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-5 pb-3">
                <View className="flex-row items-center">
                    <Ionicons
                        name="chevron-back"
                        size={24}
                        color="#0D4D8F"
                        onPress={() => router.back()}
                    />
                    <Text className="ml-2 text-lg font-extrabold text-[#0D4D8F]">
                        Kembali
                    </Text>
                </View>
            </View>

            {/* Search bar */}
            <View className="flex-row border border-[#0D4D8F] rounded-full items-center m-5">
                <View className="ml-5">
                    <Ionicons name="search" size={24} color="#374151" />
                </View>
                <TextInput
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Cari poli atau dokter"
                    autoCapitalize="none"
                    className="flex-1 text-base font-semibold ml-2"
                />
            </View>

            {/* Loading indicator */}
            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0D4D8F" />
                </View>
            ) : (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.id_list_poli}
                    renderItem={({ item }) => (
                        <View className="mb-5">
                            <Text className="text-lg font-bold text-[#0D4D8F] ml-5 mb-2">
                                {item.nama_poli}
                            </Text>

                            {/* looping dokter di dalam poli */}
                            {item.dokter_list.map((dokter) => (
                                <TouchableOpacity key={dokter.id_dokter} onPress={() => handlerSelect(item)}>
                                    <DokterPoli
                                        key={dokter.id_dokter}
                                        nama={dokter.nama}
                                        spesialis={dokter.dokter_spes}
                                        namaPoli={item.nama_poli}
                                        tanggal={tanggal}
                                        foto={dokter.foto
                                            ? `${STORAGE_URL}${dokter.foto}`
                                            : `${STORAGE_URL}default.png`}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-gray-500 text-center">
                                Tidak ada poli dan dokter pada tanggal ini.
                            </Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            )}
        </SafeAreaView>
    );
}
