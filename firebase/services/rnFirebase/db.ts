import { User } from "@/types/userTypes";
import firestore , {FirebaseFirestoreTypes, GeoPoint} from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FunctionType } from "@/types/functionTypes";
import { RequestType } from "@/types/requestTypes";
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

  export const getFilteredFunctionsList = async (filter?: string) => {
    try {
      let functionsSnapshot;
      
      if (filter) {
        // If filter is provided, query by category
        functionsSnapshot = await firestore()
          .collection('functions')
          .where('category', '==', filter)
          .get();
      } else {
        // If filter is empty, retrieve all documents
        functionsSnapshot = await firestore()
          .collection('functions')
          .get();
      }
  
      const functionDocs = functionsSnapshot.docs;
      const functionObjects = functionDocs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data() // Document data
      }));
  
      return functionObjects;
    } catch (err) {
      console.error("FIRESTORE ERROR:\n" + JSON.stringify(err));
      return [];
    }
  };

  export const getFilteredFunctionsListById = async (id: string) => {
    try {
      let functionsSnapshot;
      
      if (id) {
        // If filter is provided, query by category
        functionsSnapshot = await firestore()
          .collection('functions')
          .where('id', '==', id)
          .get();
      } else {
        // If filter is empty, retrieve all documents
        functionsSnapshot = await firestore()
          .collection('functions')
          .get();
      }
  
      const functionDocs = functionsSnapshot.docs;
      const functionObjects = functionDocs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data() // Document data
      }));
  
      return functionObjects[0];
    } catch (err) {
      console.error("FIRESTORE ERROR:\n" + JSON.stringify(err));
      return null;
    }
  };

  export const joinFunction = async (userId: string, funcId: string) => {
    try {
      const curr_func:Partial<FunctionType> | null = await getFilteredFunctionsListById(funcId);
      const joined_users = curr_func?.joined_users
      const groups = curr_func?.groups
      
      if(joined_users && !joined_users.includes(userId))
        await firestore().collection('functions').doc(funcId).update({
          ...curr_func,
          joined_users: [...joined_users, userId],
        })
      else if(!joined_users && !groups)
        await firestore().collection('functions').doc(funcId).update({
        ...curr_func,
        joined_users: [userId],
        })

        const newGroupRef = firestore().collection('groups').doc(); // Generates a new document ID

        await newGroupRef.set({
          groupId: newGroupRef.id,  // The generated document ID
          ownerId: userId,          // The current user who is calling this function
          members: [userId],        // Array with just the current user for now
          parent_func_id: funcId    // Reference to the current function
        });

        if(groups && !groups.includes(newGroupRef.id)){
          await firestore().collection('functions').doc(funcId).update({
            ...curr_func,
            groups: [...groups, newGroupRef.id],
          })
        }else if(!groups){
          await firestore().collection('functions').doc(funcId).update({
            ...curr_func,
            groups: [newGroupRef.id],
          })
        }    
    } catch (err) {
      console.error("FIRESTORE ERROR:\n" + JSON.stringify(err));
      return null;
    }
  }

  export const sendJoinRequest = async (
    senderId: string, 
    receiverId: string, 
    funcId: string, 
    funcName: string,
    message: string
  ) => {
    try {
      // Fetch sender and receiver information
      const sender = await getUserById(senderId);
      const receiver = await getUserById(receiverId);
  
      if (!sender || !receiver) {
        throw new Error('Sender or receiver not found.');
      }
      
      // Check if a request with the same sender, receiver, and function already exists
      const existingRequestQuery = await firestore()
        .collection('JoinRequests')
        .where('senderId', '==', senderId)
        .where('receiverId', '==', receiverId)
        .where('funcId', '==', funcId)
        .get();
      
      
      if (!existingRequestQuery.empty) {
        console.log('A request has already been sent to this receiver for this function.');
        return; // Prevent sending a duplicate request
      }

      const existingGroupQuery = await firestore()
        .collection('groups')
        .where('ownerId', '==', receiverId)
        .where('parent_func_id', '==', funcId)
        .get();

      if (!existingGroupQuery.empty && existingGroupQuery.docs[0].data().members.includes(senderId)) {
        console.log('User is already a member of this group.');
        return; // Prevent sending a request if the user is already a member
      }
  
      // Create a new document reference in the JoinRequests collection
      const newReqRef = firestore().collection('JoinRequests').doc(); // Generates a new document ID
  
      // Set the request data in the JoinRequests collection
      await newReqRef.set({
        reqId: newReqRef.id,       // Generated request ID
        senderId: senderId,        // Sender's ID
        receiverId: receiverId,    // Receiver's ID
        status: 'pending',         // Initial status of the request
        userName: sender.name,     // Sender's name
        funcName: funcName,        // Name of the function
        funcId: funcId,            // Function ID
        createdAt: firestore.FieldValue.serverTimestamp(),
        message: message // Timestamp for tracking request creation
      });
  
      console.log('Join request sent successfully!');
    } catch (err) {
      console.error('Error sending join request:', err);
      return null;
    }
  };
  

export const getReceivedRequests = async (receiverId: string) => {
  try {
    const snapshot = await firestore()
      .collection('JoinRequests')
      .where('receiverId', '==', receiverId)
      .get();

    const requests = snapshot.docs.map(doc => ({
      reqId: doc.id,
      ...doc.data(),
    }));

    return requests;
  } catch (err) {
    console.error('Error fetching received requests:', err);
    return [];
  }
};

export const getSentRequests = async (senderId: string) => {
  try {
    const snapshot = await firestore()
      .collection('JoinRequests')
      .where('senderId', '==', senderId)
      .get();

    const requests = snapshot.docs.map(doc => ({
      reqId: doc.id,
      ...doc.data(),
    }));

    return requests;
  } catch (err) {
    console.error('Error fetching sent requests:', err);
    return [];
  }
};

export const acceptRequest = async (reqId: string) => {
  try {
    // Fetch the request document using reqId
    const reqDoc = await firestore().collection('JoinRequests').doc(reqId).get();

    if (!reqDoc.exists) {
      throw new Error('Request not found.');
    }

    const requestData:Partial<RequestType> | undefined = reqDoc.data();
 
    if(!requestData) return

    const { senderId, receiverId, funcId } = requestData;

    // Fetch the relevant group where ownerId == receiverId and parent_func_id == funcId
    const groupQuery = await firestore()
      .collection('groups')
      .where('ownerId', '==', receiverId)
      .where('parent_func_id', '==', funcId)
      .get();

    if (groupQuery.empty) {
      throw new Error('Group not found for the specified function and owner.');
    }

    // Assuming there is only one group that matches the query
    const groupDoc = groupQuery.docs[0];
    const groupId = groupDoc.id;

    // Add the senderId to the group's members list (assuming the group document has a 'members' field)
    await firestore().collection('groups').doc(groupId).update({
      members: firestore.FieldValue.arrayUnion(senderId) // Adds senderId to the members array
    });

    await firestore().collection('functions').doc(funcId).update({
      joined_users: firestore.FieldValue.arrayUnion(senderId) // Adds senderId to the members array
    });


    // Delete the request after accepting it
    await firestore().collection('JoinRequests').doc(reqId).delete();

    console.log('Request accepted and user added to the group.');
  } catch (err) {
    console.error('Error accepting request:', err);
    return null;
  }
};

export const rejectReq = async (reqId: string) => {
  try {
    // Fetch the request document to check if it exists
    const reqDoc = await firestore().collection('JoinRequests').doc(reqId).get();

    if (!reqDoc.exists) {
      throw new Error('Request not found.');
    }

    // Delete the request from the collection
    await firestore().collection('JoinRequests').doc(reqId).delete();

    console.log('Request rejected and deleted successfully.');
  } catch (err) {
    console.error('Error rejecting request:', err);
    return null;
  }
};


export const getGroupsByFunctionId = async (funcId: string) => {
  try {
    const snapshot = await firestore()
      .collection('groups')
      .where('parent_func_id', '==', funcId)
      .get();

    const groups = snapshot.docs.map(doc => ({ 
      groupId: doc.id,
      ...doc.data()
     }));

     return groups;
  } catch (err) {
    console.error('Error fetching sent requests:', err);
    return [];
  }
};

export const getUsersFromArray = async (userIds: string[]) => {
  try {
    const users:User[] = []
    userIds.forEach(async userId => {
      const snapshot = await firestore()
      .collection('users')
      .where('id', '==',userId)
      .get();
      console.log("###Group Members:\n"+JSON.stringify(snapshot.docs[0]));
    })
    return users;
  } catch (err) {
    console.error('Error fetching sent requests:', err);
    return [];
  }
};


export const getMembersOfGroup = async (groupId: string) => {
  try {
    const snapshot = await firestore()
      .collection('groups')
      .doc(groupId)
      .get();

    const group = snapshot.data();
    if(!group) return []
    const members = group.members
    const users = await getUsersFromArray(members)
    return users;
  } catch (err) {
    console.error('Error fetching :', err);
    return [];
  }
}

export const getFunctionJoinedByUser = async (userId: string) => {
  try {
    const snapshot = await firestore()
      .collection('functions')
      .where('joined_users', 'array-contains', userId)
      .get();

    const functions = snapshot.docs.map(doc => ({ 
      id: doc.id,
      ...doc.data()
     }));

     return functions;
  } catch (err) {
    console.error('Error fetching joined functions:', err);
    return [];
  }
}