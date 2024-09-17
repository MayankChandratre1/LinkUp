import { View, Text } from 'react-native'
import React from 'react'
import { CustomButton2 } from '../CustomButton'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const ProfileHeader = ({name, isVerified}:{
    name:string,
    isVerified:boolean
}) => {
  return (
    <View className='p-3 flex-row justify-between items-center'>
      <Text className='font-ibold text-lg flex-1'>{name}</Text>
      <View className='flex-row px-3'>
        {!isVerified ? <>
            <CustomButton2 title='Get Verified' containerStyles='flex-row p-3 items-center justify-center mx-3'
            onPress={()=>{
                router.push("/(verification)/userprofile/1")
            }}
        >
             <MaterialIcons name="verified" size={20} color="#14a3c7" />
             <Text>Get Verified</Text>
        </CustomButton2>
        </>:null}
        <CustomButton2 title='setting' containerStyles='w-10 h-10'>
            <AntDesign name='setting' size={24}  />
        </CustomButton2>
      </View>
    </View>
  )
}

export default ProfileHeader