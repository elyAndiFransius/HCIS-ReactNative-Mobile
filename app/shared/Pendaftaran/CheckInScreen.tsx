import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'
import React from 'react'

export default function CheckInScreen() {
    const { dokterId, namaDokter, poliId, date } = useLocalSearchParams<{
        dokterId: string
        namaDokter: string,
        poliId: string
        date: string
    }>()

    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-bold">Check In</Text>
            <Text>Dokter ID: {dokterId}</Text>
            <Text>Poli ID: {poliId}</Text>
            <Text>Nama: {namaDokter}</Text>
            <Text>Tanggal: {date}</Text>
        </View>
    )
}
