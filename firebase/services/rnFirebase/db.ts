import { User } from "@/types/userTypes";
import firestore , {FirebaseFirestoreTypes, GeoPoint} from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
export const addUser = async (user:Partial<User>,uid:string) => {
    try{
        const user_created = await firestore().collection('users').doc(uid).set({
            ...user,
            id:uid,
        })
        console.log("SUCCESSFULLY CREATED USER!!");
    }catch(err){
        console.error("ERROR WHILE CREATING USER!!\n"+err);
    }finally{
        return null
    }
}

export const updateUser = async ({user}:{
    user:Partial<User>
}) => {
    try{
        const currUser =  auth().currentUser
    const uid = currUser?.uid

    if(user.personalInfo || user.professionalInfo){
        console.log("#YESSS");
        
        const prevUser = (await firestore().collection('users').doc(uid).get()).data()
        if(user.personalInfo){
            await firestore().collection('users').doc(uid).update({
                ...user ,
                personalInfo:{
                    ...user.personalInfo,
                    ...prevUser?.personalInfo
                }
            })
        }
        if(user.professionalInfo){
            await firestore().collection('users').doc(uid).update({
                ...prevUser,
                ...user ,
                professionalInfo:{
                    ...user.professionalInfo,
                    ...prevUser?.professionalInfo
                },
            })
        }
    }else{
        await firestore().collection('users').doc(uid).update({
            ...user ,    
        })
    }
    
    

        console.log("SUCCESSFULLY Updated USER!!");
        return true
    }catch(err){
        console.error("ERROR WHILE updating USER!!\n"+err);
        return false
    }
}

export const getAllUsers = async () => {
    const userSnapshot = await firestore().collection('users').get()
    const users = userSnapshot.docs
    const userdata = users.map(user => user.data())
    return userdata
}
export const getUserById = async (id:string) => {
    const userSnapshot = await firestore().collection('users').doc(id).get()
    const user = {
        ...userSnapshot.data()
    }
    console.log("#USER\n"+JSON.stringify(user))
    return user
}

export const getCurrentUserInfo = async () => {
    const currUser = auth().currentUser
    const user = await firestore().collection('users').doc(currUser?.uid).get()
    if(!user.exists){
        return null
    }
    return {...user.data()}
}

const PAGE_SIZE = 100; // Define the number of records per page

export const getCollegeList = async (lastDoc = null) => {
  try {
    let query = firestore().collection('colleges').limit(PAGE_SIZE);

    if (lastDoc) {
      query = query.startAfter(lastDoc); // Start fetching after the last document
    }

    const collegeSnapshot = await query.get();
    const collegeDocs = collegeSnapshot.docs;
    const collegeObjects = collegeDocs.map((doc) => doc.data());

    return { 
      data: collegeObjects, 
      lastDoc: collegeSnapshot.docs[collegeSnapshot.docs.length - 1] 
    }; // Return the last document to be used for the next query
  } catch (err) {
    console.error("FIRESTORE ERROR:\n" + JSON.stringify(err));
    return { data: [], lastDoc: null };
  }
};



export const getFilteredCollegeList = async (filter: string) => {
    try {
      // Assuming `filter` is the keyword to filter by name or location
      const collegeSnapshot = await firestore()
        .collection('colleges')
        .where('city', '>=', filter) // Filter by name starting with `filter`
        .where('city', '<', filter + '\uf8ff') // Ensure range query is correct
        .get();
  
      const collegeDocs = collegeSnapshot.docs;
      const collegeObjects = collegeDocs.map((doc) => doc.data());
      return collegeObjects;
    } catch (err) {
      console.error("FIRESTORE ERROR:\n" + JSON.stringify(err));
      return [];
    }
  };

export const getCollegeListPaged = async (filter: string, lastDoc:FirebaseFirestoreTypes.DocumentData | null) => {
    try {
      const college = filter != '' ? filter.toUpperCase() : 'No college'
      if(college == 'No college') return {
        collegeObjects: [],
        lastDoc: null
      }
      let query = firestore()
      .collection('colleges')
      .where('college', '>=', college) // Filter by name starting with `filter`
      .where('college', '<', college + '\uf8ff')
      .orderBy('college')
      // Assuming `filter` is the keyword to filter by name or location
      if(lastDoc){
        query = query.startAfter(lastDoc)
      }

      const collegeSnapshot = await query.limit(4).get()
      const collegeDocs = collegeSnapshot.docs;
      const collegeObjects = collegeDocs.map((doc) => doc.data());
      return {collegeObjects, last: collegeDocs[collegeDocs.length-1]};
    } catch (err) {
      console.error("FIRESTORE ERROR:\n" + JSON.stringify(err));
      return {collegeObjects:null, last: null};
    }
  };

