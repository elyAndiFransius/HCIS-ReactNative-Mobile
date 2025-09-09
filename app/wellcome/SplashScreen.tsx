import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Auth/RegisterScreen"); // langsung masuk ke tab utama
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Image
        source={require("../../assets/images/splash-icon.png")}
        className="w-80 h-80"
        resizeMode="contain"
      />
    </View>
  );
}
