import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getCurrentUser, sendVerificationMail } from '@/firebase/services/rnFirebase/auth'
import auth from '@react-native-firebase/auth';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { router } from 'expo-router';

const verifymail = () => {
    const [isVerified, setIsVerified] = useState(false)

    const onAuthStateChange = async () => {
        const currUser = await getCurrentUser()
        console.log("User changed");
        if(currUser){
            setIsVerified(currUser.emailVerified)
        }
    }

    const sendMail = async () => {
        try{
            const res = await sendVerificationMail()
        }catch(err){
            console.error("FirebaseError:\n"+JSON.stringify(err));
            
        }
    }

    const redirect = async () => {
        const currUser = auth().currentUser
        if(currUser?.emailVerified) router.push("/(tabs)/profiles")
        else router.push("/(auth)/signin2")
    }


  return (
    <SafeAreaView>
        <View>
            <Text>Hello User!</Text>
            <Text>Check You Email</Text>
            <CustomButton2 title='resend' containerStyles='p-3 rounded-md m-2' onPress={sendMail}><Text>Send Verification Mail</Text></CustomButton2>
            <CustomButton2 title='verification' containerStyles='p-3 rounded-md m-2' onPress={redirect}>
                <Text>I have verified my email</Text>
            </CustomButton2>
        </View>
    </SafeAreaView>
  )
}

export default verifymail