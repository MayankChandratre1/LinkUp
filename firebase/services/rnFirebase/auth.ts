import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { addUser } from './db';
export const sendOtp = async (phone:string) => {
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

export const signOut = async () => {
    try{
        await auth().signOut()
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

  export const addEmailPassword = async (email:string, password:string) => {
    try{    
        const creds = auth.EmailAuthProvider.credential(email,password)
        await auth().currentUser?.linkWithCredential(creds)
        await auth().currentUser?.sendEmailVerification()
        return true
    }catch(err){
        console.error("FIREBASE ERROR:\n"+JSON.stringify(err));
        return null
    }
  }