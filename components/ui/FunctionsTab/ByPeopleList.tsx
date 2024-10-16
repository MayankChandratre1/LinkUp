import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUsers } from '@/hooks/useUsers'
import ProfileCard from '../Profile/ProfileCard'
import { Href } from 'expo-router'
import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

const ByPeopleList = ({}:{
  
}) => {
  const {users} = useUsers()
  return (
    <View className='px-2 mb-[310px]'>
      {users && <FlatList
          data={users}
          renderItem={({item}) => <ProfileCard redirectMode='toFunctions' profile={item}/>}
          showsVerticalScrollIndicator={true}
          className='mb-5'
          />}
    </View>
  )
}

export default ByPeopleList