import {View,Text,StyleSheet,Image} from "react-native";
import React from "react";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Colors from "../../Utils/Colors";

export default function SearchBar({searchedLocation}) {
    return (
        <View style ={{
            display:'flex',
            flexDirection:'row',
            marginTop:20,
            paddingHorizontal:5,
            backgroundColor:Colors.WHITE,
            borderRadius:6
        }}>
            <GooglePlacesAutocomplete
                placeholder='Search Banks'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    searchedLocation(details?.geometry?.location)
                }}
                query={{
                    key: 'AIzaSyAF6modZ-9xq9rRz_3v-JFpHcAafvFJXqw',
                    language: 'en',
                }}
            />
        </View>
    );
}