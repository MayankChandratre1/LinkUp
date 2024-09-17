import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='Name' options={{
            headerShown:false
        }} />
        <Stack.Screen name='dobAndHeight' options={{
            headerShown:false
        }} />
        <Stack.Screen name='Addresses' options={{
            headerShown:false
        }} />
        <Stack.Screen name='EducationAndJob' options={{
            headerShown:false
        }} />
        <Stack.Screen name='Photos' options={{
            headerShown:false
        }} />
        <Stack.Screen name='height' options={{
            headerShown:false
        }} />
        
    </Stack>
  )
}

export default _layout