import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & { title: string };

export default function OutlineButton({ title, style, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      {...rest}
      className="rounded-2xl items-center py-3"
      style={[
        {
          backgroundColor: "#E9EEF5", // abu2 lembut
          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        },
        style,
      ]}
    >
      <Text className="text-[#1F5EA8] font-extrabold">Kembali</Text>
    </TouchableOpacity>
  );
}
