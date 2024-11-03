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
        router.push("/(auth)/registration/dobAndHeight")
      else
        setError("Error in setting name try again!")
    }
  }


  return (
    <SafeAreaView className='flex-1 bg-bgcolor px-7 justify-center'>
    <ScrollView className="flex-1" contentContainerStyle={{ height: '100%' }}>
      <View className="h-full justify-center">
        <Text className="text-textcolorII text-lg mb-2 font-iregular">Let's start simple...</Text>
        <Text className="text-textcolorII text-3xl font-ibold mb-6">Whats your name?</Text>
        
        {error && <Text className='text-red-500 mb-2'>{error}</Text>}
  
        <TextInput
          className="border border-accentI p-4 mb-6 rounded-lg bg-white text-lg font-iregular"
          placeholder="eg. John Doe"
          value={name}
          onChangeText={handleChange}
          autoCapitalize="words"
        />
  
        <CustomButton2
          title='Create New Account'
          containerStyles='p-4 rounded-lg bg-primary mb-4'
          onPress={handleNext}
        >
          <Text className='text-md font-isemibold text-center text-textcolorIII'>Next</Text>
        </CustomButton2>
  
        {/* <CustomButton2
          title='Skip'
          containerStyles='p-4 rounded-lg bg-secondary mb-4'
          onPress={() => router.push("/(auth)/registration/Photos")}
        >
          <Text className='text-md font-semibold text-center text-primary'>Skip</Text>
        </CustomButton2> */}
      </View>
    </ScrollView>
  </SafeAreaView>
  
  );
};

export default NameForm;
