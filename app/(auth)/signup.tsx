import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addEmailPassword, getCurrentUser, sendOtp, sendVerificationMail, signOut, verifyPhone } from '@/firebase/services/rnFirebase/auth';
import { router } from 'expo-router';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { addUser, getCurrentUserInfo } from '@/firebase/services/rnFirebase/db';
import { CountryPicker } from 'react-native-country-codes-picker';
import auth from '@react-native-firebase/auth';

const SignInForm = () => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [verificationId, setVerificationId] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [otp, setOtp] = useState('');
  const [otpCode, setOtpCode] = useState<string[]>(['','','','','',''])
  const [error, setError] = useState("");
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const otpBoxes = useRef<Array<TextInput | null>>([])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUser, setIsUser] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [phoneverified, setPhoneVerified] = useState(false);

  useEffect(()=>{
    getCurrentUser().then(user => {
      if(user?.emailVerified){
        router.push("/(tabs)/profiles")
      }
    })
  },[])

  const handleSignIn = async () => {
    setLoading(true)
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return;
    }
    if(!email || !password || !phone){
      setError("Empty fields not allowed!")
      setLoading(false)
      return;
    }
    try{
      if (phone && countryCode) {
        const vid = await sendOtp(`${countryCode}${phone}`);
        if (vid) {
          setVerificationId(vid);
        }
        setLoading(false)
      }else{
        setError("Enter a valid phone")
      }
    }catch(err){
      setError("Something went wrong! Enter valid phone number")
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
    if(phoneverified) return;
    setLoading(true)
    setPhoneVerified(false)
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
      setPhoneVerified(true)
      if(auth().currentUser)
        await handleSignUp()
      else
        setError("UserNot Signed In")
    } else {
      setError("OTP Verification Faild!!");
    }
    setLoading(false)
  };

  const handleSignUp = async () => {
    
    const user = await addEmailPassword(email, confirmPassword);

    if(user){
      setEmailSent(true)
    }else{
      setError("Something went wrong! Enter valid Email!")
    }
    
  };

  const checkVerification = async () => {
    await auth().currentUser?.reload()
    const user = await auth().currentUser
    if(user?.emailVerified){
      router.push("/(tabs)/profiles")
    }else{
      Alert.alert("You are not verified!")
    }
}

  const sendMail = async () => {
    try{
        const res = await sendVerificationMail()
    }catch(err){
        console.error("FirebaseError:\n"+JSON.stringify(err));
    }
}

  return (
    <SafeAreaView className="flex-1 p-4 bg-primary">
      <ScrollView className="h-full">
        <Text className="text-vibrant font-ibold text-xl mb-4">Sign Up</Text>
        {<Text className="text-red-500">{error}</Text>}

        
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
                className="border border-neutral p-2 flex-1 rounded font-iregular"
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                keyboardType="numeric"
                autoCapitalize="none"
                maxLength={10}
              />
              
              
            </View>
            <TextInput
          className="border border-neutral p-2 mb-4 rounded font-iregular"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded font-iregular"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded font-iregular"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
            <TouchableOpacity onPress={handleSignIn} className="bg-vibrant p-3 rounded-md mt-4">
                <Text className="font-iregular text-white text-center">{loading ? "Sending OTP...":"Sign Up"}</Text>
            </TouchableOpacity>
            <View className='bg-primary mt-4'>
            <Text className='text-center font-ilight'>
                Have an account? <TouchableOpacity onPress={()=>{
                  router.push("/(auth)/signin3")
                }}>
                    <Text className='underline text-vibrant font-ilight'>Sign In</Text>
                </TouchableOpacity>
             </Text>
             </View>
            
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
              {!phoneverified ? <Text className='font-iregular'>{loading ? "Verifying...":"Verify"}</Text>:<Text className='font-iregular'>Verified</Text>}
            </CustomButton2>
            {emailSent && phoneverified && <View>
              <Text className='text-center my-2 mt-4 font-ilight text-sm text-vibrant'>We have also sent you an verification email...</Text>
              <CustomButton2 title='addemail' onPress={checkVerification} containerStyles='p-3  my-2'>
          <Text className=' font-iregular'>I Have Verified My Email</Text>
           </CustomButton2>
           
              </View>}

        {emailSent}
          </View>
        ) : null}

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInForm;
