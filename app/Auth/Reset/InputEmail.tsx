import Button from '@/src/components/Button'
import InputField from '@/src/components/InputFieldIC'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

function InputEmail() {
  const [email, setEmail] = useState('')

  return (
    <View className="flex-1 bg-white">
      {/* Kembali kehalam sebelumnya */}
      <View className='flex-row mt-20'>
        <TouchableOpacity onPress={() => router.back()}>
          <View className='flex-row ml-6'>
            <Ionicons name='chevron-back' size={28} color="#374151" />
            <Text className='text-2xl mx-3 text-gray-700 font-semibold'>Kembali</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="ml-9 mt-9">
        <Text className="text-4xl font-bold text-gray-800 mt-10">
          Lupa kata sandi?
        </Text>
        <Text className="ml-1 w-3/4 text-gray-800 mt-3">
          Masukkan email anda yang sudah terdaftar sebelumnya
        </Text>
      </View>

      <View className="flex-1 items-center mt-5 m-8  bg-white ">
        <InputField
          icon="mail-outline"
          placeholder="Masukkan email kamu"
          value={email}
          onChangeText={setEmail}
        />

        <Button
          label='Kirim kode'
          onPress={() => router.push('/Auth/Reset/OtpReset')}
        />



      </View>
    </View >

  )
}

export default InputEmail