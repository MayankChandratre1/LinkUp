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
        <SafeAreaView className="flex-1 bg-primary px-7">
          <View className='mb-3 items-center justify-center'>
            <Text className='text-3xl text-vibrant font-isemibold text-center self-start'>Find your vibe...</Text>
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
      <SafeAreaView className="flex-1 bg-primary px-7">
        <View className='mb-3 items-center justify-center'>
          <Text className='text-3xl text-vibrant font-isemibold text-center self-start'>Hey...</Text>
          <Text className='text-xl text-vibrant font-iregular text-center self-start'>Let's Complete your profile first.</Text>
          <CustomButton2 title='profile_completion' containerStyles='p-3 rounded-md m-2' onPress={()=>{
            router.push("/(auth)/registration/Name")
          }}>
            <Text>Let's Go</Text>
          </CustomButton2>
        </View>

      </SafeAreaView>
    </>
    )
    
  

}
  

export default profiles