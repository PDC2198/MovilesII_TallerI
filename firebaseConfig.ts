import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAAg1PeXxa7wYKJD65v-Uvk1GF1dH3rmeA",
  authDomain: "app-juego-17a1a.firebaseapp.com",
  databaseURL: "https://app-juego-17a1a-default-rtdb.firebaseio.com",
  projectId: "app-juego-17a1a",
  storageBucket: "app-juego-17a1a.appspot.com",
  messagingSenderId: "286604646194",
  appId: "1:286604646194:web:f3c7676c158a0eaba0a92b"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app); 
