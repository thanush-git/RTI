import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './config/firebase'; // Initialize Firebase Web SDK (not React Native Firebase)
import AppNavigator from './src/AppNavigator/Navigation';
import { UserProvider } from './src/screens/UserContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <StatusBar style="auto" />
        <AppNavigator />
      </UserProvider>
    </SafeAreaProvider>
  );
}

