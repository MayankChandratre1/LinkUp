import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/firebase/services/rnFirebase/storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton2 } from "@/components/ui/CustomButton";
import { updateUser } from "@/firebase/services/rnFirebase/db";
import { router } from "expo-router";

const Photos = () => {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (images.length >= 5) {
      setError("Maximum of 5 photos allowed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImages([...images, result.assets[0].uri]);
      setError(''); // Clear any existing errors
    }
  };

  const uploadProfilePics = async () => {
    try {
      const urls = await Promise.all(
        images.map(async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();
          return await uploadImage(blob);
        })
      );
      return urls;
    } catch (err) {
      console.error("Error uploading images:", err);
      setError("Failed to upload images. Please try again.");
      return null;
    }
  };

  const handleNext = async () => {
    setLoading(true);
    const urls = await uploadProfilePics();
    if (urls) {
      const success = await updateUser({ user: { photos: urls } });
      if (success) {
        router.push("/(auth)/registration/Gender");
      } else {
        setError("Error while setting images, please try again.");
      }
    }
    setLoading(false);
  };

  const removeImage = (uri: string) => {
    setImages(images.filter((image) => image !== uri));
  };

  return (
    <SafeAreaView className="flex-1 bg-bgcolor px-7 justify-center">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ height: "100%" }}
      >
        <View className="h-full justify-center items-center">
          <Text className="text-textcolorII text-3xl font-ibold mb-4 text-center">
            Let people see how you look
          </Text>
          <Text className="text-textcolorII text-lg font-iregular mb-6 text-center">
            Upload up to 5 profile pictures
          </Text>

          {error && <Text className="text-red-500 mb-2">{error}</Text>}

          <TouchableOpacity
            onPress={pickImage}
            className="mb-6 bg-accent border-2 w-16 h-16 justify-center items-center rounded-full"
          >
            <Text className="text-3xl text-black flex justify-center items-center font-mono">
              +
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {images.map((uri, index) => (
              <View key={index} style={{ position: 'relative', margin: 5 }}>
                <Image
                  source={{ uri }}
                  style={{ width: 80, height: 80, borderRadius: 10 }}
                />
                <TouchableOpacity
                  onPress={() => removeImage(uri)}
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    borderRadius: 15,
                    padding: 5,
                  }}
                  className="bg-accentII"
                >
                  <Text className="text-center font-iregular w-5 h-5" >X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <CustomButton2
            title="Upload"
            containerStyles="p-4 rounded-lg bg-primary mb-4 w-full"
            onPress={handleNext}
          >
            <Text className="text-md font-isemibold text-center text-textcolorIII">
              {loading ? "Uploading..." : "Upload"}
            </Text>
          </CustomButton2>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Photos;
