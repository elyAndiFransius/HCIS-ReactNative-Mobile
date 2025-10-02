// src/components/DoctorCard.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  ViewStyle,
} from "react-native";

export type DoctorCardProps = {
  name: string;
  /** Boleh URL string (remote) atau require(...) (local) */
  avatar: string | ImageSourcePropType;
  /** contoh: "Senin" */
  day: string;
  /** contoh: "Jam 07.00 S.D 12.00" */
  time: string;

  /** Dipakai untuk navigasi: diarahkan dari screen (bukan di komponen) */
  onPress?: () => void;

  /** Opsi tampilan */
  showChevron?: boolean;            // default: true
  disabled?: boolean;               // default: false
  containerStyle?: ViewStyle;       // override style
  className?: string;               // nativewind class override
};

function _DoctorCard({
  name,
  avatar,
  day,
  time,
  onPress,
  showChevron = true,
  disabled = false,
  containerStyle,
  className,
}: DoctorCardProps) {
  const src =
    typeof avatar === "string" ? { uri: avatar } : (avatar as ImageSourcePropType);

  const Container = onPress ? Pressable : View;
  const pressProps = onPress
    ? {
        onPress,
        android_ripple: { color: "#E5EDF7" },
        accessibilityRole: "button" as const,
      }
    : {};

  return (
    <Container
      {...pressProps}
      className={`bg-white rounded-2xl px-4 py-3 mb-4 ${className ?? ""}`}
      style={[
        {
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: 4,
          opacity: disabled ? 0.6 : 1,
        },
        containerStyle,
      ]}
    >
      {/* Header: foto + nama + chevron */}
      <View className="flex-row items-center">
        <Image source={src} className="w-12 h-12 rounded-full mr-3" />
        <Text
          className="flex-1 text-[16px] font-extrabold text-[#1F5EA8]"
          numberOfLines={2}
        >
          {name}
        </Text>

        {showChevron && (
          <Ionicons name="chevron-forward" size={18} color="#1F5EA8" />
        )}
      </View>

      {/* Jadwal */}
      <View className="flex-row items-center mt-2">
        <Ionicons name="calendar-outline" size={18} color="#1F2937" />
        <Text className="ml-2 text-gray-700 font-semibold">
          {day}, {time}
        </Text>
      </View>
    </Container>
  );
}

export default memo(_DoctorCard);
