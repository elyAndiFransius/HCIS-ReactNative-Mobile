import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
    ActivityIndicator,
    Alert,
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import QRCode from "react-native-qrcode-svg";
import Modal from "react-native-modal";
import { useRoute } from "@react-navigation/native";
import { showOne } from "@/src/services/bookingService";
import { checkIn } from "@/src/services/antrianService";

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
    const tabBarHeight = useBottomTabBarHeight();
    const insets = useSafeAreaInsets();
    const [showModal, setShowModal] = useState(false);
    const [dataBooking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const { id } = useLocalSearchParams<{ id: string }>();

    console.log("id klik", id)

    useEffect(() => {
        const healderShowOne = async () => {
            try {
                setLoading(true)
                const res = await showOne(id);
                setBooking(res)
                console.log("================ini data sesunguhnya dari NoAntrian==========", res)
            } catch (err: any) {
                console.log("Error fetch booking:", err.response?.data || err.message);
                Alert.alert("Error", err.message)
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            healderShowOne();
        }
    }, [id]);

    const headlerCheck = async () => {
        try {
            const res = await checkIn(id);
            setShowModal(true)
        } catch (err: any) {
            console.log('Error Check In: ', err.response?.data || err.message)
        }
    }

    if (!id || loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#1E3A8A" />
                <Text className="mt-2 text-gray-600">Memuat data antrian...</Text>
            </View>
        );
    }

    if (!dataBooking) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#1E3A8A" />
                <Text className="mt-2 text-gray-600">Memuat data antrian...</Text>
            </View>
        );
    }

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
                        Pangkal Pinang
                    </Text>
                    <View style={{ width: 22 }} />
                </View>
            </View>

            {/* Body dengan watermark + scroll */}
            <ImageBackground
                source={require("../../../assets/images/bgprofilee.png")}
                resizeMode="contain"
                imageStyle={{ opacity: 0.06 }}
                className="flex-1">
                <ScrollView
                    className="flex-1 px-4"
                    contentContainerStyle={{ paddingBottom: tabBarHeight + insets.bottom + 16 }}>
                    {/* Kartu utama */}
                    <View
                        className="bg-white rounded-2xl px-4 py-5"
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.08,
                            shadowRadius: 10,
                            shadowOffset: { width: 0, height: 6 },
                            elevation: 4,
                        }}>
                        {/* Header kecil kartu */}
                        <Text className="text-center font-extrabold text-[#0D4D8F]">RSBT PANGKAL PINANG</Text>
                        <Text className="text-center text-[12px] text-gray-700 mt-1">No. RM: {dataBooking?.kode_booking}</Text>
                        <Text className="text-center text-[12px] text-gray-700">Dr. {dataBooking?.dokter.nama}</Text>

                        {/* Nomor Antrian */}
                        <Text className="text-center mt-4 font-extrabold text-gray-900">Nomor Antrian Anda</Text>

                        <View className="items-center mt-2 mb-1">
                            <View className="w-28 h-28 rounded-full border-4 border-[#0D4D8F] items-center justify-center">
                                <Text className="text-4xl font-extrabold text-[#0D4D8F]">{dataBooking?.antrian.no_antrian}</Text>
                            </View>
                        </View>

                        {/* Dua kolom info kecil */}
                        <View className="flex-row justify-between mt-2 mb-1 px-1">
                            <View className="items-center">
                                <Ionicons name="people-outline" size={18} color="#0D4D8F" />
                                <Text className="text-[11px] text-gray-600 mt-1">Sisa{"\n"}Antrian</Text>
                                <Text className="text-base font-bold text-[#0D4D8F] mt-1">5</Text>
                            </View>
                            <View className="items-center">
                                <Ionicons name="person-circle-outline" size={18} color="#0D4D8F" />
                                <Text className="text-[11px] text-gray-600 mt-1">Peserta{"\n"}Dilayani</Text>
                                <Text className="text-base font-bold text-[#0D4D8F] mt-1">10</Text>
                            </View>
                        </View>

                        {/* Garis tipis */}
                        <View className="h-[1px] bg-gray-200 my-3" />

                        {/* Detail ringkas */}
                        <Row left="Poli" right={dataBooking?.list_poli.nama} />
                        <Row left="Tanggal Kunjungan" right={dataBooking?.antrian.tanggal} />
                        <Row left="Kode Booking" right={dataBooking?.kode_booking} />

                        <View className="bg-white rounded-2xl px-4 py-5">
                            {/* Garis tipis */}
                            <View className="h-[1px] bg-gray-200 my-3" />

                            {/* Estimasi */}
                            <View className="mt-4 mb-2 items-center">
                                <Text className="text-center font-extrabold text-gray-800">Estimasi Dilayani</Text>
                                <Text className="text-center text-[12px] text-gray-600 mt-1">{estimasiWaktu}</Text>
                            </View>

                            {/* separator dekoratif */}
                            <View className="flex-row items-center my-2">
                                <View className="flex-1 h-[1px] bg-gray-200" />
                                <View className="w-14 h-7 bg-gray-100 rounded-full mx-2" />
                                <View className="flex-1 h-[1px] bg-gray-200" />
                            </View>

                            {/* QR Title */}
                            <Text className="text-center font-extrabold text-gray-900 mt-2">QR Check-in Anda</Text>
                            {/* QR Card */}
                            <View className="bg-white rounded-2xl mt-3 px-4 py-6 self-center">
                                {/* QR code menggunakan kode booking */}
                                <QRCode value={dataBooking.kode_booking} size={200} color="#0D4D8F" />
                            </View>
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
                    {/* Tombol aksi */}
                    <View className="mt-5">
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className="flex-row items-center justify-center bg-[#1F5EA8] rounded-2xl py-3 mb-3"
                            // onPress={() => setShowModal(true)}
                            onPress={() => headlerCheck()}
                            style={{
                                shadowColor: "#000",
                                shadowOpacity: 0.08,
                                shadowRadius: 8,
                                shadowOffset: { width: 0, height: 4 },
                                elevation: 3,
                            }}>
                            <Ionicons name="checkmark-circle" size={20} color="#C7E1FF" />
                            <Text className="ml-2 text-white font-extrabold">Check-in</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            activeOpacity={0.9}
                            className="flex-row items-center justify-center bg-white rounded-2xl py-3 border-2 border-[#1F5EA8]"
                            onPress={() => router.back()}>
                            <Ionicons name="close-circle" size={20} color="#D32F2F" />
                            <Text className="ml-2 text-[#1F5EA8] font-extrabold">Batalkan</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        isVisible={showModal}
                        onBackdropPress={() => setShowModal(false)}
                        useNativeDriver
                        useNativeDriverForBackdrop
                        animationIn="zoomIn"
                        animationOut="zoomOut"
                        backdropTransitionOutTiming={0}>
                        <View
                            className="bg-white rounded-2xl px-5 pt-6 pb-5"
                            style={{
                                shadowColor: "#000",
                                shadowOpacity: 0.15,
                                shadowRadius: 12,
                                shadowOffset: { width: 0, height: 6 },
                                elevation: 6,
                            }}>
                            {/* Icon */}
                            <View className="items-center mb-3">
                                <View className="w-16 h-16 rounded-full bg-[#E7F1FF] items-center justify-center">
                                    <Ionicons name="checkmark-circle" size={44} color="#1F5EA8" />
                                </View>
                            </View>

                            {/* Title & message */}
                            <Text className="text-center text-[18px] font-extrabold text-gray-900">
                                Check-in Berhasil
                            </Text>
                            <Text className="text-center text-[13px] text-gray-600 mt-2">
                                Anda sudah berhasil check-in. Buka menu <Text className="font-semibold">Jadwal</Text> untuk melihat jadwal Anda.
                            </Text>

                            {/* CTA */}
                            <TouchableOpacity
                                activeOpacity={0.9}
                                className="mt-5 bg-[#1F5EA8] rounded-xl py-3 items-center"
                                onPress={() => {
                                    setShowModal(false);
                                    router.push("/(tabs)/Jadwal");
                                }}
                            >
                                <Text className="text-white font-extrabold">OK, Mengerti</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}