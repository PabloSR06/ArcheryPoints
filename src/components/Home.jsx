import { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { listFiles, readFileContent } from '../utils/filesDb';
import QRCode from 'react-native-qrcode-svg';





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
    try {
      const content = await readFileContent(item);

      return content;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const toggleFileSelection = (item) => {
    item = item.replace('.json', '');
    var x = shareData(item);
    return (<View><QRCode
      value={JSON.stringify(x)}
      size={200} // Adjust the size as needed
    /></View>);
    //navigation.navigate('OldPlay', item);
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
