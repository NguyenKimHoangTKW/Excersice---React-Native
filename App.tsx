import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import Project1 from './components/project1';
import Project2 from './components/project2';
import Project3 from './components/project3';
import Project4 from './components/project4';
import Project5 from './components/project5';
import Project6 from './components/project6';
import Project7 from './components/project7';
import Project8 from './components/project8';
import Home from './components/Home';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Project1" component={Project1} />
          <Stack.Screen name="Project2" component={Project2} />
          <Stack.Screen name="Project3" component={Project3} />
          <Stack.Screen name="Project4" component={Project4} />
          <Stack.Screen name="Project5" component={Project5} />
          <Stack.Screen name="Project6" component={Project6} />
          <Stack.Screen name="Project7" component={Project7} />
          <Stack.Screen name="Project8" component={Project8} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}