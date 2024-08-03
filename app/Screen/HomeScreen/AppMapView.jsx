import React, { useContext, useEffect, useState, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";
import GlobalApi from "../../Utils/GlobalApi";

export default function AppMapView({ placeList, scrollToIndex, navigateToCoords }) {
    const { location } = useContext(UserLocationContext);
    const [directions, setDirections] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        if (location && navigateToCoords) {
            fetchDirections(location, navigateToCoords);
        }
    }, [location, navigateToCoords]);


    const fetchDirections = async (origin, destination) => {
        try {
            const response = await GlobalApi.getDirections(
                `${origin.latitude},${origin.longitude}`,
                `${destination.latitude},${destination.longitude}`
            );
            if (response.routes.length > 0) {
                const points = response.routes[0].overview_polyline.points;
                const decodedPoints = decodePolyline(points);
                setDirections(decodedPoints);
            }
        } catch (error) {
            console.error('Error fetching directions:', error);
        }
    };

    const decodePolyline = (encoded) => {
        let points = [];
        let index = 0, lat = 0, lng = 0;
        while (index < encoded.length) {
            let b, shift = 0, result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
            lng += dlng;
            points.push({
                latitude: (lat / 1E5),
                longitude: (lng / 1E5)
            });
        }
        return points;
    };

    useEffect(() => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421
            }, 1000);
        }
    }, [location]);

    return location?.latitude && (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                customMapStyle={MapViewStyle}
                region={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0421
                }}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                >
                    <Image
                        source={require('../../../assets/images/location.png')}
                        style={{ width: 50, height: 50 }}
                    />
                </Marker>

                {placeList?.map((place, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: place.geometry.location.lat,
                            longitude: place.geometry.location.lng
                        }}
                        onPress={() => scrollToIndex(index)}
                    >
                        <Image
                            source={require('../../../assets/images/bank_location.png')}
                            style={{ width: 50, height: 50 }}
                        />
                    </Marker>
                ))}

                {directions && (
                    <Polyline
                        coordinates={directions}
                        strokeColor="#FF6347"
                        strokeWidth={5}
                    />
                )}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
