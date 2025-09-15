// OnBoardingScreen.tsx
import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import PagerView from "react-native-pager-view";
import { useRouter } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";

// Gunakan className dari NativeWind agar konsisten styling
const OnBoardingScreen = () => {

  const pagerRef = useRef<PagerView>(null);
  const [page, setPage] = useState(0);  // state untuk melacak halaman aktif
  const router = useRouter();

  const handleNext = () => {
    if (page < 2) { //pidah ke halam berikutnya
      pagerRef.current?.setPage(page + 1);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <PagerView
        ref={pagerRef}
        style={{ flex: 1 }}
        initialPage={0}
        onPageSelected={(e) => setPage(e.nativeEvent.position)}
      >

        {/* Halam pertama */}
        <View key="1" className="items-center justify-center p-6">
          <Image
            source={require("../../assets/images/PagerView/pagerView1.png")}
            className="w-72  h-72"
          />
          <Text className="text-xl font-bold mt-6">Pager View 1</Text>
          <Text className="text-gray-500 text-center font-bold mt-2">Tetap sehat, tetap aktif. Aplikasi ini hadir untuk mendukung gaya hidup sehat Anda setiap hari.</Text>
        </View>

        {/* Halaman 2 */}
        <View key="2" className="items-center justify-center p-6">
          <Image
            source={require("../../assets/images/PagerView/pagerView2.png")}
            className="w-72  h-72"
          />
          <Text className="text-xl font-bold mt-6">Pager View 2</Text>
          <Text className="text-gray-500 text-center font-bold mt-2">Tetap sehat, tetap aktif. Aplikasi ini hadir untuk mendukung gaya hidup sehat Anda setiap hari.</Text>
        </View>

        {/* Halaman 3 */}
        <View key="3" className="items-center justify-center p-6">
          <Image
            source={require("../../assets/images/PagerView/pagerView3.png")}
            className="w-72  h-72"
          />
          <Text className="text-xl font-bold mt-6">Pager View 3</Text>
          <Text className="text-gray-500 text-center font-bold mt-2">Tetap sehat, tetap aktif. Aplikasi ini hadir untuk mendukung gaya hidup sehat Anda setiap hari.</Text>

          <TouchableOpacity
            className="bg-blue-500 px-10 py-2 rounded-md mt-6"
            onPress={() => router.replace('/Auth/LoginScreen')}>
            <Text className="text-white text-lg font-bold">
              Mulai
            </Text>
          </TouchableOpacity>
        </View>
      </PagerView >

      {/* Dot indicator */}
      <View className="flex-row justify-center pb-6">
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            className={`h-3 w-3 rounded-full mx-1 ${page === i ? "bg-blue-500" : "bg-gray-300"
              }`}
          />
        ))}
      </View>

      {/* Tombol skip untuk masuk kehalaman terakhit */}
      {page < 2 && (
        <View className="flex-row justify-between px-6 pb-6">
          <TouchableOpacity onPress={() => router.replace("/Auth/LoginScreen")}>
            <Text className="text-gray-500">Lewati </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNext}>
            <Text className="text-blue-500 font-semibold">Lanjut </Text>
          </TouchableOpacity>
        </View>

      )}
    </SafeAreaView >
  );
};

export default OnBoardingScreen;
