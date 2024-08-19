import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import Stories from '@/components/ui/FunctionsTab/Stories'
import PrimaryHeader from '@/components/ui/Header/PrimaryHeader'

const functions = () => {
  const users = [
    {
      id:"1",
      displayName:"Anonymus",
      photoURL:"https://placehold.co/400x400.png"
    },
    {
      id:"2",
      displayName:"Anonymus",
      photoURL:"https://avatar.iran.liara.run/public/boy"
    },
    {
      id:"3",
      displayName:"Anonymus",
      photoURL:"https://placehold.co/400x400.png"
    },
    {
      id:"4",
      displayName:"Anonymus",
      photoURL:"https://placehold.co/400x400.png"
    },
    {
      id:"5",
      displayName:"Anonymus",
      photoURL:"https://avatar.iran.liara.run/public/boy"
    },
    {
      id:"6",
      displayName:"Anonymus",
      photoURL:"https://avatar.iran.liara.run/public/boy"
    },
    {
      id:"7",
      displayName:"Anonymus",
      photoURL:"https://avatar.iran.liara.run/public/boy"
    },

]
  return (
    <>
      <PrimaryHeader />
    <SafeAreaView className="h-full bg-primary ">
      <Stories users={users} />
      <ScrollView contentContainerStyle={{
      height:"100%"
      }}>
        <Text className='text-secondary'>Functions</Text>
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default functions