import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { View, TextInputProps, TextInput } from 'react-native';


type InputFieldProps = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap;
};

export function InputField({ icon, ...props }: InputFieldProps) {
  return (
    <View className='flex-row bg-slate-200 items-center border rounded-lg border-gray-800 mt-4 px-4 py-1 w-4/5'>
      <Ionicons name={icon} size={22} color="#374151" />
      <TextInput
        {...props}
        className='flex-1 ml-2 text-base  text-gray-600'
        placeholderTextColor={"#888"}
      />
    </View>
  )
}

export default InputField