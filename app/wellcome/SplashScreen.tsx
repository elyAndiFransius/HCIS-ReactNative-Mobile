import React, { useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/example/test");
    }, 2000);

    return () => clearTimeout(timer);
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