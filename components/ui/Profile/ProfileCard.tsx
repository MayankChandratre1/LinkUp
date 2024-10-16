import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';
import { User } from '@/types/userTypes';

const ProfileCard = ({profile, redirectMode}:{
    profile:Partial<User>,
    redirectMode?: "toProfile" | "toFunctions"
}) => {
  
  
  if(!profile || profile.isNewProfile){
    return null
  }
  
  
  return (
    <TouchableOpacity onPress={()=>{
        if(redirectMode === "toProfile" || !redirectMode){
            router.push(`/(tabs)/userprofile/${profile.id}`)
        }else if(redirectMode === "toFunctions"){
            router.push(`/(tabs)/functionByPeople/${profile.id }`)
        }

    }}>
        <View className='flex-row gap-1 p-2 rounded-xl items-start bg-neutral my-1'>
      <View>
        {profile.profile_pic ? 
        <Image source={{
          uri:profile.profile_pic || "No Uri"
      }} className='w-12 h-12 rounded-full' />:<View className='w-12 h-12 rounded-full bg-primary justify-center items-center'>
        <Text className='text-xl font-iregular text-secondary'>U</Text></View>}
      </View>
      <View className='flex-1'>
        <Text className='text-black font-isemibold text-md'>{profile?.name || "None"}<Text>{" "}{profile.isProfileVerified ? <MaterialIcons name="verified" size={10} color="green" />:<Octicons name="unverified" size={10} color="black" />}</Text></Text>
        <View>
            <Text className='text-xs font-ilight'>{profile.personalInfo?.age} | {profile.personalInfo?.current_address || "None"} |</Text>
            <Text className='text-xs font-ilight'>{profile.professionalInfo?.profession || "None"} - {profile.professionalInfo?.current_job || "None"} | {profile.professionalInfo?.education || "None"}</Text>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default ProfileCard