import { View, Text, TouchableOpacity, Button, GestureResponderEvent } from 'react-native'
import React, { Children, ReactNode } from 'react'

const CustomButton = ({title, onPress, containerStyles, textStyles, isLoading}:{
    title:string,
    onPress?: ((event: GestureResponderEvent) => void),
    containerStyles?:string,
    textStyles?:string,
    isLoading?:boolean
}) => {
  return (
    <TouchableOpacity className={`bg-secondary min-h-[62px] rounded-xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50':''}`}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export const CustomButton2 = ({title, onPress, containerStyles, textStyles, isLoading, children}:{
    title:string,
    onPress?: ((event: GestureResponderEvent) => void),
    containerStyles?:string,
    textStyles?:string,
    isLoading?:boolean,
    children:ReactNode
}) => {
  return (
    <TouchableOpacity className={`bg-secondary/10 rounded-xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50':''}`}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        {children}
    </TouchableOpacity>
  )
}

export default CustomButton