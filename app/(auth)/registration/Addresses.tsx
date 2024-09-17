import { View, Text, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { router } from 'expo-router';
import { updateUser } from '@/firebase/services/rnFirebase/db';


const Addresses = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string|null>(null);
  const [address, setAddress] = useState<string|null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  
  

  // useEffect(()=>{
  //   (async () => {
  //     setLoading(true)
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     let l = await Location.reverseGeocodeAsync({
  //       longitude: location.coords.longitude,
  //       latitude: location.coords.latitude
  //     })
  //     setAddress(l[0].city+", "+l[0].region+" - "+l[0].postalCode)
  //     setLocation(location);
  //     setLoading(false)
  //   })();
  // })

  const getAddress = async () => {
    setLoading(true)
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let l = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    })
    setAddress(l[0].city+", "+l[0].region+" - "+l[0].postalCode)
    setLocation(location);
    setLoading(false)
  }

  

  const handleNext = async () => {
    if(address){
      const success = await updateUser({ user: {
        personalInfo:{
          current_address:address
        },
        isNewProfile:false
      } })
      if(success)
        router.push("/(tabs)/profiles")
      else
        setError("Error in setting address try again!")
    }
  }


  return (
    <SafeAreaView className='flex-1 p-4 bg-primary'>
      <ScrollView className="flex-1" contentContainerStyle={{
        height:'100%',
      }}>
      
        <View className="h-full justify-center ">
        <Text className="text-vibrant text-xl font-ibold mb-4">Where do you live?</Text>
        {error && <Text className='text-red-500'>{error}</Text>}
        <CustomButton2 title='address' containerStyles='bg-vibrant items-start mb-4 w-[200px]' onPress={()=>{
          getAddress()
        }}>
        <Text className='p-2 font-iregular text-primary text-center w-full'>
          {"Use Current Location"}
        </Text>
        </CustomButton2>
        {address ? <Text className='mb-4 font-isemibold'>{address}</Text>:null}
        {loading && <ActivityIndicator />}
      
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={handleNext}>
          <Text className=''>Next</Text>
        </CustomButton2>
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={()=>{
          router.push("/(tabs)/profiles")
        }}>
          <Text className=''>SKip</Text>
        </CustomButton2>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

export default Addresses