import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'

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

      <View className="flex-1 items-center mt-5 bg-white">
        <View className='flex-row items-center border border-gray-700 bg-slate-200 rounded-lg px-5 mt-3 py-2 w-4/5'>
          <Ionicons name='mail-outline' size={24} color='gray' />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder='Masukkan email kamu'
            keyboardType='email-address'
            autoCapitalize='none'
          />
        </View>
        <TouchableOpacity
          className='flex-row justify-center border bg-blue-800 rounded-lg py-2 mt-5 w-4/5'
          onPress={() => router.push('/Auth/Reset/OtpReset')}>
          <Text className='text-lg text-white font-semibold py-2'>Kirim Kode</Text>
        </TouchableOpacity>


      </View>
    </View>

  )
}

export default InputEmail