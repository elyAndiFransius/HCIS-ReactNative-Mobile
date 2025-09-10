import React from "react"
import { View, ViewProps } from "react-native"


type BoxProps = ViewProps & {
  children: React.ReactNode
  className?: string
}

export default function Box({ children, className, ...props }: BoxProps) {
  return (
    <View className={`m-5  ${className ?? ""}`} {...props}>
      {children}
    </View>
  )
}
