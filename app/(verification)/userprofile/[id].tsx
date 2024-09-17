import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { demo_profiles } from '@/util/demo-data'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfilePage from '@/components/ui/Profile/ProfilePage'
import CameraVerification from '@/components/ui/verification/CameraVerification'

const UserProfile = () => {
  const {id} = useLocalSearchParams()
  const user = demo_profiles.filter(user => user.id === id)
  return (
    <SafeAreaView className='flex-1'>
      <CameraVerification userProfile={user[0].profile_pic} />
    </SafeAreaView>
  )
}

export default UserProfile