import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function JuegoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.messageBox}>
        <Text style={styles.message}>😅 Ups, seguimos trabajando en el videojuego!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a', 
  },
  messageBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 22,
    color: '#1abc9c', 
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
