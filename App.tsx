import UserInput from './src/components/users/UserInput';
import UserList from './src/components/users/UserList';
import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { initDatabase } from './src/utils/sqliteDb';
import EditableTable from './src/components/points/Table';



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(function(){
    async function init(){
      await initDatabase();
    }
    init();
  },[]);

  return (
    <View>
      <StatusBar/>
      <EditableTable rounds={5} points={3} user={{ id: 1, name: "as" }} />
    </View>
  );
}


export default App;
