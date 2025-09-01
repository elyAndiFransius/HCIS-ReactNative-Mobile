import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'


function RegisterScreen() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')

  return (
    <View className="flex-1 bg-white">
      <View className="flex-initial items-center mt-32 ">
        <Image
          source={require('../../assets/icons/icon.png')}
          resizeMode="contain"
        />

        <View>
          <Text className='text-2xl font-semibold mt-16'>Selamat Datang 👋</Text>
          <Text className='text-xs font-normal text-gray-600'>Senang bertemu dengan anda disini</Text>
        </View>

        <View className='flex-row bg-slate-200 items-center border rounded-lg border-gray-950 mt-8 px-4 py-1 w-3/4 text-right'>
          <Ionicons name='person-outline' size={22} color={'black'} />
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder='Masukkan nama anda'
            autoCapitalize='none'
            className='flex-1 ml-2 text-base text-gray-800'
          />
        </View>
        <View className='flex-row bg-slate-200 items-center border rounded-lg border-gray-800 mt-4 px-4 py-1 w-3/4 text-right'>
          <Ionicons name='mail-outline' size={22} color={'black'} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder='Masukkan email anda'
            autoCapitalize='none'
            className='flex-1 ml-2 text-base text-gray-800'
          />
        </View>
        <View className='flex-row bg-slate-200 items-center border rounded-lg border-gray-800 mt-4 px-4 py-1 w-3/4 text-right'>
          <Ionicons name='lock-closed-outline' size={22} color={'black'} />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder='Masukkan password anda'
            autoCapitalize='none'
            className='flex-1 ml-2 text-base text-gray-800'
          />
        </View>
        <View className='flex-row bg-slate-200 items-center border rounded-lg border-gray-800 mt-4 px-4 py-1 w-3/4 text-right'>
          <Ionicons name='lock-closed-outline' size={22} color={'black'} />
          <TextInput
            value={confirm_password}
            onChangeText={setConfirm_password}
            placeholder='Masukkan confirmasi password anda'
            autoCapitalize='none'
            className='flex-1 ml-2 text-base text-gray-950'
          />
        </View>

        <TouchableOpacity
          className='flex-row justify-center border border-gray-950 bg-blue-800 mt-14 rounded-lg py-4 w-3/4'
          onPress={() => router.replace('/Auth/LoginScreen')}>
          <Text className='text-sm font-semibold text-white text-center'>Daftar</Text>
        </TouchableOpacity>

        <Text className='text-base mt-5 text-gray-600 font-semibold'>Atau lanjutkan dengan👇</Text>


        <View className='flex-row justify-center mx-6 mt-5 '>
          <View className='flex-row items-center mx-7'>
            <Ionicons name='logo-facebook' size={26} color="blue" />
            <Text className='ml-4 font-bold'>Facebook</Text>
          </View>

          <View className='flex-row items-center mx-7'>
            <Ionicons name='logo-google' size={26} color="red" />
            <Text className='ml-4 font-bold'>Google</Text>
          </View>
        </View>
      </View>
    </View>


  )
}

export default RegisterScreen
