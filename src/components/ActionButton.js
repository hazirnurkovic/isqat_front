import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, View } from "react-native";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "react-native";

const ActionButton = ({type, bcolor}) => {
    console.log(type)
    return (
        <View style={{ marginHorizontal: 10 }}>
            <View style={{ alignItems: 'center' }}>
                <View style={{ borderRadius: 50, backgroundColor: bcolor, padding: 10 }}>       
                    <TouchableOpacity>
                        {type == 1 ?
                            <FontAwesomeIcon
                                icon={faRotate}
                                color={'#54ae70'}
                                size={42}
                            />
                            :
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                color={'#fab400'}
                                size={42}
                            />
                        }
                
                    </TouchableOpacity>
                </View>
            </View>
        <View style={styles.body} />
      </View>
    );

};

const styles = StyleSheet.create({
    body: {
        backgroundColor: "#cf7b46",
        height: 80
    }
})

export default ActionButton;