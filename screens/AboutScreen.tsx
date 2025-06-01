import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';

export default function AboutScreen() {
  return (
    <ImageBackground
      source={require('../assets/fondoTabs.jpeg')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={3}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#101010"
      />

      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.centeredContent}>
            <Text style={styles.title}>🎮 Acerca del Juego</Text>

            <View style={styles.section}>
              <Text style={styles.heading}>🌟 Nuestra Misión</Text>
              <Text style={styles.paragraph}>
                Esta aplicación es una experiencia interactiva diseñada para poner a prueba tus habilidades, reflejos y estrategia.
                Disfruta de un entorno intuitivo, desafíos entretenidos y una interfaz simple pero inmersiva.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>🚀 Futuro del Juego</Text>
              <Text style={styles.paragraph}>
                Nuestro objetivo es crear una plataforma de entretenimiento accesible para todos, con futuras actualizaciones que
                incluirán niveles, logros y personalización para mejorar tu experiencia.
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>💡 Desarrollado por Pablo Del Corral</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    paddingBottom: 100,
  },
  centeredContent: {
    width: '100%',
    maxWidth: 600,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1abc9c',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  section: {
    marginBottom: 35,
    backgroundColor: 'rgba(15, 223, 168, 0.1)',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(222, 28, 28, 0.05)',
  },
  heading: {
    fontSize: 21,
    color: '#f5f5f5',
    marginBottom: 10,
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 16,
    color: '#d0d0d0',
    lineHeight: 24,
    textAlign: 'justify',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  footerText: {
    color: '#bbb',
    fontSize: 15,
    fontStyle: 'italic',
  },
});
