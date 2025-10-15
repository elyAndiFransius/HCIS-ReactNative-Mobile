import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface DokterPoliProps {
    nama: string;
    foto: string;
    spesialis: string;
    namaPoli: string;
    tanggal: string;
}

const DokterPoli: React.FC<DokterPoliProps> = ({ nama, foto, spesialis, tanggal, namaPoli }) => {
    return (
        <View style={styles.card}>
            <View>
                <Image
                    source={{ uri: foto }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.info}>
                <Text style={styles.nama}>{nama}</Text>
                <Text style={styles.spesialis}>{spesialis}</Text>
                <Text style={styles.poli}>{namaPoli}</Text>
                <Text style={styles.tanggal}>{tanggal}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginVertical: 6,
        marginHorizontal: 12,
        padding: 10,
        borderRadius: 10,
        elevation: 3,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    info: {
        marginLeft: 12,
        justifyContent: "center",
    },
    nama: {
        fontSize: 16,
        fontWeight: "bold",
    },
    spesialis: {
        color: "#666",
    },
    tanggal: {
        color: "#666",
    },
    poli: {
        color: "#1e90ff",
    },
});

export default DokterPoli;
