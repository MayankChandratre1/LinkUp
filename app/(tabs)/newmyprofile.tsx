import { View, Text, KeyboardAvoidingViewBase, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

import MyProfile from '@/components/MyProfile'
import { User } from '@/types/userTypes'
import { getCurrentUser } from '@/firebase/services/rnFirebase/auth'
import { getCurrentUserInfo } from '@/firebase/services/rnFirebase/db'
import { calculatePercentage } from '@/lib/profileCompletion'
import MyProfileComponent from '@/components/ui/Profile/MyProfile/MyProfileComponent'
import Ola from '@/components/ui/test/Ola'
/*
  Ayush Kumar Singh
Bangalore, India
Age-26
Software Developer
*/

const newmyprofile = () => {
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
    
      <SafeAreaView className='bg-bgcolor h-full'>
        <ScrollView contentContainerStyle={{
      height:"100%",
      }}>
        <Ola />
      </ScrollView>
      </SafeAreaView>
    
  )
}

export default newmyprofile