import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Logo, Logo2 } from '@/constants/Images'
import { CustomButton2 } from '../CustomButton'
import { Ionicons } from '@expo/vector-icons'
import { signInEmail, signOut } from '@/firebase/services/rnFirebase/auth'
import { router } from 'expo-router'

const PrimaryHeader = () => {
  return (
    <SafeAreaView className='fixed top-0 bg-primary flex-row justify-between items-center px-2'>
        <View>
             <Image 
                source={Logo}
                resizeMode='contain'
                className='w-32 h-16'
             />
        </View>
        <View>
            <CustomButton2 title='hi' containerStyles='p-1' onPress={()=>{
              signOut().then(()=>{
                router.push("/(auth)/getstarted")
              })
            }}>
            <Ionicons name="menu" size={32} color="#7743DB" />
            </CustomButton2>
        </View>
    </SafeAreaView>
  )
}

export default PrimaryHeader