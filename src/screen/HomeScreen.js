import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
    const navigation = useNavigation();
    const {getUserChallenges} = useContext(AuthContext);

    const handlePress = async () => {
        try {
          const response = await getUserChallenges();
          navigation.navigate("Challenges", {challenge: response});
        } catch (e) {
          alert(e.response.data.message);
          navigation.navigate("Login");
        }
      };

    return (
        <View style={styles.container}>
            
            <View style={styles.text_image_view}>
                <Image 
                    source={require("../assets/isqat_text.jpg")}
                    style= {styles.text_image}
                />
            </View>

            <View style={styles.logo_image_view}>
                <TouchableOpacity
                    onPress={handlePress}
                
                >
                    <Image 
                        source={require("../assets/logo.jpg")}
                        style={styles.logo}
                    />
                </TouchableOpacity>
                <Text style={styles.text}>Pokreni promjene</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E4E3',
    },

    text_image_view :{
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        paddingLeft: 35,
        marginBottom: -45
    }, 

    text_image: {
        width: 250,
        height: 100,
    },

    logo_image_view: {
        flex: 3,
        alignItems: "center",
    
    },

    logo: {
        width: 350,
        height: 350
    }, 
    
    text: {
        fontWeight: "500"
    }

});

export default HomeScreen;