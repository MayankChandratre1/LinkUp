import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, sendOtp, sendVerificationMail, signInEmail, signOut, verifyPhone } from '@/firebase/services/rnFirebase/auth'; // Assuming your signUp function is in this path
import { router } from 'expo-router';
import { CustomButton2 } from '@/components/ui/CustomButton';


const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);
  
  useEffect(()=>{
    getCurrentUser().then(user => {
      if(user?.emailVerified){
        router.push("/(tabs)/profiles")
      }
    })
  },[])

  const handleSignIn = async () => {
        setError(false)
        if(email && password){
            try{
                const signin = await signInEmail(email, password)
                if(!signin?.user.emailVerified){
                  router.push("/(auth)/verifyMail/verifymail")
                }
                else{
                  router.push("/(tabs)/profiles")
                }
            }catch(err){
                setError(true)
            }
        }
  };

  return (
    <SafeAreaView className='flex-1 p-4 bg-primary'>
      <ScrollView className="flex-1" contentContainerStyle={{
        height:'100%',
      }}>
      
        <View className="h-full justify-center ">
        <Text className="text-vibrant text-xl mb-4">Sign In</Text>
        {error && <Text className='text-red-500'>ERROR IN VERIFICATION!</Text>}

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />


        <CustomButton2 title='signin' containerStyles='p-3 rounded-md m-2' onPress={handleSignIn}>
          <Text>SignIn</Text>
        </CustomButton2>
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2 bg-transparent' onPress={()=>{
            router.push("/(auth)/signup")
        }}>
          <Text className='text-blue-500 underline'><Text className='text-secondary'>Dont Have account?</Text> Sign Up</Text>
        </CustomButton2>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInForm;
