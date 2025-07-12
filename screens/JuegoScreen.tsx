import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  Animated,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebaseConfig';
import { ref, push } from 'firebase/database';

const { width, height } = Dimensions.get('window');

interface InsectType {
  id: number;
  x: number;
  y: number;
  scale: Animated.Value;
}

export default function JuegoScreen() {
  const [insects, setInsects] = useState<InsectType[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  const titleOpacity = new Animated.Value(0);

  // Mostrar título con fade in
  useEffect(() => {
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Generar insectos cada segundo
  useEffect(() => {
    if (!started || gameOver) return;

    const interval = setInterval(() => {
      const id = Date.now();
      const x = Math.random() * (width - 60);
      const y = Math.random() * (height - 200);
      const scale = new Animated.Value(0);

      setInsects(prev => [...prev, { id, x, y, scale }]);

      // Animar aparición del insecto
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setInsects(prev => prev.filter(i => i.id !== id));
      }, 2000);
    }, 700); // Aparecen más rápido (intervalo 700ms)

    return () => clearInterval(interval);
  }, [started, gameOver]);

  // Temporizador
  useEffect(() => {
    if (!started) return;
    if (timeLeft === 0) {
      setGameOver(true);
      saveScore();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, started]);

  const handlePress = (id: number) => {
    setScore(prev => prev + 1);
    setInsects(prev => prev.filter(i => i.id !== id));
  };

  const saveScore = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userScoreRef = ref(db, `scores/${user.uid}`);
      await push(userScoreRef, {
        score,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error al guardar la puntuación:', error);
    }
  };

  const startGame = () => {
    setStarted(true);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setInsects([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/fondojuego.jpg')} 
        style={styles.background}
        resizeMode="cover"
      >
        {!started ? (
          <View style={styles.startScreen}>
            <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
              🕹️ Caza Insectos
            </Animated.Text>
            <TouchableOpacity style={styles.startButton} onPress={startGame}>
              <Text style={styles.startButtonText}>¡EMPEZAR YA!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.score}>Puntos: {score}</Text>
              <Text style={styles.timer}>Tiempo: {timeLeft}s</Text>
            </View>

            <View style={styles.gameArea}>
              {insects.map((insect) => (
                <Pressable
                  key={insect.id}
                  onPress={() => handlePress(insect.id)}
                  style={[styles.insect, { left: insect.x, top: insect.y }]}
                >
                  <Animated.Image
                    source={require('../assets/zombie.jpg')}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      transform: [{ scale: insect.scale }],
                    }}
                  />
                </Pressable>
              ))}
              {gameOver && (
                <View style={styles.overlay}>
                  <Text style={styles.gameOverText}>¡Fin del juego!</Text>
                  <Text style={styles.gameOverText}>Puntaje final: {score}</Text>
                  <TouchableOpacity style={styles.retryButton} onPress={startGame}>
                    <Text style={styles.retryButtonText}>JUGAR DE NUEVO</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  startScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)', 
  },
  title: {
    fontSize: 50,
    color: '#1abc9c',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  startButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  startButtonText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  score: {
    fontSize: 20,
    color: '#1abc9c',
  },
  timer: {
    fontSize: 20,
    color: '#e67e22',
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  insect: {
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gameOverText: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#1abc9c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});
