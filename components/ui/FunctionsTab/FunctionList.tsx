import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FunctionCard from './FunctionCard'
import { clearPersistence } from '@react-native-firebase/firestore'
import { FunctionType } from '@/types/functionTypes'

const FunctionList = ({data, category, filter}:{
    data:Partial<FunctionType>[],
    category?:string,
    filter?:string
}) => {
  const [filteredData, setFilteredData] = useState(data)
  
  
  useEffect(()=>{
    const timeout = setTimeout(()=>{
        if(filter && filter.length > 0){
            const new_data = data.filter(func => func.title?.toLowerCase().includes(filter.toLowerCase()) || func.desc?.toLowerCase().includes(filter.toLowerCase()))
            setFilteredData(new_data)    
        }
    },800)

    return ()=>{
        clearTimeout(timeout)
    }
  },[filter])

  useEffect(()=>{
    if(category != 'All' && filter == ''){
        const new_data = data.filter(func => func.category == category)
        setFilteredData(new_data)    
    }else{
        setFilteredData(data)
    }
  },[category, filter])

  useEffect(()=>{
    if(category === 'All' || !category)
    setFilteredData(data)
  }, [data])
  return (
    <View className='p-3 mb-[310px]'>
      <FlatList 
        data={filteredData}
        keyExtractor={(item)=> item.id || "key"}
        renderItem={({item})=> <FunctionCard  function_item={item} />}
        className='h-full'
        initialNumToRender={7}
        windowSize={5}
      />
    </View>
  )
}

export default FunctionList