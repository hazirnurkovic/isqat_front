import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import LoginScreen from "../screen/LoginScreen";
import RegisterScreen from "../screen/RegisterScreen";
import { AuthContext } from "../context/AuthContext";
import SplashScreen from "../screen/SplashScreen";


const Stack = createNativeStackNavigator();
const Navigation = () => {

    const {userInfo, splashLoading} = useContext(AuthContext);

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {splashLoading ? 
          (
            <Stack.Screen 
              name="Splash" 
              component={SplashScreen}
              options={{headerShown: false}}            
            />
          ) : 
          userInfo.remember_token ? (
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{headerShown: false}}
            />
          ) : 
          (
            <>
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{headerShown: false}}
              />

              <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{headerShown: false}}
              />
            </>
          )}
          

        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Navigation;