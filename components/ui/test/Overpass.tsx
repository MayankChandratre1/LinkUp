import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const OverpassAPIComponent = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 19.0760, // Coordinates of Mumbai
    longitude: 72.8777,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const boundingBoxes = [
    { south: 19.00, west: 72.77, north: 19.1, east: 72.87 },
    { south: 19.1, west: 72.87, north: 19.2, east: 72.97 },
    { south: 19.2, west: 72.97, north: 19.3, east: 73.07 }
    // Add more bounding boxes if needed
  ];

  useEffect(() => {
    const fetchOverpassData = async () => {
      const query = `
        [out:json];
        area[name="Mumbai"]->.searchArea;
        node["amenity"="restaurant"](area.searchArea);
        out body;
        >;
        out skel qt;
      `;

      const url = 'https://overpass-api.de/api/interpreter';

      try {
        const response = await axios.post(url, query, {
          headers: {
            'Content-Type': 'text/plain',
          },
        });
        setData(response.data.elements);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from Overpass API", error);
        setLoading(false);
      }
    };

    fetchOverpassData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView >
        <Text>Overpass API Data: {data?.length}</Text>
      <View >
        {data && 
          data.map((element) => (
            element.lat && element.lon && (
               <Text key={element.id}>{element.tags.name}</Text>
            )
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
 
  },
});

export default OverpassAPIComponent;
