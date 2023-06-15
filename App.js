import React from 'react';
import Navigation from './src/components/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import { StatusBar } from 'react-native';



export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#fab400"/>
      <Navigation />  
    </AuthProvider>
  );
}