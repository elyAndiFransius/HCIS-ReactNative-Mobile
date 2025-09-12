import BackNavbar from '@/src/components/BackNavbar'
import InputField from '@/src/components/InputField'
import TextJudul from '@/src/components/TextJudul'
import React, { useState } from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const hanlderSumbit = async () => {

    // ambil token
     const token = await AsyncStorage.getItem('token'); 
}

function index() {
    const [nama, setnama] = useState('')
    const [status, setStatus] = useState('')
    const [tanggal_check, settanggal_check] = useState('')
    return (
        <View>
            <BackNavbar />
            <SafeAreaView>
                <View className='flex-row justify-center items-center'>
                    <Image
                        source={require("../../../assets/images/splash-icon.png")}
                        className="w-80 h-56 "
                        resizeMode="contain"
                    />
                </View>
                <View className='flex-row justify-center items-center m-5'>
                    <TextJudul className='text-lg text-center'>Ajukan pendaftaran mandiri RS. Bakti Timah Pangkalpinang</TextJudul>
                </View>
                <View>
                    <View className='grid grid-cols-2 gap-4 p-4'>
                        <View className='bg-blue-500 h-20 items-center justify-center rounded-lg'>
                            <Image source={require('../../../assets/images/menus/pasienUmum.png')} />
                        </View>

                        <InputField
                            icon='pencil-outline'
                            value={nama}
                            onChangeText={setnama}
                            placeholder='Nama Lengkap'
                            autoCapitalize='none' />
                        <InputField
                            icon='pencil-outline'
                            value={status}
                            onChangeText={setStatus}
                            placeholder='Nama Lengkap'
                            autoCapitalize='none' />
                        <InputField
                            icon='pencil-outline'
                            value={tanggal_check}
                            onChangeText={settanggal_check}
                            placeholder='Nama Lengkap'
                            autoCapitalize='none' />


                        <TouchableOpacity
                            className='flex-row justify-center border border-gray-950 bg-blue-800 mt-14 rounded-lg py-4 w-3/4'
                            onPress={hanlderSumbit}>
                            <Text className='text-sm font-semibold text-white text-center'>Daftar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>

        </View>
    )
}

export default index