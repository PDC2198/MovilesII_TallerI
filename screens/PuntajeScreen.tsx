import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PuntajeScreen() {
  return (
    <ImageBackground
      source={require('../assets/fondoTabs.jpeg')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={2}
    >
      <StatusBar barStyle="light-content" backgroundColor="#101010"  />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <Text style={styles.title}>🏆 Tabla de Puntajes</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>👤 JUGADOR</Text>
            <Text style={styles.headerCell}>🎯 PUNTAJE</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.6)', 
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: '#1abc9c',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  headerCell: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
});
