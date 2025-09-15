import React from 'react'
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native"

type ButtonProps = TouchableOpacityProps & {
  label: string
}

export function Button({ label, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className="w-full items-center justify-center bg-blue-600 rounded-lg mt-4 px-4 py-4"
      style = {{
        backgroundColor: "#2563eb"
      }}
    >
      <Text className="text-base font-semibold text-white ">{label}</Text>
    </TouchableOpacity>
  )
}

export default Button
