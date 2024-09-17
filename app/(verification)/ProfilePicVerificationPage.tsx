import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert } from 'react-native';
import { Camera, CameraCapturedPicture, CameraType, CameraView } from 'expo-camera';
import axios from 'axios';
import CameraVerification from '@/components/ui/verification/CameraVerification';
import { demo_profiles } from '@/util/demo-data';

const ProfilePicVerification = () => {

  return (
    <View style={{ flex: 1 }}>
      <Text>Hello</Text>
    </View>
  );
};

export default ProfilePicVerification;
