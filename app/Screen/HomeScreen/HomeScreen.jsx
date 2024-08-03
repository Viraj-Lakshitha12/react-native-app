import React, { useContext, useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import AppMapView from "./AppMapView";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { UserLocationContext } from "../../Context/UserLocationContext";
import GlobalApi from "../../Utils/GlobalApi";
import PlaceList from "./PlaceList";

export default function HomeScreen() {
    const { location, setLocation } = useContext(UserLocationContext);
    const [placeList, setPlaceList] = useState([]);
    const [navigateToCoords, setNavigateToCoords] = useState(null);
    const placeListRef = useRef(null);

    useEffect(() => {
        if (location) {
            GetNearByPlaces();
        }
    }, [location]);

    const calculateDistance = (lat1, lon1, lat2, lon2, unit = 'km') => {
        const toRad = (value) => (value * Math.PI) / 180;

        const R = 6371; // Radius of the Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distanceInKm = R * c;

        return unit === 'cu' ? distanceInKm : distanceInKm; // Adjust conversion if needed
    };

    const calculateDistancesForPlaces = (places) => {
        return places.map(place => {
            const distance = calculateDistance(
                location.latitude,
                location.longitude,
                place.latitude,
                place.longitude
            );
            return { ...place, distance };
        });
    };

    const GetNearByPlaces = async () => {
        try {
            const data = {
                location: `${location.latitude},${location.longitude}`,
                radius: 5000,
                type: "bank"
            };

            const result = await GlobalApi.NewNearByPlaces(data);
            console.log("Fetched places:", result.results);

            if (result.results) {
                const placesWithDistances = calculateDistancesForPlaces(result.results);
                setPlaceList(placesWithDistances);
            } else {
                console.error("No results found");
            }
        } catch (error) {
            console.error('Error fetching nearby places:', error);
        }
    };

    const scrollToIndex = (index) => {
        placeListRef.current?.scrollToIndex(index);
    };

    const handleNavigate = (latitude, longitude) => {
        setNavigateToCoords({ latitude, longitude });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <Header />
                <SearchBar searchedLocation={(location) => console.log(location)} />
            </View>
            <AppMapView placeList={placeList} scrollToIndex={scrollToIndex} navigateToCoords={navigateToCoords} />
            <View style={styles.placeListContainer}>
                <PlaceList placeList={placeList} ref={placeListRef} onNavigate={handleNavigate} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        zIndex: 10,
        padding: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    placeListContainer: {
        position: 'absolute',
        bottom: 0,
        zIndex: 10,
        width: '100%',
    }
});
