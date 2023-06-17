import React, { useContext, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import MyButton from "../components/MyButton";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const {isLoading,register} = useContext(AuthContext);

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
                    style={styles.input} 
                    placeholder="Korisničko ime"
                    placeholderTextColor ="white"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Email adresa"
                    placeholderTextColor ="white"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    style={styles.input} 
                    placeholder="Šifra"
                    placeholderTextColor ="white"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <MyButton 
                    button_title="REGISTRUJ SE"
                    styling={styles.button}
                    onPress = {() => {
                        register(username, email, password)
                    }}                   
                />

                <View style={{flexDirection:'row', marginTop: 20}}>
                    <Text>Već imaš nalog? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.link}>Uloguj se</Text>
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
        backgroundColor: '#E4E4E3'
    },

    wrapper: {
        width: "80%"
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

    logo: {
        width: 200,
        height: 200,
        marginBottom: 30
    }
});
export default RegisterScreen;