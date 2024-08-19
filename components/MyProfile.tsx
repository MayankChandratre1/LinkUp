import { View, Text, Image } from 'react-native'
import React from 'react'
import { CurrentUser } from '@/constants/Images'
import { Ionicons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';
import { CustomButton2 } from './ui/CustomButton';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyProfile = ({user}:{
    user:{
        name:string,
    location:string,
    age:string,
    occ:string
    }
}) => {
  return (
    <SafeAreaView>
        <View className='h-full relative'>
      <View className='fixed top-0 h-[50%]'>
            <View className='absolute top-6 z-10 flex-row w-full justify-between px-4'>
                <CustomButton2 title='settings'  >
                    <AntDesign name='arrowleft' size={32} color={"white"} />
                </CustomButton2>
                <CustomButton2 title='settings'  >
                    <Ionicons name='menu' size={32} color={"white"} />
                </CustomButton2>
            </View>
             <Image 
                source={CurrentUser}
                resizeMode='cover'
                className='w-full h-[350px]'
            />
      </View>

      {/* <View className='relative -top-[150px] items-center flex-1'>
        
        <View className='w-3/4 mt-4 rounded-md px-3  flex-row justify-around '>
            <CustomButton2 title='settings' containerStyles='py-2 px-2 rounded-full bg-secondary'  >
            <Entypo name="dots-three-horizontal" size={24} color="white" />
            </CustomButton2>
            <CustomButton2 title='settings' containerStyles='flex-1 ml-3 flex-row bg-secondary'  >
            <AntDesign name="wechat" size={24} color="white" /><Text className='text-lg font-isemibold text-white'>{"  "}Start Chat</Text>
            </CustomButton2>
        </View>
      </View> */}

      <View className='items-center relative -top-[25%]' >
            <View className='bg-vibrant rounded-3xl p-3 items-center w-1/2 relative top-8 z-10'>
                <View className='flex-row gap-1 items-center'>
                    <AntDesign name='heart' size={18} color={"white"} />
                    <Text className='text-neutral font-ibold'>80%</Text>
                </View>
                <Text className='text-neutral font-isemibold'>Match</Text>
            </View>
        <Card user={user} />
        {/*Buttons*/}
        <View className='mt-6 flex-row w-1/2'>
            <CustomButton2 title='settings' containerStyles='py-2 px-2 rounded-full bg-secondary'  >
                <Entypo name="dots-three-horizontal" size={20} color="white" />
            </CustomButton2>
            <CustomButton2 title='settings' containerStyles='flex-1 flex-row bg-secondary  ml-3'>
                <AntDesign name="wechat" size={20} color="white" /><Text className='text-md font-isemibold text-white'>{"  "}Start Chat</Text>
            </CustomButton2>
        </View>
    </View>


        </View>
    </SafeAreaView>
  )
}

const Card = ({user}:{
    user:{
        name:string,
    location:string,
    age:string,
    occ:string
    }
}) => {
    return (
        <View className='bg-neutral rounded-xl p-5 pt-10 w-4/5 '>
            {/*Match*/}
            
           <View className='items-center'>
                <Text className='text-xl font-isemibold'>{user.name}</Text>
                <Text className='font-iregular'>{user.age}{" - "}{user.location}</Text>
           </View>
           {/*Details*/}
           <View className='gap-2 mt-3'>
            <View className='flex-row gap-2 px-2'>
                <AntDesign name='profile' size={16} color={"gray"} />
                <Text className='text-primary/50 text-xs w-4/5'>Straight, Single 5"10</Text>
            </View>
            <View className='flex-row gap-2 px-2'>
                <Ionicons name='pizza' size={16} color={"gray"} />
                <Text className='text-primary/50 text-xs w-4/5'>Loves Photography and Travel</Text>
            </View>
            <View className='flex-row gap-2 px-2'>
                <Ionicons name='airplane' size={16} color={"gray"} />
                <Text className='text-primary/50 text-xs w-4/5'>Beaches, Mountains, Cafe and Movies</Text>
            </View>
            <View className='flex-row gap-2 px-2'>
                <AntDesign name='clockcircleo' size={16} color={"gray"} />
                <Text className='text-primary/50 text-xs w-4/5'>last seen: 23hrs</Text>
            </View>
           </View>
        </View>
    )
}

export default MyProfile