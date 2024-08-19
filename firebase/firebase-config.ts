import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth , getAuth, sendEmailVerification} from "firebase/auth";



// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDzLMrZfdh2qKP8NJMPiYV9b_wMdnZnvbc',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
};

export const FirebaseApp = initializeApp(firebaseConfig);
// export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseAuth = initializeAuth(FirebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const signIn = () => {
    
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



// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
