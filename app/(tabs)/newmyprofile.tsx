import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyProfilePage from '@/components/ui/Profile/MyProfile/MyProfilePage'
import { User } from '@/types/userTypes'
import { calculatePercentage } from '@/lib/profileCompletion'
import { getCurrentUserInfo } from '@/firebase/services/rnFirebase/db'
import { router } from 'expo-router'
import Noti from '@/components/ui/test/Noti'

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
    },[])

  if(!user){
    return null
  }

  return (
    <SafeAreaView>
      <Noti />
    </SafeAreaView>
  )
}

export default newmyprofile