import React, { useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SplashScreen() {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        setTimeout(() => {
          if (token) {
            router.replace("/(tabs)/Beranda")
          } else {
            router.replace("/Auth/LoginScreen")
          }
        }, 2000)
      } catch (err: any) {
        console.error("Gagal memeriksa token:", err);
        router.replace("/Auth/LoginScreen");
      }
    };
    checkLogin();

  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <Image
        source={require("../../assets/images/splash-icon.png")}
        className="w-80 h-80"
        resizeMode="contain" />
    </SafeAreaView>
  );
}