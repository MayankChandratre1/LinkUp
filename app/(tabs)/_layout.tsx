import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Bookmark, Home, Profile } from '@/constants/Icons'
import PrimaryHeader from '@/components/ui/Header/PrimaryHeader'
import { StatusBar } from 'expo-status-bar'
import { Colors } from '@/constants/Colors'

const TabIcon = ({icon, color, focused, name}:any) => {
    return (
      <View className='items-center justify-center gap-1 h-16'>
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
        tabBarActiveTintColor: Colors.vibrant,
        tabBarInactiveTintColor:"#cfcfcf",
        tabBarStyle:{
          // backgroundColor: Colors.primary,
          borderTopColor:"rgba(0,0,0,0)",
          borderTopWidth:1,
          height: 55
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
            tabBarHideOnKeyboard:true,
            tabBarIcon: ({color, focused}) => (
              <TabIcon icon={Profile} color={color} focused={focused} name="Me"  />
            )
        }} />
        {/* <Tabs.Screen name='newmyprofile' options={{
            headerShown:false,
            tabBarButton: () => null
        }} /> */}
        <Tabs.Screen name='userprofile' options={{
            headerShown:false,
            tabBarButton: () => null
        }} />
        <Tabs.Screen name='functionpage' options={{
            headerShown:false,
            tabBarButton: () => null
        }} />
        <Tabs.Screen name='notifications' options={{
            headerShown:false,
            tabBarButton: () => null
        }} />
        <Tabs.Screen name='(pages)' options={{
            headerShown:false,
            tabBarButton: () => null
        }} />
        <Tabs.Screen name='functionByPeople' options={{
            headerShown:false,
            tabBarButton: () => null
        }} />
        
    </Tabs>
    </>
  )
}

export default TabLayout