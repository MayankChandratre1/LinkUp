import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ percentage }:{
    percentage: number
}) => {
  return (
      <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percentage}%` }]} className='bg-primary rounded-full' />
      </View>
        <Text  className='text-xs mt-1 font-iregular'>{percentage}% Complete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  progressBarBackground: {
    width: '90%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
     // Customize your fill color here
    borderRadius: 10,
  },
  
});

export default ProgressBar;
