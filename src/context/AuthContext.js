import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {BASE_URL} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoadin] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const register = (username, email, password) => {
        setIsLoadin(true);
        axios
            .post(`${BASE_URL}/register`, {
                username, 
                email, 
                password, 
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoadin(false);
                console.log(userInfo);
            })
            .catch(e => {
                setIsLoadin(false);
                console.log(`Error: ${e}`);
            });
    };

    const login = (email, password) => {
        setIsLoadin(true);
        axios
            .post(`${BASE_URL}/login`, {
                email,
                password
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoadin(false);
            })
            .catch(e => {
                setIsLoadin(false);
                console.log(`Error ${e}`);
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
        } catch (e) {
            setSplashLoading(false);
            console.log(`Error with isLoggedIn : ${e}`);
        }
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

            }}
        >
            {children}
        </AuthContext.Provider>
    );
};