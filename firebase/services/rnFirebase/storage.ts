import storage from '@react-native-firebase/storage';
import { getCurrentUser } from './auth';



export const uploadImage = async (file:Blob) => {
    const currentuser = await getCurrentUser()
    try{
        const storageRef = storage().ref(`/images/${currentuser?.displayName}/${Date.now()}`)
        const snapshot = await storageRef.put(file)
        const url = await storageRef.getDownloadURL()
        console.log("SUCCESSFULLY UPLOADED FILE:\n"+url);
        return url
    }catch(err){
        console.error("ERROR WHILE UPLOADING!!\n"+err);
    }
}

