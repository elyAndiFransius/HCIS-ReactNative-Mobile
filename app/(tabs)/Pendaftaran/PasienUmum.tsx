import api from '@/src/api/api'
import BackNavbar from '@/src/components/BackNavbar'
import InputField from '@/src/components/InputField'
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Button from '@/src/components/Button'
import TextJudul from '@/src/components/TextJudul'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useState, useContext } from 'react'
import { Alert, Image, ImageBackground,  Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from "@/src/api/AuthProvider";
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from "react-native-safe-area-context";

function PrimaryButton({ title, onPress }: { title: string; onPress: () => void }) {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            className="bg-[#0D4D8F] rounded-xl items-center py-3"
            style={{
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
            }}
        >
            <Text className="text-white font-extrabold text-base">{title}</Text>
        </TouchableOpacity>
    );
}

const fmt = (d?: Date | null) => {
    if (!d) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    return `${yy}-${mm}-${dd}`;
};



function PasienUmum() {

    // Variable untuk inputkan pasien
    const [tgl_lahir, setTgl_Lahir] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    // Variabel untuk cari pengguna
    const [no_rm, SetNo_rm] = useState('');

    const onPickDate = (e: DateTimePickerEvent, selected?: Date) => {
        if (Platform.OS === "android") setShowPicker(false);
        if (selected) setTgl_Lahir(selected);
    };


    const hanlderFind = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Error", "Token tidak ditemukan, silahkan login");
                return
            }

            //Kirim inputan pencarian data dalam bentuk string
            const payload = {
                no_rm: String(no_rm),
                tgl_lahir: fmt(tgl_lahir)   // convert Date → "YYYY-MM-DD"
            };

            // Panggil Endpoint untuk mencari datanya
            const res = await api.post("/pendaftaran/find-pasien", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                },

            });

            // Jika data pasien ada kita kirim ke screen lain
            if (res.data.success === true) {
                router.push({
                    pathname: '/Pendaftaran/DataPasien',
                    params: { pasien: JSON.stringify(res.data.data) },
                });
            } else {
                Alert.alert("Gagal", res.data.message || "Terjadi kesalahan");
            }
        } catch (err: any) {
            console.log(err.response?.data || err.message);

            Alert.alert("Error", "Pasien Tidak ditemukan");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-5 pt-10 pb-3 bg-white">
                <View className="flex-row items-center">
                    <Ionicons name="chevron-back" size={24} color="#000000ff" onPress={() => router.push("/example/test")} />
                    <Text className="ml-2 text-lg font-extrabold text-[#000000ff]">
                        Pendaftaran Online Pasien
                    </Text>
                </View>
            </View>

            {/* Ganti background biru dengan ImageBackground */}
            <ImageBackground
                source={require("@/assets/images/bgprofilee.png")}
                resizeMode="cover"
                className="flex-1"
                style={{ width: 1200, height: 1200, alignSelf: "center" }}
                imageStyle={{ opacity: 0.3 }}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 16,

                    }}
                >
                    <View
                        className="bg-white rounded-2xl w-full max-w-sm p-6"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 10,
                            elevation: 8,
                        }}
                    >
                        <Text className="text-[13px] font-semibold text-gray-800 mb-1">
                            Nomor Rekam Medis/ NIK<Text className="text-red-500">*</Text>
                        </Text>
                        <InputField
                            icon="id-card-outline"
                            placeholder="Masukkan Nomor Rekam atau NIK anda"
                            value={no_rm}
                            onChangeText={SetNo_rm}
                            containerClassName="w-full mb-5"
                            autoCapitalize='none' />

                        <Text className="text-[13px] font-semibold text-gray-800 mt-5 mb-1">Tanggal Lahir</Text>
                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => setShowPicker(true)}
                            className="flex-row items-center bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 w-full mb-5">
                            <Text className={`flex-1 text-base ${tgl_lahir ? "text-gray-800" : "text-gray-400"}`}>{tgl_lahir ? fmt(tgl_lahir) : "DD-MM-YYYY"}</Text>
                            <Ionicons name="calendar-outline" size={20} color="#374151" />
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={tgl_lahir ?? new Date(2000, 0, 1)}
                                mode="date"
                                display={Platform.OS === "ios" ? "inline" : "default"}
                                onChange={onPickDate}
                                maximumDate={new Date()} />
                        )}

                        <View className="mt-8">
                            <PrimaryButton title="Cari Pasien" onPress={hanlderFind} />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default PasienUmum;
