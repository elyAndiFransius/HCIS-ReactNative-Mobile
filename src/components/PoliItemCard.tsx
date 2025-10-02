import React from "react";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
  iconBg?: string;        // warna latar icon
  iconSize?: number;      // default 28
};

export default function PoliItemCard({
  title,
  icon,
  onPress,
  iconBg = "#EAF3FF",
  iconSize = 28,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="bg-white rounded-2xl px-4 py-3 mb-3"
      style={{
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.06)",
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
      }}
    >
      <View className="flex-row items-center">
        {/* Icon box */}
        <View
          className="w-12 h-12 rounded-xl mr-3 items-center justify-center"
          style={{
            backgroundColor: iconBg,
            borderWidth: 1,
            borderColor: "rgba(13,77,143,0.08)",
          }}
        >
          <Image
            source={icon}
            style={{ width: iconSize, height: iconSize, resizeMode: "contain" }}
          />
        </View>

        {/* Title */}
        <View className="flex-1 pr-2">
          <Text className="font-extrabold text-[15px] text-gray-900">{title}</Text>
        </View>

        {/* Chevron kanan */}
        {/* <Text style={{ fontSize: 18, color: "#9CA3AF" }}>{">"}</Text> */}
      </View>
    </TouchableOpacity>
  );
}
