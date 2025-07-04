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
  Alert,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { registerUser } from '../services/authService';
import { RootStackParamList } from '../navigation/types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const [playerName, setPlayerName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!playerName.trim() || !email.trim() || !age.trim()) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await registerUser(email, password, playerName, parseInt(age));
      Alert.alert('Registro exitoso', 'Usuario registrado correctamente');
      navigation.replace('Login');
    } catch (error: any) {
      Alert.alert('Error al registrar', error.message);
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
        <Text style={styles.title}>📝 Crear Cuenta</Text>

        {/* Nombre jugador */}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={22} color="#1abc9c" style={styles.iconLeft} />
          <TextInput
            placeholder="Nombre del jugador"
            placeholderTextColor="#999"
            style={styles.inputWithIcon}
            value={playerName}
            onChangeText={setPlayerName}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
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

        {/* Edad */}
        <View style={styles.inputWrapper}>
          <Ionicons name="calendar-outline" size={22} color="#1abc9c" style={styles.iconLeft} />
          <TextInput
            placeholder="Edad"
            placeholderTextColor="#999"
            style={styles.inputWithIcon}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
        </View>

        {/* Contraseña */}
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

        {/* Confirmar contraseña */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={22} color="#1abc9c" style={styles.iconLeft} />
          <TextInput
            placeholder="Confirmar Contraseña"
            placeholderTextColor="#999"
            style={[styles.inputWithIcon, { paddingRight: 45 }]}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye' : 'eye-off'}
              size={26}
              color="#1abc9c"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>✅ Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>🔙 ¿Ya tienes cuenta? Inicia sesión</Text>
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
    paddingHorizontal: 45, // espacio para el ícono a la izquierda
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
