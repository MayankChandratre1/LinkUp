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
    <SafeAreaView className="flex-1 p-4 bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full justify-center ">
          <Text className="text-vibrant text-md mb-4">
            Now, Let's get some numbers
          </Text>

          
          <View>
            <Text className="text-vibrant text-xl font-ibold mb-2">
              What's your height ?
            </Text>
            <CustomButton2 title="toggle units" containerStyles="bg-transparent items-start rounded-md mb-4 w-1/2" onPress={()=>{
                if(isInch){
                  setCm(feetInchesToCm(foot, inch))
                }else{
                  cmToFeetInchesStates(cm)
                }
                setIsInch(prev => !prev)
            }}>
                <Text className="font-iregular underline text-vibrant">Switch to {isInch ? "Centimeters":"Foot-Inch"}</Text>
            </CustomButton2>
            {isInch ? 
                <View className="flex-row items-center gap-2">
                <TextInput
                  className="border flex-1 border-neutral p-2 rounded"
                  placeholder="Feet"
                  value={foot.toString()}
                  onChangeText={setFoot}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
                <TextInput
                  className="border flex-1 border-neutral p-2 rounded"
                  placeholder="Inch"
                  value={inch}
                  onChangeText={setInch}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
                </View>:
                <View className="flex-row items-center gap-2">
                <TextInput
                  className="border flex-1 border-neutral p-2 mt-4 rounded"
                  placeholder="Centimeters"
                  value={cm.toString()}
                  onChangeText={setCm}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
                </View>
            }
          </View>
          
          
          <CustomButton2
            title="Create New Account"
            containerStyles="p-3 rounded-md m-2"
            onPress={handleNext}
          >
            <Text className="">Next</Text>
          </CustomButton2>
          
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={()=>{
          router.push("/(auth)/registration/EducationAndJob")
        }}>
          <Text className=''>SKip</Text>
        </CustomButton2>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HeightForm;
