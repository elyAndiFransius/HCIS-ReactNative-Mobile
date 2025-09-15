import api from '@/lib/api'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', {
        email,
        password
      });
      router.replace('/(tabs)/Beranda')
    } catch (err: any) {
      console.log(err.response?.data)
      Alert.alert("Error", "Gagal Login, check Email dan Password")
    }
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center mt-44 bg-white">
        {/* Gambar di atas */}
        <Image
          source={require('../../assets/icons/icon.png')} // ganti dengan path gambarmu
          style={{ width: 150, height: 150, marginBottom: 20 }}
          resizeMode="contain"
        />

        <Text className="text-xl font-semibold text-gray-800 mt-16">
          Selamat datang, ayo login!
        </Text>

        <View className="flex-row items-center border border-gray-950 bg-slate-200 rounded-lg px-5 py-1 mt-8 w-3/4">
          <Ionicons name="mail-outline" size={22} color="black" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 ml-2 text-base text-gray-800"
          />
        </View>
        <View className="flex-row items-center border border-gray-950 bg-slate-200 rounded-lg px-5 py-1 mt-4 mb-10 w-3/4">
          <Ionicons name="lock-closed-outline" size={22} color="black" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Email"
            secureTextEntry={true}
            autoCapitalize="none"
            className="flex-1 ml-2 text-base text-gray-800"
          />
        </View>

        <Text className="flex-row justify-center underline font-semibold text-blue-700 w-3/4 text-right">
          Lupa password?
        </Text>

        <TouchableOpacity
          className="flex-row justify-center border border-gray-950 bg-blue-800 rounded-lg px-4 py-4 mt-8 mb-4 w-3/4"
         onPress={handleLogin} >
          <Text className="text-lg font-semibold text-white text-center">
            Masuk
          </Text>
        </TouchableOpacity>

        <Text className="text-center mt-5 w-3/4">
          Belum punya akun?
          <Text onPress={() => router.push('/Auth/RegisterScreen')} className='text-blue-700 font-semibold'> Daftar sekarang! </Text>
          {"\n"}atau masuk dengan
        </Text>

        <View className="flex-row justify-center mx-6 mt-10">
          <View className="flex-row items-center mx-7">
            <Ionicons name="logo-facebook" size={26} color="blue" />
            <Text className="ml-4 font-bold">Facebook</Text>
          </View>

          <View className="flex-row items-center mx-7">
            <Ionicons name="logo-google" size={26} color="red" />
            <Text className="ml-4 font-bold">Google</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default LoginScreen
