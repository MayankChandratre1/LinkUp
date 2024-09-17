import { View, Text, Image, TouchableOpacity, Linking, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CurrentUser } from '@/constants/Images'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Ionicons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';
import { CustomButton2 } from './ui/CustomButton';
import Entypo from '@expo/vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User } from '@/types/userTypes';
import { calculatePercentage } from '@/lib/profileCompletion';
import { signOut } from '@/firebase/services/rnFirebase/auth';
import SocialsModal2 from './ui/Profile/MyProfile/SocialsModal';

const MyProfile = ({user}:{
    user:Partial<User> | null
}) => {
    const [percent, setPercent] = useState(0)
    const [showSocialsModal, setShowSocialsModal] = useState(false)

    useEffect(()=>{
        if(user)
            setPercent(calculatePercentage(user))
    },[user])

  if(!user){
        return null
  }

  return (
    <SafeAreaView>
        <View className='h-full relative'>
        
      <View className='fixed top-0 h-[50%]'>
            <View className='absolute top-6 z-10 flex-row w-full justify-between px-4'>
                <CustomButton2 title='back' onPress={()=>{
                    router.back()
                }} >
                    <AntDesign name='arrowleft' size={32} color={"white"} />
                </CustomButton2>
                <View className='flex-row '>
                <CustomButton2 title='signout' containerStyles='mx-2 p-2' onPress={async () => {
                    await signOut();
                    router.replace("/")
                }}>
                    <Text className='text-red-500 font-isemibold'>Sign out</Text>
                </CustomButton2>
                <CustomButton2 title='settings'  >
                    <Ionicons name='menu' size={32} color={"white"} />
                </CustomButton2>
                </View>
            </View>
             {user.profile_pic ? 
             <Image 
             source={{
                 uri:user?.profile_pic || ""
             }}
             resizeMode='cover'
             className='w-full h-[350px]'
         />:<View className='w-full h-[350px] bg-secondary'></View>}
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

      <View className='items-center relative -top-[30%]' >
            <View className='bg-vibrant rounded-3xl p-3 items-center w-1/2 relative top-8 z-10'>
                <View className='flex-row gap-1 items-center'>
                    <AntDesign name='heart' size={18} color={"white"} />
                    <Text className='text-neutral font-ibold'>{percent}%</Text>
                </View>
                <Text className='text-neutral font-isemibold'>Complete</Text>
            </View>
        {/* <SocialsModal /> */}
        
        <Card setShow={setShowSocialsModal} user={user} />
        {/*Buttons*/}
        <View className='mt-3 flex-row w-1/2'>
            <CustomButton2 title='settings' containerStyles=' py-2 px-2 rounded-full bg-vibrant'  >
                <Entypo name="dots-three-horizontal" size={20} color="white" />
            </CustomButton2>
            <CustomButton2 title='settings' containerStyles='flex-1 flex-row bg-vibrant  ml-3'>
                <AntDesign name="wechat" size={20} color="white" /><Text className='text-md font-isemibold text-white'>{"  "}Start Chat</Text>
            </CustomButton2>
        </View>
    </View>


        </View>
    </SafeAreaView>
  )
}

const Card = ({user, setShow}:{
    user:Partial<User> | null,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [showSocialsModal, setShowSocialsModal] = useState(false)
    return (
    <>
         {
         showSocialsModal && 
                 <SocialsModal2 setShow={setShowSocialsModal} socials={user?.socials} />
        }
         <View className='bg-neutral rounded-xl p-5 pt-10 w-4/5 '>
            
            <View className='items-center'>
                 <Text className='text-xl font-isemibold'>{user?.name}</Text>
                 <Text className='font-iregular'>{user?.personalInfo?.age}{" - "}{user?.personalInfo?.current_address}</Text>
            </View>
            {/* Socials */}
            
            <View className='flex-row w-full items-center justify-center my-2 mt-3'>
                 {user?.socials?.instagram ? <>
                     <TouchableOpacity className='mx-3' onPress={()=>{
                         Linking.openURL(user.socials?.instagram || "")
                     }}>
                         <AntDesign name="instagram" size={18} color="black" />
                     </TouchableOpacity>
                 </>:null}
                 {user?.socials?.linkedin ? <>
                     <TouchableOpacity className='mx-3' onPress={()=>{
                         Linking.openURL(user.socials?.linkedin || "")
                     }}>
                        <AntDesign name="linkedin-square" size={18} color="black" />
                     </TouchableOpacity>
                 </>:null}
                 {user?.socials?.xcom ? <>
                     <TouchableOpacity className='mx-3' onPress={()=>{
                         Linking.openURL(user.socials?.xcom || "")
                     }}>
                         <FontAwesome6 name="x-twitter" size={18} color="black" />
                     </TouchableOpacity>
                 </>:null}
                 
                 <TouchableOpacity className='mx-1 flex-row justify-center items-center' onPress={()=>{
                         setShowSocialsModal(true);
                     }}>
                         {
                            !user?.socials?.instagram &&
                            !user?.socials?.linkedin &&
                            !user?.socials?.xcom ? <Text className='mx-1 text-gray-500 font-ilight text-xs'>Add Social Links</Text> : null
                         }
                         <FontAwesome6 name="pencil" size={12} color="#cfcfcf" />
                 </TouchableOpacity>
 
             </View>
                 
            {/*Details*/}
            <View className='gap-2 mt-3'>
             <View className='flex-row gap-2 px-2'>
                 <AntDesign name='profile' size={16} color={"gray"} />
                 <Text className='text-vibrant/70 text-xs w-4/5'>{user?.personalInfo?.height}</Text>
             </View>
             <View className='flex-row gap-2 px-2'>
                 <Ionicons name='pizza' size={16} color={"gray"} />
                 <Text className='text-vibrant/70 text-xs w-4/5'>Loves Photography and Travel</Text>
             </View>
             <View className='flex-row gap-2 px-2'>
                 <Ionicons name='airplane' size={16} color={"gray"} />
                 <Text className='text-vibrant/70 text-xs w-4/5'>Beaches, Mountains, Cafe and Movies</Text>
             </View>
             <View className='flex-row gap-2 px-2'>
                 <AntDesign name='clockcircleo' size={16} color={"gray"} />
                 <Text className='text-vibrant/70 text-xs w-4/5'>last seen: 23hrs</Text>
             </View>
            </View>
         </View>
       </>
    )
}

export default MyProfile

