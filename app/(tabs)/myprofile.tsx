import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

import MyProfile from '@/components/MyProfile'
/*
  Ayush Kumar Singh
Bangalore, India
Age-26
Software Developer
*/

const user = {
  name: "Ayush Kumar Singh",
  location:"Bangalore, India",
  age:"26",
  occ:"Software Developer"
}

const myprofile = () => {
  return (
    
      <SafeAreaView className='bg-primary h-full'>
        <ScrollView contentContainerStyle={{
      height:"100%",
      }}>
        <MyProfile user={user} />
      </ScrollView>
      </SafeAreaView>
    
  )
}

export default myprofile