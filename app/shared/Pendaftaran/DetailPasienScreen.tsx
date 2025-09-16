import React from 'react'
import { View, Text } from 'react-native'
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import BackNavbar from '@/src/components/BackNavbar';
import Button from '@/src/components/Button';

function DetailPasienScreen() {
    const { pasien } = useLocalSearchParams();
    const data = pasien ? JSON.parse(pasien as string) : null;


    if (!data) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text className="text-red-600">Data pasien tidak ditemukan</Text>
            </SafeAreaView>
        );
    }

    return (
        <View>
            <BackNavbar label='Data Pasien' />
            <SafeAreaView className="p-5">


                <Text className="text-xl font-bold mb-4">Detail Pasien</Text>

                <View className="space-y-10">
                    <Text>No RM: {data.no_rm}</Text>
                    <Text>Nama: {data.nama}</Text>
                    <Text>Tanggal Lahir: {data.tgl_lahir}</Text>
                    <Text>Jenis Kelamin: {data.jns_kelamin}</Text>
                    <Text>Umur: {data.umur}</Text>
                    <Text>Status: {data.status}</Text>
                </View>
                <View>
                    <Button
                        onPress={ () => router.push('/shared/Pendaftaran/TujuanPoliScreen')}
                        label='Pilih Poli Tujuan'
                    />
                    <Button
                        label='Kembali'

                    />
                </View>

            </SafeAreaView>
        </View>
    );
}

export default DetailPasienScreen