import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, signInEmail, signUpEmail } from '@/firebase/services/rnFirebase/auth'; // Assuming your signUp function is in this path
import { router } from 'expo-router';
import SignInWithMail from '@/components/auth/SignInWithEmail';

const SignUpForm = () => {
    return (
      <SignInWithMail changeMode={()=>{
        router.push("/(auth)/signup")
      }} />
    )
};

export default SignUpForm;
