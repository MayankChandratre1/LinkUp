import { View, Text, SafeAreaView, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { router } from 'expo-router';
import { updateUser } from '@/firebase/services/rnFirebase/db';
import CityPicker from '@/components/ui/Registration/CityPicker';


const City = () => {
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
        }
      } })
      if(success)
        router.push("/(auth)/registration/Job")
      else
        setError("Error in setting address try again!")
    }
  }


  return (
<SafeAreaView className="flex-1 p-4 bg-bgcolor">
  <ScrollView
    className="flex-1"
    contentContainerStyle={{
      height: "100%",
    }}
  >
    <View className="h-full justify-center">
      <Text className="text-textcolorII text-3xl font-ibold mb-4 text-center">
        Where do you live?
      </Text>
      {error && <Text className="text-red-500 font-iregular mb-4">{error}</Text>}
      <CityPicker setValue={setAddress}/>
      <CustomButton2
        title="Next"
        containerStyles="p-4 rounded-lg bg-primary mb-4 w-full"
        onPress={handleNext}
      >
        <Text className="text-md font-isemibold text-center text-textcolorIII">
          Next
        </Text>
      </CustomButton2>

      <CustomButton2
        title="Skip"
        containerStyles="p-4 rounded-lg bg-accentII mb-4 w-full"
        onPress={() => {
          router.push("/(auth)/registration/Job");
        }}
      >
        <Text className="text-md font-isemibold text-center text-textcolorIII">
          Skip
        </Text>
      </CustomButton2>
    </View>
  </ScrollView>
</SafeAreaView>

  );
}

export default City