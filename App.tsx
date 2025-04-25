import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/LoginScreen';
import Create_New_Account from './components/CreateNewAccount';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import ResetPassword from './components/ResetPassword';
import HomeUser from './components/user';
import Calculator from './components/Calculator';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <Calculator></Calculator>
    </>
  );
}