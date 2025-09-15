import { Stack } from "expo-router";
import "../styles/global.css";
import { AuthProvider } from "@/src/api/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="wellcome/SplashScreen" screenOptions={{ headerShown: false }}>
        {/* Halaman Pertama seperti SplashScreen */}
        <Stack.Screen name="wellcome/SplashScreen" />
        <Stack.Screen name="wellcome/OnBoardingScreen" />
        <Stack.Screen name="Auth/Reset/InputEmail" />

        {/* Halaman utama */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Halaman Pendaftaran */}
      </Stack>
    </AuthProvider>
  );
}
