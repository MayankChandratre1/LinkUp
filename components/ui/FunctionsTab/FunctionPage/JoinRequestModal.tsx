import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { User } from '@/types/userTypes'
import { sendJoinRequest, updateUser } from '@/firebase/services/rnFirebase/db'
import { AntDesign, Entypo, FontAwesome6 } from '@expo/vector-icons'
import { CustomButton2 } from '../../CustomButton'
import { TextInput } from 'react-native'

const JoinRequestModal = ({socials, setShow, reqInfo}:{
    socials?: Partial<User["socials"]>,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    reqInfo: {
        funcId: string,
        funcName: string,
        profile: Partial<User>,
        currentUser: Partial<User>
    }
}) => {
  
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

 

  const sendReq = async () => {
        setLoading(true)
        try{
            await sendJoinRequest(reqInfo.currentUser.id || "",reqInfo.profile?.id || "",reqInfo.funcId, reqInfo.funcName,  message)
            setShow(false)
        }catch(err){
            setError(true)
        }
        setLoading(false)
  }
 
  
  return ( 
    <View className='bg-primary rounded-md shadow-lg py-5 h-[300px] justify-center items-center px-3 z-50 absolute'>
        <View className=' w-full flex-row justify-between items-center mb-3'>
        <Text className='text-xl font-isemibold text-vibrant'>Send Join Request</Text>
          <TouchableOpacity className='p-2' onPress={()=>{
            setShow(false)
          }}>
            <Entypo name="circle-with-cross" size={24} color="red" />
        </TouchableOpacity>
        </View>
        
        <View className='w-full'>
        
        {<TextInput
            onChangeText={setMessage}
            value={message}
            placeholder='Write a message'
            className='bg-primary font-iregular shadow-lg text-sm p-2 rounded-md border h-20 text-start'
           />}
        {error && <>
            <Text className='text-red-500 font-iregular text-center my-3 '>
                Something went Wrong!!
            </Text>
            </>}
        <CustomButton2 title='socials' containerStyles='w-full my-3 bg-vibrant py-3 '
        onPress={()=>{
            sendReq()
        }}
        >
            <Text className='text-md font-iregular text-primary'>
                {loading ? <ActivityIndicator color={"white"} />:"Send"}
            </Text>
        </CustomButton2>
        </View>
    </View>
  )
} 

export default JoinRequestModal