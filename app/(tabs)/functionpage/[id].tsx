import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFunction } from '@/hooks/useFunction';
import FunctionInfo from '@/components/ui/FunctionsTab/FunctionPage/FunctionInfo';
import { CustomButton2 } from '@/components/ui/CustomButton';
import JoinedList from '@/components/ui/FunctionsTab/FunctionPage/JoinedList';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getCurrentUserInfo, getUsersFromArray, joinFunction } from '@/firebase/services/rnFirebase/db';
import { User } from '@/types/userTypes';

const FunctionPage = () => {
  const [funcIid, setFuncId] = useState("");
  const [address, setAddress] = useState("");
  const params = useLocalSearchParams();
  
  const calculateAddress = async (long: number, lat: number) => {
    const address = await Location.reverseGeocodeAsync({
      longitude: Number(long),
      latitude: Number(lat)
    });
    console.log("#FUNCTION_ADDRESS: " + JSON.stringify(address[0].formattedAddress));
    setAddress(address[0]?.formattedAddress || 'Not Specified');
  };

  const user_ids = ["J2vRQHVQfohyYn4gzNLv5ToLysi1", "MXy3SBfJraWoFVqaCxceu27VDjE3", "ZVk7EgnXHaFLk89n7Smh", "brXf3SHiDsiZWCyF2UNH", "mHSDtLzSYiC5oMqu8a8z"];
  
  useEffect(() => {
    setFuncId(params.id.toString() || "");
    if (curr_func) {
      calculateAddress(curr_func?.location?.longitude || 0, curr_func?.location?.latitude || 0);
    }
    getUsersFromArray(user_ids);
  }, [params]);

  const curr_func = useFunction(funcIid);

  const join = async () => {
    try {
      const user: Partial<User> | null = await getCurrentUserInfo();
      if (user && user.id)
        await joinFunction(user.id, funcIid);
      router.replace(`/(tabs)/functions`);
    } catch (error) {
      console.log("#JOINERR: " + JSON.stringify(error));
      return;
    }
  };

  return (
    <SafeAreaView className=''>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-full'>
        <View className='p-2'>
          <TouchableOpacity onPress={() => { router.back(); }}>
            <AntDesign name='arrowleft' size={28} color={"black"} />
          </TouchableOpacity>
        </View>
        
        <View>
          <FunctionInfo curr_func={curr_func} />
        </View>
        
        <View>
          <CustomButton2 title='join' containerStyles='my-2 py-3 mx-1 bg-vibrant' onPress={join}>
            <Text className='text-primary font-iregular'>Join</Text>
          </CustomButton2>
        </View>

        <View className='items-center my-3'>
          <View className='w-[95%] border-b'></View>
        </View>

        {/* Updated View for Joined People */}
        <View id='JoinedPeople' className='p-2 flex-grow'>
          <View>
            <Text className='text-lg font-isemibold'>Joined People</Text>
          </View>
          <JoinedList user_ids={curr_func.groups} funcId={funcIid} funcName={curr_func.title} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FunctionPage;
