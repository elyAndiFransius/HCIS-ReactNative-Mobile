import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PendaftaranStackLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="DataPasien" />
            <Stack.Screen name="PoliKlinik" />
            <Stack.Screen name="PasienUmum" />
            <Stack.Screen name="DetailTransaksiScreen" />
        </Stack>
    );
}
