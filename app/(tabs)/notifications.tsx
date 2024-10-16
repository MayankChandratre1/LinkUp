import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyProfilePage from '@/components/ui/Profile/MyProfile/MyProfilePage'
import { User } from '@/types/userTypes'
import { calculatePercentage } from '@/lib/profileCompletion'
import { acceptRequest, getCurrentUserInfo, getReceivedRequests, getSentRequests, rejectReq } from '@/firebase/services/rnFirebase/db'
import { router, useFocusEffect } from 'expo-router'
import { RequestType } from '@/types/requestTypes'
import { TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

const notifications = () => {

    const [activeTab, setActiveTab] = useState<'sent' | 'received'>('received');
    const [user, setUser] = useState<Partial<User>>()
    const [notifications, setNotifications] = useState<{
        sentReq: Partial<RequestType>[],
        receivedReq: Partial<RequestType>[]
    }>({
        sentReq:[],
        receivedReq:[]
    })
    const refresh = useIsFocused()

    useEffect(()=>{
        getCurrentUserInfo().then((data)=>{
            setUser({
                ...data
            })
        })
    },[])


    const fetchNoti = async () => {
        if (!user || !user.id) return;
        
        try {
            const sent = await getSentRequests(user.id);
            const received = await getReceivedRequests(user.id);
            console.log("Sent Requests: ", JSON.stringify(sent));
            console.log("Received Requests: ", JSON.stringify(received));
            setNotifications({
                sentReq: sent,
                receivedReq: received
            });
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            // Fetch notifications when the screen gains focus
            fetchNoti();
            // Clean-up function (optional, can be used for any clean-up logic)
            return () => {
                setNotifications({ sentReq: [], receivedReq: [] }); // Reset notifications when the screen loses focus
            };
        }, [user?.id, refresh]) // Dependency on user ID ensures fetch only when user ID is available/changes
    );
    const handleAccept = async (request: Partial<RequestType>) => {
        if(request.reqId){
            await acceptRequest(request.reqId)
            console.log('Accepted request:', request);
           await fetchNoti()
        }
      };
    
      const handleReject = async (request: Partial<RequestType>) => {
        if(request.reqId){
            await rejectReq(request.reqId)
            console.log('Rejected request:', request);
            await fetchNoti()
        }
      };
  
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
       
             <TouchableOpacity className=" " onPress={() => router.back()}>
                 <Text className="text-lg">{'< Back'}</Text>
             </TouchableOpacity>
             <Text className="text-xl text-center mb-4 font-isemibold">Join Requests</Text>

             <View className="flex-row justify-center mb-4">
        <TouchableOpacity
          onPress={() => setActiveTab('received')}
          className={`px-4 py-2 ${activeTab === 'received' ? 'bg-blue-500' : 'bg-gray-200'} rounded-full mx-2`}
        >
          <Text className={`${activeTab === 'received' ? 'text-white' : 'text-black'} font-bold`}>Received</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('sent')}
          className={`px-4 py-2 ${activeTab === 'sent' ? 'bg-blue-500' : 'bg-gray-200'} rounded-full mx-2`}
        >
          <Text className={`${activeTab === 'sent' ? 'text-white' : 'text-black'} font-bold`}>Sent</Text>
        </TouchableOpacity>
      </View>
      

      <ScrollView>
      {activeTab === 'received' && notifications.receivedReq && notifications.receivedReq.length > 0 ? (
          notifications.receivedReq.map((req, index) => (
            <View key={index} className="p-4 bg-gray-100 rounded-lg mb-4 flex flex-col">
              <Text className="mb-2 text-md font-iregular">
                {req.userName} has requested to join you in {req.funcName}
              </Text>
              <Text className="mb-2 text-sm text-gray-500">
                {req?.message || 'No message'} 
              </Text>
              <View className="flex-row gap-2">
                {/* Accept Button */}
                <TouchableOpacity
                  onPress={() => handleAccept(req)}
                  className="bg-green-500 p-2 rounded-lg"
                >
                  <Text className="text-white font-bold">Accept</Text>
                </TouchableOpacity>

                {/* Reject Button */}
                <TouchableOpacity
                  onPress={() => handleReject(req)}
                  className="bg-red-500 p-2 rounded-lg"
                >
                  <Text className="text-white font-bold">Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : activeTab === 'received' ? (
          <Text className="text-center text-gray-500">No received requests found.</Text>
        ) : null}

    {activeTab === 'sent' && notifications.sentReq.length > 0 ? (
          notifications.sentReq.map((req, index) => (
            <View key={index} className="p-4 bg-gray-100 rounded-lg mb-4 flex flex-col">
              <Text className="text-lg mb-2">
                You have requested to join {req.funcName} 
              </Text>
            </View>
          ))
        ) : activeTab === 'sent' ? (
          <Text className="text-center text-gray-500">No sent requests found.</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default notifications