import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, ScrollView, Switch, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SwitchButton from "@/src/components/Switch";
import { router } from 'expo-router'
import { AuthContext, AuthProvider } from '@/src/api/AuthProvider';
import { useContext } from 'react';



const Header = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/bgprofilee.png')}
    >
      <SafeAreaView edges={['top', 'left', 'right']} className='flex-row '>
        <View className='flex-row m-5 '>
          <View className='flex m-1'>
            <Image
              source={require('../../assets/icons/akun.png')}
              className='w-16 h-16 border  border-gray-100 rounded-full'
            />
          </View>
          <View className='flex m-2 px-5'>
            <Text className='text-2xl font-bold text-gray-200'>Yanto Sukiman</Text>
            <TouchableOpacity onPress={() => router.push('/Auth/User')} className='flex-row items-center'>
              <Text className='text-base font-semibold text-gray-200'>Edit data pengguna</Text>
              <Ionicons name='chevron-forward-outline' size={15} color="#e5e7eb" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default function Profile() {
  const { user, logout } = useContext(AuthContext)!;

  return (
    <View className='flex-1 bg-blue-400'>
      <Header />
      <ScrollView className='flex-1 bg-gray-100 rounded-2xl' contentContainerStyle={{ paddingBottom: 80 }}>
        <View className='ml-5 mr-5 mt-5'>
          <Text className='font-bold text-sm text-blue-700 mb-2'>Rewards</Text>
          <View className='flex-row justify-between bg-slate-200 mt-3 px-9 py-10 rounded-lg'>
            <View className='flex-row'>
              <Ionicons name='ticket-outline' size={20} />
              <Text className='text-base font-semibold ml-1'>Voucher Kamu</Text>
            </View>
            <View className='flex-row items-center'>
              <Text className='font-semibold mr-1'>1</Text>
              <Text>Voucher</Text>
            </View>
          </View>
        </View>

        <View className='flex-1 bg-slate-200 mt-3 m-5 px-2 py-2 rounded-xl'>
          <View className='flex-row justify-between w-full'>
            <Text className='text-lg font-semibold '>Metode Pembayaran</Text>
            <Text className='text-base font-semibold text-blue-400 '>Lihat semua</Text>
          </View>

          <Text className='text-sm mt-2 m-2 text-gray-700'>Simpan metode pembayaran pilihinan kamu untuk transaksi lebih lancat.</Text>
          <View className='flex-row bg-slate-100 rounded-xl m-2 p-4 shadow-md items-center'>
            <View className="w-20 h-20 rounded-lg bg-blue-100 justify-center items-center">
              <Text className="text-blue-600 font-bold">E-Jadwal</Text>
            </View>

            <View className="flex-1 ml-3">
              <Text className="text-base font-bold text-gray-800">Shope Paylater?</Text>

              <TouchableOpacity className="mt-1">
                <Text className="text-blue-600 text-sm font-semibold">Waktunya check kesahanan, bayarnya bisa belakangan.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text className='font-bold text-sm ml-5 text-blue-700'>Pusat akun</Text>
        <TouchableOpacity onPress={() => router.push('/Auth/User')} >
          <View className='flex justify-center m-5 px-3 py-3 bg-slate-200 rounded-lg'>
            <View className='m-2'>
              <Text className='text-base ml-3 font-semibold text-blue-700'>Indonesia Healtcare Corporation</Text>
            </View>
            <View className='ml-5'>
              <Text className='text-sm text-gray-700'>Ubah nama akun, numor HP, dan emailmu lewat.</Text>
              <Text className='text-sm text-gray-700 font-semibold'>Pusat Akun IHC</Text>
            </View>
            <Text className='ml-5 text-base font-bold text-red-500'>Ke Pusat Akun</Text>
          </View>
        </TouchableOpacity>


        <Text className='font-bold text-sm text-blue-700 ml-5'>Pengaturan</Text>
        <View className="flex-1 bg-slate-200 mt-3 m-5 px-4 py-3 rounded-lg">
          <Text className="text-sm mb-3 text-gray-700">
            Simpan metode pembayaran pilihanmu untuk transaksi lebih lancar.
          </Text>

          <View className="flex-row  items-center justify-between px-1 py-1 rounded-lg">
            <View className="flex-row items-center">
              <Ionicons name="notifications" size={20} color="#374151" />
              <Text className="ml-2 text-base font-semibold text-gray-800">
                Notifikasi
              </Text>
            </View>
            <SwitchButton />
          </View>

          <View className="flex-row items-center justify-between px-1 py-1 rounded-lg">
            <View className="flex-row items-center">
              <Ionicons name="location-sharp" size={20} color="#374151" />
              <Text className="ml-2 text-base font-semibold text-gray-800">
                Lokasi
              </Text>
            </View>
            <SwitchButton />
          </View>

          <TouchableOpacity>
            <View className="flex-row items-center justify-between px-1 py-1 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="information-circle" size={20} color="#374151" />
                <Text className="ml-2 text-base font-semibold text-gray-800">
                  Info tentang IHC
                </Text>
              </View>
              <Ionicons name='chevron-forward' size={18} className='m-3' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            logout();
            router.replace('/Auth/LoginScreen')
          }}>
            <View className="flex-row items-center justify-between px-1 py-1 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="log-out" size={20} color="#374151" />
                <Text className="ml-2 text-base font-semibold text-gray-800">
                  Keluar
                </Text>
              </View>
              <Ionicons name='chevron-forward' size={18} className='m-3' />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


