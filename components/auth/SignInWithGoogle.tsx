import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { CustomButton2 } from '../ui/CustomButton'
import { Fontisto } from '@expo/vector-icons'
import { getCurrentUser, onGoogleButtonPress } from '@/firebase/services/rnFirebase/auth'
import { router } from 'expo-router'
import { getCurrentUserInfo } from '@/firebase/services/rnFirebase/db'

const SignInWithGoogle = () => {
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: "157758303431-6nssjbt2aopl7219sugns2b400s2dh4a.apps.googleusercontent.com", 
        })  
    },[])
  return (
    <CustomButton2 title='google' containerStyles='bg-primary flex-row p-3 rounded-md my-4'
    onPress={()=>{
        onGoogleButtonPress().then((res)=>{
            console.log("GOOGLE_SIGNIN_RES:",JSON.stringify(res))
            // router.push("/(auth)/getstarted")
            const user = getCurrentUserInfo().then(user => {
              if(user && !Boolean(user.isNewProfile)){
                router.push("/(tabs)/profiles")
              }else{
                router.push("/(auth)/getstarted");
              }
            })
          }
        )
    }}
    >
        <Fontisto name="google" size={24} color="white" />
        <Text className='px-3 text-textcolorIII font-isemibold'>Sign in with Google</Text>
    </CustomButton2>
  )
}

export default SignInWithGoogle