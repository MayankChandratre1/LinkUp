import { View, Text, Image } from 'react-native'
import React, { memo } from 'react'
import { CustomButton2 } from '../CustomButton'
import { router } from 'expo-router'
import { FunctionType } from '@/types/functionTypes'

const FunctionCard = memo(({function_item}:{
    function_item:Partial<FunctionType>
}) => {
  return (
    <CustomButton2 title='function' containerStyles='justify-start items-start my-2 bg-neutral rounded-lg' 
    onPress={()=>{
        router.push(`/(tabs)/functionpage/${function_item.id}`)
    }}>
        <View className='p-2'>
            <View className='flex-row gap-2'>
                {<Image source={{
                    uri:function_item.thumbnail_url
                }}  className='w-24 h-24 rounded-md'/>}
                <View className='justify-between py-2'>
                    <View>
                        <Text className='font-isemibold'>{function_item.title}</Text>
                        <Text className='text-[10px] text-vibrant font-iregular'>{function_item.location?.city}</Text>
                        <Text className='text-[12px] font-ilight w-[70%]'>{function_item.desc}</Text>
                    </View>
                    <View>
                        <Text className='text-xs font-iregular'>{function_item.date}</Text>
                    </View>
                </View>
            </View>
        </View>
    </CustomButton2>
  )
})

export default FunctionCard