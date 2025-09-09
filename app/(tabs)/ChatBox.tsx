import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <View className="flex-row items-center justify-between shadow px-4 py-3 bg-white">
      <Ionicons name="chevron-back" size={28} color="#1f2937" />
      <View className="flex-1 items-center">
        <Text className="text-lg font-bold text-gray-700">Chat Box</Text>
      </View>
    </View>
  );
};

export default function ChatBox() {
  const [massege, setMassege] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}
    className=' bg-slate-300'
    >
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? insets.bottom : 0}
      >
        <ScrollView
          className="flex-1 bg-slate-300"
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View className="p-4">
            <Text>Ini adalah isi chat Anda.</Text>
          </View>
        </ScrollView>

        {/* Input chat */}
        <View className="bg-sl mx-3 py-4 px-4 mb-20">
          <View className="flex-row bg-slate-200 items-center justify-between rounded-full border border-slate-950 px-4">
            <TextInput
              value={massege}
              onChangeText={setMassege}
              placeholder="Ayo mulai percakapan"
              className="flex-1 py-4"
              style={{ color: '#000' }}
              placeholderTextColor="#555"
            />
            <Ionicons name="paper-plane" size={20} color="#1f2937" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
