import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/firebase/services/rnFirebase/storage";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton2 } from "@/components/ui/CustomButton";
import { updateUser } from "@/firebase/services/rnFirebase/db";
import { router } from "expo-router";
const Photos = () => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadProfilePic = async () => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = await uploadImage(blob);
      return url;
    } else {
      console.error("No image selected");
    }
  };

  const handleNext = async () => {
    const url = await uploadProfilePic();
    if(url){
        const success = await updateUser({user:{profile_pic:url}})
        if(success)
            router.push("/(auth)/registration/dobAndHeight")
        else 
            setError("Error while setting image, Try again!")
    }else{
        setError("Can't upload this image try another")
    }
  }
  return (
    <SafeAreaView className="flex-1 p-4 bg-primary">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="h-full justify-center">
        <Text className="text-vibrant text-xl font-ibold mb-4">Let people see how you look</Text>
        <Text className="text-vibrant text-md mb-4">Upload A profile picture with your face</Text>
        {error && <Text className='text-red-500'>{error}</Text>}
          <TouchableOpacity
            onPress={pickImage}
            className="mb-4 bg-primary border-2 w-10 h-10 justify-center items-center rounded-lg"
          >
            <Text className="">+</Text>
          </TouchableOpacity>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 10,
              }}
            />
          )}
          <CustomButton2 title="upload" containerStyles='p-3 rounded-md m-2' onPress={handleNext}>
            <Text>Upload</Text>
          </CustomButton2>
          <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={()=>{
          router.push("/(auth)/registration/dobAndHeight")
        }}>
          <Text className=''>SKip</Text>
        </CustomButton2>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Photos;
