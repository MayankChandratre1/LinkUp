import { View, Text, Modal, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { qualifications_list } from '@/util/EDU_DATA.js';

const EducationPicker = ({ setValue }: { setValue: (text: string) => void }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [filter, setFilter] = useState<string>("")
  const [data, setData] = useState(qualifications_list.qualifications)
  
  useEffect(()=>{
     setData(qualifications_list.qualifications.filter((item)=> item.abbr.toLowerCase().includes(filter.toLowerCase()) || item.full.toLowerCase().includes(filter.toLowerCase())))
  },[filter])
  
  const handleSelect = (abbr: string) => {
    setSelectedValue(abbr);
    setValue(abbr);
    setModalVisible(false);
  };

  return (
    <View className=" rounded-lg">
      <Text className="text-lg text-textcolorII font-isemibold mb-2">Select Qualification</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="border border-gray-300 p-3 rounded bg-white"
      >
        <Text className="text-gray-700 font-isemibold">
          {selectedValue ? selectedValue : "Select your qualification"}
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
              keyExtractor={(item) => item.full}
              className=' rounded-lg'
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.abbr)}
                  className="p-3 border-b border-accentI rounded-lg"
                >
                  <Text className="text-gray-800 font-iregular">{item.abbr + " - "+ item.full}</Text>
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
};

export default EducationPicker;
