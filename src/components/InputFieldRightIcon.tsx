import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { View, TextInputProps, TextInput } from "react-native"

type InputFieldRightIconProps = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap
}

export function InputFieldRightIcon({ icon, ...props }: InputFieldRightIconProps) {
  return (
    <View className="flex-row bg-slate-200 items-center border rounded-lg border-gray-800 mt-4 px-4 py-1 w-4/5">
      <TextInput
        {...props}
        className="flex-1 mr-2 text-base text-gray-800"
        placeholderTextColor={"#888"}
      />
      <Ionicons name={icon} size={22} color="#374151" />
    </View>
  )
}

export default InputFieldRightIcon
