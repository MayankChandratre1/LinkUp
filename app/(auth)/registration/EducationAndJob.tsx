import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllUsers, getCollegeList, getCollegeListPaged, getCurrentUserInfo, getFilteredCollegeList, updateUser } from '@/firebase/services/rnFirebase/db';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { router } from 'expo-router';
import PickerList from '@/components/ui/Picker/PickerList';
import EducationPicker from '@/components/ui/Registration/EducationPicker';
import CollegePicker from '@/components/ui/Registration/CollegePicker';

const EducationAndJob = () => {
  const [education, setEducation] = useState('');
  const [field, setField] = useState('');
  const [error, setError] = useState('');
  const [college, setCollege] = useState('')
  const [filtercity, setFiltercity] = useState('No city')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<string[]>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
  
  useEffect(()=>{
    if(show){
      setLoading(true)
      const Timeout = setTimeout(()=>{
        console.log(filtercity);
        
        getCollegeListPaged(filtercity,lastDoc).then(({collegeObjects, last})=>{
          console.log(collegeObjects);
          const names = collegeObjects?.map(clg => clg.college+" - "+clg.city+", "+clg.state)
          setLastDoc(last)
          if(names){
            setData(names)
            setCollege(names[0])
          }
          setLoading(false)
        })
        },1000)
  
      return ()=>{
        clearTimeout(Timeout)
      }
    }
  },[filtercity])

  const handleEndOfList = () => {
    getCollegeListPaged(filtercity,lastDoc).then(({collegeObjects, last})=>{
      console.log("LAST DOC: \n")
      console.log(collegeObjects);
      const names = collegeObjects?.map(clg => clg.college+" - "+clg.city+", "+clg.state)
      setLastDoc(last)
      if(names)
      setData([...data,...names])
    })
  }


  const handleChange = (name:string) => {
      setEducation(name)
  }

  const handleNext = async () => {
    if(education.trim() && college.trim()){
      const success = await updateUser({ user: {
        professionalInfo:{
          education: field.trim() ?education.trim()+ ", "+field.trim() : education.trim(),
          college: college.trim()
        }
      } })
      await updateUser({ user: {
        isNewProfile:false
      } })
      if(success)
        
        router.push("/(auth)/registration/City")
      else
        setError("Error in setting name try again!")
    }else{
      
    }
  }


  return (
    <SafeAreaView className="flex-1 bg-bgcolor">
    <ScrollView
      className="flex-1 p-4"
      contentContainerStyle={{
        height: "100%",
      }}
    >
      <View className="h-full justify-center">
        <Text className="text-textcolorII text-3xl font-ibold mb-4 text-center">
          Let's get professional now...
        </Text>
        <Text className="text-textcolorII text-lg font-iregular mb-6 text-center">
          What is your education and college?
        </Text>
  
        {error && <Text className="text-red-500 mb-2">{error}</Text>}
  
        <View className="mb-4">
          
          <EducationPicker setValue={setEducation} />
          
        </View>
        
        <View className="mb-6">
       
          {/* <CustomButton2
            title="college-picker"
            containerStyles="bg-transparent items-start mb-4"
            onPress={() => setShow(true)}
          >
            <Text className="p-3 text-lg font-iregular text-textcolorII/70">
              {college || "Choose a college"}
            </Text>
          </CustomButton2> */}
          <CollegePicker setValue={setCollege} />
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
  
        <CustomButton2
          title="Skip"
          containerStyles="p-4 rounded-lg bg-accentII mb-4 w-full"
          onPress={() => router.push("/(auth)/registration/City")}
        >
          <Text className="text-md font-isemibold text-center text-textcolorIII">
            Skip
          </Text>
        </CustomButton2>
      </View>
    </ScrollView>
  
    {show && (
      <PickerList
        setShow={setShow}
        setFilterParent={setFiltercity}
        onEndReached={handleEndOfList}
        setValue={(text) => {
          setCollege(text);
          setShow(false);
        }}
        data={data}
      />
    )}
  </SafeAreaView>
  
  );
}

export default EducationAndJob