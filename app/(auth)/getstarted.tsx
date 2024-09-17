import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SignInWithMail from '@/components/auth/SignInWithEmail'
import { SafeAreaView } from 'react-native-safe-area-context'
import SignUpWithPhone from '@/components/auth/SignUpWithPhone'

const getstarted = () => {
  const [isSignUp, setIsSignUp] = useState(true)

  const changeMode = () =>{
    setIsSignUp(prev => !prev)
  }

  return (
    <>
        {
            isSignUp ? 
            <SignInWithMail changeMode={changeMode} /> :
            <SignUpWithPhone changeMode={changeMode} />
        }
    </>
  )
}

export default getstarted