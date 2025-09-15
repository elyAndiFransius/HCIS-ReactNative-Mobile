import BackNavbar from '@/src/components/BackNavbar'
import Box from '@/src/components/Box'
import InputFieldRightIcon from '@/src/components/InputFieldRightIcon'
import TextDesc from '@/src/components/TextDesc'
import TextJudul from '@/src/components/TextJudul'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'



function EditUserScreen() {
    return (
        <View className='flex-1'>
            <BackNavbar />
            <View className='flex-row items-center  m-5 justify-between '>
                <TextJudul >Profil</TextJudul>
                <Image source={require('../../assets/images/icon.png')} className='w-24 h-16' />
            </View>
            <TextDesc className='ml-5 mr-5'>Detail profil dan pengaturan di halaman ini akan digunakan semua aplikasi <Text className='underline'>Ekosistem IHC</Text></TextDesc>
            <Box>
                <TextJudul className='text-lg'>Info Pemilik Akun</TextJudul>
                <InputFieldRightIcon
                    icon='pencil-outline'
                    placeholder='Nama Lengkap'
                    autoCapitalize='none' />
                <InputFieldRightIcon
                    icon='calendar'
                    placeholder='Tanggal Lahir'
                    autoCapitalize='none' />
                <InputFieldRightIcon
                    icon='chevron-down'
                    placeholder='Jenis Kelamin'
                    autoCapitalize='none' />
            </Box>
            <Box>
                <TextJudul className='text-xl'>Nomor HP dan Email</TextJudul>
                <TextDesc className='mb-5 mt-2'>Kalau nomor-HP mu diganti, semua pembayaran elektronik yang terhubung dengan nomor ini akan terputus</TextDesc>
                <View className='flex-row justify-between items-center bg-slate-200 px-3 py-3'>
                    <Text className='text-lg text-gray-700'>+628-xxxx-xxxx</Text>
                    <Text className='text-blue-600 text-lg font-semibold'>Ubah</Text>
                </View>
                <View className='flex-row justify-between items-center bg-slate-200 px-3 py-3'>
                    <Text className='text-gray-700 text-lg'>yanto@gmail.com</Text>
                    <Text className='text-blue-600 font-semibold text-lg'>Ubah</Text>
                </View>
            </Box>
            <TouchableOpacity className='items-center'>
                <Text className='text-xl font-semibold text-red-400'>Hapus akun</Text>
            </TouchableOpacity>
            <Text></Text>
        </View>

    )
}

export default EditUserScreen