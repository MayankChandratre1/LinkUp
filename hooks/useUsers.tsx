import { getAllUsers, getCurrentUserInfo } from "@/firebase/services/rnFirebase/db"
import { User } from "@/types/userTypes"
import { useEffect, useState } from "react"

export const useUsers = () => {
    const [users, setUsers] = useState<Partial<User>[]>([])
        const getUsers = () => {   
            getAllUsers().then((data)=>{
              console.log(data);
              
              setUsers(data);
            })
        }

        useEffect(()=>{
            getUsers()
          },[])


          return {
            users
          }
}