import React from 'react'
import { ButtonProps, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type QuestionProps = TouchableOpacityProps & {
    label: string
}

function question({ label, ...props }: QuestionProps) {
    return (
        <TouchableOpacity
            {...props}
            className='flex-row m-1 items-center justify-center bg-slate-100 border  rounded-full px-2 py-2'
            style = {{
                borderColor: "#2563eb"
            }}
        >
            <Text className='text-sm font-normal text-gray-500'>{label}</Text>
        </TouchableOpacity>
    )
}
export default question