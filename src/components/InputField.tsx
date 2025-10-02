import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { View, TextInputProps, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

export function InputField({ ...props }) {
  return (
    <View className="flex-row bg-slate-200 items-center border rounded-lg border-gray-800 mt-1 px-4 py-1 w-4/5">
      <TextInput
        {...props}
        className="flex-1 mr-2 text-base text-gray-800"
        placeholderTextColor={"#888"}
      />
    </View>
  )
}

export default InputField
