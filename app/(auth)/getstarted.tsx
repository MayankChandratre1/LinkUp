import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SignInWithMail from "@/components/auth/SignInWithEmail";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpWithPhone from "@/components/auth/SignUpWithPhone";
import { ScrollView } from "react-native";
import PrimaryHeader from "@/components/ui/Header/PrimaryHeader";
import { User } from "@/types/userTypes";
import RegisterForm from "@/components/ui/Registration/RegistrationForm";


const getstarted = () => {
  const [user, setUser] = useState<Partial<User>>({});

  

  return (
    <>
    <SafeAreaView className="bg-bgcolor relative -top-5 flex-1 ">
      <ScrollView className="flex-1 px-3">
    <PrimaryHeader />
        <View>
          <View className="w-full mb-2">
            <Text className="text-3xl text-textcolorII font-isemibold text-center">Tell Us About Yourself!</Text>
          </View>
          <View>
            <Text className="text-center font-iregular text-textcolorI">
              Let others know who you are and what you enjoy. Your profile helps
              us connect you with people who share similar interests.
            </Text>
          </View>
        </View>
        <RegisterForm />
        
      </ScrollView>
    </SafeAreaView>
    </>
  );
};

export default getstarted;
