import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen({ navigation }: any) {
    const [playerName, setPlayerName] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const { playerName, username } = JSON.parse(userData);
                    setPlayerName(playerName);
                    setUsername(username);
                }
            } catch (error) {
                console.log('Error al cargar datos del usuario', error);
            }
        };

        fetchUserData();
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
                        await AsyncStorage.removeItem('user');
                        navigation.replace('Login');
                    }
                }
            ]
        );
    };

    return (
        <ImageBackground
            source={require('../assets/fondoTabs.jpeg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Image
                        source={require('../assets/avatar.jpeg')} 
                        style={styles.avatar}
                    />
                    <Text style={styles.title}>Perfil del Usuario</Text>
                    {playerName ? (
                        <Text style={styles.playerName}>{playerName}</Text>
                    ) : (
                        <Text style={styles.loadingText}>Cargando...</Text>
                    )}

                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Nombre de usuario:</Text>
                        <Text style={styles.infoValue}>{username ?? 'N/A'}</Text>
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
        marginBottom: 10,
    },
    playerName: {
        fontSize: 22,
        color: '#eee',
        fontWeight: '600',
        marginBottom: 25,
    },
    loadingText: {
        fontSize: 18,
        color: '#bbb',
        marginBottom: 25,
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#111',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 12,
        marginBottom: 15,
    },
    infoLabel: {
        color: '#1abc9c',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    infoValue: {
        color: '#eee',
        fontSize: 18,
        fontWeight: '400',
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
