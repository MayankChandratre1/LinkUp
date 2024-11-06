import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { ProfilePic } from '../../Registration/RegistrationForm';
import { User } from '@/types/userTypes';
import { CustomButton2 } from '../../CustomButton';
import { FontAwesome6 } from '@expo/vector-icons';
import EditPhotos from './EditPhotos';

const UserPhotosSlider = ({ user, photos, notCurrUser }:{
    photos: string[],
    user: Partial<User>,
    notCurrUser?: boolean
}) => {
    const [isEditing , setIsEditing] = React.useState(false);


    if(isEditing){
        return ( 
            <View className='w-full h-[400px] bg-accentII justify-center items-center'>
                <EditPhotos close={()=>{
                    setIsEditing(false)
                }} userData={user} />
            </View>
         )
    }

    return (
        <View className='w-full h-[400px]'>
            <View className='absolute top-3 right-3 z-10'>
            {
                !notCurrUser && <CustomButton2 title={"Edit"} onPress={()=>{
                    setIsEditing(!isEditing)
                  }} containerStyles='flex-row items-center'>
                      <Text className='text-[#999] font-iregular mr-2'>Change</Text>
                    <FontAwesome6 name="pencil" size={12} color="#999" />
                  </CustomButton2>
            }
            </View>
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
