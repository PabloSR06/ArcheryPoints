import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { deleteFile, listFiles, readFileContent } from '../utils/filesDb';
import { Button, Icon, ListItem } from 'react-native-elements';
import FileList from './FileList';
import { HomeStyle, LoaderStyle } from '../utils/styles/style';
import { ActivityIndicator } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [files, setFiles] = useState([]);
  const [fileChanged, setFileChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const list = await listFiles();
        setFiles(list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    }
    init();
  }, [fileChanged]);


  const renderFileItem = ({ item }) => {
    const timestamp = new Date(parseInt(item));
    const formattedDate = timestamp.toLocaleDateString();
    const itemName = item.replace('.json', '');

    const handlePlay = () => {
      navigation.navigate('Play', {
        screen: 'Game',
        params: { itemName },
      });
    };
    const handleShare = () => {
      navigation.navigate('GenerateQr', itemName);
    };
    const handleDelete = () => {
      deleteFile(item);
      setFileChanged(!fileChanged);
    };

    return (
      <FileList item={formattedDate} onHandleDelete={handleDelete} onHandlePlay={handlePlay} onHandleShare={handleShare} />
    );
  };



  const renderScreen = () => {
    return (    
        <FlatList
          showsVerticalScrollIndicator={false}
          data={files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderFileItem}
        />
    );
  };
  const renderLoader = () => {
    return (
      <View style={LoaderStyle.container}>
        <View style={LoaderStyle.centered}>
          <ActivityIndicator size="large" animating={loading} />
        </View>
      </View>
    );
  };

  return (
    
    <View style={HomeStyle.container}>
      <Text style={HomeStyle.heading}>Last games</Text>
      {loading ? renderLoader() : renderScreen()}
    </View>
  );
};





export default Home;