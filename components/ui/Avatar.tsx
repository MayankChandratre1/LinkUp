import { View, Text, Image } from 'react-native'
import React from 'react'

const Avatar = ({profile_pic}:{
    profile_pic:string
}) => {
  return (
    <View>
            {profile_pic ? (
              <Image
                source={{
                  uri: profile_pic || "No Uri"
                }}
                className='w-12 h-12 rounded-full'
              />
            ) : (
              <View className='w-12 h-12 rounded-full bg-primary justify-center items-center'>
                <Text className='text-xl font-iregular text-secondary'>U</Text>
              </View>
            )}
          </View>
  )
}

export default Avatar