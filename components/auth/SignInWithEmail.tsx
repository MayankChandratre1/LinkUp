import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, signInEmail, signUpEmail } from '@/firebase/services/rnFirebase/auth'; // Assuming your signUp function is in this path
import { router } from 'expo-router';
import { CustomButton2 } from '../ui/CustomButton';
import { TouchableOpacity } from 'react-native';
import { schedulePushNotification } from '@/lib/notifications';
import { useNotifications } from '@/hooks/useNotifications';
import { updateUser } from '@/firebase/services/rnFirebase/db';

const SignInWithMail = ({changeMode}:{
    changeMode?:()=>void
}) => {
  const {notification, expoPushToken} = useNotifications();
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
      await schedulePushNotification("Hey "+user.user.email, "You have successfully logged in");
      if(expoPushToken){
        await updateUser({user:{expoPushToken:expoPushToken}});
      }
      router.push("/(tabs)/profiles")
    } else {
        setError(true)
        setLoading(false)
    }
  };

  return (
    <SafeAreaView className='flex-1 p-4 bg-bgcolor'>
      <ScrollView className="h-full">
        <Text className="text-textcolorII font-ibold text-xl mb-4">Sign In</Text>

        <TextInput
          className="border border-accentII p-2 mb-4 rounded font-iregular"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="border border-accentII p-2 mb-4 rounded font-iregular"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

    
        {error && <Text className='text-red-500 font-iregular text-center my-2'>Invalid Credentials!!</Text>}
        <CustomButton2 title="Sign In" onPress={handleSignIn} containerStyles="p-3 rounded-md m-2 bg-primary">
            <Text className='text-textcolorIII font-isemibold'>
                {loading ? "Signing In...":"Sign In"}
            </Text>
        </CustomButton2>
        <View className='bg-bgcolor mt-4'>
            <Text className='text-center font-ilight'>
                Dont Have an account? <TouchableOpacity onPress={changeMode}>
                    <Text className='underline text-textcolorII font-iregular'>Sign Up</Text>
                </TouchableOpacity>
            </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInWithMail;
