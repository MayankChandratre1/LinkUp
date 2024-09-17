import { View, Text, FlatList, Image, GestureResponderEvent } from 'react-native'
import React from 'react'
import { Logo } from '@/constants/Images'
import { CustomButton2 } from '../CustomButton'

const Stories = ({users, activeCat, onPress, setValue}:{
  users:{
    id:string,
    displayName:string | null,
    photoURL:string,
    
}[],
activeCat:string,
onPress?:(event: GestureResponderEvent) => void,
setValue?: (value:any) => void
}) => {
  
  return (
    <View className='mt-3'>
      <FlatList 
        data={users}
        renderItem={({item}) => <RenderItem onPress={()=>{
          if(setValue)
            setValue(item.displayName)
          console.log("#CAT CHANGED TO: "+item.displayName);
          
        }} item={item} activeCat={activeCat} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const RenderItem = ({item, activeCat, onPress}:{
  item: {
    id: string;
    displayName: string | null;
    photoURL: string;
},
activeCat:string,
onPress?:(event: GestureResponderEvent) => void
}) => {
  return (
    <CustomButton2 title='x' containerStyles={`bg-primary mx-2 w-18 h-18 p-[1px] py-2 border-b-vibrant rounded-none px-0 ${activeCat == item.displayName ? "border-b-4":""}`} onPress={onPress}>
      <Image source={{uri: item.photoURL}} className='w-12 h-12 rounded-full' loadingIndicatorSource={Logo}/>
      
      <Text className='text-xs font-isemibold'>{item.displayName}</Text>
    </CustomButton2>
  )
}

export default Stories