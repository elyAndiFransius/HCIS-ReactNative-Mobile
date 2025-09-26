import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

type TopProps = {
    label: string
}

export default function TopBar({ label }: TopProps) {
    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                {/* Tombol Back */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    activeOpacity={0.7}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={25} color="#FFFFFF" />
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>{label}</Text>

                {/* Spacer kanan (biar balance sama backButton) */}
                <View style={styles.spacer} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        width: "100%",
        paddingTop: 8,
        paddingBottom: 12,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12, // biar gak terlalu nempel kiri-kanan
    },
    backButton: {
        width: 40,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    spacer: {
        width: 40, // sama kayak backButton
    },
})
