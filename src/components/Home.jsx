import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { listFiles, readFileContent } from '../utils/filesDb';

const Home = ({ navigation }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function init() {
      var list = await listFiles();
      setFiles(list);
    }
    init();
  }, []);

  const renderFileList = ({ item }) => {
    const timestamp = new Date(parseInt(item));
    const formattedDate = timestamp.toLocaleDateString();

    return (
      <TouchableOpacity onPress={() => toggleFileSelection(item)} >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{formattedDate}</Text>

        </View>
      </TouchableOpacity>
    );
  };

  async function shareData(item) {
    item = item.replace('.json', '');
    navigation.navigate('GenerateQr', item);
  }

  const toggleFileSelection = (item) => {
    item = item.replace('.json', '');
    navigation.navigate('OldPlay', item);
  };


  return (

    <View>
      <Text>Home</Text>
      <FlatList
        data={files}
        keyExtractor={(item) => item}
        renderItem={renderFileList}
      />

    </View>

  );
};


export default Home;
