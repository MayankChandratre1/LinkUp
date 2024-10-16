import functions from "@/app/(tabs)/functions"
import { getFilteredFunctionsListById } from "@/firebase/services/rnFirebase/db"
import { FunctionType } from "@/types/functionTypes"
import { functions_data } from "@/util/demo-data"
import { useFocusEffect } from "expo-router"
import { useCallback, useEffect, useState } from "react"

export const useFunction = (id:string) => {
    const [func, setFunc] = useState<Partial<FunctionType>>({})

    const getCurrFunc = async () => {
        const curr_func = await getFilteredFunctionsListById(id)
        if(curr_func){
            setFunc(curr_func)
            console.log("##CURRFUNC: "+JSON.stringify(curr_func));
        }
    }
    useFocusEffect(
        useCallback(() => {
          getCurrFunc(); // Refetch when the screen gains focus
        }, [id])
      );
    return func
}