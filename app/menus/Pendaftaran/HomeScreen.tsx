import BackNavbar from '@/src/components/BackNavbar'
import TextJudul from '@/src/components/TextJudul'
import React from 'react'
import { View, Text, SafeAreaView, Image } from 'react-native'


function index() {
    return (
        <View>
            <BackNavbar />
            <SafeAreaView>
                <View className='flex-row justify-center items-center'>
                    <Image
                        source={require("../../../assets/images/splash-icon.png")}
                        className="w-80 h-56 "
                        resizeMode="contain"
                    />
                </View>
                <View className='flex-row justify-center items-center m-5'>
                    <TextJudul className='text-lg text-center'>Ajukan pendaftaran mandiri RS. Bakti Timah Pangkalpinang</TextJudul>
                </View>
                <View>
                    <View className='grid grid-cols-2 gap-4 p-4'>
                        <View className='bg-blue-500 h-20 items-center justify-center rounded-lg'>
                            <Image source={require('../../../assets/images/menus/pasienUmum.png')} />
                        </View>
                        <View className='bg-blue-500 h-20 items-center justify-center rounded-lg'>
                            <Image source={require('../../../assets/images/menus/pasienUmum.png')} />
                        </View>
                        <View className='bg-blue-500 h-20 items-center justify-center rounded-lg'>
                            <Image source={require('../../../assets/images/menus/pasienUmum.png')} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>

        </View>
    )
}

export default index