import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import JournalScreen from './screens/JournalScreen';
import AddEntry from './screens/AddEntry'; // Import the AddEntry screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="AddEntry" component={AddEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}