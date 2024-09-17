import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllUsers, getCollegeList, getCollegeListPaged, getCurrentUserInfo, getFilteredCollegeList, updateUser } from '@/firebase/services/rnFirebase/db';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { CustomButton2 } from '@/components/ui/CustomButton';
import { router } from 'expo-router';
import PickerList from '@/components/ui/Picker/PickerList';

const EducationAndJob = () => {
  const [education, setEducation] = useState('');
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
          education: education.trim(),
          college: college.trim()
        }
      } })
      await updateUser({ user: {
        isNewProfile:false
      } })
      if(success)
        
        router.push("/(auth)/registration/Addresses")
      else
        setError("Error in setting name try again!")
    }else{
      
    }
  }


  return (
    <SafeAreaView className='flex-1  bg-primary '>
      <ScrollView className="flex-1 p-4" contentContainerStyle={{
        height:'100%',
      }}>
      
        <View className="h-full justify-center ">
        <Text className="text-vibrant text-md mb-4">Let's get professional now...</Text>
        <Text className="text-vibrant text-xl font-ibold mb-4">What is your education and college?</Text>
        {error && <Text className='text-red-500'>{error}</Text>}

        <Text className='font-iregular text-vibrant'>Education</Text>
        <TextInput
          className="border border-neutral p-2 mb-4 rounded"
          placeholder="M.Tech. CSE"
          value={education}
          onChangeText={handleChange}
          autoCapitalize="none"
        />

        <Text className='font-iregular text-vibrant'>College</Text>
        <View>
          <CustomButton2 title='college-picker' containerStyles='bg-transparent items-start my-2' onPress={()=>{
            setShow(true)
          }}>
              <Text className='p-3 font-iregular'>{college || "Choose a college"}</Text>
          </CustomButton2>
        </View>
      
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={handleNext}>
          <Text className=''>Next</Text>
        </CustomButton2>
        <CustomButton2 title='Create New Account' containerStyles='p-3 rounded-md m-2' onPress={()=>{
          router.push("/(auth)/registration/Addresses")
        }}>
          <Text className=''>SKip</Text>
        </CustomButton2>
        </View>
        
      </ScrollView>
      {show && <PickerList  setShow={setShow} setFilterParent={setFiltercity} onEndReached={handleEndOfList} setValue={(text) => {
        setCollege(text)
        setShow(false)
      }} data={data} />}
    </SafeAreaView>
  );
}

export default EducationAndJob