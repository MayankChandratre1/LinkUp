import { View, Text, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const NewCityPicker = ({
    setValue, stateCode, existingValue
}:{
    setValue: (city: string) => void,
    stateCode: string,
    existingValue?: string
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(existingValue||"");
    const [filter, setFilter] = useState<string>("")
    const [data, setData] = useState<any[]>([])
    
    useEffect(() => {
        // Fetch states
        const timeOut = setTimeout(() => {
          if (stateCode.trim()) {
            const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/IN/regions/${stateCode}/cities?limit=10&namePrefix=${filter}`;
            console.log(url);
    
            const cityData = axios.get(
              `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/IN/regions/${stateCode}/cities?limit=10&namePrefix=${filter}`,
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
              setData([...res.data.data.map((city: any) => city.name)]);
            });
          }
        }, 500);
        return () => clearTimeout(timeOut);
        // Fetch cities
      }, [filter]);
    
    const handleSelect = (name: string) => {
      setSelectedValue(name);
      setValue(name);
      setModalVisible(false);
    };
  
    return (
      <View className=" rounded-lg">
        <Text className="text-sm text-textcolorII font-iregular mb-2">Select City</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="border border-gray-300 p-3 rounded bg-white"
        >
          <Text className="text-gray-700 font-isemibold">
            {selectedValue ? selectedValue : "Select your City"}
          </Text>
        </TouchableOpacity>
  
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
         
        >
          <View className="flex-1 justify-center rounded-lg ">
            <View className="bg-white mx-5 p-4 rounded-lg h-[80%]">
              <Text className="text-lg font-isemibold mb-4 ">Choose Qualification</Text>
              <TextInput
                className="border border-neutral p-3 rounded text-md font-iregular mt-2"
                placeholder="Search"
                value={filter}
                onChangeText={setFilter}
                autoCapitalize="none"
              />
              <FlatList
                data={data}
                keyExtractor={(item) => item}
                className=' rounded-lg'
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    className="p-3 border-b border-accentI rounded-lg"
                  >
                    <Text className="text-gray-800 font-iregular">{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="mt-3 bg-gray-200 p-3 rounded-lg"
              >
                <Text className="text-center font-iregular text-gray-700">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
}

export default NewCityPicker