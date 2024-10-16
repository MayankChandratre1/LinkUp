import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import Stories from '@/components/ui/FunctionsTab/Stories'
import PrimaryHeader from '@/components/ui/Header/PrimaryHeader'
import SearchBar from '@/components/ui/SearchBar'
import { functions_data } from '@/util/demo-data'
import FunctionList from '@/components/ui/FunctionsTab/FunctionList'
import { Entypo } from '@expo/vector-icons'
import UserList from '@/components/ui/FunctionsTab/UserList'
import { getFilteredFunctionsList } from '@/firebase/services/rnFirebase/db'
import { FunctionType } from '@/types/functionTypes'
import { useFocusEffect } from 'expo-router'
import ByPeopleList from '@/components/ui/FunctionsTab/ByPeopleList'

const functions = () => {
  const [activeCat, setActiveCat] = useState('All');
  const [functionItems, setFunctionItems] = useState<Partial<FunctionType>[]>([]);
  const [filter, setFilter] = useState("")
  const [sortByPeople, setSortByPeople] = useState(false)
  
  

  const getFunc = async (filter?: string) => {
    try {
      const func_items = await getFilteredFunctionsList(filter);
      if (func_items) {
        setFunctionItems(func_items);
      }
    } catch (error) {
      console.error('Error fetching function items:', error);
    }
  };

  // Initial load hen the component is first mounted
  useEffect(() => {
    getFunc(); // Fetch data when the page loads for the first time
  }, [filter]); // Empty dependency array for initial load

  // Revalidate when the page gains focus
  useFocusEffect(
    useCallback(() => {
      getFunc(); // Fetch data when the screen comes into focus
    }, [])
  );

  const users = [
    {
      id: "1",
      displayName: "All",
      photoURL: "https://res.cloudinary.com/dvsl1aslo/image/upload/v1725545113/images_vtdru0.png"
    },
    {
      id: "2",
      displayName: "Pubs",
      photoURL: "https://res.cloudinary.com/dvsl1aslo/image/upload/v1725545113/images_vtdru0.png"
    },
    {
      id: "3",
      displayName: "Salon",
      photoURL: "https://res.cloudinary.com/dvsl1aslo/image/upload/v1725545113/images_vtdru0.png"
    },
    // {
    //   id: "4",
    //   displayName: "Travel",
    //   photoURL: "https://res.cloudinary.com/dvsl1aslo/image/upload/v1725545113/images_vtdru0.png"
    // },
    // {
    //   id: "5",
    //   displayName: "Dinner",
    //   photoURL: "https://res.cloudinary.com/dvsl1aslo/image/upload/v1725545113/images_vtdru0.png"
    // },
    // {
    //   id: "6",
    //   displayName: "Cafe",
    //   photoURL: "https://res.cloudinary.com/dvsl1aslo/image/upload/v1725545113/images_vtdru0.png"
    // },
    // {
    //   id: "7",
    //   displayName: "Sport",
    //   photoURL: "https://res.cloudinary.com/dvsl1aslo/image/upload/v1725545113/images_vtdru0.png"
    // }
  ];
  
  

  return (
    <>
      <PrimaryHeader />
    <SafeAreaView className="h-full bg-primary ">
        <SearchBar onChangeText={setFilter} value={filter}  />
        <Stories setValue={setActiveCat} activeCat={activeCat} users={users} />
       <View className='flex-row items-center justify-between'>
          <Text className='text-black text-xl font-ibold px-3 mt-4 mb-3'>{activeCat}</Text>
          <TouchableOpacity 
            onPress={()=>{
              setSortByPeople(prev => !prev)
              
            }}
            className='px-3 flex-row items-center'>
            <Text className='font-iregular text-sm mr-2 text-vibrant'>
              {
                sortByPeople ? "By People":"By Location"
              }
            </Text>
            <Entypo name="select-arrows" size={18} color="black" />
          </TouchableOpacity >
       </View>
        {
          !sortByPeople ? <FunctionList data={functionItems} category={activeCat} filter={filter} /> : <ByPeopleList />
        }
    </SafeAreaView>
    </>
  )
}

export default functions