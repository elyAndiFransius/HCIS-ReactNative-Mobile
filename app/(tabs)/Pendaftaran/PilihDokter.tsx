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
    }

    interface Dokter {
        id_dokter: string;
        nama: string;
        foto: string;
        jadwal_dokter?: Jadwal[];
    }
    const [loading, setLoading] = useState(true);
    const [jadwalList, setJadwalList] = useState<Dokter[]>([]);

    // Variable naufal
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
            // Panggil API
            const res = await api.get("/dokter/index", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            setJadwalList(res.data.data ?? res.data)
            console.log("Data dokter dan jadwal dokter: ", res.data.data ?? res.data)
        } catch (err: any) {
            console.log(err.response?.data)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handlerShow();
    }, []);


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
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

                    {jadwalList.map((dokter) =>
                        Array.isArray(dokter.jadwal_dokter) && dokter.jadwal_dokter.length > 0 ? (
                            dokter.jadwal_dokter.map((jadwal) => (
                                <DoctorCard
                                    key={jadwal.id_jadwal}
                                    name={dokter.nama}          // nama dokter
                                    avatar={`http://192.168.0.105:8000/storage/foto_dokter/foto_dokter.png`}
                                    day={jadwal.hari}           // hari dari jadwal
                                    time_start={jadwal.jam_mulai}     // jam mulai dari jadwal
                                    time_end={jadwal.jam_selesai}     // jam mulai dari jadwal
                                    onPress={() => {
                                        router.push({
                                            pathname: "/example/test",
                                            params: {
                                                dokter: dokter.nama,
                                                poli,
                                                tgl,
                                                jam: jadwal.jam_mulai,
                                            },
                                        });
                                    }}
                                />

                            ))
                        ) : (
                            <DoctorCard
                                key={dokter.id_dokter}
                                name={dokter.nama}
                                avatar={`${STORAGE_URL}/${dokter.foto}`}
                                day="Tidak ada jadwal"
                                time_start="-"
                                time_end="-"
                                onPress={() => { }}
                            />
                        )
                    )}

                </ScrollView>

            </ImageBackground>
        </SafeAreaView>
    );
}
