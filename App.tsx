import UserInput from './src/components/users/UserInput';
import UserList from './src/components/users/UserList';
import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { initDatabase } from './src/utils/sqliteDb';
import EditableTable from './src/components/points/Table';
import PartyTable from './src/components/points/PartyTable';
import CreateParty from './src/components/menu/CreateParty';
import Home from './src/components/Home';
import MainStack from './src/components/navigation/MainStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserInteractiveList from './src/components/users/UserInteractiveList';



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
       <MainStack /> 
      {/* <UserInteractiveList/>*/}
    </SafeAreaView>
  );
}


export default App;
