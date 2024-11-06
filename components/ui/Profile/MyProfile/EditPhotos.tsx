import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { User } from '@/types/userTypes';
import { Address, DateOfBirth, Education, Gender, Height, Interests, Name, ProfilePic } from '../../Registration/RegistrationForm';
import { CustomButton2 } from '../../CustomButton';
import { router } from 'expo-router';
import { updateUser } from '@/firebase/services/rnFirebase/db';
import { uploadImage } from '@/firebase/services/rnFirebase/storage';
import { FontAwesome6 } from '@expo/vector-icons';

const EditPhotos = ({close, userData}:{
  close: () => void,
  userData: Partial<User>
}) => {
  const [user, setUser] = useState<Partial<User>>(userData);
  const [profilePics, setProfilePics] = useState<string[]>([])
  const [error, setError] = useState<any | null>({
    name: false,
    bio: false,
    photos: false,
    dateOfBirth: false,
    current_address: false,
    interests: false,
    gender: false,
    height: false,
    education: false,
    job: false,
  });


  const checkFields = () => {
    setError({
      name: false,
      bio: false,
      photos: false,
      dateOfBirth: false,
      current_address: false,
      interests: false,
      gender: false,
    });

    if (!user.name) {
      setError({ ...error, name: true });
      return false;
    }
    if (!user.bio) {
      setError({ ...error, bio: true });
      return false;
    }
    if (
      !user.personalInfo?.dateOfBirth ||
      calculateAge(new Date(user.personalInfo?.dateOfBirth.nanoseconds)) < 18
    ) {
      setError({ ...error, dateOfBirth: true });
      return false;
    }
    if (!user.personalInfo?.current_address) {
      setError({ ...error, current_address: true });
      return false;
    }
    if (!user.interests) {
      setError({ ...error, interests: true });
      return false;
    }
    if (!user.personalInfo.gender) {
      setError({ ...error, gender: true });
      return false;
    }
    return true;
  };

  const save = async () => {
    if (!checkFields()) {
      return;
    }
    console.log("Saving user data:", user);
    // Save user data to database
    const pics = await uploadProfilePics();
    if (pics) {
        const res = await updateUser({
            user: {
              ...user,
              profile_pic: pics[0],
              photos: pics,
            },
          });
          close()
          console.log("User data saved:", res);
    }
}
  
    const uploadProfilePics = async () => {
        try {
          if (profilePics.length === 0) {
            return null;
          }
          const urls = await Promise.all(
            profilePics.map(async (image) => {
              const response = await fetch(image);
              const blob = await response.blob();
              return await uploadImage(blob);
            })
          );
          return urls;
        } catch (err) {
          console.error("Error uploading images:", err);
          return null;
        }
      };

 

  function calculateAge(dob: Date) {
    // Parse the input string to create a Date object

    if (isNaN(dob.getTime())) {
      throw new Error("Invalid date format. Please use 'MMM DD YYYY'.");
    }

    // Get the current date
    const today = new Date();

    // Calculate the age in years
    let age = today.getFullYear() - dob.getFullYear();

    // If the birth date hasn't occurred yet this year, subtract one from the age
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  }


  

  return (
    <View className='w-full px-3'>
       <View className='absolute top-0 right-0 z-10'>
            <CustomButton2 title={"Edit"} onPress={()=>{
              close()
            }} containerStyles='flex-row items-center'>
                <Text className='text-textcolorIII font-isemibold mr-2'>Cancel</Text>
              
            </CustomButton2>
            </View>
     {error.photos && (
        <Text className="text-red-500 font-iregular mb-2">
          At least one photo is required
        </Text>
      )}
      <ProfilePic
        setProfilePic={(pics) => {
          setProfilePics(pics);
        }}
        existingValue={user.photos || []}
      />

<CustomButton2
          title="Save"
          containerStyles="bg-primary p-4 px-4 mt-4"
          onPress={save}
        >
          <Text className="text-textcolorIII font-isemibold">
            Save
          </Text>
        </CustomButton2>

    </View>
  )
}

export default EditPhotos