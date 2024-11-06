import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TextInputBase,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { User } from "@/types/userTypes";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/firebase/services/rnFirebase/storage";
import { CustomButton2 } from "../CustomButton";
import { states } from "@/util/STATES_DATA";
import axios from "axios";
import { getCurrentUserInfo, updateUser } from "@/firebase/services/rnFirebase/db";
import { router } from "expo-router";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import EducationPicker from "./EducationPicker";
import CollegePicker from "./CollegePicker";
import StatePicker from "./StatePicker";
import NewCityPicker from "./NewCityPicker";

type Gender = "Male" | "Female" | "Nonbinary" | "Other" | null;

const RegistrationForm = () => {
  const [user, setUser] = useState<Partial<User>>({});
  const [profilePics, setProfilePics] = useState<string[]>([]);
  const [error, setError] = useState<any | null>({
    name: false,
    bio: false,
    photos: false,
    dateOfBirth: false,
    current_address: false,
    interests: false,
    gender: false,
    height: false,
    education: false,
    job: false,
  });
  useEffect(()=>{
    getCurrentUserInfo().then(res => {
      if(!res?.isNewProfile){
        router.push("/(tabs)/profiles")
      }
    })
  })

  function calculateAge(dob: Date) {
    // Parse the input string to create a Date object

    if (isNaN(dob.getTime())) {
      throw new Error("Invalid date format. Please use 'MMM DD YYYY'.");
    }

    // Get the current date
    const today = new Date();

    // Calculate the age in years
    let age = today.getFullYear() - dob.getFullYear();

    // If the birth date hasn't occurred yet this year, subtract one from the age
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  }

  const checkFields = () => {
    setError({
      name: false,
      bio: false,
      photos: false,
      dateOfBirth: false,
      current_address: false,
      interests: false,
      gender: false,
    });

    if (!user.name) {
      setError({ ...error, name: true });
      return false;
    }
    if (!user.bio) {
      setError({ ...error, bio: true });
      return false;
    }
    if (profilePics.length === 0) {
      setError({ ...error, photos: true });
      return false;
    }
    if (
      !user.personalInfo?.dateOfBirth ||
      calculateAge(new Date(user.personalInfo?.dateOfBirth.nanoseconds)) < 18
    ) {
      setError({ ...error, dateOfBirth: true });
      return false;
    }
    if (!user.personalInfo?.current_address) {
      setError({ ...error, current_address: true });
      return false;
    }
    if (!user.interests) {
      setError({ ...error, interests: true });
      return false;
    }
    if (!user.personalInfo.gender) {
      setError({ ...error, gender: true });
      return false;
    }
    return true;
  };

  const saveAndContinue = async () => {
    // await signOut()
    // router.push("/(auth)/getstarted")

    if (!checkFields()) {
      return;
    }
    console.log("Saving user data:", user);
    console.log("Saving user data:", profilePics);
    const profilePicUrls = await uploadProfilePics();
    console.log("Profile pic urls:", profilePicUrls);
    // Save user data to database
    if (profilePicUrls) {
      const res = await updateUser({
        user: {
          ...user,
          photos: profilePicUrls,
          personalInfo: {
            ...user.personalInfo,
          },
          isNewProfile: false,
        },
      });
      router.push("/(tabs)/profiles");
      console.log("User data saved:", res);
    }
  };

  const uploadProfilePics = async () => {
    try {
      if (profilePics.length === 0) {
        return null;
      }
      const urls = await Promise.all(
        profilePics.map(async (image) => {
          const response = await fetch(image);
          const blob = await response.blob();
          return await uploadImage(blob);
        })
      );
      return urls;
    } catch (err) {
      console.error("Error uploading images:", err);
      return null;
    }
  };
  return (
    <View className="px-1 py-5">
      {error.name && (
        <Text className="text-red-500 font-iregular mb-2">
          Name is required
        </Text>
      )}
      <Name
        setName={(name) => {
          setUser({ ...user, name });
        }}
        existingValue={user.name || ""}
      />
      {error.bio && (
        <Text className="text-red-500 font-iregular mb-2">Bio is required</Text>
      )}
      <Bio
        setBio={(bio) => {
          setUser({ ...user, bio });
        }}
        existingValue={user.bio || ""}
      />
      {error.gender && (
        <Text className="text-red-500 font-iregular mb-2">
          Select Gender again
        </Text>
      )}
      <Gender
        setGender={(gender) => {
          setUser({ ...user, personalInfo: { ...user.personalInfo, gender } });
        }}
        existingValue={user.personalInfo?.gender || null}
      />
       {error.dateOfBirth && (
        <Text className="text-red-500 font-iregular mb-2">
          Select Valid Date
        </Text>
      )}
      <DateOfBirth
        setDob={(dob) => {
          setUser({
            ...user,
            personalInfo: {
              ...user.personalInfo,
              dateOfBirth: dob,
              age: calculateAge(new Date(dob.nanoseconds)) + "",
            },
          });
        }}
        existingValue={user.personalInfo?.dateOfBirth || null}
      />
      {error.current_address && (
        <Text className="text-red-500 font-iregular mb-2">
          Select Address again
        </Text>
      )}
      <Address
        setAddress={(current_address) => {
          setUser({
            ...user,
            personalInfo: { ...user.personalInfo, current_address },
          });
        }}
        existingValue={user.personalInfo?.current_address || ""}
      />
       {error.height && (
        <Text className="text-red-500 font-iregular mb-2">
          Height is required
        </Text>
      )}
      <Height
        setHeight={(height) => {
          setUser({ ...user, personalInfo: { ...user.personalInfo, height } });
        }}
        existingValue={user.personalInfo?.height || ""}
      />
      {error.photos && (
        <Text className="text-red-500 font-iregular mb-2">
          At least one photo is required
        </Text>
      )}
      <ProfilePic
        setProfilePic={(pics) => {
          setProfilePics(pics);
        }}
        existingValue={profilePics}
      />
     

      

      
      {error.interests && (
        <Text className="text-red-500 font-iregular mb-2">
          Choose at least one interest
        </Text>
      )}
      <Interests
        setInterests={(interests) => {
          setUser({ ...user, interests });
        }}
        existingValue={user.interests || []}
      />
     {
       error.education && (
        <Text className="text-red-500 font-iregular mb-2">
          Education is required
        </Text>)
     }
      <Education
        setEducationData={(edu) => {
          setUser({ ...user, professionalInfo: { ...user.professionalInfo, college:edu.college, education:edu.degree } });
        }}
        existingValue={{
          college: user.professionalInfo?.college || "",
          education: user.professionalInfo?.education || "",
        }}
      />
      {
        error.job && (
          <Text className="text-red-500 font-iregular mb-2">
            Job is required
          </Text>)
      }
      <Job
        setJob={(job) => {
          setUser({ ...user, professionalInfo: { ...user.professionalInfo, current_job:job }});
        }}
        existingValue={user.professionalInfo?.current_job || ""}
      />
    
      <View>
        <CustomButton2
          title="Save"
          containerStyles="bg-primary p-4 px-4 mt-4"
          onPress={saveAndContinue}
        >
          <Text className="text-textcolorIII font-isemibold">
            Save & Continue
          </Text>
        </CustomButton2>
      </View>
    </View>
  );
};

export const Name = ({ setName, existingValue }: { setName: (name: string) => void, existingValue:string }) => {
  return (
    <View className="my-1">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">Name</Text>
      <TextInput
        placeholder="Full Name"
        value={existingValue}
        onChangeText={setName}
        className="border-2 rounded-md border-textcolorI p-2 my-2 font-iregular"
      />
    </View>
  );
};

export const Bio = ({ setBio, existingValue }: { setBio: (bio: string) => void, existingValue:string }) => {
  return (
    <View className="my-1">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
        Add a bio
      </Text>
      <TextInput
        placeholder="Describe yourself in 250 characters..."
        onChangeText={setBio}
        maxLength={250}
        multiline
        value={existingValue}
        className="border-2 rounded-md border-textcolorI p-2 my-2 font-iregular"
      />
    </View>
  );
};

export const ProfilePic = ({
  setProfilePic,
  existingValue
}: {
  setProfilePic: (pics: string[]) => void;
  existingValue: string[];
}) => {
  const [images, setImages] = useState<string[]>(existingValue);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    if (images.length >= 5) {
      setError("Maximum of 5 photos allowed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImages([...images, result.assets[0].uri]);
      setProfilePic([...images, result.assets[0].uri]);
      setError(""); // Clear any existing errors
    }
  };

  const removeImage = (uri: string) => {
    setImages(images.filter((image) => image !== uri));
  };
  return (
    <ScrollView className="my-1">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
        Add Profile Pictures
      </Text>
      <View className="flex-row items-center my-2">
        <TouchableOpacity
          onPress={pickImage}
          className=" bg-accent border-2 w-24 h-24 justify-center items-center rounded-full"
        >
          <Text className="text-3xl text-black flex justify-center items-center font-mono">
            +
          </Text>
        </TouchableOpacity>
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {images.map((uri, index) => (
            <View key={index} style={{ position: "relative", margin: 5 }}>
              <Image
                source={{ uri }}
                style={{ width: 90, height: 90, borderRadius: 10 }}
              />
              <TouchableOpacity
                onPress={() => removeImage(uri)}
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  borderRadius: 15,
                  padding: 5,
                }}
                className="bg-accentII"
              >
                <Text className="text-center font-iregular w-5 h-5">X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export const Interests = ({
  setInterests,
  existingValue
}: {
  setInterests: (interests: string[]) => void;
  existingValue: string[];
}) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(existingValue);
  const [error, setError] = useState<string | null>(null);
  const [addingInterest, setAddingInterest] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [interestsList, setInterestsList] = useState([
    "Reading",
    "Traveling",
    "Cooking",
    "Photography",
    "Fitness",
    "Gardening",
    "Painting",
    "Music",
    "Gaming",
    "Hiking",
    "Temples",
    "Clubbing",
    "Parties",
    "Movies",
  ]);
  const maxSelection = 5;

  useEffect(() => {
    setInterests(selectedInterests);
  }, [selectedInterests]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prevInterests) => {
      if (prevInterests.includes(interest)) {
        // Deselect if already selected
        return prevInterests.filter((i) => i !== interest);
      } else if (prevInterests.length < maxSelection) {
        // Select if within limit
        return [...prevInterests, interest];
      } else {
        setError(`You can select a maximum of ${maxSelection} interests.`);
        return prevInterests;
      }
    });
    setError(null);
  };
  return (
    <View className=" my-1 justify-center">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
        Select Interests/Hobbies
      </Text>
      {error && (
        <Text className="font-iregular text-red-500 mb-2">{error}</Text>
      )}
      {addingInterest && (
        <View className="flex-row">
          <TextInput
            placeholder="Add New Interest"
            className="border-2 rounded-md border-textcolorI p-2 my-2 font-iregular flex-1"
            onChangeText={(text) => {
              setNewInterest(text);
            }}
          />
          <CustomButton2
            title="add"
            containerStyles="bg-primary p-2 px-4 ml-2 my-2"
            onPress={() => {
              // add interest
              if (newInterest.trim()) {
                setInterestsList([...interestsList, newInterest]);
                setSelectedInterests([...selectedInterests, newInterest]);
                setAddingInterest(false);
              }
            }}
          >
            <Text className="text-textcolorIII font-isemibold">Add</Text>
          </CustomButton2>
        </View>
      )}
      <View className="flex-row flex-wrap gap-3">
        {interestsList.map((interest) => (
          <TouchableOpacity
            key={interest}
            className={`p-2 mb-2 rounded-md  ${
              selectedInterests.includes(interest) ? "bg-accentI" : "border"
            }`}
            onPress={() => toggleInterest(interest)}
          >
            <Text
              className={`text-center font-iregular ${
                selectedInterests.includes(interest)
                  ? "text-textcolorIII font-semibold"
                  : "text-textcolorII"
              }`}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          className={`p-2 mb-2 rounded-md border`}
          onPress={() => {
            setAddingInterest(true);
          }}
        >
          <Text className={`text-center font-iregular text-textcolorII`}>
            + Add New
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const AddressOld = ({ setAddress }: { setAddress: (address: string) => void }) => {
  const [state, setState] = useState("");
  const [stateCode, setStateCode] = useState("");
  const [city, setCity] = useState("");
  const [statesList, setStatesList] = useState<any[]>(states);
  const [cities, setCities] = useState<string[]>([]);
  const [filterCity, setFilterCity] = useState("");
  const [filterState, setFilterState] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Fetch states
    const timeOut = setTimeout(() => {
      if (stateCode.trim()) {
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/IN/regions/${stateCode}/cities?limit=10&namePrefix=${filterCity}`;
        console.log(url);

        const cityData = axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/IN/regions/${stateCode}/cities?limit=10&namePrefix=${filterCity}`,
          {
            headers: {
              "x-rapidapi-key":
                "701590c760msh3a73149b098f0b4p1eade8jsne42eeeff9454",
              "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );

        cityData.then((res) => {
          console.log(res.data.data);
          setCities([...res.data.data.map((city: any) => city.name)]);
        });
      }
    }, 500);
    return () => clearTimeout(timeOut);
    // Fetch cities
  }, [filterCity, offset]);

  useEffect(() => {
    setAddress(`${city}, ${state}`);
  }, [city]);

  return (
    <View>
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
        Address
      </Text>
      <View>
        <TextInput
          placeholder="State"
          onChangeText={(text) => {
            setState("");
            setFilterState(text);
          }}
          value={state || filterState}
          className="border-2 rounded-md border-textcolorI p-2 my-2 font-iregular"
        />
        {filterState.trim() && (
          <View className="bg-textcolorIII rounded-md">
            {statesList.map((state, index) => {
              if (
                state.name.toLowerCase().startsWith(filterState.toLowerCase())
              )
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setState(state.name);
                      setStateCode(state.isoCode);
                      setFilterState("");
                    }}
                    className="p-2 border-b border-textcolorI"
                  >
                    <Text className="text-textcolorI font-iregular">
                      {state.name}
                    </Text>
                  </TouchableOpacity>
                );
            })}
          </View>
        )}
      </View>
      <View>
        <TextInput
          placeholder="City"
          onChangeText={(text) => {
            setFilterCity(text);
            setCity("");
          }}
          onBlur={() => {
            if (!city.trim()) {
              setFilterCity("");
            }
          }}
          value={city || filterCity}
          className="border-2 rounded-md border-textcolorI p-2 my-2 font-iregular"
        />
        {!city.trim() && cities.length > 0 && (
          <View className="bg-textcolorIII rounded-md">
            {cities.map((city, index) => {
              if (city.toLowerCase().startsWith(filterCity.toLowerCase()))
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setCity(city);
                    }}
                    className="p-2 border-b border-textcolorI"
                  >
                    <Text className="text-textcolorI font-iregular">
                      {city}
                    </Text>
                  </TouchableOpacity>
                );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

export const Address = ({ setAddress, existingValue }: { setAddress: (address: string) => void, existingValue:string }) => {
  const [state, setState] = useState(existingValue.split(",")[1]?.trim() || "");
  const [stateCode, setStateCode] = useState(states.find((item) => item.name === state)?.isoCode || "");
  const [city, setCity] = useState(existingValue.split(",")[0]?.trim() || "");
  
  useEffect(() => {
    setAddress(`${city}, ${state}`);
  }, [city]);

  return (
    <View className="my-1">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
        Address
      </Text>
      <StatePicker existingValue={{name:state, isoCode:stateCode}} setValue={(state)=>{
        console.log(state);
        
        setState(state.name)
        setStateCode(state.isoCode)
      }} />
      {
        stateCode.trim().length > 0 && (
          <NewCityPicker existingValue={city} setValue={setCity} stateCode={stateCode} />
        )
      }
    </View>
  )
}

export const DateOfBirth = ({
  setDob,
  existingValue,
}: {
  setDob: (dob: { nanoseconds: number; seconds: number }) => void;
  existingValue: { nanoseconds: number; seconds: number } | null;
}) => {
  const [date, setDate] = useState<Date | null>(existingValue ? new Date(existingValue.nanoseconds) : null);
  const [error, setError] = useState("");
  const [isValidAge, setIsValidAge] = useState(true);
  const [age, setAge] = useState(-1);
  useEffect(() => {
    if (age < 18) setIsValidAge(false);
    else setIsValidAge(true);
    if (date) {
      setDob({
        nanoseconds: date.getTime(),
        seconds: date.getTime() * 1000,
      });
    }
  }, [age]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate;
    if (currentDate) {
      setDate(currentDate);
      setAge(calculateAge(currentDate));
    }
  };

  function calculateAge(dob: Date) {
    // Parse the input string to create a Date object

    if (isNaN(dob.getTime())) {
      throw new Error("Invalid date format. Please use 'MMM DD YYYY'.");
    }

    // Get the current date
    const today = new Date();

    // Calculate the age in years
    let age = today.getFullYear() - dob.getFullYear();

    // If the birth date hasn't occurred yet this year, subtract one from the age
    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }
    return age;
  }

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date || new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const dateSTringFormatter = (date: string) => {
    const elements = date.split(" ");
    elements.shift();
    return elements.join(" ");
  };
  return (
    <View className="my-1">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
        Date of Birth
      </Text>
      {date && (
        <Text className="text-center font-iregular text-textcolorI mb-4">
          You are{" "}
          <Text className="font-isemibold text-textcolorII/70">
            {calculateAge(date)} years old!
          </Text>
        </Text>
      )}
      {!isValidAge && age != -1 && (
        <Text className="text-red-500 font-iregular mb-2">
          You Must be 18 years old
        </Text>
      )}
      <CustomButton2
        title="Select Date"
        containerStyles="p-2 rounded-lg border mb-4 w-full flex-row "
        onPress={showDatepicker}
      >
        <Text className="text-lg text-center font-iregular mr-4 text-textcolorI">
          {date ? dateSTringFormatter(date.toDateString()) : "Select Date"}
        </Text>
        <AntDesign name="calendar" size={24} color="black" />
      </CustomButton2>
    </View>
  );
};

export const Gender = ({ setGender, existingValue }: { setGender: (gender: string) => void, existingValue:string | Gender }) => {
  const [selectedGender, setSelectedGender] = useState<Gender | string>(existingValue);
  const [error, setError] = useState<string | null>(null);

  const genders = ["Male", "Female", "Nonbinary", "Other"];

  useEffect(() => {
    if (selectedGender) setGender(selectedGender);
  }, [selectedGender]);

  const handleGenderSelect = (gender: Gender | string) => {
    setSelectedGender(gender);
    setError(null);
  };
  return (
    <View className="justify-center my-1">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
        Gender
      </Text>
      {error && <Text className="text-red-500 mb-2">{error}</Text>}
      <View className="flex-row justify-start">
      {genders.map((gender) => (
        <TouchableOpacity
          key={gender}
          className={`p-3 font-iregular mb-2 mr-2 rounded-md ${
            selectedGender === gender ? "bg-accentI/90" : "border"
          }`}
          onPress={() => handleGenderSelect(gender)}
        >
          <Text
            className={`text-center font-iregular ${
              selectedGender === gender
                ? "text-textcolorIII font-semibold"
                : "text-textcolorII"
            }`}
          >
            {gender}
          </Text>
        </TouchableOpacity>
      ))}
      </View>
    </View>
  );
};

export const Height = ({ setHeight, existingValue }: { setHeight: (height: string) => void, existingValue:string }) => {
  const [isInch, setIsInch] = useState(true);
  const [foot, setFoot] = useState(existingValue.split("'")[0] || "");
  const [inch, setInch] = useState(existingValue.split("'")[1]?.split('"')[0] || "");
  const [cm, setCm] = useState(feetInchesToCm(foot, inch) || "");

  useEffect(() => {
    if (isInch) {
      setHeight(`${foot}'${inch}"`);
    } else {
      setHeight(cmToFeetInchesString(cm));
    }
  },[cm])
    
  
  function cmToFeetInchesString(cm: string): string {
    const totalInches = Number(cm) / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}'${inches}"`;
  }
  function cmToFeetInchesStates(cm: string) {
    const totalInches = Number(cm) / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    if(feet > 0){
      setFoot(feet+"")
      setInch(inches+"")
    }
  }
  function feetInchesToCm(feet: string, inches:string): string {
    const tInches = Number(inches) + Number(feet)*12
    const totalCm = Math.round(tInches * 2.54);
    return `${totalCm > 0 ? totalCm:""}`;
}
  return (
    <View className="my-2 first-letter:justify-center items-center">
    

      <View className="w-full">
        <Text className="text-textcolorII text-lg font-isemibold mb-1">
          What's your height?
        </Text>

        <CustomButton2
          title="toggle units"
          containerStyles="bg-transparent mb-2"
          onPress={() => {
            if (isInch) {
              setCm(feetInchesToCm(foot, inch));
            } else {
              cmToFeetInchesStates(cm);
            }
            setIsInch((prev) => !prev);
          }}
        >
          <Text className="font-iregular underline text-textcolorII">
            Switch to {isInch ? "Centimeters" : "Foot-Inch"}
          </Text>
        </CustomButton2>

        {isInch ? (
          <View className="flex-row items-center justify-center gap-2 ">
            <View className="border flex-1 rounded text-center h-14 flex-row items-center px-2">
              <TextInput
              className="flex-1 font-iregular border-neutral p-3 rounded text-center"
              placeholder=""
              value={foot.toString()}
              onChangeText={setFoot}
              keyboardType="numeric"
              autoCapitalize="none"
              />
              <Text className="px-4 text-textcolorI/50 font-iregular text-sm">feet</Text>
            </View>
            <View className="border flex-1 rounded text-center h-14 flex-row items-center px-2">
              <TextInput
              className="flex-1 border-neutral font-iregular p-3 rounded text-center"
              placeholder=""
              value={inch.toString()}
              onChangeText={setInch}
              keyboardType="numeric"
              autoCapitalize="none"
              />
              <Text className="px-4 text-textcolorI/50 font-iregular text-sm">inch</Text>
            </View>
            
          </View>
        ) : (
          <View className="items-center">
           <View className="border font-iregular rounded w-1/2 text-center flex-row items-center px-2">
           <TextInput
              className="p-3 rounded text-center flex-1"
              placeholder=""
              value={cm.toString()}
              onChangeText={setCm}
              keyboardType="numeric"
              autoCapitalize="none"
            />
            <Text className="px-4 text-textcolorI/50 font-iregular text-sm">cm</Text>
           </View>
          </View>
        )}
      </View>

      

      {/* <CustomButton2
        title="Skip"
        containerStyles="p-4 rounded-lg bg-secondary mb-4 w-full"
        onPress={() => router.push("/(auth)/registration/EducationAndJob")}
      >
        <Text className="text-md font-semibold text-center text-primary">
          Skip
        </Text>
      </CustomButton2> */}
    </View>
  )
}

export const Education = ({ setEducationData, existingValue }: { setEducationData: (education: {
  degree: string,
  college: string
}) => void, existingValue:{
  education: string,
  college: string
} }) => {
  const [education, setEducation] = useState(existingValue.education ||"")
  const [college, setCollege] = useState(existingValue.college||"")

  useEffect(() => {
    setEducationData({degree: education, college})
  }, [education, college])
  return (
    <View className="my-1">
      <Text className="text-textcolorII text-lg font-isemibold mb-1">
          Education
        </Text>
      <View className="mb-4">
          
          <EducationPicker existingValue={education} setValue={setEducation} />
          
        </View>
        <View className="">
       
       {/* <CustomButton2
         title="college-picker"
         containerStyles="bg-transparent items-start mb-4"
         onPress={() => setShow(true)}
       >
         <Text className="p-3 text-lg font-iregular text-textcolorII/70">
           {college || "Choose a college"}
         </Text>
       </CustomButton2> */}
       <CollegePicker existingValue={college} setValue={setCollege} />
     </View>
    </View>
  )
}

export const Job = ({ setJob, existingValue }: { setJob: (job: string) => void , existingValue:string}) => {
  const [designation, setDesignation] = useState(existingValue.split(" at ")[0] || '');
  const [company, setCompany] = useState(existingValue.split(" at ")[1] || '');

  useEffect(() => {
    setJob(`${designation} at ${company}`)
  }, [designation, company])

  return (
    <View className=" my-1 justify-center">
        <Text className="text-textcolorII text-lg font-isemibold mb-1">
          Profession
        </Text>
  
        <View className="mb-4">
          <Text className="font-iregular text-textcolorII mb-1">Designation/Occupation</Text>
          <TextInput
            className="border border-neutral p-3 rounded text-md font-iregular mt-2"
            placeholder="e.g. Senior Developer"
            value={designation}
            onChangeText={setDesignation}
            autoCapitalize="none"
          />
        </View>

        <View className="mb-4">
          <Text className="font-iregular text-textcolorII mb-1">Company</Text>
          <TextInput
            className="border border-neutral p-3 rounded text-md font-iregular mt-2"
            placeholder="e.g. ABC Pvt limited"
            value={company}
            onChangeText={setCompany}
            autoCapitalize="none"
          />
        </View>
      </View>
        
       
  )
}

export default RegistrationForm;
