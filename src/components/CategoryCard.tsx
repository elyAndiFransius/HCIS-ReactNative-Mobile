import React from "react";
import { View, Text, TouchableOpacity, Image, Platform } from "react-native";

type Props = {
  title: string;
  imageSource: any;        // require('...png')
  onPress?: () => void;
  imageSize?: number;      // opsional, default 56
};

export default function CategoryCard({
  title,
  imageSource,
  onPress,
  imageSize = 56,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white rounded-2xl mb-4 items-center justify-center"
      style={{
        flexBasis: "48%",          // 2 kolom
        minHeight: 128,
        paddingVertical: 16,
        // shadow iOS
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        // elevation Android
        elevation: Platform.OS === "android" ? 3 : 0,
      }}
    >
      {/* Gambar di atas */}
      <View
        className="items-center justify-center rounded-xl mb-10"
        style={{ width: imageSize + 32, height: imageSize + 32, backgroundColor: "#F3F6FB" }}
      >
        <Image
          source={imageSource}
          style={{ width: imageSize, height: imageSize }}
          resizeMode="contain"
        />
      </View>

      {/* Judul di bawah */}
      <Text className="text-[12px] font-extrabold text-[#0D4D8F] text-center">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
