import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, sendOtp, signOut, verifyPhone } from '@/firebase/services/rnFirebase/auth';
import { router } from 'expo-router';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { addUser, getCurrentUserInfo } from '@/firebase/services/rnFirebase/db';
import { CountryPicker } from 'react-native-country-codes-picker';

const SignInForm = () => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [verificationId, setVerificationId] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [otp, setOtp] = useState('');
  const [otpCode, setOtpCode] = useState<string[]>(['','','','','',''])
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const recaptchaVerifier = useRef(null);
  const otpBoxes = useRef<Array<TextInput | null>>([])

  useEffect(()=>{
    getCurrentUser().then(user => {
      if(user?.emailVerified){
        router.push("/(tabs)/profiles")
      }
      else if(user){
        router.push("/(auth)/signup")
      }
    })
  },[])

  const handleSignIn = async () => {
    setLoading(true)
    setError(false);
    if (phone && countryCode) {
      const vid = await sendOtp(`${countryCode}${phone}`);
      if (vid) {
        setVerificationId(vid);
      }
      setLoading(false)
    }
  };


  const handleOtpChange = (code:string, index:number)=>{
      const newOtp = [...otpCode]
      newOtp[index] = code
      setOtpCode(newOtp)
      if (code && index < otpCode.length - 1) {
        otpBoxes.current[index + 1]?.focus();
      }
  }



  const verifyOtp = async (vid: FirebaseAuthTypes.ConfirmationResult, otp: string) => {
    setLoading(true)
    const res = await verifyPhone(vid, otp);
    if (res) {
      const user = await getCurrentUser()
      if(user){
        const uid = user?.uid
        const existUser = await getCurrentUserInfo()
        if(!existUser){
          await addUser({
            phone,
            isNewProfile:true
          },uid)
        }
      }
      router.push("/(auth)/signup");
    } else {
      setError(true);
    }
    setLoading(false)
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-primary">
      <ScrollView className="h-full">
        <Text className="text-vibrant text-xl mb-4">Sign In</Text>
        {error && <Text className="text-red-500">ERROR IN VERIFICATION!</Text>}

        
        {
          !verificationId ? 
          <>
            <View className='flex-row items-center mb-4'>
              <CustomButton2 title="country" containerStyles='m-2 p-3 rounded-md bg-neutral' onPress={()=>{
                setShow(true)
              }}>
                <Text className=' font-iregular'>{countryCode}</Text>
              </CustomButton2>
              <TextInput
                className="border border-neutral p-2 flex-1 rounded"
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                autoCapitalize="none"
                maxLength={10}
              />
            </View>
            <TouchableOpacity onPress={handleSignIn} className="bg-vibrant p-3 rounded-md mt-4">
                <Text className="text-white text-center">{loading ? "Sending OTP...":"Sign In"}</Text>
            </TouchableOpacity>
          </>:null
        }

        <CountryPicker
        show={show}
        lang='en'
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={(item) => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />

        {verificationId ? (
          <View className='mt-4'>
            <View className='flex-row justify-around mb-3'>
            {otpCode.map((item, index) => {
              return (
                <TextInput
                ref={(el) => otpBoxes.current[index] = el}
              className="border-b border-secondary p-2 text-center font-isemibold"
              placeholder=""
              value={otpCode[index]}
              onChangeText={(code)=>{
                handleOtpChange(code, index)
              }}
              keyboardType="numeric"
              maxLength={1}
              key={index}
              returnKeyType="next"
                  blurOnSubmit={false}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && index > 0 && !otpCode[index]) {
                      otpBoxes.current[index - 1]?.focus();
                    }
                  }}
                />
              )
            })}
            </View>
            <CustomButton2
              title="Verify OTP"
              containerStyles="p-3 rounded-md m-2"
              onPress={async () => {
                await verifyOtp(verificationId!, otpCode.join(''));
              }}
            >
              <Text>{loading ? "Verifying...":"Verify"}</Text>
            </CustomButton2>
          </View>
        ) : null}

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInForm;
