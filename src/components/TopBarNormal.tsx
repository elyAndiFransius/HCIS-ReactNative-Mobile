import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

type TopProps = {
    label: string
}

export default function TopBarNormal({ label }: TopProps) {
    return (
        <View style={styles.container}>
            {/* Tombol Back */}
            <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.1}
                style={styles.backButton}>
                <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Title */}
            <Text className="text-2xl text-white font-bold mt-20 ">{label}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        width: "100%",
    },
    container: {
        flexDirection: "row",
        backgroundColor: "#2563eb",
        alignItems: "center",
        paddingHorizontal: 12,
    },
    backButton: {
        width: 40,
        paddingTop: 70,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        flex: 1,
        textAlign: "left",
        paddingTop: 80,
        fontSize: 15,
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "600",
        color: "#FFFFFF",
    },
})
