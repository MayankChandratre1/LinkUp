import { View, Text, KeyboardAvoidingViewBase, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

import MyProfile from '@/components/MyProfile'
import { User } from '@/types/userTypes'
import { getCurrentUser } from '@/firebase/services/rnFirebase/auth'
import { getCurrentUserInfo } from '@/firebase/services/rnFirebase/db'
import { calculatePercentage } from '@/lib/profileCompletion'
/*
  Ayush Kumar Singh
Bangalore, India
Age-26
Software Developer
*/

const myprofile = () => {
  const [user, setUser] = useState<Partial<User> | null>(null)
  const [percentCompletion, setPercentCompletion] = useState<Number>(0)

  useEffect(()=>{
    getCurrentUserInfo().then(user => {
        setUser(user)
        if(user){
          setPercentCompletion(calculatePercentage(user))
        }
    })
  },[user])

  return (
    
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView contentContainerStyle={{
      height:"100%",
      }}>
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding':undefined} style={{
                flex:1
             }}>
                <MyProfile user={user} />
             </KeyboardAvoidingView>
      </ScrollView>
      </SafeAreaView>
    
  )
}

export default myprofile