import { Stack } from "expo-router";

export default function PendaftaranStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />          {/* /pendaftaran */}
      <Stack.Screen name="pasien-umum" />    {/* /pendaftaran/pasien-umum */}
      <Stack.Screen name="data_pasien" />    {/* /pendaftaran/data_pasien */}
      <Stack.Screen name="poli-klinik" />    
    </Stack>
  );
}
