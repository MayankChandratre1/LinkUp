import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { CustomButton2 } from './CustomButton'

const SearchBar = ({onChangeText, value}:{
    onChangeText?:((text:string) => void),
    value?:string
}) => {
  return (
    <View className='px-2'>
      <View className='px-2 pr-3 py-1 flex-row items-center border rounded-lg'>
      <TextInput
            onChangeText={onChangeText}
            value={value}
            placeholder='Search'
            className='bg-primary flex-1 font-iregular shadow-lg text-lg p-2 rounded-md '
      />
      <CustomButton2 title='search-button' containerStyles='bg-primary '>
       <AntDesign name='search1' size={24} className='' />
      </CustomButton2>
      </View>
    </View>
  )
}

export default SearchBar