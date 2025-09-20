import api from '@/src/api/api';
import BackNavbar from '@/src/components/BackNavbar'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, Alert, FlatList, SafeAreaView, Text, TouchableOpacity, View, Modal } from 'react-native'
import { router, useNavigation } from 'expo-router'
import DateTimePicker from '@react-native-community/datetimepicker'

function TujuanPoliScreen() {
    const navigation = useNavigation();
    const [poliList, setPoliList] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // Modal & date picker state
    const [showModal, setShowModal] = useState(false)
    const [selectedPoliId, setSelectedPoliId] = useState<number | null>(null)
    const [selectPoliName, setSelectPoliName] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [showPicker, setShowPicker] = useState(false)

    const handlerOpenModal = (poliId: number, nama: string) => {
        setSelectedPoliId(poliId)
        setSelectPoliName(nama);
        setShowModal(true)
    }

    const handleConfirm = () => {
        if (selectedPoliId) {
            router.push({
                pathname: '/shared/Pendaftaran/DokterScreen',
                params: {
                    poliId: String(selectedPoliId),
                    namaPoli: selectPoliName,
                    date: selectedDate.toISOString().split('T')[0] // Format YYYY-MM-DD
                }
            })
        }
        setShowModal(false)
    }

    const getPoli = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "Token tidak ditemukan, silahkan login dulu!");
                return;
            }
            setLoading(true);
            const res = await api.get('/poli/index', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "Application/json"
                }
            });

            setPoliList(res.data.data ?? res.data)
        } catch (err: any) {
            console.log(err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPoli();
    }, [])

    return (
        <View className='bg-slate-100 flex-1'>
            <BackNavbar label='Tujuan Poli Anda' />
            <SafeAreaView className="flex-1">
                {loading ? (
                    <View className='flex-1 justify-center items-center'>
                        <ActivityIndicator size="large" color="#2563eb" />
                        <Text className='text-base text-blue-600 mt-2'>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={poliList}
                        keyExtractor={(item, index) =>
                            item.id?.toString() ?? index.toString()
                        }
                        contentContainerStyle={{ padding: 16 }}
                        renderItem={({ item }) => (
                            <View className="bg-white p-4 mb-3 rounded-xl shadow">
                                <TouchableOpacity onPress={() => handlerOpenModal(item.id, item.nama)}>
                                    <Text className="font-bold text-blue-700">{item.nama}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        ListEmptyComponent={() => (
                            <View>
                                <View className="flex-1 justify-center m-2  shadow items-center py-10 px-5 bg-slate-200 rounded-lg ">
                                    <Text className="text-lg font-bold text-gray-700">Belum ada jadwal Aktif</Text>
                                    <Text className="text-base text-center font-semibold text-gray-500">
                                        Semua E-Jadwal milikmu akan tampil di sini. Yuk rencanakan jadwal kesehatanmu.
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                )}
            </SafeAreaView>

            {/* Modal untuk pilih tanggal */}
            <Modal visible={showModal} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-xl w-80">
                        <Text className="font-bold text-lg mb-4">Pilih Tanggal</Text>

                        <TouchableOpacity
                            className="p-3 bg-blue-100 rounded-lg mb-4"
                            onPress={() => setShowPicker(true)}
                        >
                            <Text>{selectedDate.toDateString()}</Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={(event, date) => {
                                    setShowPicker(false)
                                    if (date) setSelectedDate(date)
                                }}
                            />
                        )}

                        <View className="flex-row justify-between mt-2">
                            <TouchableOpacity
                                className="p-3 bg-gray-200 rounded-lg"
                                onPress={() => setShowModal(false)}
                            >
                                <Text>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="p-3 bg-blue-500 rounded-lg"
                                onPress={handleConfirm}
                            >
                                <Text className="text-white">OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default TujuanPoliScreen
