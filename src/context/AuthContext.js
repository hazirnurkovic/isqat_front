import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {BASE_URL} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    

    const register = (username, email, password) => {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/register`, {
                username, 
                email, 
                password, 
            }, {
                headers: {
                    'Content-Type': 'application/json', 
                    Accept : 'application/json'
                }
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                console.log(userInfo);
                axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(userInfo.token)}`
            })
            .catch(e => {
                setIsLoading(false);
                console.log(`Error: ${e}`);
            });
    };

    const login = (email, password) => {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/login`, {
                email,
                password
            },{
                headers: {
                    'Content-Type': 'application/json', 
                    Accept : 'application/json'
                }
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(userInfo.token)}`
            })
            .catch(e => {
                setIsLoading(false);
                alert(e.response.data.message);
            });
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }
            setSplashLoading(false);
            console.log(JSON.stringify(userInfo))
        } catch (e) {
            setSplashLoading(false);
            console.log(`Error with isLoggedIn : ${e}`);
        }
    };

    const getUserChallenges = () => {
        return new Promise((resolve, reject) => {
          axios.post(
            `${BASE_URL}/getUserChallenge`,
            {},
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`
              }
            }
          )
            .then(res => {
              let response = res.data;
              resolve(response);
            })
            .catch(e => {
                console.log(e.response.data.message);
              reject(e);
            });
        });
      };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider 
            value={{
                isLoading, 
                userInfo,
                splashLoading,
                register,
                login,
                getUserChallenges
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};