import { createUserWithEmailAndPassword, NextOrObserver, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, updateCurrentUser, updateProfile, User } from "firebase/auth";
import { FirebaseAuth } from "../firebase-config";

export const signIn = async (email:string, password:string) => {
    try{
        const user = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        return user
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return null
    }
}

export const signUp = async (email:string, password:string) => {
    try{
        const user = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        return user
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return null
    }
}

export const addProfile = async (displayName:string, photoURL:string)=>{
    try{
        if(FirebaseAuth.currentUser){
        const user = await updateProfile(FirebaseAuth.currentUser,{
            displayName,
            photoURL
        });
            return user
        }else{
            return null
        }
    }catch(err){
        console.error("FIREBASE ERROR:\n"+err);
        return null
    }
}

export const sendVerificationMail = async () => {
  if(FirebaseAuth.currentUser){
    try{
      if(!FirebaseAuth.currentUser.emailVerified){
        const res = await sendEmailVerification(FirebaseAuth.currentUser)
        console.log(res);
      }
    }catch(err){
      console.error(err);
    }
  }
}

export const getCurrentUser = async () => {
    if(FirebaseAuth.currentUser){
        const {
            displayName, email, emailVerified, photoURL
        } = FirebaseAuth.currentUser
        return {
            displayName, email, emailVerified, photoURL
        }
    }else{
        return null
    }
}

export const onUserStateChanged = async ({onAuthActivity}:{
    onAuthActivity: NextOrObserver<User>
}) => {
    if(FirebaseAuth.currentUser){
        try{
            onAuthStateChanged(FirebaseAuth,onAuthActivity)
          }catch(err){
            console.error(err);
          }
    }else{
        return null
    }
}