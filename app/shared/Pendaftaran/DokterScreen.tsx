import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, Alert, TurboModuleRegistry } from "react-native";
import api from "@/src/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function DokterScreen() {
  const [loading, setLoading] = useState(true);
  const [jadwalList, setJadwalList] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handlerShow = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        Alert.alert("Error", "Token tidak ditemukan, silahkan login dulu");
        return;
      }
      setLoading(true);
      // Panggil API
      const res = await api.get("/dokter/jadwal-dokter", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 5000,
      });
      setJadwalList(res.data.data ?? res.data)
    } catch (err: any) {
      console.log(err.response?.data)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlerShow();
  }, []);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }



  return (
    <FlatList
      data={jadwalList}
      keyExtractor={(item) => item.id_jadwal.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginVertical: 5,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Hari: {item.hari}</Text>
          <Text>Jam Mulai: {item.jam_mulai}</Text>
          <Text>Jam Selesai: {item.jam_selesai}</Text>
          <Text>Status: {item.status}</Text>

          {item.dokter && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontWeight: "bold" }}>Detail Dokter:</Text>
              {Object.entries(item.dokter).map(([key, value]) => (
                <Text key={key}>
                  {key}: {value !== null ? value.toString() : "-"}
                </Text>
              ))}
            </View>
          )}
        </View>
      )}
    />
  );
}
