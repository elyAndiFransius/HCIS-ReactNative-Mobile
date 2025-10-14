import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ImageBackground,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Baris info rapi
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <View className="flex-row items-start py-3">
      <Text className="w-32 text-[13px] font-extrabold text-[#1F5EA8]" style={{ lineHeight: 52 }}>
        {label}
      </Text>
      <Text className="flex-1 text-right font-semibold text-gray-900" style={{ lineHeight: 52 }}>
        {value || "-"}
      </Text>
    </View>
  );
}

// Hitung umur dari DD-MM-YYYY
function getAgeFromDDMMYYYY(dob?: string) {
  if (!dob) return "";
  const [dd, mm, yyyy] = dob.split("-").map((s) => parseInt(s, 10));
  if (!dd || !mm || !yyyy) return "";
  const today = new Date();
  let age = today.getFullYear() - yyyy;
  const beforeBirthday =
    today.getMonth() + 1 < mm || (today.getMonth() + 1 === mm && today.getDate() < dd);
  if (beforeBirthday) age -= 1;
  return `${age} Tahun`;
}

function fmt(d: Date) {
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
}

export default function DataPasienScreen() {
  const { nik, dob, rm, name, gender, status } = useLocalSearchParams<{
    nik?: string;
    dob?: string;
    rm?: string;
    name?: string;
    gender?: string;
    status?: string;
  }>();

  const data = useMemo(() => {
    const fallback = {
      rm: "12023498",
      nik: "121098129",
      name: "Kevin Abas Surya",
      dob: "17-08-1986",
      gender: "Laki - laki",
      status: "Menikah",
    };
    return {
      rm: rm || fallback.rm,
      nik: nik || fallback.nik,
      name: name || fallback.name,
      dob: dob || fallback.dob,
      gender: gender || fallback.gender,
      status: status || fallback.status,
    };
  }, [rm, nik, name, dob, gender, status]);

  const umur = getAgeFromDDMMYYYY(data.dob);
  const dobLong = useMemo(() => {
    if (!data.dob) return "-";
    const [d, m, y] = data.dob.split("-").map((s) => parseInt(s, 10));
    const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
    return bulan[m - 1] ? `${d} ${bulan[m - 1]} ${y}` : data.dob;
  }, [data.dob]);

  // State pemilih tanggal dipindah ke sini
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [showRNPicker, setShowRNPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onAndroidChange = (e: DateTimePickerEvent, d?: Date) => {
    if (e.type === "set" && d) setDate(d);
    setShowRNPicker(false);
  };

  const handleConfirmTanggal = () => {
    setCalendarOpen(false);
    setShowRNPicker(false);
    router.push({
      pathname: "/(tabs)/Pendaftaran/poli-klinik",
      params: { tgl: date.toISOString() },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View
        className="px-5 pb-3"
        style={{ backgroundColor: "#0D4D8F", paddingTop: 40 }}
      >
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back"
            size={24}
            color="#fff"
            onPress={() => router.push("/(tabs)/Pendaftaran/pasien-umum")}
          />
          <Text className="ml-2 text-lg font-extrabold text-white">
            Data Pasien
          </Text>
        </View>
      </View>

      <ImageBackground
        source={require("@/assets/images/icon.png")}
        resizeMode="contain"
        imageStyle={{ opacity: 0.06 }}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 20,
          }}
        >
          <View className="bg-white rounded-2xl w-full max-w-md px-5 py-6 mb-6">
            <InfoRow label="Nomor RM" value={data.rm} />
            <InfoRow label="NIK" value={data.nik} />
            <InfoRow label="Nama Lengkap" value={data.name} />
            <InfoRow label="Tanggal Lahir" value={dobLong} />
            <InfoRow label="Jenis Kelamin" value={data.gender} />
            <InfoRow label="Umur" value={umur} />
            <InfoRow label="Status" value={data.status} />
          </View>

          <View className="w-full max-w-md">
            <TouchableOpacity
              className="bg-[#1F5EA8] rounded-xl items-center py-3 mb-3"
              onPress={() => setCalendarOpen(true)}
            >
              <Text className="text-white font-extrabold text-base">
                Pilih tanggal tujuan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gray-200 rounded-xl items-center py-3"
              onPress={() => router.push("/(tabs)/Pendaftaran/pasien-umum")}
            >
              <Text className="text-[#1F5EA8] font-extrabold text-base">
                Kembali
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* Modal pilih tanggal */}
      <Modal
        visible={isCalendarOpen}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setCalendarOpen(false);
          setShowRNPicker(false);
        }}
      >
        <View className="flex-1 bg-black/30 items-center justify-center px-5">
          <View
            className="w-full rounded-2xl bg-white p-4"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            }}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-extrabold text-[#0D4D8F]">
                Atur Jadwal Kunjungan Anda
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-lg font-semibold text-gray-900">
                {fmt(date)}
              </Text>
              <TouchableOpacity
                onPress={() => setDate(new Date())}
                className="px-3 py-1 rounded-md bg-gray-100"
              >
                <Text className="text-[12px] font-semibold text-gray-700">
                  Hari ini
                </Text>
              </TouchableOpacity>
            </View>

            <View className="rounded-xl border border-gray-200 p-4 items-center">
              {Platform.OS === "ios" ? (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="inline"
                  onChange={(_, d) => d && setDate(d)}
                />
              ) : (
                <>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setShowRNPicker(true)}
                    className="w-full bg-gray-100 rounded-lg px-4 py-3"
                  >
                    <Text className="text-gray-800">{fmt(date)}</Text>
                  </TouchableOpacity>
                  {showRNPicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="calendar"
                      onChange={onAndroidChange}
                      minimumDate={new Date()}
                    />
                  )}
                </>
              )}
            </View>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={() => {
                  setCalendarOpen(false);
                  setShowRNPicker(false);
                }}
                className="flex-1 mr-2 bg-gray-100 rounded-xl py-3 items-center"
              >
                <Text className="font-semibold text-gray-700">Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmTanggal}
                className="flex-1 ml-2 bg-[#1F5EA8] rounded-xl py-3 items-center"
              >
                <Text className="font-extrabold text-white" >Pilih</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
