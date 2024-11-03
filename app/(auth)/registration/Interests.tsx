import { updateUser } from '@/firebase/services/rnFirebase/db';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';

const InterestsSelection = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const interests = ['Reading', 'Traveling', 'Cooking', 'Photography', 'Fitness', 'Gardening', 'Painting', 'Music', 'Gaming', 'Hiking', 'Temples', 'Clubbing', 'Parties', 'Movies'];
  const maxSelection = 5;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        // Deselect if already selected
        return prevInterests.filter((i) => i !== interest);
      } else if (prevInterests.length < maxSelection) {
        // Select if within limit
        return [...prevInterests, interest];
      } else {
        setError(`You can select a maximum of ${maxSelection} interests.`);
        return prevInterests;
      }
    });
    setError(null);
  };

  const handleNext = async () => {
    if (selectedInterests.length > 0) {
      const success = await updateUser({ user: { interests: selectedInterests } });
      if (success) {
        router.push("/(auth)/registration/Photos");
      } else {
        setError("Error updating interests, please try again.");
      }
    } else {
      setError("Please select at least one interest before proceeding.");
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 bg-bgcolor">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="h-full justify-center">
          <Text className="text-textcolorII text-xl font-ibold mb-4">Select Interests/Hobbies</Text>
          {error && <Text className="font-iregular text-red-500 mb-2">{error}</Text>}
          <View className="flex-row flex-wrap gap-3">
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest}
                className={`p-3 mb-2 rounded-md  ${selectedInterests.includes(interest) ? 'bg-accentI' : 'border'}`}
                onPress={() => toggleInterest(interest)}
              >
                <Text className={`text-center font-iregular ${selectedInterests.includes(interest) ? 'text-textcolorIII font-semibold' : 'text-textcolorII'}`}>
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity className="p-3 bg-primary rounded-md mt-4" onPress={handleNext}>
            <Text className="text-center font-isemibold text-textcolorIII">Next</Text>
          </TouchableOpacity>
          <TouchableOpacity className="p-3 bg-accentII rounded-md mt-4" onPress={()=>{
            router.push("/(auth)/registration/Photos");
          }}>
            <Text className="text-center font-isemibold text-textcolorIII">Skip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InterestsSelection;
