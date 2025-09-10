import React from 'react'
import { TextProps, View, Text } from 'react-native'

type TextJudulProps = TextProps & {
    children: React.ReactNode
    className?: string
}

export default function TextJudul({
    children,
    className = "",
    style,
    ...props
}: TextJudulProps) {
    return (
        <Text
            className={`text-2xl font-bold text-gray-700 ${className}`}
            {...props}>
            {children}
        </Text>
    )
}
