import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { User } from '@/types/userTypes';
import { getCurrentUser } from '@/firebase/services/rnFirebase/auth';
import { getCurrentUserInfo, sendJoinRequest } from '@/firebase/services/rnFirebase/db';
import JoinRequestModal from './JoinRequestModal';

const JoinedUserCard = ({profile, funcId, funcName}:{
    profile: Partial<User>,
    funcId?: string,
    funcName?: string
}) => {

  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null)
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  
  
  useEffect(()=>{
    getCurrentUserInfo().then(data=>{
      if(data){
        setCurrentUser({
          ...data
        })
      }
    })
  },[funcId])

  useEffect(()=>{
    if(profile.id == currentUser?.id){
      setIsCurrentUser(true)
    }
  },[currentUser])


  if (!profile || profile.isNewProfile) {
    return null;
  }


  const sendJoinReq = async () => {
      if(currentUser && currentUser.id && profile.id && funcId && funcName){
        await sendJoinRequest(currentUser.id, profile.id, funcId, funcName, "")
        console.log("##JOINUSERCARD:\n"+"SENT JOIN REQUEST");
        
      }else{
        console.log("##JOINUSERCARD:\n"+"ERROR SENDING JOIN REQUEST");
        return
      }
  }

  return (
    <>
      <TouchableOpacity onPress={() => {
        router.push(`/(tabs)/userprofile/${profile.id}`)
      }}>
        <View className='flex-row gap-2 p-2 rounded-xl items-center bg-neutral my-1 '>
          <View>
            {profile.profile_pic ? (
              <Image
                source={{
                  uri: profile.profile_pic || "No Uri"
                }}
                className='w-12 h-12 rounded-full'
              />
            ) : (
              <View className='w-12 h-12 rounded-full bg-primary justify-center items-center'>
                <Text className='text-xl font-iregular text-secondary'>U</Text>
              </View>
            )}
          </View>

          <View className='flex-1'>
            <Text className='text-black font-isemibold text-md'>
              {profile?.name || "None"}
              <Text>
                {" "}
                {profile.isProfileVerified ? (
                  <MaterialIcons name="verified" size={10} color="green" />
                ) : (
                  <Octicons name="unverified" size={10} color="black" />
                )}
              </Text>
            </Text>
            <View>
              
            </View>
          </View>

          {/* Join Button */}
          {
            currentUser && !isCurrentUser && <TouchableOpacity className='px-4 py-2 bg-vibrant rounded-md' onPress={()=>{
              setShowModal(true)
            }}>
            <Text className='text-white font-bold'>Join</Text>
          </TouchableOpacity>
          }
        </View>
      </TouchableOpacity>
          {
            showModal && <View className='absolute -top-[200px] w-full h-screen'>
              <JoinRequestModal reqInfo={
                {
                  funcId: funcId || "",
                  funcName: funcName || "",
                  profile: profile,
                  currentUser: currentUser || {}
                }
              } setShow={setShowModal} />
            </View>
          }
    </>
  );
}

export default JoinedUserCard;
