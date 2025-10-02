import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import "../../styles/global.css";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StackActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    position: "absolute",
                    height: 60 + insets.bottom, // berikan pading sesui hp
                    paddingBottom: insets.bottom,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    backgroundColor: "#fff",
                },
                tabBarActiveTintColor: "#1E3A8A",
                tabBarInactiveTintColor: "#9CA3AF",
            }}
        >
            <Tabs.Screen
                name="Pendaftaran"
                options={{
                    href: null, // <-- ini membuat tidak muncul di tab bar
                }}
            />
            <Tabs.Screen
                name="Beranda"
                options={{
                    title: "Beranda",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Jadwal"
                options={{
                    title: "Jadwal",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="calendar" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="ChatBox"
                options={{
                    title: "Chat Box",
                    tabBarStyle: { display: "none" },
                    tabBarIcon: () => (
                        <View
                            style={{
                                position: "absolute",
                                top: -45,
                                backgroundColor: "#fff",
                                borderRadius: 50,
                                padding: 13,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 5,
                            }}
                        >
                            <Image
                                source={require("../../assets/icons/chatbot.png")}
                                style={{ width: 43, height: 43 }}
                            />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="Riwayat"
                options={{
                    title: "Riwayat",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="time" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={26} color={color} />
                    ),
                }}
            />

        </Tabs>
    );
}