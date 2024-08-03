import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView,StyleSheet } from "react-native";
import LoginScreen from "./Screen/loginScreen/loginScreen";
import {ClerkProvider, SignedIn, SignedOut} from "@clerk/clerk-expo";
import React, {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import {NavigationContainer} from "@react-navigation/native";
import TabNavigation from "./Navigations/TabNavigation";
import * as Location from 'expo-location';
import {UserLocationContext} from "./Context/UserLocationContext";

const tokenCache = {
    async getToken(key){
        try{
            return await SecureStore.getItemAsync(key);
        }catch(err){
            return null;
        }
    },
    async saveToken(key, value){
        try{
            return await SecureStore.setItemAsync(key, value);
        }catch(err){
            return null;
        }
    }
}
const Welcome = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords)
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    return (
    <ClerkProvider
        tokenCache={tokenCache}
        publishableKey={'pk_test_bWVycnktYXBoaWQtNzYuY2xlcmsuYWNjb3VudHMuZGV2JA'}>
        <UserLocationContext.Provider value={{location,setLocation}}>
            <View style={Styles.container}>
                <SignedIn>
                    <TabNavigation/>
                </SignedIn>
                <SignedOut>
                    <LoginScreen/>
                </SignedOut>
                <StatusBar style="auto" />
            </View>
        </UserLocationContext.Provider>
    </ClerkProvider>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
})

export default Welcome;
