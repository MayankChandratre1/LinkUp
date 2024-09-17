import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import Stories from '@/components/ui/FunctionsTab/Stories'
import PrimaryHeader from '@/components/ui/Header/PrimaryHeader'
import SearchBar from '@/components/ui/SearchBar'
import { functions_data } from '@/util/demo-data'
import FunctionList from '@/components/ui/FunctionsTab/FunctionList'

const functions = () => {
  const [activeCat, setActiveCat] = useState('Pubs');
  const [functionItems, setFunctionItems] = useState([]);
  const [filter, setFilter] = useState("")

  const changeCat = (name: string) => {
      setActiveCat(name)
  }

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
        <Text className='text-black text-xl font-ibold px-3 mt-4 mb-3'>{activeCat}</Text>
        <FunctionList data={functions_data} category={activeCat} filter={filter} />
    </SafeAreaView>
    </>
  )
}

export default functions