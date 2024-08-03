import {View,Text,StyleSheet,Image} from "react-native";
import React from "react";
import {useUser} from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../Utils/Colors";


export default function Header() {
    const {user} = useUser();
    return (
        <View
            style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                paddingHorizontal:20,
            }}
        >
           <Image source={{uri:user?.imageUrl}}
                  style={{width:45,height:45,borderRadius:99}}
           />
            <Text style={styles.logoText}>Bank Locations</Text>
            <Ionicons name="filter" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    userImage: {
        width: 45,
        height: 45,
        borderRadius: 99,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.BLACK,
        fontFamily: 'sans-serif-medium',
    },
});
