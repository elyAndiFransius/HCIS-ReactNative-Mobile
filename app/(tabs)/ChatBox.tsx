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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextDesc from '@/src/components/TextDesc';
import Question from '@/src/components/question';
import { router } from 'expo-router';
import { sendChat } from '@/src/services/chatbotService';

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
        <AntDesign name='message' size={20} color="#374151" />
      </TouchableOpacity>
    </View>
  )
}

export default function ChatBox() {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message }
    setChats((prev) => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const res = await sendChat(message);
      const botMessage = { sender: 'bot', text: res.reply };
      setChats((prev) => [...prev, botMessage]);
    } catch (err: any) {
      const botError = { sender: 'bot', text: 'Maaf, terjadi kesalahan.' };
      setChats((prev) => [...prev, botError]);
    } finally {
      setLoading(false)
    }

  }

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
            className="flex-1 px-5"
            contentContainerStyle={{ paddingVertical: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="items-center mb-4">
              <Image source={require('../../assets/icons/ai_icon.png')} />
              <TextDesc className='text-center'>
                Halo saya asisten RS, pilih topik yang ingin Anda tanyakan disini, 👇
              </TextDesc>
            </View>

            {/* Tombol kategori */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {button.map((item) => (
                <Question key={item.id} label={item.label} />
              ))}
            </ScrollView>

            {/* Pesan chat */}
            <View className="mt-5">
              {chats.map((chat, index) => (
                <View
                  key={index}
                  className={`my-2 p-3 rounded-2xl max-w-[80%] ${chat.sender === 'user' ? 'bg-blue-600 self-end rounded-br-none' : 'bg-gray-200 self-start rounded-bl-none'
                    }`}
                >
                  <Text
                    className={`${chat.sender === 'user' ? 'text-white' : 'text-gray-800'
                      }`}
                  >
                    {chat.text}
                  </Text>
                </View>
              ))}

              {loading && (
                <View className="self-start bg-gray-100 p-3 rounded-2xl mt-2">
                  <ActivityIndicator size="small" color="#2563eb" />

                </View>
              )}
            </View>
          </ScrollView>

          {/* Input Chat */}
          <SafeAreaView edges={['bottom']}>
            <View className="px-4 py-3 bg-white border-t border-gray-200">
              <View className="flex-row items-center">
                <View className="flex-row bg-slate-200 items-center flex-1 mr-3 rounded-xl px-4">
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Tanyakan disini..."
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      color: '#000',
                      fontSize: 16,
                    }}
                    placeholderTextColor="#555"
                  />
                  <MaterialIcons name="keyboard-voice" size={22} color="#2563eb" />
                </View>
                <TouchableOpacity
                  onPress={handleSend}
                  className='w-12 h-12 items-center justify-center bg-blue-600 rounded-full'
                  disabled={loading}
                >
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