import React, { useState, useContext, useEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '@/src/api/api'
import BackNavbar from '@/src/components/BackNavbar'
import { router } from 'expo-router'
import { AuthContext } from "@/src/api/AuthProvider";
import RNPickerSelect from 'react-native-picker-select'

function DokterScreen() {
  const { user, logout } = useContext(AuthContext)!;

  const [nama, setNama] = useState('')
  const [spesialis, setSpesialis] = useState('')
  const [ruangan, setRuangan] = useState('')
  const [alamat, setAlamat] = useState('')
  const [no_hp, setNo_Hp] = useState('')
  const [poli_id, setPoli] = useState(null) // awalnya null
  const [poliOptions, setPoliOptions] = useState([]) // untuk daftar dropdown

  // ambil data poli dari API
  useEffect(() => {
    const fetchPoli = async () => {
      try {
        const token = await AsyncStorage.getItem('token')
        const res = await api.get("/poli/index", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
          }
        })

        console.log("Respon Poli:", res.data)

        // ambil dari res.data.data (karena array poli ada di situ)
        const poliList = res.data.data || []
        const options = poliList.map((item: any) => ({
          label: item.nama_poli,
          value: item.id
        }))

        setPoliOptions(options)
      } catch (err: any) {
        console.log("Error fetch poli:", err.response?.data || err.message)
      }
    }
    fetchPoli()
  }, [])


  const handlerSumbit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert("Error", "Token tidak temukan, silahkan login dulu");
        return
      }

      const payload = { nama, spesialis, ruangan, alamat, no_hp, poli_id: Array.isArray(poli_id) ? poli_id : [poli_id] };

      const res = await api.post("/dokter/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });
      console.log("Respon: ", res.data);
      Alert.alert("Sukses", "Berhasil menambahkan dokter baru!");
      router.replace('/(tabs)/Beranda');
    } catch (err: any) {
      console.log("Error: ", err.response?.data || err.message);
      Alert.alert("Error", "Gagal menambahkan dokter!")
    }
  }

  return (
    <View>
      <BackNavbar />
      <SafeAreaView>
        <View className='mt-10'>
          <Text style={{ fontSize: 14, color: '#374151' }}>
            Nama Dokter <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputField
            value={nama}
            onChangeText={setNama}
            placeholder='Nama Dokter'
          />

          <Text style={{ fontSize: 14, color: '#374151' }}>
            Spesialis <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputField
            value={spesialis}
            onChangeText={setSpesialis}
            placeholder='Spesialis'
          />

          <Text style={{ fontSize: 14, color: '#374151' }}>
            Ruangan <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputField
            value={ruangan}
            onChangeText={setRuangan}
            placeholder='Ruangan'
          />

          <Text style={{ fontSize: 14, color: '#374151' }}>
            Alamat <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputField
            value={alamat}
            onChangeText={setAlamat}
            placeholder='Alamat'
          />

          <Text style={{ fontSize: 14, color: '#374151' }}>
            No HP <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <InputField
            value={no_hp}
            onChangeText={setNo_Hp}
            placeholder='Nomor HP'
          />

          <Text style={{ fontSize: 14, color: '#374151' }}>
            Poli <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <RNPickerSelect
            onValueChange={(value) => setPoli(value)}
            items={poliOptions}
            placeholder={{ label: "Pilih Poli", value: null }}
            value={poli_id}
          />

          <View className='mt-7'>
            <Button
              label='Daftar'
              className='flex-row justify-center border border-gray-950 bg-blue-800 mt-14 rounded-lg py-4 w-1/4'
              onPress={handlerSumbit}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default DokterScreen
