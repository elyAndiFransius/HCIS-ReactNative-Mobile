import React from "react"
import { Text, TextProps, StyleSheet } from "react-native"

type TextDescProps = TextProps & {
    children: React.ReactNode
    className?: string
}

export default function TextDesc({
    children,
    className = "",
    style,
    ...props
}: TextDescProps) {
    return (
        <Text
            className={`text-base text-gray-500 ${className}`}
            {...props}
        >
            {children}
        </Text>
    )
}


