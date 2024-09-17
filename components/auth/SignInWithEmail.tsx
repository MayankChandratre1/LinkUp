import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, signInEmail, signUpEmail } from '@/firebase/services/rnFirebase/auth'; // Assuming your signUp function is in this path
import { router } from 'expo-router';
import { CustomButton2 } from '../ui/CustomButton';
import { TouchableOpacity } from 'react-native';

const SignInWithMail = ({changeMode}:{
    changeMode?:()=>void
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(()=>{
    getCurrentUser().then((user)=>{
        if(user){
            router.push("/(tabs)/profiles")
            setIsUser(true)
        }
    })
  },[])

  const handleSignIn = async () => {
    setError(false)
    setLoading(true)
    const user = await signInEmail(email, password);
    if (user) {
      console.log('User signed up:', user);
      setLoading(false)
      router.push("/(tabs)/profiles")
    } else {
        setError(true)
        setLoading(false)
    }
  };

  return (
    <SafeAreaView className='flex-1 p-4 bg-primary'>
      <ScrollView className="h-full">
        <Text className="text-vibrant font-ibold text-xl mb-4">Sign In</Text>

        <TextInput
          className="border border-neutral p-2 mb-4 rounded font-iregular"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded font-iregular"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

    
        {error && <Text className='text-red-500 font-iregular text-center my-2'>Invalid Credentials!!</Text>}
        <CustomButton2 title="Sign In" onPress={handleSignIn} containerStyles="p-3 rounded-md m-2 bg-vibrant">
            <Text className='text-primary font-isemibold'>
                {loading ? "Signing In...":"Sign In"}
            </Text>
        </CustomButton2>
        <View className='bg-primary mt-4'>
            <Text className='text-center font-ilight'>
                Dont Have an account? <TouchableOpacity onPress={changeMode}>
                    <Text className='underline text-vibrant font-ilight'>Sign Up</Text>
                </TouchableOpacity>
            </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInWithMail;
