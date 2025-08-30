import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, Image, TextInput } from 'react-native'

function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center mt-40 bg-white">
        {/* Gambar di atas */}
        <Image
          source={require('../../assets/icons/icon.png')} // ganti dengan path gambarmu
          style={{ width: 150, height: 150, marginBottom: 20 }}
          resizeMode="contain"
        />

        <Text className="text-xl font-semibold text-gray-800">
          Selamat datang, ayo login!
        </Text>

        <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-2 mb-4 w-80">
          <MaterialIcons name="email" size={20} color="gray" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="flex-1 ml-2 text-base text-gray-800"
          />
        </View>
      </View>
    </View>
  )
}

export default LoginScreen
