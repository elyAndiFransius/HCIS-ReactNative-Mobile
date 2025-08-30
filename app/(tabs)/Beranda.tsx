import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Beranda() {
    return (
        <ScrollView className="flex-1 bg-gray-50 pt-10">

            {/* Header */}
            <View className="flex-row justify-between items-center pt-5 ml-5">
                <View className="flex-row item-center">
                    <Image
                        source={{ uri: "https://i.pravatar.cc/100" }}
                        className="w-12 h-12 rounded-full mr-3"
                    />
                    <View>
                        <Text className="text-base font-bold text-blue-700">Yanto Sukiman</Text>
                        <Text className="text-base font-semibold text-gray-800">Selamat datang</Text>
                    </View>
                </View>
                <View className="flex-row">
                    <Ionicons name="search-outline" size={20} color="#0D4D8" style={{ marginRight: 12 }} />
                    <Ionicons name="notifications-outline" size={20} color="#0D4D8" style={{ marginRight: 25 }} />
                </View>
            </View>
            {/* BANNER */}
            <View className="bg-blue-100 rounded-xl mx-4 p-4 flex-row items-center mb-6 mt-5">
            </View>

        </ScrollView>

    )

}
