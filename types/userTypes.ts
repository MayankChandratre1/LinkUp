import { ExpoPushToken } from "expo-notifications"

export type User = {
    id:string,
    name:string,
    phone:string,
    email:string,
    profile_pic:string,
    photos: any[],
    isProfilePicVerified:boolean,
    isEmailVerified:boolean,
    isNewProfile:boolean
    personalInfo:{
        gender?:string,
        age?: string,
        dateOfBirth?:Date,
        relegion?:string,
        home_address?:string,
        current_address?:string,
        height?:string,
        languages?:string[]
    },
    isPersonalInfoVerified:boolean,
    professionalInfo:{
        education?:string,
        profession?:string,
        current_job?:string,
        college?:string
    },
    interests?:string[],
    images?:string[],
    isProfileVerified:boolean,
    socials:{
        instagram?:string,
        linkedin?:string,
        xcom?:string,
    },
    expoPushToken?:ExpoPushToken | null,
}