import React from "react";
import { TouchableOpacity, View, Image, Text, ImageSourcePropType } from "react-native";

type Props = {
    title: string;
    onPress?: () => void;
};

export default function PoliItemCard({ title,  onPress }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            className="bg-white rounded-xl px-4 py-3 mb-3"
            style={{
                borderWidth: 2,
                borderColor: "#0D4D8F",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 3 },
                elevation: 2,
            }}
        >
            <View className="flex-row items-center">
                <View className="flex-1">
                    <Text className="font-extrabold text-[15px] text-gray-900">{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}