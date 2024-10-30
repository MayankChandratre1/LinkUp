import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNotifications } from '@/hooks/useNotifications'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { sendPushNotification } from '@/lib/notifications';

const Noti = () => {
    const {expoPushToken, notification} = useNotifications()

    const data = JSON.stringify(notification,undefined,2)

    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: 'Here is the notification body',
          data: { data: 'goes here', test: { test1: 'more data' } },
        },
        trigger: { seconds: 2 },
      });
    }

  return (
    <View>
      <Text>Token: {expoPushToken?.data ?? ""}</Text>
      <Text>{data}</Text>
      <Button title="Send Notification" onPress={schedulePushNotification} />
      <Button title="Send Notification" onPress={async ()=>{
        await sendPushNotification("ExponentPushToken[TInZtsKSX7DbCXGWWp6_m5]","hello","Bother")
      }} />
    </View> 
  )
}

export default Noti