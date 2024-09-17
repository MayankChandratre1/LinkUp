import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addEmailPassword, getCurrentUser, sendVerificationMail, signUpEmail } from '@/firebase/services/rnFirebase/auth'; // Assuming your signUp function is in this path
import { router } from 'expo-router';
import { CustomButton2 } from '@/components/ui/CustomButton';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  useEffect(()=>{
    getCurrentUser().then((user)=>{
        if(user?.emailVerified){
            setIsUser(true)
            router.replace("/(tabs)/profiles")
        }
    })
  },[])

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const user = await addEmailPassword(email, confirmPassword);

    if(user){
      Alert.alert("Check Your EMail for verification!")
      setEmailSent(true)
    }else{
      Alert.alert("Something went wrong!")
    }
    
  };

  const checkVerification = async () => {
    await auth().currentUser?.reload()
    const user = await auth().currentUser
    if(user?.emailVerified){
      router.push("/(tabs)/profiles")
    }else{
      Alert.alert("You are not verified!")
    }
}

  const sendMail = async () => {
    try{
        const res = await sendVerificationMail()
    }catch(err){
        console.error("FirebaseError:\n"+JSON.stringify(err));
    }
}


  return (
    <SafeAreaView className='flex-1 p-4 bg-primary'>
      <ScrollView className="h-full">
        <Text className="text-vibrant text-xl mb-4">Sign Up</Text>

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

        <TextInput
          className="border border-neutral p-2 mb-4 rounded font-iregular"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <CustomButton2 title='addemail' onPress={handleSignUp} containerStyles='p-3 bg-vibrant'>
          <Text className='text-primary font-iregular'>Add Email</Text>
        </CustomButton2>
        
        {emailSent && <CustomButton2 title='addemail' onPress={checkVerification} containerStyles='p-3 bg-vibrant my-2'>
          <Text className='text-primary font-iregular'>I Have Verified My Email</Text>
        </CustomButton2>}

        {emailSent && <CustomButton2 title='addemail' onPress={sendMail} containerStyles='p-3 bg-vibrant'>
          <Text className='text-primary font-iregular'>Resend Email</Text>
        </CustomButton2>}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpForm;
