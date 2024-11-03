import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';

const UserPhotosSlider = ({ photos }:{
    photos: string[]
}) => {
    return (
        <View className='w-full h-[400px]'>
            <View className='absolute z-20 bottom-0 w-full flex-row'>
                        <Text className='text-textcolorII text-xl font-ibold p-3  flex-1'>
                            &larr;
                        </Text>
                        <Text className='text-textcolorII text-xl font-ibold p-3 text-right flex-1'>
                            &rarr;
                        </Text>
                    </View>
            {photos && photos.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{width: `${photos.length*100}%`}}
                >
                    
                    {photos.map((photoUri, index) => (
                        <Image
                            key={index}
                            source={{ uri: photoUri }}
                            resizeMode='cover'
                            className='mx-[0.5px] '
                            style={{
                                width: `${100/photos.length}%`,
                                height: '100%',
                                borderRadius: 10,
                                objectFit: 'cover',
                            }}
                        />
                    ))}
                </ScrollView>
            ) : (
                <View className='w-full h-full bg-accentII justify-center items-center'>
                    <Text className='text-neutral font-semibold'>No Photos Available</Text>
                </View>
            )}
        </View>
    );
};

export default UserPhotosSlider;
