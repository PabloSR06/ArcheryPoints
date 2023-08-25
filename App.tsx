import React, { useEffect } from 'react';
import { ScrollView, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { initDatabase } from './src/utils/sqliteDb';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainStack from './src/components/navigation/MainStack';
import PartyTable from './src/components/points/PartyTable';
import Home from './src/components/Home';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(function () {
    async function init() {
      await initDatabase();
    }
    init();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        {/*<FileWriteExample />*/}
        <MainStack />
        {/* <UserInteractiveList/>*/}

    </SafeAreaView>
  );
}


export default App;
