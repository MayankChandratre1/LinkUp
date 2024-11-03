import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Logo, Logo2, PuzzelGraphic} from "@/constants/Images"
import CustomButton from "@/components/ui/CustomButton";
import { router } from "expo-router";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import { SignInWithGoogle } from "@/firebase/services/rnFirebase/auth";

export default function Index() {
  useEffect(()=>{
    GoogleSignin.configure({
        webClientId: "157758303431-6nssjbt2aopl7219sugns2b400s2dh4a.apps.googleusercontent.com", 
    })  
},[])
  return (
   <SafeAreaView className="h-full bg-bgcolor">
    <ScrollView contentContainerStyle={{
      height:"100%"
    }}>
      <View className="w-full h-full gap-3 flex-1">
      <Image 
        source={Logo}
        className="w-full h-[15%]"
        resizeMode="contain"
      />
      <View className="w-full justify-center">
        <Image 
          source={PuzzelGraphic}
          className="w-full h-[60%]"
          resizeMode="cover"
        />
        <View className="px-3 flex-1 justify-end ">
          <Text className="text-secondary text-center text-lg font-iregular mt-5">Meet. Connect. Enjoy Together With{" "}
          </Text>
          <Text className="text-textcolorII text-xl font-ibold text-center">LinkUp</Text>
        </View>
      </View>
      <View className="flex-1 justify-center items-center">
        <CustomButton title="Get Started" containerStyles="bg-primary w-3/5" textStyles="font-isemibold text-textcolorIII text-sm" onPress={()=>{
          router.push("/(auth)/signup")
        }} />
        
      </View>
      </View>
    </ScrollView>
   </SafeAreaView>
  );
}
