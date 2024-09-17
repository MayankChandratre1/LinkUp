import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/ui/SearchBar'

const PickerList = ({data, setValue, onEndReached, setFilterParent, setShow}:{
  data:string[],
  setValue: (text:string) => void,
  setShow: (value:boolean) => void,
  setFilterParent: (text:string) => void,
  onEndReached?: ((info: {
    distanceFromEnd: number;
}) => void)
}) => {
  const [filter, setFilter] = useState('')
  const [filteredData, setFilteredData] = useState<string[]>(data)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const filterData = () => {
      const newData =  data.filter(label => {
        if(match(filter, label)){
          return label
        }
      }) 
      return newData
  }

  const match = (filter:string, label:string) => {
    const cleanString = (str: string) =>
      str.toLowerCase().replace(/[^\w\s.]/g, '');
  
    // Clean both filter and label
    const cleanedFilter = cleanString(filter);
    const cleanedLabel = cleanString(label);
  
    // Split the cleaned filter into words
    const filterWords = cleanedFilter.split(' ').filter(word => word.trim() !== '');
  
    // Check if every word in the filter is present in the label
    return filterWords.every(word => cleanedLabel.includes(word));
  }

  // useEffect(()=>{
  //   const timeout = setTimeout(()=>{
  //     const newData = filterData()
  //     setFilteredData(newData)
  //   },500)

  //   return () => {
  //     clearTimeout(timeout)
  //   }
  // },[filter])

  useEffect(()=>{
    if(data.length > 0){
      console.log("Data is loaded");
      
      setLoading(false)
    }else{
      setLoading(true)
    }
    setFilteredData(data)
  },[data])

  const onEndofList = async () => {
      setLoadingMore(true)
      if(onEndReached)
        await onEndReached({distanceFromEnd:0})
      setLoadingMore(false)
  }

  return (
    <View className=' w-full h-4/5 items-center z-20 px-3' style={centerStyle.container}>
      <View className=' w-full bg-primary border rounded-md px-3 pb-5 pt-2 h-[500px]'>
        <View className='items-end mb-3'>
          <TouchableOpacity className='p-2' onPress={()=>{
            setShow(false)
          }}><Text className='font-ilight text-xl'>X</Text></TouchableOpacity>
        </View>
        <SearchBar onChangeText={(text)=>{
          setFilter(text)
          setFilterParent(text)
        }} value={filter} />
        {!loading && <FlatList
          data={filteredData}
          renderItem={({item}) => <PickerItem setValue={setValue} label={item} />}
          keyExtractor={item => item}
          showsVerticalScrollIndicator={false}
          className='mb-5'
          onEndReached={onEndReached}
          />}
          {loading && filter && <ActivityIndicator className='my-2' />}
      </View>
    </View>
  )
}

const centerStyle = StyleSheet.create({
   container: {
        position:"absolute",
        top:"50%",
        transform:[{ translateY: -200 }]
   }
}) 

const PickerItem = ({label, setValue}:{
  label:string,
  setValue: (text:string) => void
}) => {
    return (
      <TouchableOpacity className='p-3 bg-primary mt-2 shadow-lg rounded-md' onPress={()=>{
        setValue(label)
      }}>
        <Text className='font-iregular'>{label}</Text>
      </TouchableOpacity>
    )
}


export default PickerList