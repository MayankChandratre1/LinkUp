import { View, Text } from 'react-native'
import React from 'react'
import ProfileHeader from '../ProfileHeader'
import { User } from '@/types/userTypes'

const MyProfilePage = ({user}:{
    user:Partial<User>
}) => {
  return (
    <View>
      <ProfileHeader name={user.name || "User"} isVerified={user.isProfileVerified || false} />
    </View>
  )
}

export default MyProfilePage