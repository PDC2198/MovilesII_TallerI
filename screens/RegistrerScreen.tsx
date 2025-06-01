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

export default function RegisterScreen({ navigation }) {
  const [playerName, setPlayerName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!playerName.trim()) {
      alert('Por favor ingresa el nombre del jugador');
      return;
    }
    if (!username.trim()) {
      alert('Por favor ingresa el nombre de usuario');
      return;
    }
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userData = { playerName, username, password };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      alert('Usuario registrado correctamente');
      navigation.replace('Login');
    } catch (error) {
      alert('Error al registrar usuario');
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
        <Text style={styles.title}>Crear Cuenta</Text>

        <TextInput
          placeholder="Nombre del jugador"
          placeholderTextColor="#999"
          style={styles.input}
          value={playerName}
          onChangeText={setPlayerName}
        />

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

        <TextInput
          placeholder="Confirmar Contraseña"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // oscurece el fondo para mejorar legibilidad
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
