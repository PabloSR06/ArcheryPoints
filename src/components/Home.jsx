import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { listFiles, readFileContent } from '../utils/filesDb';
import { Icon } from 'react-native-elements';
import { HomeStyle } from '../utils/styles/style';

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
      navigation.navigate('OldPlay', itemName);
    };

    return (
      <TouchableOpacity onPress={handlePress} style={HomeStyle.fileItem}>
        <Text>{formattedDate}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={HomeStyle.container}>
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
