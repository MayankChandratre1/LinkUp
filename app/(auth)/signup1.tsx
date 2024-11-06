import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import SignUpWithPhone from '@/components/auth/SignUpWithPhone'
import NewSignUpWithPhone from '@/components/auth/NewSignUpWithPhone'
import SignInWithGoogle from '@/components/auth/SignInWithGoogle'
import {PuzzelGraphic} from '@/constants/Images'
import { getCurrentUserInfo } from '@/firebase/services/rnFirebase/db'
import { router } from 'expo-router'

const signup1 = () => {
  const [indicator, setIndicator] = useState(true)
  
    useEffect(()=>{
      getCurrentUserInfo().then(user => {
        console.log("USER:"+JSON.stringify(user));
        if(user && Boolean(user?.isNewProfile)){
          router.push("/(auth)/getstarted")
        }else if(user){
          router.push("/(tabs)/profiles")
        }
      })
    },[])
  
  return (
    <SafeAreaView className='flex-1 bg-bgcolor py-10 pb-10'>
      <View className='justify-center items-center p-3'>
        <Text className='text-3xl text-center font-isemibold text-textcolorI'>
          Join the 
          <Text className='text-4xl font-ibold text-textcolorII'> LinkUp </Text>
          Community
        </Text>
      </View>
      {
        indicator ? 
        <View className='flex-1 p-5 justify-center items-center relative'>
          <Image
            source={PuzzelGraphic}
            className='w-[80%] h-[60%]'
          />
          <Text className='text-xl font-iregular text-center'>
          Create an account to start connecting with new friends nearby. It's quick, easy, and free!
          </Text>
        </View>:
        null
      }
     <View className='flex-1 justify-center'>
     <View className='px-5'>
        <NewSignUpWithPhone setIndicator={()=>{
           setIndicator(false)
        }} />
      </View>
      
      {
        indicator && 
        <>
        <View className='w-full px-5 flex-row justify-center items-center'>
        <View className='flex-1 border-b '>

        </View>
        <Text className='px-1'>OR</Text>
        <View className='flex-1 border-b '>

        </View>
      </View>
        <View className='px-5'>
        <SignInWithGoogle />
      </View>
        </>
      }
     </View>

    </SafeAreaView>
  )
}

export default signup1