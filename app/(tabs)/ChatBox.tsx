import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextDesc from '@/src/components/TextDesc';
import Question from '@/src/components/question';
import { router } from 'expo-router';

const button = [
  { id: 1, label: "Dokter & Spesialis" },
  { id: 2, label: "Layanan Medis" },
  { id: 3, label: "Bidan & Asuransi" },
  { id: 4, label: "IGD & UGD" },
  { id: 5, label: "Kontak dan Lokasi" },
]

const Header = () => {
  return (
    <View className='flex-row m-5 justify-between'>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color="#374151" />
      </TouchableOpacity>
      <Text className='text-lg font-semibold text-gray-700'>Chatbot AI</Text>
      <TouchableOpacity>
        <AntDesign name='message1' size={20} color="#374151" />
      </TouchableOpacity>
    </View>
  )
}

export default function ChatBox() {
  const [massege, setMassege] = useState('');

  return (
    <SafeAreaView className='flex-1' edges={['top']}>
      <View className='flex-1'>
        <Header />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView
            className="flex-1 px-5 ml-5 mr-5"
            contentContainerStyle={{
              paddingVertical: 20,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className=" items-center mb-4 justify-center">
              <Image source={require('../../assets/icons/ai_icon.png')} />
              <TextDesc className='text-center justify-center'>
                Halo saya asistent RS, pilih topik yang ingin Anda tanyakan disini, 👇
              </TextDesc>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {button.map((item) => (
                <Question key={item.id} label={item.label} />
              ))}
            </ScrollView>
          </ScrollView>

          <SafeAreaView edges={['bottom']}>
            <View className=" px-4 py-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-row bg-slate-200 items-center flex-1 mr-3 rounded-xl px-4">
                  <TextInput
                    value={massege}
                    onChangeText={setMassege}
                    placeholder="Tanyakan disini..."
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      color: '#000',
                      fontSize: 16
                    }}
                    placeholderTextColor="#555"
                    multiline={false}
                    returnKeyType="send"
                    blurOnSubmit={false}
                  />
                  <MaterialIcons name="keyboard-voice" size={22} color="#2563eb" />
                </View>
                <TouchableOpacity className='w-12 h-12 items-center justify-center bg-blue-600 rounded-full'>
                  <Ionicons name="paper-plane" size={18} color="#e2e8f0" />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}