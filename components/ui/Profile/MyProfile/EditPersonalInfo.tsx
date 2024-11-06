import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { User } from '@/types/userTypes';
import { Address, Bio, DateOfBirth, Gender, Height, Name } from '../../Registration/RegistrationForm';
import { CustomButton2 } from '../../CustomButton';
import { router } from 'expo-router';
import { updateUser } from '@/firebase/services/rnFirebase/db';

const EditPersonalInfo = ({close, userData}:{
  close: () => void,
  userData: Partial<User>
}) => {
  const [user, setUser] = useState<Partial<User>>(userData);
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
      const res = await updateUser({
        user: {
          ...user,
          personalInfo: {
            ...user.personalInfo,
          },
          isNewProfile: false,
        },
      });
      close()
      console.log("User data saved:", res);
    }
  


 

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
    <View>
      <View className='absolute top-2 right-0 z-10'>
            <CustomButton2 title={"Edit"} onPress={()=>{
              close()
            }} containerStyles='flex-row items-center'>
                <Text className='text-red-500 font-isemibold mr-2'>Cancel</Text>
              
            </CustomButton2>
            </View>
      {
        error.name && <Text>Name is required</Text>
      }
      <Name setName={(name)=>{
        setUser({...user, name})
      }} 
        existingValue={user.name || ""}
      />
       {error.bio && (
        <Text className="text-red-500 font-iregular mb-2">Bio is required</Text>
      )}
      <Bio
        setBio={(bio) => {
          setUser({ ...user, bio });
        }}
        existingValue={user.bio || ""}
      />
      {
        error.gender && <Text>Select valid Gender</Text>
      }
      <Gender setGender={(gender)=>{
        setUser({...user, personalInfo:{
          ...user.personalInfo, gender
        }})
      }} 
        existingValue={user.personalInfo?.gender || ""}
      />
      {
        error.dateOfBirth && <Text>Age must be 18+</Text>
      }
      <DateOfBirth setDob={(dateOfBirth)=>{
        setUser({...user, personalInfo:{
          ...user.personalInfo, dateOfBirth
        }})
      }}
        existingValue={user.personalInfo?.dateOfBirth || null}
       />
      {
        error.current_address && <Text>Current Address is required</Text>
      }
      <Address setAddress={(current_address)=>{
        setUser({...user, personalInfo:{
          ...user.personalInfo, current_address
        }})
      }} 
      existingValue={user.personalInfo?.current_address || ""}
      />
      {
        error.height && <Text>Height is required</Text>
      }
      <Height setHeight={(height)=>{
        setUser({...user, personalInfo:{
          ...user.personalInfo, height
        }})
      }} 
      existingValue={user.personalInfo?.height || ""}
      />

<CustomButton2
          title="Save"
          containerStyles="bg-primary p-4 px-4 mt-4"
          onPress={save}
        >
          <Text className="text-textcolorIII font-isemibold">
            Save & Continue
          </Text>
        </CustomButton2>

    </View>
  )
}

export default EditPersonalInfo