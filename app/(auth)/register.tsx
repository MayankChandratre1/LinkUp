import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, ScrollView, Button, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addUser, updateUser } from '@/firebase/services/rnFirebase/db';
import { User } from '@/types/userTypes';
import { uploadImage } from '@/firebase/services/rnFirebase/storage'; // Assuming your uploadImage function is in this path
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { getCurrentUser } from '@/firebase/services/rnFirebase/auth';

const RegisterForm = () => {
  const [email, setEmail] = useState<string>("")


  const [user, setUser] = useState<Partial<User>>({
    name: '',
    profile_pic: '',
    isProfilePicVerified: false,
    personalInfo: {
      age: '',
      relegion: '',
      home_address: '',
      current_address: '',
      height: '',
      languages: []
    },
    isPersonalInfoVerified: false,
    professionalInfo: {
      education: '',
      profession: '',
      current_job: ''
    },
    interests: [],
    images: [],
    isProfileVerified: false
  });

  const [image, setImage] = useState<string | null>(null);

  

  const handleInputChange = (field: any, value: any) => {
    setUser({ ...user, [field]: value });
  };

  const handlePersonalInfoChange = (field: any, value: any) => {
    setUser({ 
      ...user, 
      personalInfo: { ...user.personalInfo, [field]: value }
    });
  };

  const handleProfessionalInfoChange = (field: any, value: any) => {
    setUser({ 
      ...user, 
      professionalInfo: { ...user.professionalInfo, [field]: value }
    });
  };

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
      return url
    } else {
      console.error('No image selected');
    }
  };

  const handleRegister = async () => {
  
      const url = await uploadProfilePic();
      setUser({...user, profile_pic:url || "No Url"})
      const data  = {...user, profile_pic:url || "No Url"}
      updateUser({user:data});
    
    router.push("/(tabs)/profiles")
  };

  return (
    <SafeAreaView className='flex-1 p-4 bg-primary'>
      <ScrollView className="h-full">
        <Text className="text-vibrant text-xl mb-4">Register</Text>

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="ID"
          value={user.id}
          onChangeText={(text) => handleInputChange('id', text)}
        />
        
        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Name"
          value={user.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />

        {/* <TouchableOpacity onPress={pickImage} className="mb-4">
          <Text className="text-secondary">Pick Profile Picture</Text>
        </TouchableOpacity>

        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }} />} */}

        <Text className="text-secondary text-lg mb-2">Personal Information</Text>

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Age"
          value={user.personalInfo?.age}
          onChangeText={(text) => handlePersonalInfoChange('age', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Religion"
          value={user.personalInfo?.relegion}
          onChangeText={(text) => handlePersonalInfoChange('relegion', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Home Address"
          value={user.personalInfo?.home_address}
          onChangeText={(text) => handlePersonalInfoChange('home_address', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Current Address"
          value={user.personalInfo?.current_address}
          onChangeText={(text) => handlePersonalInfoChange('current_address', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Height"
          value={user.personalInfo?.height}
          onChangeText={(text) => handlePersonalInfoChange('height', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Languages (comma-separated)"
          value={user.personalInfo?.languages?.join(', ')}
          onChangeText={(text) => handlePersonalInfoChange('languages', text.split(',').map(lang => lang.trim()))}
        />

        <Text className="text-secondary text-lg mb-2">Professional Information</Text>

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Education"
          value={user.professionalInfo?.education}
          onChangeText={(text) => handleProfessionalInfoChange('education', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Profession"
          value={user.professionalInfo?.profession}
          onChangeText={(text) => handleProfessionalInfoChange('profession', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Current Job"
          value={user.professionalInfo?.current_job}
          onChangeText={(text) => handleProfessionalInfoChange('current_job', text)}
        />

        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="Interests (comma-separated)"
          value={user.interests?.join(', ')}
          onChangeText={(text) => handleInputChange('interests', text.split(',').map(interest => interest.trim()))}
        />
        <Button title="Register" color="#7743DB" onPress={handleRegister} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterForm;
