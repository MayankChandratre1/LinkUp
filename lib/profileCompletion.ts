import { User } from "@/types/userTypes"



const user:Partial<User> = {}

const normalWt = 1;
const highWt = 5;

const normalWtFields = [
    "name",
    "email",
    "phone",
    "personalInfo.height",
    "personalInfo.dateOfBirth",
    "personalInfo.age",
    "personalInfo.current_address",
    "personalInfo.gender",
    "professionalInfo.education",
    "professionalInfo.profession",
    "professionalInfo.current_job",
]

const highWtFields = []

const getValue = (obj: Record<string, any>, key: string) => {
    return key.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
}

export const calculatePercentage = (profile:Partial<User>) => {
    const totalNormalWt = normalWtFields.length*normalWt
    const totalHighWt = highWtFields.length*highWt
    let curr_normal_wt = 0
    normalWtFields.forEach(key => {
        if(getValue(profile, key) !== undefined){
            curr_normal_wt += normalWt
        }
    })
    const fraction = curr_normal_wt/totalNormalWt
    const percent = Math.floor(fraction*100)
    return percent
}