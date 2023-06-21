import React, { useEffect } from "react";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { View, FlatList } from "react-native";
import ChallengeButtons from "../components/ChallengeButtons";

const ChallengesScreen = ({route}) => {
    const {challenge} = route.params;
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    
    return (
        <View style={styles.container}> 
            <View style={styles.wrapper}>
                
                <View style={styles.title}>
                    <Text style={{color: "white"}}>Izaberi izazov</Text>
                </View>

                <FlatList 
                    data={data}
                    numColumns={5}
                    renderItem={({item: day}) => 
                    <ChallengeButtons 
                        currentChallenge={challenge.challenge_id}
                        disabled_propery={challenge.disabled}
                        text={day}
                        id = {day}
                        
                    />}
                    style={styles.flat_list}
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#E4E4E3',
    },

    wrapper: {
        width: "80%",
        alignItems: "center",
    },

    title: {
        width: 200,
        backgroundColor: "darkgreen",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        zIndex: 999
    },

    flat_list: {
        flex: 1,
        backgroundColor: "#fdb200",
        paddingTop: 40,
        marginTop: -20,
    }

});

export default ChallengesScreen;