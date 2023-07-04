import React from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import ActionButton from "../components/ActionButton";

const ChallengeScreen = ({route}) => {
    const {challenge} = route.params;
    return (
        <View style={styles.container}>

            <View style={styles.top}>

                <View style={styles.back_logo}>
                    <TouchableOpacity>
                        <Image 
                            source={require("../assets/logo.jpg")}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.day_review}>

                    <Text 
                    style={{
                        ...styles.text, 
                        marginBottom: 15,
                        transform: [{rotate: '7deg'}],
                        }}>
                            DAY
                    </Text>

                    <Text 
                        style={{...styles.text , transform: [{rotate: '-15deg'}]}}>
                        {challenge.id}
                    </Text>

                </View>

                <View style={styles.invisible}>
                </View>

            </View>

            <View style={styles.title_container}>
                <View style={styles.title}>
                    <Text>
                        {challenge.title}
                    </Text>
                </View>
            </View>
           
           <View style={styles.challenge_container}>
                <View style={styles.challenge}>
                    <ScrollView>
                        <Text>
                            {challenge.value}
                        </Text>
                    </ScrollView>
                </View>
           </View>

           <View style={styles.bottom_container}>
                <View style={styles.bottom_buttons}>
                    
                <ActionButton 
                        type = {"1"}
                        bcolor={"#fab400"}
                    />

                    <ActionButton 
                        type = {"2"}
                        bcolor = {"#54ae70"}
                    />

                </View>
           </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E4E3',
    },

    top: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between'
    },

    back_logo: {
        height: 80,
        width: 80,
        justifyContent: "center",
        alignItems: "center"
    },

    day_review: {
        backgroundColor: "#fab400",
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    text:
    {
        fontSize: 20,
        color: "#448c5a",
        textShadowColor: "#000",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    logo:{
        width: 80,
        height: 80
    },

    invisible: {
        width: 80,
        height: 80
    },

    title_container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, 
    
    title: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#54ae70",
        width: "80%",
        padding: 15,
        borderRadius: 15
    },

    challenge_container: {
        flex: 3, 
        justifyContent: "flex-start",
        alignItems: "center",
    },

    challenge: {
        justifyContent: "center",
        alignItems: "center",
        width: "80%",
        padding: 15,
        borderRadius: 15,
        backgroundColor: "#fab400",
        maxHeight: "80%",
        minHeight: "60%"
    },

    bottom_container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },

    bottom_buttons: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }

});

export default ChallengeScreen;