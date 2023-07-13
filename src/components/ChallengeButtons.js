import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";

const ChallengeButtons = ({onPress, text, id, currentChallenge, disabled_propery}) =>
{
    const disableButton = () => 
    {
        const background_color = disabled_propery ? "grey" : "lightgrey"; 

        if (id < currentChallenge) {
          return {
            backgroundColor: "#54ae70",
            disabled: false
          };
        } 
        else if (id === currentChallenge) 
        {
          return {
            backgroundColor: background_color,
            disabled: disabled_propery
          };
        } 
        else 
        {
          return {
            backgroundColor: "darkgrey",
            disabled: true
          };
        }
      };

    return (
            <TouchableOpacity
                onPress={onPress}
                style={{ ...styles.button, backgroundColor: disableButton().backgroundColor }}
                disabled={disableButton().disabled}
            >
                <Text style={styles.text}>
                    {text}
                </Text>
            </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 6,
        borderColor: "black",
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },

    text: {
        color: "black",
        fontSize: 25
    }
});

export default ChallengeButtons;