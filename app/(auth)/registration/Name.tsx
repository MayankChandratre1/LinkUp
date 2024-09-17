import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router } from 'expo-router';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { updateUser } from '@/firebase/services/rnFirebase/db';


const NameForm = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (name:string) => {
      setName(name)
  }

  const handleNext = async () => {
    if(name){
      const success = await updateUser({ user: {name:name.trim()} })
      if(success)
        router.push("/(auth)/registration/Photos")
      else
        setError("Error in setting name try again!")
    }
  }


  return (
    <SafeAreaView className='flex-1 p-4 bg-primary'>
      <ScrollView className="flex-1" contentContainerStyle={{
        height:'100%',
      }}>
      
        <View className="h-full justify-center ">
        <Text className="text-vibrant text-md mb-4">Let's start simple...</Text>
        <Text className="text-vibrant text-xl font-ibold mb-4">What is your name?</Text>
        {error && <Text className='text-red-500'>{error}</Text>}

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Name"
          value={name}
          onChangeText={handleChange}
          autoCapitalize="none"
        />
      
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={handleNext}>
          <Text className=''>Next</Text>
        </CustomButton2>
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={()=>{
          router.push("/(auth)/registration/Photos")
        }}>
          <Text className=''>SKip</Text>
        </CustomButton2>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default NameForm;
