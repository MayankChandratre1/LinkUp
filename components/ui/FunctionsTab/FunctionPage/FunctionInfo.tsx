import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FunctionType } from '@/types/functionTypes'
import * as Location from 'expo-location';
const FunctionInfo = ({curr_func}:{
    curr_func?: Partial<FunctionType>
}) => {
    const [address, setAddress] = useState("");
    const calculateAddress = async (long:number, lat:number) => {
        let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
        const address = await Location.reverseGeocodeAsync({
          longitude: Number(long),
          latitude:Number(lat)
        })
        console.log("#FUNCTION_ADDRESS: "+ JSON.stringify(address[0]));
        setAddress(address[0].formattedAddress || 'Not Specified')
      }
      useEffect(()=>{
        setAddress("")
        if(curr_func && curr_func.location){
            calculateAddress(curr_func.location.longitude, curr_func.location.latitude)
        }
      },[curr_func])
  return (
    <View className='p-2'>
    <View className='flex-row gap-2'>
        {
          curr_func && curr_func.thumbnail_url?.length != 0 && <Image source={{
            uri:curr_func?.thumbnail_url
        }}  className='w-36 h-full rounded-md'/>
        }
        <View className='py-2 pt-5 w-1/2'>
            <View className=''>
                <Text className='font-isemibold text-vibrant text-2xl'>{curr_func?.title}</Text>
                <Text className='font-iregular'>{curr_func?.location?.city}</Text>
            </View>
            <View>
                <Text className='text-xs font-iregular'>{curr_func?.date}</Text>
            </View>
            <View className=''>
        <Text className='text-md font-iregular py-2'>{curr_func?.desc}</Text>
    </View>
        </View>
    </View>
    <View className='my-3 px-2'>
     <Text>Venue: {address}</Text>
    </View>
    
</View>
  )
}

export default FunctionInfo