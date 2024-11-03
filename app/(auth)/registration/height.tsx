import React, { useState } from "react";
import { View, TextInput, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CustomButton2 } from "@/components/ui/CustomButton";
import { updateUser } from "@/firebase/services/rnFirebase/db";



const HeightForm = () => {
  const [height, setHeight] = useState('')
  const [error, setError] = useState("");
  const [isInch, setIsInch] = useState(true);
  const [foot, setFoot] = useState("");
  const [inch, setInch] = useState("");
  const [cm, setCm] = useState("");
    
  
  function cmToFeetInchesString(cm: string): string {
    const totalInches = Number(cm) / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  }
  function cmToFeetInchesStates(cm: string) {
    const totalInches = Number(cm) / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    if(feet > 0){
      setFoot(feet+"")
      setInch(inches+"")
    }
  }
  function feetInchesToCm(feet: string, inches:string): string {
    const tInches = Number(inches) + Number(feet)*12
    const totalCm = Math.round(tInches * 2.54);
    return `${totalCm > 0 ? totalCm:""}`;
}

  const handleNext = async () => {
    if ((foot && inch) || cm) {
      let height = `${foot}'${inch}"`;
      if(!isInch){
        height = `${cmToFeetInchesString(cm)}`
      }
      setHeight(height)
      const success = await updateUser({ user: {
        personalInfo:{
          height
        }
      } });
      if (success) router.push("/(auth)/registration/EducationAndJob");
      else setError("Error in setting height try again!");
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-bgcolor">
  <ScrollView
    className="flex-1"
    contentContainerStyle={{
      height: "100%",
    }}
  >
    <View className="h-full justify-center items-center">
    

      <View className="my-6 w-full">
        <Text className="text-textcolorII text-3xl font-ibold mb-4 text-center">
          What's your height?
        </Text>

        <CustomButton2
          title="toggle units"
          containerStyles="bg-transparent items-center mb-4"
          onPress={() => {
            if (isInch) {
              setCm(feetInchesToCm(foot, inch));
            } else {
              cmToFeetInchesStates(cm);
            }
            setIsInch((prev) => !prev);
          }}
        >
          <Text className="font-iregular underline text-textcolorII">
            Switch to {isInch ? "Centimeters" : "Foot-Inch"}
          </Text>
        </CustomButton2>

        {isInch ? (
          <View className="flex-row items-center justify-center gap-2 mb-6">
            <View className="border flex-1 border-accentI rounded text-center h-14 flex-row items-center px-2">
              <TextInput
              className="flex-1 font-iregular border-neutral p-3 rounded text-center"
              placeholder=""
              value={foot.toString()}
              onChangeText={setFoot}
              keyboardType="numeric"
              autoCapitalize="none"
              />
              <Text className="px-4 text-textcolorI/50 font-iregular text-sm">feet</Text>
            </View>
            <View className="border flex-1 border-accentI rounded text-center h-14 flex-row items-center px-2">
              <TextInput
              className="flex-1 border-neutral font-iregular p-3 rounded text-center"
              placeholder=""
              value={inch.toString()}
              onChangeText={setInch}
              keyboardType="numeric"
              autoCapitalize="none"
              />
              <Text className="px-4 text-textcolorI/50 font-iregular text-sm">inch</Text>
            </View>
            
          </View>
        ) : (
          <View className="items-center">
           <View className="border border-accentI font-iregular rounded w-1/2 text-center flex-row items-center px-2">
           <TextInput
              className="p-3 rounded text-center flex-1"
              placeholder=""
              value={cm.toString()}
              onChangeText={setCm}
              keyboardType="numeric"
              autoCapitalize="none"
            />
            <Text className="px-4 text-textcolorI/50 font-iregular text-sm">cm</Text>
           </View>
          </View>
        )}
      </View>

      <CustomButton2
        title="Next"
        containerStyles="p-4 rounded-lg bg-primary mb-4 w-full"
        onPress={handleNext}
      >
        <Text className="text-md font-isemibold text-center text-textcolorIII">
          Next
        </Text>
      </CustomButton2>

      {/* <CustomButton2
        title="Skip"
        containerStyles="p-4 rounded-lg bg-secondary mb-4 w-full"
        onPress={() => router.push("/(auth)/registration/EducationAndJob")}
      >
        <Text className="text-md font-semibold text-center text-primary">
          Skip
        </Text>
      </CustomButton2> */}
    </View>
  </ScrollView>
</SafeAreaView>

  );
};

export default HeightForm;
