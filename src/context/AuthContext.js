import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {BASE_URL} from '../config'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    

    const register = (username, email, password) => 
    {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/register`, 
            {
                username, 
                email, 
                password, 
            }, 
            {
                headers: 
                {
                    'Content-Type': 'application/json', 
                    Accept : 'application/json',
                    'Cache-Control': 'no-cache',
                }
            })
            .then(res => 
            {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(userInfo.token)}`
            })
            .catch(e => 
            {
                setIsLoading(false);
                console.log(`Error: ${e}`);
            });
    };

    const login = (email, password) => 
    {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/login`, 
            {
                email,
                password
            },
            {
                headers: 
                {
                    'Content-Type': 'application/json', 
                    Accept : 'application/json',
                    'Cache-Control': 'no-cache',
                }
            })
            .then(res => 
            {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(userInfo.token)}`
            })
            .catch(e => 
            {
                setIsLoading(false);
                alert(e.response.data.message);
            });
    };

    const logout = () => 
    {
        axios
            .post(`${BASE_URL}/logout`, 
            {},
            {
                headers: 
                {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Cache-Control': 'no-cache',
                }
            })
            .then(response => 
            {
                setUserInfo({});
                AsyncStorage.removeItem('userInfo')
            })
            .catch(error => 
            {
                console.error(error);
            });
    }

    const isLoggedIn = async () => 
    {
        try 
        {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) 
            {
                axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.stringify(userInfo.token)}`

                const response = await axios.post(`${BASE_URL}/verify_token`, 
                {
                    token: userInfo.token
                });
                  
                  if (response.data.valid) 
                  {
                    setUserInfo(userInfo);
                  } 
                  else 
                  {
                    setUserInfo({});
                    await AsyncStorage.removeItem('userInfo');
                    console.log('Token is invalid');
                  }
            
            }
            setSplashLoading(false);
        } catch (e) 
        {
            setSplashLoading(false);
            console.log(`Error with isLoggedIn : ${e}`);
        }
    };

    const checkChallengesAvailability = () => 
    {
        return new Promise((resolve, reject) => 
        {
          axios.post(
            `${BASE_URL}/getUserChallenges`,
            {},
            {
              headers: 
              {
                Authorization: `Bearer ${userInfo.token}`,
                'Cache-Control': 'no-cache',
              }
            })
            .then(res => 
            {
              let response = res.data;
              resolve(response);
            })
            .catch(e => 
            {
                reject(e);
            });
        });
      };

    const getUserChallenge = (id) => 
    {
        return new Promise((resolve, reject) => 
        {
            axios.get(`${BASE_URL}/getUserChallenge/${id}`,
            {
                headers: 
                {
                  Authorization: `Bearer ${userInfo.token}`,
                  'Cache-Control': 'no-cache',
                }
            })
              .then(res => 
                {
                    let response = res.data;
                    resolve(response);
                })
                .catch(e => 
                {
                    console.log(JSON.stringify(e.response.data.message));
                    reject(e);
                });
        });
    }

    const updateUserChallenge = async (id) => {
        try {
          const response = await axios.post(
            `${BASE_URL}/updateUserChallenge`,
            {
              challenge_id: id,
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Cache-Control': 'no-cache',
              },
            }
          );
      
          let updatedUserInfo = response.data;
          setUserInfo(updatedUserInfo);
          await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
          Alert.alert('Bravo!', response.data.message);
          return response.data; // Return the response data
      
        } catch (error) {
          alert(error);
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
                logout,
                checkChallengesAvailability,
                getUserChallenge,
                updateUserChallenge
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};