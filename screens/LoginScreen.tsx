import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ImageBackground,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            alert('⚠️ Por favor ingresa email y contraseña');
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error: any) {
            alert(`❌ Error al iniciar sesión: ${error.message}`);
        }
    };

    return (
        <ImageBackground
            source={require('../assets/fondo.jpeg')}
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Text style={styles.title}>🔐 Iniciar Sesión</Text>

                <View style={styles.inputWrapper}>
                    <Ionicons name="mail-outline" size={22} color="#1abc9c" style={styles.iconLeft} />
                    <TextInput
                        placeholder="Correo electrónico"
                        placeholderTextColor="#999"
                        style={styles.inputWithIcon}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Ionicons name="lock-closed-outline" size={22} color="#1abc9c" style={styles.iconLeft} />
                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor="#999"
                        style={[styles.inputWithIcon, { paddingRight: 45 }]}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={26}
                            color="#1abc9c"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>🚀 Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>📝 ¿No tienes cuenta? Regístrate</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    title: {
        fontSize: 32,
        color: '#1abc9c',
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputWrapper: {
        position: 'relative',
        marginBottom: 20,
        justifyContent: 'center',
    },
    iconLeft: {
        position: 'absolute',
        left: 15,
        zIndex: 10,
    },
    inputWithIcon: {
        backgroundColor: '#222',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 45, 
        paddingVertical: 12,
        fontSize: 16,
    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -13 }],
        zIndex: 10,
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
