import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Logo, Logo2, PuzzelGraphic, InitialGraphic} from "@/constants/Images"
import CustomButton, { CustomButton2 } from "@/components/ui/CustomButton";
import { router } from "expo-router";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { onGoogleButtonPress } from "@/firebase/services/rnFirebase/auth";
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
// import { SignInWithGoogle } from "@/firebase/services/rnFirebase/auth";

export default function Index() {
  
  return (
   <SafeAreaView className="h-full bg-bgcolor pb-6">
    <ScrollView contentContainerStyle={{
      height:"100%"
    }}>
      <View className="w-full h-full gap-3 flex-1">
      <Image 
        source={Logo}
        className="w-full h-[15%]"
        resizeMode="contain"
      />
      <View className="w-full flex-1 justify-center">
        <Image 
          source={InitialGraphic}
          className="w-full h-[60%]"
          resizeMode="cover"
          style={{
              position:"relative",
              right:14,
              top:14
          }}
        />
        <View className="px-3 flex-1 justify-center">
          <Text className="text-secondary text-center text-xl font-iregular ">Connect, Explore, and Create Memories with New Friends!{" "}
          </Text>
        
        </View>
     <View className="flex-1 w-full">
     
      <View className="w-full flex-row justify-center items-center">
        <CustomButton2 title="Get Started" containerStyles="mx-10 flex-1 bg-primary p-4 flex-row" textStyles="font-isemibold text-textcolorIII text-sm" onPress={()=>{
          router.push("/(auth)/signup1")
        }} >
          <Text className="font-isemibold text-textcolorIII text-lg mx-2">Get Started</Text>
        </CustomButton2>
        {/* <CustomButton2 title="Get Started" containerStyles="mx-1 bg-primary flex-row p-4" textStyles="font-isemibold text-textcolorIII text-sm" onPress={()=>{
          onGoogleButtonPress().then((res)=>{
            console.log("GOOGLE_SIGNIN_RES:",JSON.stringify(res))
            router.push("/(tabs)/profiles")
          })
        }} >
          <AntDesign name="google" size={24} color="white" />
          <Text className="font-isemibold text-textcolorIII text-lg mx-2">Google</Text>
        </CustomButton2> */}
      </View>
     </View>
      </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}
