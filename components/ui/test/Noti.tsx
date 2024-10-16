import { View, Text } from 'react-native'
import React from 'react'
import { useNotifications } from '@/hooks/useNotifications'

const Noti = () => {
    const {expoPushToken, notification} = useNotifications()

    const data = JSON.stringify(notification,undefined,2)

  return (
    <View>
      <Text>Token: {expoPushToken?.data ?? ""}</Text>
      <Text>{data}</Text>
    </View> 
  )
}

export default Noti