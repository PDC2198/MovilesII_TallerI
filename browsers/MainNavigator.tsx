import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import WelcomeScreen from '../screens/WelcomeScreen';
import JuegoScreen from '../screens/JuegoScreen';
import PuntajeScreen from '../screens/PuntajeScreen';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegistrerScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#1abc9c',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#1abc9c',
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    paddingBottom: 8,
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: '600',
                    marginBottom: 5,
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Juego') {
                        iconName = 'game-controller';
                    } else if (route.name === 'Puntaje') {
                        iconName = 'trophy';
                    } else if (route.name === 'Nosotros') {
                        iconName = 'information-circle';
                    } else {
                        iconName = 'alert-circle';
                    }
                    return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size + 4} color={color} style={{ marginBottom: -3 }} />;
                },
                tabBarItemStyle: {
                    borderRightWidth: 1,
                    borderRightColor: 'rgba(26, 188, 156, 0.52)',
                }
            })}
        >
            <Tab.Screen name="Juego" component={JuegoScreen} />
            <Tab.Screen name="Puntaje" component={PuntajeScreen} />
            <Tab.Screen name="Nosotros" component={AboutScreen} />
            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" size={size} color={color} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={MyTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function Navegador() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
