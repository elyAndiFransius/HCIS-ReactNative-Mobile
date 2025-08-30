import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/wellcome/OnBoardingScreen");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require('../../assets/images/splash-icon.png')}
        className="w-80 h-80"
        resizeMode="contain"
      />
    </View>
  );
}
