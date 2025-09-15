import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, View, Image, ImageSourcePropType, Text, TouchableOpacity, ImageBackground } from 'react-native'
import PagerView from "react-native-pager-view"

const { width } = Dimensions.get('window')

// 🔹 Data dummy (bisa diganti dari API / database)
const content = [
    {
        id: 1,
        title: "RS Bakti Timah Pangkal Pinang ",
        icon: require("../../assets/images/PagerView/view1.png"),
        bg: require("../../assets/images/event/bgevent.png"),
        dec: "Berfokus pada kepercayaan, kasih sayang, kualitas, dan harapan",
        decBtn: "Daftar Sekarang"
    },
    {
        id: 2,
        title: "Hidup bukan hanya sekedar hidup tapi juga menjadi sehat.",
        icon: require("../../assets/images/PagerView/view3.png"),
        bg: require("../../assets/images/event/bgevent.png"),
        dec: "Ambil HP mu, pesan sekarang !",
        decBtn: "Klik di sini"
    },
    {
        id: 3,
        title: "Paket Promo Medical CheckUp",
        icon: require("../../assets/images/PagerView/view2.png"),
        bg: require("../../assets/images/event/bgevent.png"),
        dec: "Investasikan Hari Masa Tua Anda !",
        decBtn: "Pesan Sekarang"
    }
]

type CardEventProps = {
    images: (string | ImageSourcePropType)[]
}

export function CardEvent({ images }: CardEventProps) {
    const [currentPage, setCurrentPage] = useState(0)
    const pagerRef = useRef<PagerView>(null)

    // 🔹 Auto-slide setiap 3 detik
    useEffect(() => {
        const interval = setInterval(() => {
            const nextPage = (currentPage + 1) % images.length
            pagerRef.current?.setPage(nextPage)
            setCurrentPage(nextPage)
        }, 3000)

        return () => clearInterval(interval)
    }, [currentPage, images.length])

    return (
        <View>
            {/* 🔹 Container utama untuk card + dots */}
            <View style={{
                width: width - 20,
                height: 160,
                borderRadius: 12,
                overflow: "hidden",
            }}>
                <PagerView
                    ref={pagerRef}
                    style={{ flex: 1, borderRadius: 16 }}
                    initialPage={0}
                    onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
                >
                    {content.map((item) => (
                        <ImageBackground
                            key={item.id}
                            source={item.bg}
                            className="flex-row w-full rounded-lg overflow-hidden mx-1"
                            resizeMode="cover"
                        >
                            {/* 🔹 Overlay supaya teks tetap terbaca */}
                            <View className="flex-1 flex-row items-center bg-black/40 p-3 rounded-lg">
                                {/* 🔹 Icon / gambar di sebelah kiri */}
                                <Image
                                    source={item.icon}
                                    className="h-24 w-24 rounded-lg mr-3 ml-3"
                                    resizeMode="cover"
                                />

                                {/* 🔹 Konten teks di sebelah kanan */}
                                <View className="flex-1 mr-3 ">
                                    <Text className="font-bold text-lg text-gray-800">{item.title}</Text>
                                    <Text
                                        style={{ color: "#8DC73F" }}
                                    >{item.dec}</Text>

                                    {/* 🔹 Button di bawah deskripsi */}
                                    <TouchableOpacity
                                        style={{ width: width * 0.35, backgroundColor: "#C1D2E2" }}
                                        className=" px-1 mt-1 py-1 rounded-md items-center"
                                    >
                                        <Text className="text-gray-900 text-xs font-semibold text-center">{item.decBtn}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    ))}
                </PagerView>

                {/* 🔹 Dot indicator */}
                <View
                    className="flex-row justify-center space-x-2"
                    style={{
                        position: "absolute",
                        bottom: 10,
                        left: 0,
                        right: 0
                    }}
                >
                    {content.map((_, i) => (
                        <View
                            key={i}
                            style={{
                                height: 6,
                                width: 8,
                                marginHorizontal: 1
                            }}
                            className={`rounded-full ${currentPage === i ? "bg-blue-500" : "bg-gray-300"
                                }`}
                        />
                    ))}
                </View>
            </View>
        </View>
    )
}

export default CardEvent
