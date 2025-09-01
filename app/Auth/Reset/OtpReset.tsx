import React, { useRef, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

function OtpReset() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Simpan ref tiap input OTP
  const inputs = useRef<(TextInput | null)[]>([]);

  // Handler ketika user ketik angka
  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      // hanya menerima angka
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // pindah ke input berikutnya jika belum terakhir
      if (index < 5) {
        inputs.current[index + 1]?.focus();
      }
    } else if (text === "") {
      // jika dihapus, kosongkan value
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const otpCode = otp.join("");

  return (
    <View className="flex-1 bg-white">
      {/* Header Back */}
      <View className="flex-row mt-20">
        <TouchableOpacity onPress={() => router.back()}>
          <View className="flex-row ml-6 items-center">
            <Ionicons name="chevron-back" size={28} color="#374151" />
            <Text className="text-2xl mx-3 text-gray-700 font-semibold">
              Kembali
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="ml-9 mt-9">
        <Text className="text-4xl font-bold text-gray-800 mt-10">
          Verifikasi
        </Text>
        <Text className="ml-1 w-3/4 text-gray-800 mt-3">
          Kami sudah mengirimkan kode verifikasi OTP ke email kamu
        </Text>
      </View>

      {/* OTP Form */}
      <View className="mt-6 items-center px-4 mb-8">

        {/* Input OTP */}
        <View className="flex-row justify-between w-full px-4 mb-10"> 
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              keyboardType="number-pad"
              maxLength={1} // hanya 1 digit dalam 1 kotak
              className="w-12 h-12 text-xl font-bold text-center border border-gray-700 bg-slate-200 rounded-lg"
            />
          ))}
        </View>

        {/* Tombol Submit */}
        <TouchableOpacity
          className="flex-row justify-center bg-blue-800 rounded-lg py-4 w-full"
          onPress={() => {
            if (otpCode.length === 6) {
              router.push("/(tabs)/Beranda");
            } else {
              alert("Kode OTP harus 6 digit");
            }
          }}
        >
          <Text className="text-lg font-semibold text-white">Verifikasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OtpReset;
