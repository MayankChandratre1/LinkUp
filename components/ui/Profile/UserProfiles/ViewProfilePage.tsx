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
import { CustomButton2 } from "../../CustomButton";
import ProgressBar from "../../ProgresBar";
import { signOut } from "@/firebase/services/rnFirebase/auth";
import UserPhotosSlider from "../MyProfile/UserPhotoSlider";

const ViewProfilePage = ({ user }: { user: Partial<User> | null }) => {
  const [percent, setPercent] = useState(0);
  const [showSocialsModal, setShowSocialsModal] = useState(false);

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
        <CustomButton2
          title={"Back"}
          onPress={() => {
            router.back();
          }}
        >
          <Text className="text-textcolorI text-xl font-isemibold">&larr;</Text>
        </CustomButton2>
      </View>
        <SafeAreaView className="flex-1 px-2">
          <ScrollView className="flex-1 ">
            <View className="w-full h-full flex-1 pb-3">
              <UserPhotosSlider notCurrUser user={user} photos={user?.photos || []} />
              <Card user={user} setShow={setShowSocialsModal} />
              <Details user={user} />
            </View>
          </ScrollView>
        </SafeAreaView>
    </>
  );
};

const Card = ({
  user,
  setShow,
}: {
  user: Partial<User> | null;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showSocialsModal, setShowSocialsModal] = useState(false);
  return (
    <>
      <View className="p-2 rounded-lg mt-2 bg-accentII/80 border">
        <ProfileHeader
          notCurrUser={true}
          userId={user?.id || ""}
          name={user?.name || "User"}
          isVerified={user?.isProfilePicVerified || false}
        />
        <View className="p-2">
          <Text className="text-sm font-iregular text-textcolorI">
            {user?.bio}
          </Text>
        </View>
        {user && <ProgressBar percentage={calculatePercentage(user)} />}
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
        </View>
      </View>
    </>
  );
};

const Details = ({ user }: { user: Partial<User> | null }) => {
  const [isPersonalEditing, setIsPersonalEditing] = useState(false);
  const [isEduEditing, setIsEduEditing] = useState(false);
  const [isJobEditing, setIsJobEditing] = useState(false);
  const [isInterestEditing, setIsInterestEditing] = useState(false);

  return (
    <View className="">
      <View className="flex-row justify-center">
        <Text className="text-lg font-iregular text-center my-2">
          Personal Information
        </Text>
      </View>
      {
        <>
          <View className="flex-row">
            <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
              Gender: {user?.personalInfo?.gender}
            </Text>
            <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
              Age : {user?.personalInfo?.age} Years
            </Text>
            <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
              Height : {user?.personalInfo?.height}{" "}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
              Lives: {user?.personalInfo?.current_address}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
              BirthDay:{" "}
              {new Date(
                Number(user?.personalInfo?.dateOfBirth?.nanoseconds) || ""
              )
                .toDateString()
                .split(" ")
                .slice(1)
                .join(" ")}
            </Text>
          </View>
        </>
      }
      {user?.professionalInfo?.education ? (
        <>
          <View className="flex-row justify-center">
            <Text className="text-lg font-iregular text-center my-2">
              Education
            </Text>
          </View>
          {
            <>
              <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
                {user?.professionalInfo?.education}
              </Text>
              <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
                {user?.professionalInfo?.college}
              </Text>
            </>
          }
        </>
      ) : null}
      {user?.professionalInfo?.current_job ? (
        <>
          <View className="flex-row justify-center">
            <Text className="text-lg font-iregular text-center my-2">
              Profession
            </Text>
          </View>
          {
            <>
              <Text className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center">
                {user?.professionalInfo?.current_job}
              </Text>
            </>
          }
        </>
      ) : null}
      {user?.interests && (
        <>
          <View className="flex-row justify-center">
            <Text className="text-lg font-iregular text-center my-2">
              Interests
            </Text>
          </View>
          {
            <>
              <View className="flex-row flex-wrap">
                {user?.interests?.map((interest, index) => (
                  <Text
                    key={index}
                    className="text-lg font-iregular bg-accentII/80 border p-3 rounded-lg mt-2 flex-1 mx-1 text-center min-w-[150px]"
                  >
                    {interest}
                  </Text>
                ))}
              </View>
            </>
          }
        </>
      )}
    </View>
  );
};

const SettingsMenu = ({
  user,
  close,
}: {
  user: Partial<User> | null;
  close: () => void;
}) => {
  return (
    <View className="absolute -top-5 flex-1 w-full h-full bg-bgcolor py-10">
      <CustomButton2 title={"close"} onPress={close} containerStyles="mb-5">
        <Text className="text-textcolorI w-full text-xl font-isemibold px-4 text-start">
          &larr;
        </Text>
      </CustomButton2>
      <View className="bg-bgcolor">
        <TouchableOpacity
          className="flex-row items-center justify-between p-3 border-b border-gray-200"
          onPress={async () => {
            const result = await signOut();
            router.push("/(auth)/signup1");
          }}
        >
          <Text className=" font-iregular text-lg">Sign Out</Text>
          <Ionicons name="log-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewProfilePage;
