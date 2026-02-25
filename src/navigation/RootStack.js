import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LogInScreen from '../screens/LogInScreen';
import RegistrationScreen from '../screens/RegistarationScreen';


const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn">
        <Stack.Screen 
          name="LogIn" 
          component={LogInScreen} 
        />
        <Stack.Screen 
          name="Registration" 
          component={RegistrationScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}