import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User } from '@/types/userTypes'
import { getFunctionJoinedByUser } from '@/firebase/services/rnFirebase/db'
import { FunctionType } from '@/types/functionTypes'
import FunctionList from './FunctionList'

const FunctionListUser = ({user}:{
    user:Partial<User>
}) => {
    const [functions, setFunctions] = useState<Partial<FunctionType>[]>([])
    useEffect(()=>{
        const fetchFuncs = async () => { 
            const funcs = await getFunctionJoinedByUser(user.id||"")
            if(funcs){
                setFunctions(funcs)
            }
            console.log("###FuncsByUser"+JSON.stringify(funcs));
        }
        fetchFuncs()
    },[user])
  return (
    <View>
      <View>
        <Text className='text-lg font-bold'>Functions Joined by {user.name}</Text>
      </View>
      {
        functions.length > 0 && <FunctionList data={functions}/>
      }
    </View>
  )
}

export default FunctionListUser