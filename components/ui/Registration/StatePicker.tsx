import { View, Text, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { states } from '@/util/STATES_DATA'

const StatePicker = ({setValue, existingValue}:{
    setValue: (state: {name: string, isoCode: string}) => void,
    existingValue?: {name: string, isoCode: string}
}) => {
//   const [statesList, setStatesList] = React.useState<any[]>(states)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(existingValue?.name||"");
  const [filter, setFilter] = useState<string>("")
  const [data, setData] = useState(states)
  
  useEffect(()=>{
     setData(states.filter((item)=> item.name.toLowerCase().includes(filter.toLowerCase()) || item.name.toLowerCase().includes(filter.toLowerCase())))
  },[filter])
  
  const handleSelect = (name: string, isoCode: string) => {
    setSelectedValue(name);
    setValue({
        name,
        isoCode
    });
    setModalVisible(false);
  };

  return (
    <View className=" rounded-lg">
      <Text className="text-sm text-textcolorII font-iregular mb-2">Select State</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="border border-gray-300 p-3 rounded bg-white"
      >
        <Text className="text-gray-700 font-isemibold">
          {selectedValue ? selectedValue : "Select your State"}
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
              keyExtractor={(item) => item.name}
              className=' rounded-lg'
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.name, item.isoCode)}
                  className="p-3 border-b border-accentI rounded-lg"
                >
                  <Text className="text-gray-800 font-iregular">{item.name}</Text>
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

export default StatePicker