import { View, Text } from 'react-native'
import React from 'react'
import { CustomButton2 } from '../CustomButton'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'

const ProfileHeader = ({name, isVerified, userId, notCurrUser}:{
    name:string,
    isVerified:boolean,
    userId: string,
    notCurrUser?:boolean
}) => {
  return (
    <View className='p-3 justify-between'>
      <Text className='font-ibold text-lg'>{name}</Text>
      
      <View className='flex-row'>
        {!isVerified && !notCurrUser ? <>
            <CustomButton2 title='Get Verified' containerStyles='flex-row p-2 items-center justify-center  bg-textcolorIII/80'
            onPress={()=>{
                router.push(`/(verification)/userprofile/${userId}`)
            }}
        >
             <MaterialIcons name="verified" size={20} color="#14a3c7" />
             <Text className='text-textcolorII font-isemibold'>Get Verified</Text>
        </CustomButton2>
        </>:null}
      </View>
      
    </View>
  )
}

export default ProfileHeader