import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'


const ProfileItem = ({user:{displayName, photoURL}}:{user:{
    displayName:string | null,
    photoURL?:string | null
}}) => {
  return (
    <View className='flex-row gap-2 items-center mb-3'>
            <Image
                source={{uri: photoURL ? photoURL : ""}}
                resizeMode='contain'
                className='w-10 h-10 rounded-full'
            />
           
      <Text className='text-secondary font-isemibold'>{displayName}</Text>
    </View>
  )
}

export default ProfileItem