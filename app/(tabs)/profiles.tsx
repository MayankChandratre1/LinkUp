import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import ProfileItem from '@/components/ui/ListItems/ProfileItem'
import PrimaryHeader from '@/components/ui/Header/PrimaryHeader'

const profiles = () => {
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
      <SafeAreaView className="h-full bg-primary px-7">
        <View className='flex-1 items-center justify-center'>
          <Text className='text-3xl text-vibrant font-isemibold text-center self-start'>Find your vibe...</Text>
        </View>
        <FlatList
        data={users}
        renderItem={({item}) => <ProfileItem user={item} />}
        keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </>
  )
}

export default profiles