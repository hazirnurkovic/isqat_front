import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import MyButton from "../components/MyButton";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const {isLoading, login} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <View>
                <Image 
                    style={styles.logo}
                    source={require('../assets/logo.jpg')}
                />
            </View>
            <View style={styles.wrapper}>
                <TextInput 
                    style = {styles.input} 
                    placeholder="Email adresa"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <TextInput 
                    style = {styles.input} 
                    placeholder="Šifra"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <MyButton
                    button_title="Login"
                    styling={styles.button}
                    onPress={() => {
                        login(email, password)
                    }}
                />

                <View style={{flexDirection:'row', marginTop: 20}}>
                    <Text>Nemaš nalog? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.link}>Registruj se</Text>
                    </TouchableOpacity>
                </View>          
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E4E4E3',
    },

    wrapper: {
        width: "80%",
    },

    input: {
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 30,
        padding: 12,
        backgroundColor: "#727270", 
        color: "white"
    },
    button: {
        backgroundColor: "#fab400"
    },
    link: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: "orange"
    },
    logo : {
        width: 230,
        height: 200,
        marginBottom: 30
    }
});

export default LoginScreen;