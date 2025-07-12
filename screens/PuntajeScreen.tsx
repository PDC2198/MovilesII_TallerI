import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebaseConfig';
import { ref, get, child, remove } from 'firebase/database';
import { Ionicons } from '@expo/vector-icons';

interface ScoreEntry {
  id: string;
  uid: string;
  name: string;
  score: number;
  createdAt: string;
}

export default function PuntajeScreen() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const dbRef = ref(db);
        const [scoresSnap, usersSnap] = await Promise.all([
          get(child(dbRef, 'scores')),
          get(child(dbRef, 'users')),
        ]);

        const scoresData = scoresSnap.val();
        const usersData = usersSnap.val();

        const uniqueScores: { [uid: string]: ScoreEntry } = {};

        if (scoresData && usersData) {
          Object.entries(scoresData).forEach(([uid, userScores]: any) => {
            Object.entries(userScores).forEach(([scoreId, scoreObj]: any) => {
              const userNick = usersData[uid]?.nick || 'Desconocido';
              const newScore = {
                id: scoreId,
                uid,
                name: userNick,
                score: scoreObj.score || 0,
                createdAt: scoreObj.createdAt || '',
              };
              if (!uniqueScores[uid] || newScore.score > uniqueScores[uid].score) {
                uniqueScores[uid] = newScore;
              }
            });
          });
        }

        const allScores = Object.values(uniqueScores).sort((a, b) => b.score - a.score);
        setScores(allScores);
      } catch (error) {
        console.error('Error al obtener puntajes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const deleteScore = async (scoreId: string, userId: string) => {
    try {
      const scoreRef = ref(db, `scores/${userId}/${scoreId}`);
      await remove(scoreRef);
      setScores(prevScores => prevScores.filter(score => score.id !== scoreId)); 
    } catch (error) {
      console.error('Error al eliminar el puntaje:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/fondoTabs.jpeg')}
      style={styles.background}
      resizeMode="cover"
      blurRadius={2}
    >
      <StatusBar barStyle="light-content" backgroundColor="#101010" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <Text style={styles.title}>🏆 Tabla de Puntajes</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>👤 JUGADOR</Text>
            <Text style={styles.headerCell}>🎯 PUNTAJE</Text>
            <Text style={styles.headerCell}>🗑️ ACCIÓN</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#1abc9c" style={{ marginTop: 30 }} />
          ) : (
            <FlatList
              data={scores}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{item.score}</Text>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteScore(item.id, item.uid)}
                  >
                    <Ionicons name="trash-bin" size={24} color="#e74c3c" />
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
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
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    borderRadius: 10,
  },
  cell: {
    fontSize: 18,
    color: '#ffffff',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
});
