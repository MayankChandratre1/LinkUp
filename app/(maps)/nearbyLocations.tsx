import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import '@/OlaMapsWebSDK/OlaMapsWebSDK/style.css'
import {OlaMaps} from '@/OlaMapsWebSDK/OlaMapsWebSDK/olamaps-js-sdk.es'
import MapView from 'react-native-maps'
const nearbyLocations = () => {
   
  return (
    <View style={styles.container}>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

export default nearbyLocations