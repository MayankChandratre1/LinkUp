import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

async function schedulePushNotification(title:string, body:string) {
    try{
        const res = await Notifications.scheduleNotificationAsync({
            content: {
              title: title,
              body: body,
            
            },
            trigger: { seconds: 2 },
            
          });

          console.log(res);
          
    }catch(err){
        console.error("NOTIFICATION ERROR:\n"+err);
    }
}

async function sendPushNotification(expoPushToken: string, title: string, body: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
  };

  const res = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  console.log("SEND NOTI RESPONSE: "+JSON.stringify(res));
  
}

export { schedulePushNotification, sendPushNotification }