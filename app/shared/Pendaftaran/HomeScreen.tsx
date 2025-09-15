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

            const res = await api.post("/pendaftaran/store", payload, {
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
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "Token tidak ditemukan, silakan login dulu");
                return;
            }

            const payload = { no_rm, tgl_lahir };

            const res = await api.post("/pendaftaran/find-pasien", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (res.data.success) {
                router.push({
                    pathname: "./DetailPasienScreen",
                    params: { pasien: JSON.stringify(res.data.data) },
                });
            } else {
                setHasilPasien(null);
                Alert.alert("Gagal", res.data.message);
            }
        } catch (err: any) {
            console.log("Error: ", err.response?.data || err.message);
            Alert.alert("Error", "Pasien Tidak ditemukan");
        }
    };

    return (
        <View>
            {user?.role === "admin" ? (
                <BackNavbar label='Pendaftaran Pasien' />
            ) : (
                <BackNavbar label='Pendaftaran Online Pasien' />
            )}


            {user?.role === "admin" ? (
                <SafeAreaView>
                    <View className='ml-10 mr-10'>
                        <View className='mt-10'>
                            <Text className='text-lg font-semibold text-gray-700'>Nomor Rekam Medis sudah di generate manual ketika di daftarkan</Text>
                        </View>
                        <View className='mt-10'>
                            <Text style={{ fontSize: 14, color: '#374151' }}>
                                Nomor Rekam Medis <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <InputField
                                value={nik}
                                onChangeText={setNik}
                                placeholder='NIK'
                                autoCapitalize='none'
                            />
                        </View>
                        <View className='mt-3'>
                            <Text style={{ fontSize: 14, color: '#374151' }}>
                                Nomor Rekam Medis <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <InputField
                                value={nama}
                                onChangeText={setNama}
                                placeholder='Nama Lengkap'
                                autoCapitalize='none'
                            />
                        </View>
                        <View className='mt-1'>
                            <Text style={{ fontSize: 14, color: '#374151' }}>
                                Nomor Rekam Medis <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <InputField
                                value={tgl_lahir}
                                onChangeText={setTgl_Lahir}
                                placeholder='Lahir'
                                autoCapitalize='none'
                            />
                        </View>
                        <View className='mt-1'>
                            <Text style={{ fontSize: 14, color: '#374151' }}>
                                Nomor Rekam Medis <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <InputField
                                value={umur}
                                onChangeText={setUmur}
                                placeholder='Umur (YYYY-MM-DD)'
                                autoCapitalize='none'
                            />
                        </View>
                        <View className='mt-1'>
                            <Text style={{ fontSize: 14, color: '#374151' }}>
                                Nomor Rekam Medis <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <InputField
                                value={jns_kelamin}
                                onChangeText={setJns_kelamin}
                                placeholder='Jenis Kelamin'
                                autoCapitalize='none'
                            />
                        </View>
                        <View className='mt-1'>
                            <Text style={{ fontSize: 14, color: '#374151' }}>
                                Nomor Rekam Medis <Text style={{ color: 'red' }}>*</Text>
                            </Text>

                            <InputField
                                value={status}
                                onChangeText={setStatus}
                                placeholder='Status'
                                autoCapitalize='none'
                            />
                            </View>

                        <View className='mt-7'>
                            <Button
                                label='Daftar'
                                className='flex-row justify-center border border-gray-950 bg-blue-800 mt-14 rounded-lg py-4 w-1/4'
                                onPress={hanlderSumbit}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            ) : (
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
            )}

        </View>
    )
}

export default HomeScreen;
