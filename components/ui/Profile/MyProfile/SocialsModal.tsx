import { View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Keyboard, ScrollView } from 'react-native'
import React, { ReactElement, useState } from 'react'
import { User } from '@/types/userTypes'
import CustomButton, { CustomButton2 } from '../../CustomButton'
import { updateUser } from '@/firebase/services/rnFirebase/db'
import { TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome6 } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo';

const SocialsModal = ({socials, setShow}:{
    socials?: Partial<User["socials"]>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [instagram, setInstagram] = useState(socials?.instagram || "")
  const [linkedin, setLinkedin] = useState(socials?.linkedin || "")
  const [xcom, setXcom] = useState(socials?.xcom || "")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateSocials = async () => {
        setLoading(true)
        try{
            await new Promise((res)=>{
                setTimeout(()=>{
                    res(1)
                },1500)
            })
            await updateUser({
                user:{
                    socials:{
                        instagram,
                        linkedin,
                        xcom
                    }
                }
            })
        }catch(err){
            setError(true)
        }
        setLoading(false)
  }

  return (
    <View className=' bg-primary shadow-lg py-5 w-full h-full items-center z-50 px-3 absolute'>
        <View className=' w-full items-end mb-3'>
          <TouchableOpacity className='p-2' onPress={()=>{
            setShow(false)
          }}><Text className='font-ilight text-xl'>X</Text></TouchableOpacity>
        </View>
        <View className='w-full'>
            <Text className='text-lg text-vibrant font-isemibold my-2'>Instagram</Text>
            <TextInput
             onChangeText={setInstagram}
             value={instagram}
             placeholder='Instagram'
             className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border'
             
            />
        </View>
        <View className='w-full'>
            <Text className='text-lg text-vibrant font-isemibold my-2'>LinkedIn</Text>
            <TextInput
             onChangeText={setLinkedin}
             value={linkedin}
             placeholder='LinkedIn'
             className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border'
            />
        </View>
        
        <View className='w-full'>
            <Text className='text-lg text-vibrant font-isemibold my-2'>X (twitter)</Text>
            <TextInput
             onChangeText={setXcom}
             value={xcom}
             placeholder='X (twitter)'
             className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border'
             
            />
        </View>
        {error && <>
            <Text className='text-red-500 font-iregular text-center my-3 '>
                Something went Wrong!!
            </Text>
            </>}
        <CustomButton2 title='socials' containerStyles='w-full my-3 bg-vibrant py-3 '
        onPress={()=>{
            updateSocials()
        }}
        >
            <Text className='text-md font-iregular text-primary'>
                {loading ? <ActivityIndicator color={"white"} />:"Update"}
            </Text>
        </CustomButton2>
       
    </View>
  )
}

const SocialInput = ({setText, value}:{
    setText:((text: string) => void) | undefined,
    value:string
}) => {
    return (
        <View className='w-full z-50'>
            <TextInput
             onChangeText={setText}
             value={value}
             placeholder='link to your account'
             className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border'
            />
        </View>
    )
}


const SocialModal2 = ({socials, setShow}:{
    socials?: Partial<User["socials"]>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [instagram, setInstagram] = useState(socials?.instagram || "")
  const [linkedin, setLinkedin] = useState(socials?.linkedin || "")
  const [xcom, setXcom] = useState(socials?.xcom || "")

  const [selected, setSelected] = useState<'instagram' | 'linkedin' |'xcom'>('instagram')


  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

 

  const updateSocials = async () => {
        setLoading(true)
        try{
            await new Promise((res)=>{
                setTimeout(()=>{
                    res(1)
                },1500)
            })
            await updateUser({
                user:{
                    socials:{
                        instagram,
                        linkedin,
                        xcom
                    }
                }
            })
            setShow(false)
        }catch(err){
            setError(true)
        }
        setLoading(false)
  }
 
  
  return ( 
    <View className='bg-primary rounded-md shadow-lg py-5 w-[90%] h-[300px] justify-center items-center px-3 z-50 absolute'>
        <View className=' w-full flex-row justify-between items-center mb-3'>
        <Text className='text-xl font-isemibold text-vibrant'>Socials</Text>
          <TouchableOpacity className='p-2' onPress={()=>{
            setShow(false)
          }}>
            <Entypo name="circle-with-cross" size={24} color="red" />
        </TouchableOpacity>
        </View>
        <View className='flex-row w-full justify-center my-3 py-3'>
            <CustomButton2 title={"social"} containerStyles={`flex-1 mx-1 py-3 shadow-lg border ${selected == 'instagram' ? 'bg-vibrant':'bg-neutral'}`}
            onPress={()=>{
                setSelected('instagram')
            }}
            >
                <AntDesign name="instagram" size={18} color={`${selected == 'instagram' ? 'white':'black'}`} />
            </CustomButton2>
            <CustomButton2 title={"social"} containerStyles={`flex-1 mx-1 py-3 shadow-lg border ${selected == 'linkedin' ? 'bg-vibrant':'bg-neutral'}`}
            onPress={()=>{
                setSelected('linkedin')
            }}
            >
                <AntDesign name="linkedin-square" size={18} color={`${selected == 'linkedin' ? 'white':'black'}`} />
            </CustomButton2>
            <CustomButton2 title={"social"} containerStyles={`flex-1 mx-1 py-3 shadow-lg border ${selected == 'xcom' ? 'bg-vibrant':'bg-neutral'}`}
            onPress={()=>{
                setSelected('xcom')
            }}
            >
                <FontAwesome6 name="x-twitter" size={18} color={`${selected == 'xcom' ? 'white':'black'}`} />
            </CustomButton2>
        
        </View>
        <View className='w-full'>
        {selected === 'instagram' && <TextInput
            onChangeText={setInstagram}
            value={instagram}
            placeholder='link to your account'
            className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border'
           />}
        {selected === 'linkedin' && <TextInput
            onChangeText={setLinkedin}
            value={linkedin}
            placeholder='link to your account'
            className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border'
           />}
        {selected === 'xcom' && <TextInput
            onChangeText={setXcom}
            value={xcom}
            placeholder='link to your account'
            className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border'
           />}
        {error && <>
            <Text className='text-red-500 font-iregular text-center my-3 '>
                Something went Wrong!!
            </Text>
            </>}
        <CustomButton2 title='socials' containerStyles='w-full my-3 bg-vibrant py-3 '
        onPress={()=>{
            updateSocials()
        }}
        >
            <Text className='text-md font-iregular text-primary'>
                {loading ? <ActivityIndicator color={"white"} />:"Update"}
            </Text>
        </CustomButton2>
        </View>
    </View>
  )
} 




export default SocialModal2

const centerStyle = StyleSheet.create({
    container: {
         
    }
 }) 