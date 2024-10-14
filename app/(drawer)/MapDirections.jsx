import React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const YourMapComponent = () => {
    return (
        <MapView style={{ flex: 1 }}>
            <MapViewDirections
                origin={{ latitude: 37.78825, longitude: -122.4324 }} // Replace with your origin
                destination={{ latitude: 37.78825, longitude: -122.4324 }} // Replace with your destination
                apikey={"YOUR_GOOGLE_MAPS_API_KEY"} // Your Google Maps API Key
                strokeWidth={3}
                strokeColor="hotpink"
            />
        </MapView>
    );
};

export default YourMapComponent;
