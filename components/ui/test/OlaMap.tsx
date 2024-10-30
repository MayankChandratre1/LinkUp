import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Place {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
  layer: string[];
  distance_meters: number;
}

interface Place2 {
    formatted_address: string;
    geometry:{
        location:{
             lat: number;
             lng: number;
        }
    }
    place_id: string;
    name: string;
    types: string[];
  }

interface PlacesListProps {
  data: Place[];
}

const OlaMap: React.FC<PlacesListProps> = ({ data }) => {

    useEffect(() => {
        console.log(data.length);
        
    }, [data])
  const renderPlaceItem = ({ item }: { item: Place }) => (
    <View style={styles.card}>
      <Text className='text-sm font-isemibold' >{item.structured_formatting.main_text}</Text>
      <Text className='font-iregular'>{item.description}</Text>
      {/* <Text>{item.structured_formatting.secondary_text}</Text> */}
    </View>
    // <View style={styles.card}>
    //   <Text style={styles.title}>{item.name}</Text>
    //   <Text style={styles.description}>{item.formatted_address}</Text>
    //   <Text>{item.geometry.location.lat + ", " + item.geometry.location.lng}</Text>
    // </View>
  );
  return (
    <View className='p-3'>
      <Text>Total Places Found: {data.length}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.place_id}
        renderItem={renderPlaceItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  count: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default OlaMap;
