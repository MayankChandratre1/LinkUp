import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { Logo } from '@/constants/Images'
import { CustomButton2 } from '../CustomButton'

const Stories = ({users}:{users:{
    id:string,
    displayName:string | null,
    photoURL?:string | null
}[]}) => {
  return (
    <View className='mb-3'>
      <FlatList 
        data={users}
        renderItem={({item}) => <CustomButton2 title='x' containerStyles=' mx-2 w-18 h-18 border-2 border-vibrant rounded-full p-[1px]'><Image source={{uri: item.photoURL || ""}} className='w-16 h-16 rounded-full' loadingIndicatorSource={Logo}/></CustomButton2 >}
        keyExtractor={item => item.id}
        horizontal
      />
    </View>
  )
}

export default Stories