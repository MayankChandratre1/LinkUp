import { CustomButton2 } from '@/components/ui/CustomButton';
import { updateUser } from '@/firebase/services/rnFirebase/db';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Gender = 'Male'| 'Female'| 'Nonbinary'| 'Other' | null

const GenderSelection = () => {
  const [selectedGender, setSelectedGender] = useState<Gender | string>(null);
  const [error, setError] = useState<string | null>(null);

  const genders = ['Male', 'Female', 'Nonbinary', 'Other'];

  const handleGenderSelect = (gender: Gender | string) => {
    setSelectedGender(gender);
    setError(null);
  };

  const handleNext = async () => {
    if (selectedGender) {
      const success = await updateUser({ user: { personalInfo: { gender: selectedGender } } });
      if (success) {
        router.push("/(auth)/registration/height");
      } else {
        setError("Error updating gender, please try again.");
      }
    } else {
      setError("Please select a gender before proceeding.");
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-bgcolor">
  <ScrollView className="flex-1 p-4"
      contentContainerStyle={{
        height: "100%",
      }}>
    <View className="h-full justify-center">
      <Text className="text-textcolorII text-xl font-ibold mb-4">You identify yourself as ?</Text>
      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      {genders.map((gender) => (
        <TouchableOpacity
          key={gender}
          className={`p-3 font-iregular mb-2 rounded-md ${selectedGender === gender ? 'bg-accentI/90' : 'border border-accentI'}`}
          onPress={() => handleGenderSelect(gender)}
        >
          <Text className={`text-center font-iregular ${selectedGender === gender ? 'text-textcolorIII font-semibold' : 'text-textcolorI'}`}>
            {gender}
          </Text>
        </TouchableOpacity>
      ))}
      <CustomButton2 title="Next" containerStyles="p-3 rounded-md bg-primary mt-4" onPress={handleNext}>
        <Text className="text-center font-isemibold text-textcolorIII">Next</Text>
      </CustomButton2>
    </View>
  </ScrollView>
</SafeAreaView>

  );
};

export default GenderSelection;
