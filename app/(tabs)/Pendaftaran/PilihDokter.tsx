import React, { useEffect, useState, useMemo } from "react";
import { View, Text, ActivityIndicator, FlatList, Alert, TurboModuleRegistry, Image, ImageBackground, SafeAreaView, ScrollView } from "react-native";
import api from "@/src/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import DoctorCard from "@/src/components/DoctorCard";
import { STORAGE_URL } from "@/src/api/api";

export default function PilihDokterScreen() {
    interface Jadwal {
        id_jadwal: number;
        hari: string;
        jam_mulai: string;
        jam_selesai: string;
        status: string;
    }

    interface Dokter {
        id_dokter: string;
        nama: string;
        foto: string;
        jadwal_dokter?: Jadwal[];
    }

    const [loading, setLoading] = useState(true);
    const [jadwalList, setJadwalList] = useState<Dokter[]>([]);

    const { poli, tgl } = useLocalSearchParams<{ poli?: string; tgl?: string }>();

    const tanggalLabel = useMemo(() => {
        if (!tgl) return "";
        const d = new Date(tgl);
        const bulan = [
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember",
        ];
        return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
    }, [tgl]);

    const handlerShow = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Error", "Token tidak ditemukan, silahkan login dulu");
                return;
            }
            setLoading(true);

            const res = await api.get("/dokter/index", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            setJadwalList(res.data.data ?? res.data)
        } catch (err: any) {
            console.log("API Error:", err.response?.data);
            setJadwalList([]);
            Alert.alert("Error", "Gagal memuat data dokter");
        } finally {
            setLoading(false);
        }
    };

    const handlerStore = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "Token tidak di temukan silahkan Login dulu");
                return
            }
            const paylaod = {}
        } catch (err: any) {
            console.log("Error", err.response?.data || err.message);
            Alert.alert("Erorr", err.message)
        }
    }
    useEffect(() => {
        handlerShow();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
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
                    {jadwalList.length > 0 ? (
                        jadwalList.map((dokter) => {
                            // Filter jadwal yang aktif saja
                            const jadwalAktif = dokter.jadwal_dokter?.filter(jadwal => jadwal.status === 'aktif') || [];

                            if (jadwalAktif.length > 0) {
                                // Jika ada jadwal aktif, tampilkan per jadwal
                                return jadwalAktif.map((jadwal) => (
                                    <DoctorCard
                                        key={`${dokter.id_dokter}-${jadwal.id_jadwal}`}
                                        name={dokter.nama}
                                        avatar={dokter.foto || `${STORAGE_URL}/foto_dokter/default.png`}
                                        day={jadwal.hari}
                                        time_start={jadwal.jam_mulai}
                                        time_end={jadwal.jam_selesai}
                                        onPress={() => {
                                            router.push({
                                                pathname: "/Pendaftaran/NoAntrian",
                                                params: {
                                                    dokter: dokter.nama,
                                                    poli,
                                                    tgl,
                                                    jam: jadwal.jam_mulai,
                                                },
                                            });
                                        }}
                                    />
                                ));
                            } else {
                                // Jika tidak ada jadwal aktif, tampilkan dokter tanpa jadwal
                                return (
                                    <DoctorCard
                                        key={dokter.id_dokter}
                                        name={dokter.nama}
                                        avatar={dokter.foto || `${STORAGE_URL}/foto_dokter/default.png`}
                                        day="Tidak ada jadwal"
                                        time_start="-"
                                        time_end="-"
                                        onPress={() => { }}
                                    />
                                );
                            }
                        })
                    ) : (
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-gray-500 text-center">
                                Tidak ada dokter tersedia
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}