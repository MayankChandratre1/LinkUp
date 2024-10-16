import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFunction } from '@/hooks/useFunction';
import FunctionInfo from '@/components/ui/FunctionsTab/FunctionPage/FunctionInfo';
import { CustomButton2 } from '@/components/ui/CustomButton';
import UserList from '@/components/ui/FunctionsTab/UserList';
import JoinedList from '@/components/ui/FunctionsTab/FunctionPage/JoinedList';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { getCurrentUserInfo, getUserById, getUsersFromArray, joinFunction } from '@/firebase/services/rnFirebase/db';
import { User } from '@/types/userTypes';
import FunctionListUser from '@/components/ui/FunctionsTab/FunctionListUser';

const FunctionByPeople = () => {
  const params = useLocalSearchParams();
  const [user, setUser] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(params.id.toString());
      setUser(user);
    };
    fetchUser();
   },[params.id])

  return (
    <SafeAreaView className='p-3'>
      <View>
        <TouchableOpacity onPress={() => { router.replace("/(tabs)/functions"); }}>
          <AntDesign name='arrowleft' size={28} color={"black"} />
        </TouchableOpacity>
      </View>
      <View className='flex-row items-center my-3'>
      {user.profile_pic ? 
        <Image source={{
          uri:user.profile_pic || "No Uri"
      }} className='w-12 h-12 rounded-full' />:<View className='w-12 h-12 rounded-full bg-primary justify-center items-center'>
        <Text className='text-xl font-iregular text-secondary'>U</Text></View>}
        <Text className='text-xl font-bold ml-3'>{user.name}</Text>
        <View className='flex-1 flex-row justify-end'>
        <CustomButton2 title='Message' onPress={()=>{
          router.push(`/(tabs)/userprofile/${user.id}`)
        }} containerStyles='bg-vibrant p-2'>
            <Text className='text-primary font-iregular'>View Profile</Text>
        </CustomButton2>
        </View>
      </View>
        <FunctionListUser user={user} />
    </SafeAreaView>
  );
};

export default FunctionByPeople;
