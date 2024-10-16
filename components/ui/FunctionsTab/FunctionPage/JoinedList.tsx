import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User } from '@/types/userTypes'
import { getGroupsByFunctionId, getUserById } from '@/firebase/services/rnFirebase/db'
import ProfileCard from '../../Profile/ProfileCard'
import JoinedUserCard from './JoinedUserCard'
import { GroupType } from '@/types/groupTypes'
import JoinedGroupCard from './JoinedGroupCard'

const JoinedList = ({user_ids, funcId, funcName}:{
    user_ids?: string[],
    funcId?: string,
    funcName?: string
}) => {
  const [users, setUsers] = useState<Partial<User>[]>([])
  const [groups, setGroups] = useState<Partial<GroupType>[]>([])

  const fetchGroups = async () => {
    console.log("##FETCHING GROUPS");
    
    if (funcId) {
      const fetchedGroups = await getGroupsByFunctionId(funcId);
      setGroups(fetchedGroups);
      console.log(JSON.stringify(fetchedGroups));
    }
  }

  useEffect(()=>{
    setUsers([])
      fetchGroups();
  },[funcId])
  return (
    <View className='h-full'>
      {
        groups.length != 0 && groups.map(item => {
            return (
                <View key={item.groupId} className='flex-1'>
                    <JoinedGroupCard group={item} funcId={funcId} funcName={funcName} />
                </View>
            )
        })
      }
    </View>
  )
}





export default JoinedList