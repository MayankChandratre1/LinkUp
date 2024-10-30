import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native'; // Import the component
import OlaMap from './OlaMap';

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

const Ola: React.FC = () => {
    const [placeData, setPlaceData] = React.useState<Place[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
  
    useEffect(() => {
      const fetchPlaces = async () => {
        try {
        //   const response = await fetch('https://api.olamaps.io/places/v1/textsearch?input=pub%20in%20Mumbai&location=19.0760%2C72.8777&radius=5000&types=bar&size=100&api_key=DBqoTphIRyHOPH9ulQAXsNyC9omKkH57IVHzg96e');
          // const response = await fetch('https://api.olamaps.io/places/v1/nearbysearch?layers=venue&types=bar&location=19.0760%2C72.8777&radius=30000&strictbounds=false&withCentroid=false&api_key=DBqoTphIRyHOPH9ulQAXsNyC9omKkH57IVHzg96e&limit=50');
          
          const response = await fetch('https://api.olamaps.io/places/v1/nearbysearch?layers=venue&types=bar&location=19.0190909%2C72.8432964&radius=30000&strictbounds=false&withCentroid=false&api_key=DBqoTphIRyHOPH9ulQAXsNyC9omKkH57IVHzg96e&limit=50');
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setPlaceData(data.predictions);
          console.log(data.predictions);
           // Assuming 'predictions' is where your places are located
        } catch (error) {
          console.error('Error fetching places:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPlaces();
    }, []);

  return (
    <SafeAreaView >
        
         {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (<OlaMap data={placeData} /> )}

      <Text>Ola</Text>
    </SafeAreaView>
  );
};

export default Ola;
