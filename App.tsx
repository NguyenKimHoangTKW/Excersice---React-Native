import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsNavigator from './screens/routes';
import OptionsScreen from './screens/Options';
import React from 'react';
import CreateNewAccount from './components/CreateNewAccount';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import Login from './components/LoginScreen';
import ServiceDetail from './components/ServiceDetail';
const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Lab2" component={ContactsNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Create New Account" component={CreateNewAccount} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}