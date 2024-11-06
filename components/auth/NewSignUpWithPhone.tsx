import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCurrentUser, sendOtp, signOut, verifyPhone } from '@/firebase/services/rnFirebase/auth';
import { router } from 'expo-router';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { addUser, getCurrentUserInfo } from '@/firebase/services/rnFirebase/db';
import { CountryPicker } from 'react-native-country-codes-picker';

const NewSignUpWithPhone = ({setIndicator}:{
    setIndicator:()=>void
}) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [verificationId, setVerificationId] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [otpCode, setOtpCode] = useState<string[]>(['','','','','',''])
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const otpBoxes = useRef<Array<TextInput | null>>([])

 

  const handleSignIn = async () => {
    setLoading(true)
    setError(false);
    if (phone && countryCode) {
      setIndicator()
      const vid = await sendOtp(`${countryCode}${phone}`);
      if (vid) {
        setVerificationId(vid);
      }else{
        setError(true)
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
        }else if(existUser && !existUser.isNewProfile){
          router.push("/(tabs)/profiles")
        }else{
          router.push("/(auth)/getstarted");
        }
      }
    } else {
      setError(true);
    }
    setLoading(false)
  };

  return (
    <View>
        
       {
          !verificationId ? 
          <>
            <View className='flex-row items-center mb-2 p-0'>
              <CustomButton2 title="country" containerStyles=' py-[11px] px-2 rounded-none rounded-tl-md rounded-bl-md bg-bgcolor border' onPress={()=>{
                setShow(true)
              }}>
                <Text className='font-iregular'>{countryCode}</Text>
              </CustomButton2>
              <TextInput
                className="border font-iregular  border-neutral py-2 px-2 flex-1 rounded-none rounded-tr-md rounded-br-md"
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                autoCapitalize="none"
                maxLength={10}
              />
            </View>
            {error && <Text className="text-red-500 font-iregular text-center my-2">Something Went Wrong!</Text>}
            <TouchableOpacity onPress={handleSignIn} className="bg-primary p-3 rounded-md">
                <Text className="text-textcolorIII text-center font-isemibold">{loading ? "Sending OTP...":"Sign In"}</Text>
            </TouchableOpacity>
            <View className='bg-bgcolor mt-4'>
            {/* <Text className='text-center font-ilight'>
                Or continue with <TouchableOpacity onPress={changeMode}>
                    <Text className='underline text-textcolorII font-ilight'>Google</Text>
                </TouchableOpacity>
            </Text> */}
        </View>
          </>:null
        }


        {verificationId ? (
          <View className='mt-4'>
            <View className='flex-row justify-around mb-3'>
            {otpCode.map((item, index) => {
              return (
                <TextInput
                ref={(el) => otpBoxes.current[index] = el}
              className="border-b border-accentI p-2 text-center font-isemibold"
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
            {error && <Text className="text-red-500 font-iregular text-center my-2">ERROR IN VERIFICATION TRY AGAIN!</Text>}
            <CustomButton2
              title="Verify OTP"
              containerStyles="p-3 rounded-md m-2 bg-primary"
              onPress={async () => {
                await verifyOtp(verificationId!, otpCode.join(''));
                // router.push("/(auth)/getstarted");
              }}
            >
              <Text className='text-textcolorIII font-isemibold'>{loading ? "Verifying...":"Verify"}</Text>
            </CustomButton2>
          </View>
        ) : null}

    </View>
     
  );
};

export default NewSignUpWithPhone;
