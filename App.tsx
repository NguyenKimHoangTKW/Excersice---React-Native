import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { BookDetail } from "./screens/Index";
import Home from "./screens/Home";
import LoginScreen from './components/LoginScreen';
import CreateNewAccount from './components/CreateNewAccount';
import ResetPassword from './components/ResetPassword';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent"
  }
}

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Login'}
      >
        {/* Tabs */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Create New Account" component={CreateNewAccount} />
        <Stack.Screen name="Reset Password" component={ResetPassword} />
        {/* Screens */}
        <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
