import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

function Loading() {
    return (
        <View className="flex-1 justify-center items-center">
            <LottieView
                source={require("../../assets/animations/Sandy Loading.json")}
                autoPlay
                loop
                style={{
                    alignItems: "center",
                    width: 150, height: 150
                }}
            />

            {/* Text Atas & Bawah */}
            <Text className="mt-4 text-lg font-semibold text-gray-700">
                Tunggu sebentar ya
            </Text>
            <Text className="text-sm text-gray-500">Data sedang dimuat...</Text>
        </View>
    );
}

export default Loading;
