import React, { useEffect, useRef, useState } from "react";
import { View, TextInput, Text, ScrollView, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { CustomButton2 } from "@/components/ui/CustomButton";
import { updateUser } from "@/firebase/services/rnFirebase/db";

// const DobAndHeightForm = () => {
//   const [date, setDate] = useState<Date>(new Date("2002-02-29"));
//   const [day, setDay] = useState('')
//   const [month, setMonth] = useState('')
//   const [year, setYear] = useState('')
//   const [height, setHeight] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (input:string) => {
//       setDate(new Date(input))
//   }
//   const handleDayChange = (day:string) => {
//       if(month == '02' && Number(day) > 29){

//       }
//   }
//   const handleMonthChange = (input:string) => {

//   }
//   const handleYearChange = (input:string) => {

//   }

//   const handleNext = async () => {
//     if(date){
//       const success = await updateUser({ user: {name:date.toDateString()} })
//       if(success)
//         router.push("/(auth)/registration/Photos")
//       else
//         setError("Error in setting name try again!")
//     }
//   }

//   return (
//     <SafeAreaView className='flex-1 p-4 bg-primary'>
//       <ScrollView className="flex-1" contentContainerStyle={{
//         height:'100%',
//       }}>

//         <View className="h-full justify-center ">
//         <Text className="text-vibrant text-md mb-4">Let's start simple...</Text>
//         <Text className="text-vibrant text-xl font-ibold mb-4">What is your name?</Text>
//         {error && <Text className='text-red-500'>{error}</Text>}

//         <TextInput
//           className="border border-neutral p-2 mb-4 rounded"
//           placeholder="Name"
//           value={date.toDateString()}
//           onChangeText={handleChange}
//           autoCapitalize="none"
//         />

//         <View className='flex-row gap-4'>
//             <TextInput
//               className="border border-neutral p-4 mb-4 rounded"
//               placeholder="01"
//               value={day}
//               onChangeText={handleDayChange}
//               autoCapitalize="none"
//             />
//             <TextInput
//               className="border border-neutral p-4 mb-4 rounded"
//               placeholder="12"
//               value={month}
//               onChangeText={handleMonthChange}
//               autoCapitalize="none"
//             />
//             <TextInput
//               className="border border-neutral p-4 mb-4 rounded"
//               placeholder="2006"
//               value={year}
//               onChangeText={handleYearChange}
//               autoCapitalize="none"
//             />
//         </View>

//         <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={handleNext}>
//           <Text className=''>Next</Text>
//         </CustomButton2>
//         <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={()=>{
//           router.push("/(auth)/registration/Photos")
//         }}>
//           <Text className=''>SKip</Text>
//         </CustomButton2>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

const DobAndHeightForm = () => {
  const [date, setDate] = useState(new Date("2008-01-01"));
  const [error, setError] = useState("");
  const [isValidAge, setIsValidAge] = useState(true);
  const [age, setAge] = useState(0);
  const [height, setHeight] = useState("");
    useEffect(()=>{
        if(age < 18) setIsValidAge(false)
          else setIsValidAge(true)
    },[age])
  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (currentDate) {
        setDate(currentDate);
        setAge(calculateAge(currentDate))
    }
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };


  const dateSTringFormatter = (date: string) => {
    const elements = date.split(" ");
    elements.shift();
    return elements.join(" ");
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

  const handleNext = async () => {
    if (date &&  age >= 18) {
      const success = await updateUser({ user: {
        personalInfo:{
          age:age.toString(),
          dateOfBirth:date
        }
      } });
      if (success) router.push("/(auth)/registration/height")
      else setError("Error in setting name try again!");
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

          {error && <Text className="text-red-500">{error}</Text>}
          <View className="my-5 ">
            <Text className="text-vibrant text-xl font-ibold mb-4">
              How Old are you ?
            </Text>
            <Text className="text-center text-secondary">
              You are{" "}
              <Text className="font-isemibold text-vibrant/70">
                {calculateAge(date)} Years old!
              </Text>{" "}
            </Text>
            <CustomButton2
              title="Create New Account"
              containerStyles="p-3 rounded-md m-2"
              onPress={showDatepicker}
            >
              <Text className="">
                <Text className="text-lg text-center font-ibold text-vibrant mb-3">
                  {dateSTringFormatter(date.toDateString())}
                </Text>
              </Text>
            </CustomButton2>
          </View>
      
          

          {isValidAge ? <CustomButton2
            title="Create New Account"
            containerStyles="p-3 rounded-md m-2"
            onPress={handleNext}
          >
            <Text className="">Next</Text>
          </CustomButton2>:<Text className="text-center text-red-400">You must be  atleast 18 year old to use this app</Text>}
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={()=>{
          router.push("/(auth)/registration/height")
        }}>
          <Text className=''>SKip</Text>
        </CustomButton2>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DobAndHeightForm;
