import { View, Text, Modal, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addCollege, getCollegeListPaged, getCollegeListPagedKeywords } from '@/firebase/services/rnFirebase/db';
import { CustomButton2 } from '../CustomButton';

const CollegePicker = ({ setValue }: { setValue: (text: string) => void }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [filter, setFilter] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [lastCollege, setLastCollege] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [filterLimit, setFilterLimit] = useState(false);
  const [addCollegeActive, setAddCollegeActive] = useState(false);
  

  const [toAddCollege, setToAddCollege] = useState({
    college: '',
    city: ''
  })

  useEffect(() => {
    setFilteredData([])
    setLastCollege(null)
    setFilterLimit(false)
    const timeout = setTimeout(() => {
      fetchColleges();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [filter]);

  const filterData = (item: any) =>
    item?.keywords?.includes(filter.toUpperCase());

  const removeDuplicates = (array: any[]) =>
    array.filter((item, index, self) =>
      index === self.findIndex((t) => t.college === item.college)
    );

  const fetchColleges = async () => {
    if(filterLimit) return;
    setLoading(true);
    const { collegeObjects, lastDoc } = await getCollegeListPagedKeywords(filter, lastCollege);

    if (lastDoc) {
      setLastCollege(lastDoc);
    }
    if(collegeObjects.length == 0){
      setFilterLimit(true)
    }
    if (collegeObjects) {
      const filteredCollegeData = removeDuplicates(collegeObjects.filter(filterData));
      const nonDupes = removeDuplicates([...filteredData, ...filteredCollegeData]);
      console.log(JSON.stringify(nonDupes));
      
      setFilteredData(nonDupes);
    }
    setLoading(false);
  };

  const handleSelect = (abbr: string) => {
    setSelectedValue(abbr);
    setValue(abbr);
    setModalVisible(false);
  };


  const addNewCollege = async () => {
    setLoading(true);
    const { college, city } = toAddCollege;
    if(college && city){
      
      await addCollege({college, city});
      setSelectedValue(college);
      setLoading(false);
      setAddCollegeActive(!addCollegeActive);
    }
  }
  return (
    <View className="rounded-lg mb-4">
      <Text className="text-lg text-textcolorII font-isemibold mb-2">Select College</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="border border-gray-300 p-3 rounded bg-white"
      >
        <Text className="font-isemibold text-gray-700">
          {selectedValue || "Select college"}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="justify-center rounded-lg">
          <View className="bg-white mx-5 p-4 rounded-lg h-[80%]">
            <Text className="text-lg font-isemibold mb-4">Choose College</Text>
            {
              !addCollegeActive && <>
                <TextInput
              className="border border-neutral p-3 rounded text-md font-iregular mt-2"
              placeholder="Search"
              value={filter}
              onChangeText={setFilter}
              autoCapitalize="none"
            />
            
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item?.college || Math.random().toString()}
              className="rounded-lg"
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item.college)}
                  className="p-3 border-b border-accentI rounded-lg"
                >
                  <Text className="font-iregular text-gray-800">{item.college}</Text>
                </TouchableOpacity>
              )}
              onEndReached={fetchColleges}
            />
              </>}
            {loading && !addCollegeActive && (
              <Text className="text-center font-iregular text-gray-700">Loading...</Text>
            )}
            {loading && addCollegeActive && (
              <Text className="text-center font-iregular text-gray-700">Adding new college...</Text>
            )}
             {!loading && filteredData.length === 0 && (
              <View className='flex-1 justify-center'>
                {
                  !addCollegeActive && <Text className="flex-1 text-center font-iregular text-gray-700">
                  No colleges found
                </Text>
                }
                {
                  addCollegeActive && <View className=' justify-center'>
                  <TextInput
                    className="border border-neutral p-3 rounded text-md font-iregular mt-2"
                    placeholder="Enter college name"
                    autoCapitalize="none"
                    value={toAddCollege.college}
                    onChangeText={(text)=>setToAddCollege({...toAddCollege, college: text.toUpperCase()})}
                    />
                  <TextInput
                    className="border border-neutral p-3 rounded text-md font-iregular mt-2"
                    placeholder="Enter college city"
                    autoCapitalize="none"
                    value={toAddCollege.city}
                    onChangeText={(text)=>setToAddCollege({...toAddCollege, city: text.toUpperCase()})}
                    />
                  </View>
                }
                <View className=' flex-row mt-4'>
                {
                addCollegeActive &&  <CustomButton2 title="add college" onPress={()=>{
                  addNewCollege();
                }} containerStyles='flex-1'>
                  <Text className="text-primary font-isemibold">Add</Text>
                </CustomButton2>
               }
                  <CustomButton2 title="add college" onPress={()=>{
                   setAddCollegeActive(!addCollegeActive);
                   }} containerStyles='flex-1'>
                  <Text className="text-primary font-isemibold">{addCollegeActive ?  "Cancel":"Add your college"}</Text>
                   </CustomButton2>
              
                </View>
              </View>
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="mt-3 bg-gray-200 p-3 rounded-lg"
            >
              <Text className="text-center font-regular text-gray-700">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CollegePicker;
