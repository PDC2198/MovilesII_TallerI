import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const { username: storedUser, password: storedPass } = JSON.parse(userData);
                if (username === storedUser && password === storedPass) {
                    navigation.replace('Home');
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            } else {
                alert('No hay ningún usuario registrado');
            }
        } catch (error) {
            alert('Error al iniciar sesión');
        }
    };

    return (
        <ImageBackground
            source={require('../assets//fondo.jpeg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Text style={styles.title}>Iniciar Sesión</Text>

                <TextInput
                    placeholder="Nombre de usuario"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Opcional: para oscurecer el fondo
    },
    title: {
        fontSize: 32,
        color: '#1abc9c',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#1abc9c',
        borderRadius: 8,
        paddingVertical: 14,
        marginBottom: 15,
    },
    buttonText: {
        color: '#101010',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    link: {
        color: '#1abc9c',
        textAlign: 'center',
        fontSize: 15,
        marginTop: 10,
        textDecorationLine: 'underline',
    },
});
