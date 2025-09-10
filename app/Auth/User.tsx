import BackNavbar from '@/src/components/BackNavbar'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



function User() {
  return (
    <View className="flex-1 bg-gray-100">
      <BackNavbar />

      {/* Judul */}
      <View className="m-6">
        <Text className="text-2xl font-bold text-gray-700">Pusat Akun</Text>
        <Text className="text-base font-semibold text-gray-600 mt-1">
          Detail profil dan pengaturan di halaman ini akan digunakan di semua aplikasi.
        </Text>
      </View>

      {/* Card Profil */}
      <View className="px-5">
        {/* Card */}
        <View className="bg-white rounded-xl p-5 shadow-md mt-10">
          <View className="flex-row m-2  justify-between">
            <Text className="text-lg font-semibold mt-8 text-gray-700">Profil</Text>
            <TouchableOpacity onPress={ () => router.push('/Auth/EditUserScreen')}>
              <Text className="text-lg font-semibold mt-8 text-blue-700">Edit</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between m-2 mt-4">
            <Text className="text-sm text-gray-500">Nama lengkap</Text>
            <Text className="text-base font-medium text-gray-700">Yanto Sukiman</Text>
          </View>
          <View className="flex-row justify-between m-2 mt-4">
            <Text className="text-sm text-gray-500">Nomor Hp</Text>
            <Text className="text-base font-medium text-gray-700">+628-xxxx-xxxx</Text>
          </View>
          <View className="flex-row justify-between m-2 mt-4">
            <Text className="text-sm text-gray-500">Email</Text>
            <Text className="text-base font-medium text-gray-700">yanto@gmail.com</Text>
          </View>
          <View className="flex-row justify-between m-2 mt-4">
            <Text className="text-sm text-gray-500">Tanggal Lahir</Text>
            <Text className="text-base font-medium text-gray-700">02-November-1991</Text>
          </View>
        </View>

        {/* Avatar */}
        <View className="absolute -top-1 left-9">
          <Image
            source={require('../../assets/icons/akun.png')}
            className="w-20 h-20 rounded-full border-4 border-white"
          />
        </View>
      </View>

      {/* Pengaturan */}
      <View className="m-5">
        <Text className="font-bold text-sm text-blue-700 mb-3">Pengaturan</Text>

        {/* Card Container */}
        <View className="bg-white rounded-xl shadow-md">

          {/* Row - Ganti Kata Sandi */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <Ionicons name="lock-closed-outline" size={20} color="#374151" />
              <Text className="ml-3 text-base font-semibold text-gray-800">
                Ganti Kata Sandi
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </TouchableOpacity>

          {/* Row - Bahasa */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200"
          >
            <View className="flex-row items-center">
              <Ionicons name="language-outline" size={20} color="#374151" />
              <Text className="ml-3 text-base font-semibold text-gray-800">
                Bahasa
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-gray-500 text-sm mr-2">Indonesia</Text>
              <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
            </View>
          </TouchableOpacity>

          {/* Row - Rumah Sakit */}
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between px-4 py-4"
          >
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={20} color="#374151" />
              <Text className="ml-3 text-base font-semibold text-gray-800">
                Rumah Sakit Sungai Liat
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default User
