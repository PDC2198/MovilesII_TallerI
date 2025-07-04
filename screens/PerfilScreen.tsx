import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

export default function PerfilScreen({ navigation }: any) {
  const [userData, setUserData] = useState<{
    nick?: string;
    email?: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);

        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          setUserData({
            nick: data?.nick || 'Sin nombre',
            email: user.email || 'Sin email',
          });
          setLoading(false);
        });
      } else {
        navigation.replace('Login');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await auth.signOut();
            navigation.replace('Login');
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1abc9c" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/fondoTabs.jpeg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image source={require('../assets/avatar.jpeg')} style={styles.avatar} />

          <Text style={styles.title}>Perfil del Usuario</Text>

          {/* Nick */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Ionicons name="person-circle-outline" size={24} color="#1abc9c" style={{ marginRight: 10 }} />
              <Text style={styles.infoLabel}>Nick:</Text>
            </View>
            <Text style={styles.infoValue}>{userData?.nick}</Text>
          </View>

          {/* Email */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={24} color="#1abc9c" style={{ marginRight: 10 }} />
              <Text style={styles.infoLabel}>Correo electrónico:</Text>
            </View>
            <Text style={styles.infoValue}>{userData?.email}</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 12,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 25,
    borderWidth: 3,
    borderColor: '#1abc9c',
  },
  title: {
    fontSize: 30,
    color: '#1abc9c',
    fontWeight: '700',
    marginBottom: 15,
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#111',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoLabel: {
    color: '#1abc9c',
    fontSize: 18,
    fontWeight: '600',
  },
  infoValue: {
    color: '#eee',
    fontSize: 20,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
