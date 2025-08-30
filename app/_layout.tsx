import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Splash custom */}
      <Stack.Screen name="wellcome/SplashScreen" options={{ headerShown: false }} />
      
      {/* Tab utama */}
      <Stack.Screen name="wellcome/OnBoardingScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
