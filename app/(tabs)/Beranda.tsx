import { AuthContext } from '@/src/api/AuthProvider'
import CardEvent from '@/src/components/CardEvent'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {  View, Text, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'

// jenis layanan masih static
const layanan = [
    { id: 1, title: "Pendaftaran", icon: require("../../assets/images/event/pendaftaran.png") },
    { id: 2, title: "Rawat Inap", icon: require("../../assets/images/event/rawat.png") },
    { id: 3, title: "IGD", icon: require("../../assets/images/event/igd.png") },
    { id: 4, title: "Radiologi", icon: require("../../assets/images/event/radiologi.png") },
    { id: 5, title: "Layanan Poli", icon: require("../../assets/images/event/poli.png") },
    { id: 6, title: "Rumah Sakit", icon: require("../../assets/images/event/rumah_sakit.png") },
    { id: 7, title: "MCU", icon: require("../../assets/images/event/mcu.png") },
    { id: 8, title: "Lainnya", icon: require("../../assets/images/event/lainnya.png") },
]
const berita = [
    { id: 1, title: "Pemeriksaan Gratis di RS Umum", img: require("../../assets/images/PagerView/view3.png"), desc: "Terdapat tiga gejala klasik diabetes yang dikenal dengan istilah 3 P, yaitu poliuri atau sering buang air..." },
    { id: 2, title: "Layanan Poli Baru Dibuka", img: require("../../assets/images/PagerView/view3.png"), desc: "Terdapat tiga gejala klasik diabetes yang dikenal dengan istilah 3 P, yaitu poliuri atau sering buang air..." },
    { id: 3, title: "Tips Hidup Sehat", img: require("../../assets/images/PagerView/view3.png"), desc: "Terdapat tiga gejala klasik diabetes yang dikenal dengan istilah 3 P, yaitu poliuri atau sering buang air..." }
]

const Header = () => {
    // Variabel Logout dari Provider 
    const { user, logout } = useContext(AuthContext)!;

    return (
        <View className='flex-row justify-between items-center px-5 py-3 mt-10 bg-gray-50 shadow'>
            <View className='flex-row items-center'>
                <Image
                    source={require('../../assets/icons/akun.png')}
                    className='w-12 h-12 rounded-full mr-3'
                />
                <View>
                    <Text className='text-base font-bold text-blue-700'>Yanto Sukiman</Text>
                    <Text className='text-base font-semibold text-gray-500'>Selamat datang👋</Text>
                </View>
            </View>
            <View className='flex-row'>
                <Ionicons name='search-outline' size={20} color="#0D4D8" style={{ marginRight: 12 }} />
                <Ionicons name='notifications-outline' size={20} color="#0D4D8" />
            </View>
        </View>
    )
};

function Beranda() {

    const screenWidth = Dimensions.get("window").width;
    const itemWidth = screenWidth / 4 - 30;
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <Header />
            <ScrollView className='flex-1 bg-gray-100'
                contentContainerStyle={{ paddingBottom: 80 }}>
                <View className='flex-row justify-center mt-1 ml-5 mr-5'>
                    <CardEvent
                        images={[
                            require("../../assets/images/event/bgevent.png"),
                            require("../../assets/images/event/bgevent.png"),
                            require("../../assets/images/event/bgevent.png")
                        ]}

                    />
                </View>

                {/* layanan saction */}
                <View className='ml-5 mt-2 mb-2'>
                    <Text className='font-bold text-sm text-blue-700'>Layanan</Text>
                </View>

                {/* Isi layanan */}
                <FlatList
                    data={layanan}
                    numColumns={4}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={{ justifyContent: "space-between", marginHorizontal: 20 }}
                    className='bg-white ml-5 mr-5 rounded-xl shadow'
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{ width: itemWidth, alignItems: "center", marginVertical: 10 }}
                            onPress={() => {
                                if (item.title === "Pendaftaran") {
                                    router.push('/Pendaftaran')
                                } if (item.title === "Rawat Inap") {
                                    router.push('/shared/Pendaftaran/DokterScreen')
                                } else {
                                } if (item.title === "IGD") {
                                    router.push('/shared/Pendaftaran/DokterScreen')
                                } else {

                                }
                            }}>
                            <View className='w-14 h-14 bg-slate-200 rounded-full items-center justify-center'>
                                <Image source={item.icon} className="w-8 h-8" resizeMode="contain" />
                            </View>
                            <Text className='text-xs font-semibold text-center'>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />

                {/* Section untuk melihat antrian */}
                <View className="px-4 mt-2 mb-2">
                    <Text className="font-bold mb-2  text-sm text-blue-700">Pendaftaran Aktif</Text>

                    <View className="flex-row bg-white items-center rounded-lg shadow p-4">
                        {/* Foto Dokter */}
                        <Image
                            source={require('../../assets/icons/akun.png')}
                            className="w-14 h-14 md:w-72 md:h-80 rounded-full"
                            resizeMode="cover"
                        />

                        {/* Nomor antrian dan Descriptio */}
                        <View className='flex-row justify-between '>
                            <View className="flex-1 ml-5">
                                <Text className="font-semibold text-sm md:text-base">Dr. Yanto Sukiman</Text>
                                <Text className="text-gray-600 text-xs md:text-sm">POLI: MATA</Text>
                                <Text className="text-gray-600 text-xs md:text-sm">3 HARI</Text>
                            </View>

                            <View className="flex-1 items-center">
                                <Text className="font-semibold text-sm md:text-base">No Antrian</Text>
                                <Text className="font-bold text-2xl md:text-3xl text-green-600">5</Text>
                            </View>
                        </View>
                        {/* Info Antrian, Tanggal, dan Jam */}
                        <View className='flex-row justify-between'>
                            <View className="flex-row items-center py-1 px-2 rounded-xl bg-gray-300 mt-1">
                                <Ionicons name="time-outline" size={16} />
                                <Text className="ml-1 text-xs md:text-sm">09:00-13:00</Text>
                            </View>

                            <View className="flex-row items-center bg-green-200 mt-2 py-1 px-2 rounded-xl">
                                <Ionicons name="calendar" size={16} />
                                <Text className="ml-1 text-gray-600 text-xs md:text-sm">
                                    Kamis 04 Sept 2025
                                </Text>
                            </View>
                        </View>


                    </View>
                </View>


                {/* Section berita */}
                <View className="ml-5 mr-5">
                    <Text className="font-bold text-sm text-blue-700 mb-2">Berita Terbaru</Text>

                    {berita.map((item) => (
                        <View
                            key={item.id}
                            className="flex-row mb-3 bg-white rounded-lg shadow p-2"
                        >
                            {/* Gambar */}
                            <Image
                                source={item.img}
                                className="h-24 w-24 rounded-lg"
                                resizeMode="cover"
                            />

                            {/* Teks kalau bisa ini dari database */}
                            <View className="flex-1 ml-3 justify-center">
                                <Text className="font-semibold text-base" numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <Text className="text-gray-600 text-sm mt-1" numberOfLines={2}>
                                    {item.desc}
                                </Text>
                                <Text className="text-gray-400 text-xs mt-1">
                                    2 jam yang lalu
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

export default Beranda;
