import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "@/types/userTypes";
import { RequestType } from "@/types/requestTypes";
import {
  getReceivedRequests,
  getSentRequests,
} from "@/firebase/services/rnFirebase/db";
import { router, useFocusEffect } from "expo-router";
import { calculatePercentage } from "@/lib/profileCompletion";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../ProfileHeader";
import { AntDesign, Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import SocialModal2 from "./SocialsModal";
import { CustomButton2 } from "../../CustomButton";
import { signOut } from "@/firebase/services/rnFirebase/auth";
import UserPhotosSlider from "./UserPhotoSlider";
import ProgressBar from "../../ProgresBar";

const MyProfileComponent = ({ user }: { user: Partial<User> | null }) => {
  const [percent, setPercent] = useState(0);
  const [showSocialsModal, setShowSocialsModal] = useState(false);
  const [notifications, setNotifications] = useState<{
    sentReq: Partial<RequestType>[];
    receivedReq: Partial<RequestType>[];
  }>({
    sentReq: [],
    receivedReq: [],
  });
  const [showSettings, setShowSettings] = useState(false);

  const fetchNoti = async () => {
    if (!user || !user.id) return;

    try {
      const sent = await getSentRequests(user.id);
      const received = await getReceivedRequests(user.id);
      console.log("Sent Requests: ", JSON.stringify(sent));
      console.log("Received Requests: ", JSON.stringify(received));
      setNotifications({
        sentReq: sent,
        receivedReq: received,
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch notifications when the screen gains focus
      fetchNoti();
      // Clean-up function (optional, can be used for any clean-up logic)
      return () => {
        setNotifications({ sentReq: [], receivedReq: [] }); // Reset notifications when the screen loses focus
      };
    }, [user?.id]) // Dependency on user ID ensures fetch only when user ID is available/changes
  );

  useEffect(() => {
    if (user) {
      setPercent(calculatePercentage(user));
    }
  }, [user]);

  if (!user) {
    return null;
  }
  return (
    <>
    <View className="flex-row justify-between px-4 pt-3">
        <CustomButton2 title={"Back"} 
        onPress={()=>{
            router.back()
        }}
        >
            <Text className="text-textcolorI text-xl font-isemibold">&larr;</Text>
        </CustomButton2>
        <View className="flex-row">
        <CustomButton2 title={"Back"}
        onPress={()=>{
            router.push("/(tabs)/notifications")
        }}
        containerStyles="mx-2"
        >
                   {
                        notifications.sentReq.length > 0 || notifications.receivedReq.length > 0 ?
                        <>
                            <View className='w-3 h-3 bg-red-500 rounded-full absolute z-20 -top-1 -right-1'>

                            </View>
                        </>:null
                    }
            <Text className="text-textcolorI font-isemibold"><AntDesign name='bells' size={24}  /></Text>
        </CustomButton2>
        <CustomButton2 title={"Back"}
        containerStyles="mx-2"
        onPress={()=>{setShowSettings(true)}}
        >
            <Text className="text-textcolorI font-isemibold">
                 <AntDesign name='setting' size={24}  />
            </Text>
        </CustomButton2>
        </View>
    </View>
  {
    !showSettings &&  <SafeAreaView className="flex-1 px-2">
    <ScrollView className="flex-1 ">
        <View className="w-full h-full flex-1 pb-3">
        <UserPhotosSlider photos={user?.photos || []} />
        <Card user={user} setShow={setShowSocialsModal} />
        <Details user={user} />
        </View>
    </ScrollView>
   </SafeAreaView>
  }
   {
        showSettings && <SettingsMenu user={user} close={()=>{setShowSettings(false)}}/>
   }
   </>
  );
};


const Card = ({ user, setShow }: { user: Partial<User> | null, setShow: React.Dispatch<React.SetStateAction<boolean>>; }) => {
    const [showSocialsModal, setShowSocialsModal] = useState(false);
    return (
        <>
        {
         showSocialsModal && 
                 <SocialModal2 setShow={setShowSocialsModal} socials={user?.socials} />
        }
        <View className="p-2 rounded-lg mt-2 bg-accentII/80 border">
            <ProfileHeader userId={user?.id || ""} name={user?.name || "User"} isVerified={user?.isProfilePicVerified || false} />
           { user &&  <ProgressBar percentage={calculatePercentage(user)} />}
           <View className="flex-row w-full items-center justify-center my-2 mt-3">
          {user?.socials?.instagram ? (
            <>
              <TouchableOpacity
                className="mx-3"
                onPress={() => {
                  Linking.openURL(user.socials?.instagram || "");
                }}
              >
                <AntDesign name="instagram" size={18} color="black" />
              </TouchableOpacity>
            </>
          ) : null}
          {user?.socials?.linkedin ? (
            <>
              <TouchableOpacity
                className="mx-3"
                onPress={() => {
                  Linking.openURL(user.socials?.linkedin || "");
                }}
              >
                <AntDesign name="linkedin-square" size={18} color="black" />
              </TouchableOpacity>
            </>
          ) : null}
          {user?.socials?.xcom ? (
            <>
              <TouchableOpacity
                className="mx-3"
                onPress={() => {
                  Linking.openURL(user.socials?.xcom || "");
                }}
              >
                <FontAwesome6 name="x-twitter" size={18} color="black" />
              </TouchableOpacity>
            </>
          ) : null}

          <TouchableOpacity
            className="mx-1 flex-row justify-center items-center"
            onPress={() => {
              setShowSocialsModal(true);
            }}
          >
            {!user?.socials?.instagram &&
            !user?.socials?.linkedin &&
            !user?.socials?.xcom ? (
              <Text className="mx-1 text-gray-500 font-iregular text-xs">
                Add Social Links
              </Text>
            ) : null}
            <FontAwesome6 name="pencil" size={12} color="#999" />
          </TouchableOpacity>
        </View>
        </View>
        
        </>
    )
}

const Details = ({ user }: { user: Partial<User> | null }) => {
    
    
    return (
        <View className="">
            <Text className="text-lg font-iregular text-center my-2">Personal Information</Text>
           <View className="flex-row">
           <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">Gender: {
               user?.personalInfo?.gender
             }</Text>
             <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">Age : {user?.personalInfo?.age} Years</Text>
             <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">Height : {user?.personalInfo?.height} </Text>
           </View>
           <View className="flex-row">
             <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">Lives: {user?.personalInfo?.current_address}</Text>
           </View>
           <View className="flex-row">
             <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">BirthDay: {
                new Date(Number(user?.personalInfo?.dateOfBirth?.seconds)*1000 || "").toDateString().split(" ").slice(1).join(" ")
             }</Text>
           </View>
           {
               user?.professionalInfo?.education && <>
                <Text className="text-lg font-iregular text-center my-2">Education</Text>
           <View className="">
                <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">{user?.professionalInfo?.education}</Text>
                <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">{user?.professionalInfo?.college}</Text>
           </View> 
               </>
           }
          {
              user?.professionalInfo?.current_job && <>
               <Text className="text-lg text-center font-iregular my-2">Profession</Text>
           <View className="flex-row">
                <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">{user?.professionalInfo?.current_job}</Text>
           </View>
              </>
          }
           {
            user?.interests && <>
              <Text className="text-lg text-center font-iregular my-2">Interests</Text>
           <View className="flex-row flex-wrap">
                {
                    user?.interests?.map((interest, index)=>(
                        <Text key={index} className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center min-w-[150px]">{interest}</Text>
                    ))
                }
           </View>
            </>
           }
        </View>
    );
}

const SettingsMenu = ({ user, close }: { user: Partial<User> | null, close:() => void }) => {
    return (
       <View className="absolute -top-5 flex-1 w-full h-full bg-bgcolor py-10">
         <CustomButton2 title={"close"}
         onPress={close}
         containerStyles="mb-5"
         >
            <Text className="text-textcolorI w-full text-xl font-isemibold px-4 text-start">&larr;</Text>
         </CustomButton2>
         <View className="bg-bgcolor">
            <TouchableOpacity
                className="flex-row items-center justify-between p-3 border-b border-gray-200"
                onPress={() => {
                    router.push("/(tabs)/notifications")
                }}
            >
                <Text className="font-iregular text-lg">Edit Profile</Text>
                <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                className="flex-row items-center justify-between p-3 border-b border-gray-200"
                onPress={async () => {
                    const result = await signOut()
                        router.push("/(auth)/signin3")
                }}
            >
                <Text className=" font-iregular text-lg">Sign Out</Text>
                <Ionicons name="log-out" size={24} color="black" />
            </TouchableOpacity>
        </View>
       </View>
    )
}


export default MyProfileComponent;
