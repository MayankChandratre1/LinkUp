import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { demo_profiles } from '@/util/demo-data'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfilePage from '@/components/ui/Profile/ProfilePage'
import { User } from '@/types/userTypes'
import { getUserById } from '@/firebase/services/rnFirebase/db'

const UserProfile = () => {
  const params = useLocalSearchParams()
  const [user, setUser] = useState<Partial<User> | null>(null)
  useEffect(()=>{
    console.log("#Params\n"+JSON.stringify(params));
    
    if(params){
      getUserById(params.id.toString()).then(user =>{ 
        setUser(user)
        console.log("#USER:\n"+JSON.stringify(user));
      })
    }
  },[params.id])

  
  if(!user?.id){
    return <View>
      <Text className='text-violet-500'>Hello</Text>
    </View>
  }

  return (
    <SafeAreaView className='flex-1'>
      <ProfilePage user={user}/>
    </SafeAreaView>
  )
}

export default UserProfile