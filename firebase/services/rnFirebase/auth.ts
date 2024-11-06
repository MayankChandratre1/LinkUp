import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { addUser, getCurrentUserInfo, getUserByEmail, getUserById, updateUser } from './db';
import { scheduleNotificationAsync } from 'expo-notifications';
import { schedulePushNotification } from '@/lib/notifications';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export const sendOtp = async (phone:string) => {
    console.log("PHONE:"+phone);
    
    try{
        const vid = await auth().signInWithPhoneNumber(phone);
       
        console.log("VID:"+vid);
        return vid;
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return null
    }
}

export const verifyPhone = async (vid:FirebaseAuthTypes.ConfirmationResult, code:string) => {
    try{
        const result = await vid.confirm(code);
        console.log("RESULT_OTP:"+result);
        return result?.user.phoneNumber;
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return null
    }
}

export const signInEmail = async (email:string, password:string) => {
    try{
        const user = await auth().signInWithEmailAndPassword(email, password);
        
        return user
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return null
    }
}

export const signUpEmail = async (email:string, password:string) => {
    try{
        const user = await auth().createUserWithEmailAndPassword(email, password);
        await addUser({
            email:user.user.email || "No email",
            isEmailVerified:user.user.emailVerified,
            isNewProfile:user.additionalUserInfo?.isNewUser
        },user.user.uid)
        await signInEmail(email, password);
        return user
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return null
    }
}

export async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
  
    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult.data?.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(signInResult.data?.idToken || "");
  
    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);

    if(res.additionalUserInfo?.isNewUser){
        await addUser({
            email: res.user.email || "No email",
            isEmailVerified: res.user.emailVerified,
            isNewProfile: true,
            oAuthToken: signInResult.data?.idToken || ""
        }, res.user.uid)
        return res
    }

    await updateUser({
        user:{
            oAuthToken: signInResult.data?.idToken || ""
        }
    })

    return res
  }
  


export const signOut = async () => {
    try{
        await updateUser({ user :{
            expoPushToken: null
        }})
        await auth().signOut()
        await GoogleSignin.revokeAccess()
        return true
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return false
    }
}

export const getCurrentUser = async () => {
    try{
        const user = auth().currentUser
        return user
    }catch(err){
        console.error("FIREBASE ERROR:\n"+JSON.stringify(err));
        return null
    }
}

export const sendVerificationMail = async () => {
    if(auth().currentUser){
      try{
        if(!auth().currentUser?.emailVerified){
          console.log("Calling mail");
          const res = await auth().currentUser?.sendEmailVerification()
        }
      }catch(err){
        console.error("FIREBASE ERROR:\n"+JSON.stringify(err));
        return null
      }
    }
  }

  export const linkPhone = async (phone:string, email:string) =>{
    try{
        const user = await getUserByEmail(email)
        const vid = await sendOtp(phone)
        if(user && vid){
            const provider =  auth.GoogleAuthProvider.credential(email);
            await auth().currentUser?.linkWithCredential(provider)
        }
        return vid
    }catch(err){
        console.error("FIREBASE ERROR:\n"+JSON.stringify(err));
        return null
    }
  }

  export const addEmailPassword = async (email:string, password:string) => {
    try{    
        const user = await getCurrentUserInfo();
        if(user?.oAuthToken){
            const creds = auth.GoogleAuthProvider.credential(user.oAuthToken)
            await auth().currentUser?.linkWithCredential(creds)
        }
        const creds = auth.EmailAuthProvider.credential(email,password)
        await auth().currentUser?.linkWithCredential(creds)
        if(auth().currentUser?.emailVerified){
            return true
        }
        await auth().currentUser?.sendEmailVerification()
        return true
    }catch(err){
        console.error("FIREBASE ERROR:\n"+JSON.stringify(err));
        return null
    }
  }