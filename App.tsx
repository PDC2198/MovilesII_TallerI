import React from 'react';
import Navegador from './browsers/MainNavigator'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
            <Navegador />
    </GestureHandlerRootView>
  );
}
