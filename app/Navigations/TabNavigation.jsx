import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen'
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import Colors from "../Utils/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarInactiveTintColor: Colors.GRAY,
                tabBarStyle: { backgroundColor: Colors.WHITE },
                headerShown: false,
            }}
        >
            <Tab.Screen name="home"
                        component={HomeScreen}
                        options={{
                            tabBarLabel: "Search",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="search" color={color} size={size} />
                            ),
                        }}
            />
            <Tab.Screen name="favorite"
                        component={FavoriteScreen}
                        options={{
                            tabBarLabel: "Favorite",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="heart" color={color} size={size} />
                            ),
                        }}
            />
            <Tab.Screen name="profile"
                        component={ProfileScreen}
                        options={{
                            tabBarLabel: "profile",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="person-outline" color={color} size={size}/>
                            ),
                        }}
            />
        </Tab.Navigator>

    );
}
