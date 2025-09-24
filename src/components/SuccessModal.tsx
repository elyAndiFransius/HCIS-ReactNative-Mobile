import React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";

type SuccessModalProps = {
  visible: boolean;
  onClose: () => void;
  message?: string;
};

export default function SuccessModal({
  visible,
  onClose,
  message = "Berhasil!",
}: SuccessModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="bg-white rounded-2xl w-80 p-6 items-center shadow-lg">
          {/* Gambar ilustrasi */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
            }}
            className="w-24 h-24 mb-4"
            resizeMode="contain"
          />

          {/* Pesan sukses */}
          <Text className="text-green-600 text-xl font-semibold">{message}</Text>
          <Text className="text-gray-500 text-center mt-2">
            Aksi kamu berhasil dilakukan 🎉
          </Text>

          {/* Tombol OK */}
          <View >
            <TouchableOpacity
              onPress={onClose}
              className="mt-6 px-6 py-2 rounded-xl"
              style={{
                backgroundColor: "#4ade80"
              }}>
              <Text className="text-white font-medium">OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
