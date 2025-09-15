import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, TextInputProps, TextInput, ViewProps } from "react-native";

type InputFieldProps = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap;
  containerClassName?: string;   // tambahan: kustom class container
};

export default function InputField({ icon, containerClassName = "", ...props }: InputFieldProps) {
  return (
    <View
      className={`flex-row items-center bg-white border border-gray-400 rounded-lg px-4 py-3 ${containerClassName}`}
    >
      <Ionicons name={icon} size={20} color="#374151" />
      <TextInput
        {...props}
        className="flex-1 ml-2 text-base text-gray-700"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );
}
