import api from '@/src/api/api'
import BackNavbar from '@/src/components/BackNavbar'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import TextJudul from '@/src/components/TextJudul'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useState, useContext } from 'react'
import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from "@/src/api/AuthProvider";


function HomeScreen() {
    const { user, logout } = useContext(AuthContext)!;

    // Variable untuk inputkan pasien
    const [nik, setNik] = useState('');
    const [nama, setNama] = useState('');
    const [tgl_lahir, setTgl_Lahir] = useState('');
    const [jns_kelamin, setJns_kelamin] = useState('');
    const [umur, setUmur] = useState('');
    const [status, setStatus] = useState('');

    // Variabel untuk cari pengguna
    const [no_rm, SetNo_rm] = useState('');
    const [hasilPasien, setHasilPasien] = useState<any>(null);

    const hanlderSumbit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "Token tidak ditemukan, silakan login dulu");
                return;
            }

            const payload = { nik, nama, tgl_lahir, jns_kelamin, umur, status };

            const res = await api.post("/pendaftaran/find", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            router.replace('/(tabs)/Beranda');
            console.log("Respon: ", res.data);
            Alert.alert("Sukses", "Pendaftaran berhasil ditambahkan!");
        } catch (err: any) {
            console.log("Error: ", err.response?.data || err.message);
            Alert.alert("Error", "Gagal menambahkan data");
        }
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
                tgl_lahir: tgl_lahir
            }

            // Panggil Endpoint untuk mencari datanya
            const res = await api.post("/pendaftaran/find-pasien", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                },

            });

            // Jika data pasien ada kita kirim ke screen lain
            if (res.data.status === "success") {
                router.push({
                    pathname: '/shared/Pendaftaran/DetailPasienScreen',
                    params: { pasien: JSON.stringify(res.data.data) },
                });
            } else {
                setHasilPasien(null);
                Alert.alert("Gagal", res.data.message || "Terjadi kesalahan");
            }

        } catch (err: any) {
            console.log(err.response?.data || err.message);

            Alert.alert("Error", "Pasien Tidak ditemukan");
        }
    };

    return (
        <View>
            <SafeAreaView>
                <View className='m-10'>
                    <View className='mt-5'>
                        <Text className='text-base font-semibold text-gray-700'>Nomor Rekam Medis/NIK</Text>
                        <InputField
                            value={no_rm}
                            onChangeText={SetNo_rm}
                            placeholder='Status'
                            autoCapitalize='none'

                        />
                    </View>
                    <View className='mt-5'>
                        <Text className='text-base font-semibold text-gray-700'>Nomor Rekam Medis/NIK</Text>
                        <InputField
                            value={tgl_lahir}
                            onChangeText={setTgl_Lahir}
                            placeholder='Status'
                            autoCapitalize='none'

                        />
                    </View>
                    <View className='mt-10'>
                        <Button
                            label='Daftar'
                            className='flex-row justify-center border border-gray-950 bg-blue-800 mt-14 rounded-lg py-4 w-3/4'
                            onPress={hanlderFind}
                        />
                        {hasilPasien && (
                            <View className="mt-5 p-4 border rounded-lg bg-gray-100">
                                <Text className="text-lg font-bold">Data Pasien:</Text>
                                <Text>No RM: {hasilPasien.no_rm}</Text>
                                <Text>Nama: {hasilPasien.nama}</Text>
                                <Text>Tanggal Lahir: {hasilPasien.tgl_lahir}</Text>
                                <Text>Status: {hasilPasien.status}</Text>
                            </View>
                        )}
                    </View>

                </View>
            </SafeAreaView>


        </View>
    )
}

export default HomeScreen;
