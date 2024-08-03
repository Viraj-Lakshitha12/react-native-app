import React from "react";
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from "react-native";
import Colors from "../../Utils/Colors";
import GlobalApi from "../../Utils/GlobalApi";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { useContext } from "react";
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function PlaceItem({ place, onPress }) {
    const PLACE_PHOTO_BASE_URL = "https://maps.googleapis.com/maps/api/place/photo";
    const PLACE_DEFAULT_IMAGE = require('../../../assets/images/bank.jpeg'); // Default image

    const { location } = useContext(UserLocationContext);

    const getPlaceImageUrl = (place) => {
        if (place.photos && place.photos.length > 0) {
            return `${PLACE_PHOTO_BASE_URL}?photoreference=${place.photos[0].photo_reference}&key=${GlobalApi.API_KEY}&maxheight=800&maxwidth=1200`;
        }
        return PLACE_DEFAULT_IMAGE;
    };

    const openGoogleMaps = () => {
        if (location && place) {
            const url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${place.geometry.location.lat},${place.geometry.location.lng}&travelmode=driving`;
            Linking.openURL(url);
        } else {
            console.error('Current location or destination place is not available.');
        }
    };

    return (
        <TouchableOpacity onPress={() => onPress(place.geometry.location.lat, place.geometry.location.lng)}>
            <View style={styles.container}>
                <LinearGradient colors={['transparent', '#ffffff', '#ffffff']}>
                    <Image
                        source={
                            typeof getPlaceImageUrl(place) === 'string'
                                ? { uri: getPlaceImageUrl(place) }
                                : getPlaceImageUrl(place)
                        }
                        style={styles.image}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.name}>{place.name}</Text>
                        <View style={styles.vicinityContainer}>
                            <Text style={styles.vicinity}>{place.vicinity}</Text>
                            <View style={styles.iconContainer}>
                                <FontAwesome
                                    name="location-arrow"
                                    size={20}
                                    color="white"
                                    onPress={openGoogleMaps}
                                />
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width * 1,
        backgroundColor: Colors.WHITE,
        margin: 0,
        marginBottom: 5,
        borderRadius: 10,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        zIndex: -1,
    },
    textContainer: {
        padding: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.BLACK,
    },
    vicinityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vicinity: {
        fontSize: 12,
        color: Colors.GRAY,
    },
    iconContainer: {
        width: 30,
        height: 30,
        borderRadius: 12,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
