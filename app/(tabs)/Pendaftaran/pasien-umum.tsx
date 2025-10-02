import InputField from "@/src/components/InputField";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function PrimaryButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="bg-[#0D4D8F] rounded-xl items-center py-3"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
      }}
    >
      <Text className="text-white font-extrabold text-base">{title}</Text>
    </TouchableOpacity>
  );
}

export default function PasienUmumScreen() {
  const [mrnOrNik, setMrnOrNik] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const onPickDate = (e: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selected) setBirthDate(selected);
  };

  const fmt = (d?: Date | null) => {
    if (!d) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    return `${dd}-${mm}-${yy}`;
  };

  const handleSearch = () => {
    if (!mrnOrNik.trim())
      return Alert.alert("Validasi", "Nomor Rekam Medis atau NIK wajib diisi.");
    if (!birthDate)
      return Alert.alert("Validasi", "Tanggal lahir wajib diisi.");
    Alert.alert(
      "Cari Pasien",
      `NIK/RM: ${mrnOrNik}\nTanggal Lahir: ${fmt(birthDate)}`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      {/* Header */}
      <View
        className="px-5 pb-3"
        style={{
          backgroundColor: "#0D4D8F",
          paddingTop: 40, // atur jarak supaya header turun
        }}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back"
            size={24}
            color="#fff" // ubah jadi putih
            onPress={() => router.push("/(tabs)/Pendaftaran")}
          />
          <Text className="ml-2 text-lg font-extrabold text-white">
            Pendaftaran Online Pasien
          </Text>
        </View>
      </View>

      {/* Ganti background biru dengan ImageBackground */}
      <ImageBackground
        source={require("@/assets/images/bgprofilee.png")}
        resizeMode="cover"
        className="flex-1"
        style={{ width: 1200, height: 1200, alignSelf: "center" }}
        imageStyle={{ opacity: 0.3 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View
            className="bg-white rounded-2xl w-full max-w-sm p-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 10,
              elevation: 8,
            }}
          >
            <Text className="text-[13px] font-semibold text-gray-800 mb-1">
              Nomor Rekam Medis/ NIK<Text className="text-red-500">*</Text>
            </Text>
            <InputField
              icon="id-card-outline"
              placeholder="Masukkan Nomor Rekam atau NIK anda"
              value={mrnOrNik}
              onChangeText={setMrnOrNik}
              containerClassName="w-full mb-5"
              editable={true}
            />

            <Text className="text-[13px] font-semibold text-gray-800 mt-5 mb-1">
              Tanggal Lahir
            </Text>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setShowPicker(true)}
              className="flex-row items-center bg-gray-100 border border-gray-400 rounded-lg px-4 py-3 w-full mb-5"
            >
              <Text
                className={`flex-1 text-base ${birthDate ? "text-gray-800" : "text-gray-400"}`}
              >
                {birthDate ? fmt(birthDate) : "DD-MM-YYYY"}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#374151" />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={birthDate ?? new Date(2000, 0, 1)}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onPickDate}
                maximumDate={new Date()}
              />
            )}

            <View className="mt-8">
              <PrimaryButton
                title="Cari Pasien"
                onPress={() => router.push("/(tabs)/Pendaftaran/data_pasien")}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
