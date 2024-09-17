import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name='signin' options={{
            headerShown:false
        }} />
        <Stack.Screen name='signup' options={{
            headerShown:false
        }} />
        <Stack.Screen name='register' options={{
            headerShown:false
        }} />
        <Stack.Screen name='verifyMail' options={{
            headerShown:false
        }} />
        <Stack.Screen name='signin3' options={{
            headerShown:false
        }} />
        <Stack.Screen name='signin2' options={{
            headerShown:false
        }} />
        <Stack.Screen name='registration' options={{
            headerShown:false
        }} />
        <Stack.Screen name='getstarted' options={{
            headerShown:false
        }} />
    </Stack>
  )
}

export default _layout