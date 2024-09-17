import { View, Text } from 'react-native'
import React from 'react'
import ProfileHeader from './ProfileHeader'
import { User } from '@/types/userTypes'

const ProfilePage = ({user}:{
    user:Partial<User>
}) => {
  if(!user){
    return null
  }

  return (
    <View>
      {user.name ? <ProfileHeader 
        name={user.name}
        isVerified={user.isProfileVerified || false}
      />:null}
    </View>
  )
}

export default ProfilePage