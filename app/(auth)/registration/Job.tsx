import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllUsers, getCollegeList, getCollegeListPaged, getCurrentUserInfo, getFilteredCollegeList, updateUser } from '@/firebase/services/rnFirebase/db';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { router } from 'expo-router';
import PickerList from '@/components/ui/Picker/PickerList';
import EducationPicker from '@/components/ui/Registration/EducationPicker';

const Job = () => {
  const [designation, setDesignation] = useState('');
  const [company, setCompany] = useState('');
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
      setDesignation(name)
  }

  const handleNext = async () => {
    if(designation.trim() && company.trim()){
      const success = await updateUser({ user: {
        professionalInfo:{
          current_job: company.trim() ?designation.trim()+ ", "+company.trim() : designation.trim(),
        }
      } })
      await updateUser({ user: {
        isNewProfile:false
      } })
      if(success)
        
        router.push("/(auth)/registration/Interests")
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
        <Text className="text-textcolorII text-3xl font-ibold mb-6 text-center">
          What do you do for living ?
        </Text>
  
        {error && <Text className="text-red-500 mb-2">{error}</Text>}
  
        <View className="mb-4">
          <Text className="font-iregular text-textcolorII mb-1">Designation</Text>
          <TextInput
            className="border border-neutral p-3 rounded text-md font-iregular mt-2"
            placeholder="e.g. Senior Developer"
            value={designation}
            onChangeText={setDesignation}
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="font-iregular text-textcolorII mb-1">Company</Text>
          <TextInput
            className="border border-neutral p-3 rounded text-md font-iregular mt-2"
            placeholder="e.g. ABC Pvt limited"
            value={company}
            onChangeText={setCompany}
            autoCapitalize="none"
          />
        </View>
        
       
  
        <CustomButton2
          title="Next"
          containerStyles="p-4 rounded-lg bg-primary mb-4 w-full"
          onPress={handleNext}
        >
          <Text className="text-md font-semibold text-center text-textcolorIII">
            Next
          </Text>
        </CustomButton2>
  
        <CustomButton2
          title="Skip"
          containerStyles="p-4 rounded-lg bg-accentII mb-4 w-full"
          onPress={() => router.push("/(auth)/registration/Interests")}
        >
          <Text className="text-md font-semibold text-center text-textcolorIII">
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

export default Job