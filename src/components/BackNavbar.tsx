import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

export default function BackNavbar() {
    return (
        <SafeAreaView edges={["top", "left", "right"]} className="flex-row">
            <View className="flex-row">
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
                    <View className="flex-row ml-5 items-center">
                        <Ionicons name="chevron-back" size={28} color="#374151" />
                        <Text className="text-2xl mx-3 text-gray-700 font-semibold">
                            Kembali
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
