import React, { useState, useContext } from 'react'
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import api from '@/src/api/api'
import { AuthContext } from '@/src/api/AuthProvider'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const auth = useContext(AuthContext)

  if (!auth) return null
  const { login } = auth

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, password })

      const token = res.data?.access_token
      const user = res.data?.user

      if (token && user) {
        // simpan lewat context
        await login({ user, access_token: token })
      }

      router.replace('/(tabs)/Beranda')
    } catch (err: any) {
      console.log(err.response?.data)
      Alert.alert("Error", "Gagal Login, cek Email dan Password")
    }
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center mt-44 bg-white">
        <Image
          source={require('../../assets/icons/icon.png')}
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
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            className="flex-1 ml-2 text-base text-gray-800"
          />
        </View>

        <TouchableOpacity
          className="flex-row justify-center border border-gray-950 bg-blue-800 rounded-lg px-4 py-4 mt-8 mb-4 w-3/4"
          onPress={handleLogin}>
          <Text className="text-lg font-semibold text-white text-center">
            Masuk
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen
