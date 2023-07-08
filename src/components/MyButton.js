import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MyButton = ({button_title, styling, onPress}) => {
    return(
        <View style={styles.container}>
            <TouchableOpacity 
              style={[styling, styles.opacity]}
              onPress={onPress}
            >
                <Text style={styles.buttonText}>{button_title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      opacity: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 30
      },
      buttonText: {
        color: 'white'
      }
});

export default MyButton;