import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Bookmark, Home, Profile } from '@/constants/Icons'
import PrimaryHeader from '@/components/ui/Header/PrimaryHeader'
import { StatusBar } from 'expo-status-bar'

const TabIcon = ({icon, color, focused, name}:any) => {
    return (
      <View className='items-center justify-center gap-1'>
        <Image
          source={icon}
          resizeMode='contain'
          className='w-5 h-5'
          tintColor={color}
        />
        <Text className={`${focused ? "font-isemibold text-sm":"font-iregular text-xs"} `} style={{
          color:color
        }}>{name}</Text>
      </View>
    )
  }
  

const TabLayout = () => {
  return (
    <>
    
    <Tabs screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor: '#FC5185',
        tabBarInactiveTintColor: '#F5F5F5',
        tabBarStyle:{
          backgroundColor: '#100d28',
          borderTopColor:'#100d28',
          borderTopWidth:1,
          height: 84
        }
      }}>
        <Tabs.Screen name='profiles' options={{
            headerShown:false,
            tabBarIcon: ({color, focused}) => (
            <TabIcon icon={Home} color={color} focused={focused} name="People"  />
          )
        }}  />
        <Tabs.Screen name='functions' options={{
            headerShown:false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={Bookmark} color={color} focused={focused} name="Functions"  />
            )
        }} />
        <Tabs.Screen name='myprofile' options={{
            headerShown:false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={Profile} color={color} focused={focused} name="Me"  />
            )
        }} />
    </Tabs>
    
    </>
  )
}

export default TabLayout