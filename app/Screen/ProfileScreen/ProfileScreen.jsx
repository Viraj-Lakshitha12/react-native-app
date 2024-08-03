import {StatusBar} from "expo-status-bar";
import {View,Text,StyleSheet,Image} from "react-native";
import React from "react";
import Header from "../HomeScreen/Header";
import {useUser} from "@clerk/clerk-expo";

export default function ProfileScreen(){
    const {user} = useUser();
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: user?.imageUrl }}
                style={styles.image}
            />
            <Text style={styles.name}>{user?.firstName}</Text>
            <Text style={styles.name}>{user?.lastName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        marginTop: 20, // Adjust the value as needed
    },
    image: {
        width: 150, // Adjust the size as needed
        height: 150, // Adjust the size as needed
        borderRadius: 75, // Half of the width and height to make it circular
    },
    name: {
        fontSize: 20, // Adjust the size as needed
        fontWeight: 'bold', // Adjust the font weight as needed
        marginTop: 10, // Space between image and text
        textAlign: 'center', // Center text
    },
});