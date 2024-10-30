import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import ProfileItem from '@/components/ui/ListItems/ProfileItem'
import PrimaryHeader from '@/components/ui/Header/PrimaryHeader'
import ProfileCard from '@/components/ui/Profile/ProfileCard'
import { demo_profiles } from '@/util/demo-data'
import { getAllUsers, getCurrentUserInfo } from '@/firebase/services/rnFirebase/db'
import { getCurrentUser } from '@/firebase/services/rnFirebase/auth'
import { CustomButton2 } from '@/components/ui/CustomButton'
import { router } from 'expo-router'
import PickerList from '@/components/ui/Picker/PickerList'

const profiles = () => {
  const [users, setUsers] = useState<any>([])
  const [isNewProfile, setIsNewProfile] = useState(false)
  useEffect(()=>{
    getCurrentUserInfo().then(data => {
      if(data?.isNewProfile){
        setIsNewProfile(true)
      }
    })
   
    
    getAllUsers().then((data)=>{
      setUsers(data);
    })

  },[])

  if(!isNewProfile){
    return (
      <>
        <PrimaryHeader />
        <SafeAreaView className="flex-1 bg-bgcolor px-7">
          <View className='mb-3 items-center justify-center'>
            <Text className='text-3xl text-textcolorII font-isemibold text-center self-start'>Find your vibe...</Text>
          </View>
          {users && <FlatList
          data={users}
          renderItem={({item}) => <ProfileCard profile={item}/>}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          className='mb-5'
          />}
         
        </SafeAreaView>
      </>
    )
  }


    return (
      <>
      <PrimaryHeader />
      <SafeAreaView className="flex-1 bg-bgcolor px-7 justify-center">
  <View className='mb-6  justify-center'>
    <Text className='text-3xl text-textcolorII font-ibold '>👋 Hey!</Text>
    <Text className='text-2xl text-textcolorII font-isemibold mt-4 '>New here? Let's set you up!</Text>
    <Text className='text-lg text-textcolorII font-iregular mt-2 '>Complete your profile and dive right in!</Text>
  </View>
  
  <CustomButton2 
    title='profile_completion' 
    containerStyles='p-4 rounded-lg bg-accentII/50 mt-6 '
    onPress={() => {
      router.push("/(auth)/registration/Name")
    }}
  >
    <Text className='text-md  font-isemibold text-center text-textcolorII'>🚀 Let's Get Started</Text>
  </CustomButton2>
</SafeAreaView>

    </>
    )
    
  

}
  

export default profiles