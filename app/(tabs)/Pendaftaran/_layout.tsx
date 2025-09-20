import { Stack } from "expo-router";

export default function PendaftaranStackLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="DataPasien" />
            <Stack.Screen name="PoliKlinik" />
            <Stack.Screen name="PasienUmum" />
        </Stack>
    );
}
