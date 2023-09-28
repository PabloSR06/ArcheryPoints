import React, { useEffect } from 'react';
import { initDatabase } from './src/utils/sqliteDb';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainStack from './src/components/navigation/MainStack';

function App(): JSX.Element {

  useEffect(function () {
    async function init() {
      await initDatabase();
    }
    init();
  }, []);

 
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
            <MainStack />
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
