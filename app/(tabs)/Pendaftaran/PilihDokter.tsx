import React, { useEffect, useState, useMemo } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    FlatList,
    Alert,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import api, { STORAGE_URL } from "@/src/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import DoctorCard from "@/src/components/DoctorCard";
import SuccessModal from "@/src/components/SuccessModal";
import { getDokterById } from "@/src/services/dokterService";

export default function PilihDokterScreen() {
    const [loading, setLoading] = useState(true);
    const [dokterData, setDokterData] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [selectDokter, setSelectDokter] = useState<string | null>(null);

    // Mengambil data yang di kirimkan secara local
    const { pasien, poli, tgl } = useLocalSearchParams<{
        poli?: string;
        pasien?: string;
        tgl?: string;
    }>();
    console.log(poli)

    // format tanggal biar bisa kita storekan data nya laravel
    const date = new Date();
    const formatData = date.toISOString().split("T")[0];
    const DataPasien = pasien ? JSON.parse(pasien as string) : null; // Mengambil data pasien
    const DataPoli = poli ? JSON.parse(poli as string) : null;

    console.log("Ini data pasien", DataPasien.no_ktp)
    console.log("Ini data Poli", DataPoli)
    console.log("Ini data Tanggal", formatData)


    // Fungsi untuk menampung data Jadwal
    interface Jadwal {
        id_jadwal: number;
        hari: string;
        jam_mulai: string;
        jam_selesai: string;
        status: string;
    }

    // Fungsi untuk menampung seluruh data Dokter dan Jadwal
    interface Dokter {
        id_dokter: string;
        nama: string;
        foto: string;
        jadwal_dokter?: Jadwal[];
    }

    // Format tanggal untuk menampilkan nama bulan
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
            setDokterData([]); // kita reset data sebelum di fetch

            const res = await api.get("/dokter/index", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });
            const rawData = res.data?.data || res.data || [];

            // Memastikan data yang dikirimkan server dalam berntuk array
            const dokterList: Dokter[] = Array.isArray(rawData) ? rawData : [];


            //  Flatten dokter + jadwal jadi list
            const flattened = dokterList.flatMap((dokter) => {
                const jadwalAktif = dokter.jadwal_dokter?.filter((j) => j.status === "aktif") || []; // Filter data dokter yang aktif
                if (jadwalAktif.length > 0) {
                    return jadwalAktif.map((jadwal) => ({
                        key: `${dokter.id_dokter}-${jadwal.id_jadwal}`,
                        name: dokter.nama,
                        avatar: dokter.foto
                            ? `${STORAGE_URL}${dokter.foto}`
                            : `${STORAGE_URL}default.png`,
                        day: jadwal.hari,
                        time_start: jadwal.jam_mulai,
                        time_end: jadwal.jam_selesai,
                        id_dokter: dokter.id_dokter,
                    }));
                } else {
                    return [
                        {
                            key: dokter.id_dokter,
                            name: dokter.nama,
                            avatar:
                                dokter.foto || `${STORAGE_URL}/foto_dokter/default.png`,
                            day: "Tidak ada jadwal",
                            time_start: "-",
                            time_end: "-",
                            id_dokter: dokter.id_dokter,
                        },
                    ];
                }
            });

            setDokterData(flattened); // Menyimapan data
        } catch (err: any) {
            console.log("API Error:", err.response?.data || err.message);
            console.log("Ini data yang masuk ke error:", setDokterData)
            Alert.alert("Error", "Gagal memuat data dokter");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectDokterId = (item: any) => {
        setSelectDokter(item)
        console.log("Data yang kamu Pick ============", item)

        router.push({
            pathname: "/Pendaftaran/DetailTransaksi",
            params: {
                dokter: JSON.stringify(item) // Gunakan item, bukan selectDokter
            }
        })
    }

    //Fungsi untuk mengirikan seluruh data ke screen lain
    const handleSelectDokter = async (id: string) => {
        try {

            const dokter = await getDokterById(id);
            setSelectDokter(dokter)
            console.log("Data yang kamu Pick ============", selectDokter)
        } catch (err: any) {
            console.log("Yah mau gimana lagi ya: ", err.response?.data);
        }
    }


    // Menampikan semua data yang ada di dalam server
    useEffect(() => {
        handlerShow();
    }, []);

    if (loading || dokterData.length === 0) {
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
                        {`Silahkan Pilih Dokter ${poli ? `Poli ${DataPoli.nama}` : "Poli"
                            }`}
                    </Text>
                </View>
                {!!tanggalLabel && (
                    <Text className="ml-8 mt-1 text-sm text-gray-600">
                        Jadwal: {tanggalLabel}
                    </Text>
                )}
            </View>

            {/* Body pakai FlatList */}
            <ImageBackground
                source={require("../../../assets/images/bgprofilee.png")}
                resizeMode="contain"
                imageStyle={{ opacity: 0.0 }}
                className="flex-1 mt-6" >
                <FlatList
                    data={dokterData}
                    contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
                    keyExtractor={(item) => item.key}

                    // Menampilkan informasi data jika data di server kosong
                    ListEmptyComponent={() => (
                        <View className="flex-1 justify-center items-center py-20">
                            <Text className="text-gray-500 text-center">
                                Tidak ada dokter tersedia
                            </Text>
                        </View>
                    )}

                    // Menampilkan data jikda di server menggirimkan datanya
                    renderItem={({ item }) => (
                        <DoctorCard
                            name={item.name}
                            avatar={item.avatar}
                            day={item.day}
                            time_start={item.time_start}
                            time_end={item.time_end}
                            onPress={() => handleSelectDokterId(item)}
                        />
                    )}
                />
            </ImageBackground>

            {/* Modal Berhasil */}
            <SuccessModal
                visible={open}
                onClose={() => {
                    setOpen(false);
                    router.push("/(tabs)/Beranda");
                }}
                message="Data berhasil disimpan!"
            />
        </SafeAreaView>
    );
}
