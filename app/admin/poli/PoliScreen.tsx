import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'
import BackNavbar from '@/src/components/BackNavbar'
import { SafeAreaView } from 'react-native-safe-area-context';
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '@/src/api/api'
import { router } from 'expo-router'

function PoliScreen() {
  const [nama_poli, setNama_Poli] = useState('')

  const handlerSumbit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "Token tidak ditemukan, silahkan login dulu!");
        return;
      }

      const payload = { nama_poli };
      const res = await api.post("/poli/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "Aplication/json"
        },
      });
      router.replace('/(tabs)/Beranda');
      console.log("Respon: ", res.data);
      Alert.alert("Sukses", "Data Poli berhasil ditambahkan!");

    } catch (err: any) {
      console.log("Error: ", err.response?.data || err.message);
      Alert.alert("Error", "Gagal menambahkan Poli");
    }
  }

  return (
    <View>
      <BackNavbar />
      <SafeAreaView>
        <View className='mt-3'>
          <Text style={{ fontSize: 14, color: '#374151' }}>
            Nomor Rekam Medis <Text style={{ color: 'red' }}>*</Text>
          </Text>

          <InputField
            value={nama_poli}
            onChangeText={setNama_Poli}
            placeholder='Nama Poli'
            autoCapitalize='none'
          />
        </View>
        <View className='mt-7'>
          <Button
            label='Daftar'
            className='flex-row justify-center border border-gray-950 bg-blue-800 mt-14 rounded-lg py-4 w-1/4'
            onPress={handlerSumbit}
          />
        </View>
      </SafeAreaView>

    </View>
  )
}

export default PoliScreen