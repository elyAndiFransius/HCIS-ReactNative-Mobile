import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';



const Header = () => {

  return (
    <SafeAreaView edges={["top", "left", "right"]}>
      <View className='flex-row m-5 justify-between'>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text className='text-lg font-semibold text-gray-700'>Chatbot AI</Text>
        <TouchableOpacity>
          <AntDesign name='message1' size={20} color="#374151" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default function ChatBox() {
  const [massege, setMassege] = useState('');

  return (
    <View className='flex-1'>
      <Header />
      <ScrollView
        className="flex-1 m-5  px-10 py-20"
        contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="p-4">
        </View>
      </ScrollView>

      <View className="flex-row m-5 bg justify-around mb-36">
        <View className="flex-row bg-slate-200 items-center w-3/4 justify-between rounded-full border border-slate-950 px-4">
          <TextInput
            value={massege}
            onChangeText={setMassege}
            placeholder="Ayo mulai percakapan"
            className="flex-1 py-4"
            style={{ color: '#000' }}
            placeholderTextColor="#555"
          />
          <Ionicons name="musical-notes" size={20} color="#1f2937" />
        </View>
        <View className='flex-row w-14 h-14 items-center justify-center bg-blue-600 rounded-full'>
          <Ionicons name="paper-plane" size={20} color="#e2e8f0" />
        </View>
      </View>
    </View>
  );
}
