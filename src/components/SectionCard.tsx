import React, { ReactNode } from "react";
import { View, Text, ViewProps } from "react-native";

type Props = ViewProps & {
  title?: string;
  children: ReactNode;
};

export default function SectionCard({ title, children, style, ...rest }: Props) {
  return (
    <View
      {...rest}
      className="bg-white rounded-[18px] px-5 py-4 mb-4 border"
      style={[
        {
          // border & shadow lembut biar mirip mockup
          borderColor: "#E6EEF7",
          shadowColor: "#0B1F3A",
          shadowOpacity: 0.06,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {!!title && (
        <Text className="text-[#1F5EA8] font-extrabold mb-2">{title}</Text>
      )}
      {children}
    </View>
  );
}
