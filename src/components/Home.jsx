import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { listFiles, readFileContent } from '../utils/filesDb';
import { Button, Icon } from 'react-native-elements';
import { HomeStyle } from '../utils/styles/style';
import { ActivityIndicator } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function init() {
      try {
        const list = await listFiles();
        setFiles(list);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }
    init();
  }, []);

  const renderFileItem = ({ item }) => {
    const timestamp = new Date(parseInt(item));
    const formattedDate = timestamp.toLocaleDateString();

    const handlePress = () => {
      const itemName = item.replace('.json', '');
      navigation.navigate('Play', {
        screen: 'Game',
        params: { itemName },
      });
    };
    const handleHold = () => {
      const itemName = item.replace('.json', '');
      navigation.navigate('GenerateQr', itemName);
    };


    return (
      <TouchableOpacity onLongPress={handleHold} onPress={handlePress} style={HomeStyle.fileItem}>
        <Text>{formattedDate}</Text>
      </TouchableOpacity>
    );
  };
  const [loading, setLoading] = useState(true);

  return (
    <View style={HomeStyle.container}>
      <View >

             

        <Button title="New Game" onPress={() => setLoading(!loading)} />
      </View>

      <Text style={HomeStyle.heading}>Last games</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item}
        renderItem={renderFileItem}
      />
    </View>
  );
};


export default Home;
