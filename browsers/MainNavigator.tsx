import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '../screens/WelcomeScreen';
import JuegoScreen from '../screens/JuegoScreen';
import PuntajeScreen from '../screens/PuntajeScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de tabs
function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Juego" component={JuegoScreen} />
            <Tab.Screen name="Puntaje" component={PuntajeScreen} />
            <Tab.Screen name="Nosotros" component={AboutScreen} />
        </Tab.Navigator>
    );
}

// Stack que contiene la pantalla de bienvenida y luego las tabs
function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
                name="Home"
                component={MyTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

// Navegador principal de la app
export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
