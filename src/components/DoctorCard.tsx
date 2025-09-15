import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type DoctorCardProps = {
  name: string;
  // boleh URL string (remote) atau require(...) (local)
  avatar: string | ImageSourcePropType;
  day: string;              // contoh: "Senin"
  time: string;             // contoh: "Jam 07.00 S.D 12.00"
  onPress?: () => void;     // opsional, jika kartu bisa ditekan
};

export default function DoctorCard({
  name,
  avatar,
  day,
  time,
  onPress,
}: DoctorCardProps) {
  const src =
    typeof avatar === "string" ? { uri: avatar } : (avatar as ImageSourcePropType);

  const Card = (
    <View
      className="bg-white rounded-2xl px-4 py-3 mb-4"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
      }}
    >
      <View className="flex-row items-center">
        <Image source={src} className="w-12 h-12 rounded-full mr-3" />
        <Text className="flex-1 text-[16px] font-extrabold text-[#1F5EA8]">
          {name}
        </Text>
      </View>

      <View className="flex-row items-center mt-2">
        <Ionicons name="calendar-outline" size={18} color="#1F2937" />
        <Text className="ml-2 text-gray-700 font-semibold">
          {day}, {time}
        </Text>
      </View>
    </View>
  );

  return onPress ? (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      {Card}
    </TouchableOpacity>
  ) : (
    Card
  );
}
