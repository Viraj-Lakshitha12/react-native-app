import {View, Text, Image, StyleSheet, TouchableOpacity, Linking} from "react-native";
import React from "react";
import { images } from "../../../constants";
import Colors from "../../Utils/Colors";
import * as WebBrowser from "expo-web-browser";
import {useWarmUpBrowser} from "../../hooks/warmUpBrowser";
import {useOAuth} from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
            if (createdSessionId) {
                setActive({session: createdSessionId});
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    };

    return (
        <View style={Styles.container}>
            <Image
                source={images.logo}
                style={Styles.logoImage}
            />
            <Image
                source={require('../../../assets/images/bank.jpeg')}
                style={Styles.bgImage}
            />
            <View style={{ padding: 20 }}>
                <Text style={Styles.heading}>
                    Quickly find nearby Banks, view details, and get directions with ease
                </Text>
                <TouchableOpacity style={Styles.button}
                    onPress={onPress}
                >
                    <Text style={{
                        color:Colors.WHITE,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>
                        Login with google
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        width: 200,
        height: 200,
        objectFit: 'contain',
    },
    bgImage: {
        width: '100%',
        height: 280,
        marginTop: 0,
        objectFit: 'cover',
    },
    heading:{
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.GRAY,
        textAlign: 'center',
        marginTop: 10
    },
    desc:{
        fontSize: 15,
        fontWeight: 'normal',
        color: 'black',
        textAlign: 'center',
        marginTop: 15
    },
    button:{
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        display: 'flex',
        borderRadius: 99,
        marginTop: 20
    }
});
