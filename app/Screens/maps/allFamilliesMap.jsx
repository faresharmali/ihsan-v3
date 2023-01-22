import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button } from 'native-base';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const apiKey = "AIzaSyC92rJr_GAOMmW17rs8zcYf6eLrm91O-tc"

const AllFamilliesMap = () => {
    const mapRef = useRef();

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);

        })();
    }, []);
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
        errorMsg.log(text)
    }

    const moveToLocation = ({ lat, lng }) => {
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
        }, 1000);
    }

    const destination = {
        latitude: 34.67264651170966,
        longitude: 3.2496815480574,
        llatitudeDelta: 0.20,
        longitudeDelta: 0.20,
    }
    const onMapPress=(e)=>{
        console.log(e.nativeEvent.coordinate);
        setSelectedCoordinate(e.nativeEvent.coordinate);
    }
    return (
        <View style={styles.container}>
            <MapView.Animated
            onPress={onMapPress}
                mapPadding={{ top: 40, left: 0, right: 0, bottom: 0 }}

                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}

                initialRegion={{
                    latitude: 36.73853642090366,
                    longitude: 3.341331619319886,
                    latitudeDelta: 0.20,
                    longitudeDelta: 0.20,
                }}
            > 

                {/* <MapViewDirections
                    origin={location}
                    destination={destination}
                    apikey={apiKey}
                    strokeWidth={5}
                    strokeColor="#00b0ff"
                /> */}
                {selectedCoordinate &&  <Marker coordinate={selectedCoordinate} title="مقر سكن" />}
               
            </MapView.Animated>
            <View style={styles.input}>
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                    fetchDetails={true}
                    placeholder='Search'
                    onPress={(data, details = null) =>moveToLocation(details.geometry.location)}
                    query={{
                        key: apiKey,
                        language: 'ar',
                        types: 'geocode' // default: 'geocode'
                    }}
                />
            </View>
        </View>

    );
}

export default AllFamilliesMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: "relative",
        padding: 0,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    btn: {
        position: "absolute",
        bottom: 50,
        width: 120,
        zIndex: 5,
        height: 50,
        backgroundColor: "red"
    },
    input: {
        position: "absolute",
        width: "80%",
        left: "5%",
        zIndex: 7,
        top: 50,
    }
});