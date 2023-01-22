import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const apiKey = "AIzaSyC92rJr_GAOMmW17rs8zcYf6eLrm91O-tc"

const NavigateToFamily = () => {
    const mapRef = useRef();
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [selectedCoordinate, setSelectedCoordinate] = useState(null);
    const checkPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
    }
    useEffect(() => {
        checkPermission()
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
        errorMsg.log(text)
        alert(text)
    }

    const moveToLocation = ({ lat, lng }) => {
        mapRef.current.animateToRegion({
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
        }, 1000);
    }


    const onMapPress = (e) => {
        setSelectedCoordinate(e.nativeEvent.coordinate);
    }
    return (
        <View style={styles.container}>
            <MapView.Animated
                onPress={onMapPress}
                ref={mapRef}
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
            </MapView.Animated>
            <View style={styles.input}>
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: 'geometry', }}
                    fetchDetails={true}
                    placeholder='Search'
                    onPress={(data, details = null) => moveToLocation(details.geometry.location)}
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

export default NavigateToFamily;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        position: "relative",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        overflow: "hidden"
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
        top: 10,
    }
});