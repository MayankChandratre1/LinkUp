import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, CameraView } from 'expo-camera';
import axios from 'axios';
import { demo_profiles } from '@/util/demo-data';
import { router } from 'expo-router';

const CameraVerification = ({userProfile}:{
    userProfile:string
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<any | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const data: CameraCapturedPicture = await cameraRef.takePictureAsync();
      console.log(data)
      setPhoto(data.uri);
      setLoading(true)
      try{
        const response = await axios.post("http://192.168.1.6:5000/verify-face",{
            img1_url:userProfile,
            img2_url:userProfile
          })
    
          if(response.data.verified){
            console.log("Verified");
            
            demo_profiles.forEach(profile => {
                if(profile.profile_pic === userProfile){
                    profile.isVerified = true
                }
            })
            router.push("/")
          }else{
            Alert.alert("Cannot verify user, Try Again")
          }
      }catch(err){
        console.log(JSON.stringify(err));
      }finally{
        setLoading(false)
      }
      // Upload the photo to Firebase or use it for further processing
    }
  };

//   if(loading){
//     return (
//         <View>
//             <Text>{photo}</Text>
//         </View>
//     )
//   }

  return (
    <>
      {hasPermission ? (
        <>
          <CameraView
            style={{ flex: 1 }}
            ref={(ref) => setCameraRef(ref)}
            facing='front'
          />
          <Button title="Take Picture" onPress={takePicture} />
          {photo && (
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200, alignSelf: 'center', marginTop: 10 }}
            />
          )}
        </>
      ) : (
        <Text>No access to camera</Text>
      )}
    </>
  );
};

export default CameraVerification;
