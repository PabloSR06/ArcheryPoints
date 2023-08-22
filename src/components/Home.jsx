import { useEffect, useState } from 'react';
import { View, Text, Button} from 'react-native';
import { listFiles, readFileContent} from '../utils/filesDb';




const Home = ({navigation}) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    async function init() {
      var list = await listFiles();
      setFiles(list);
    }
    init();
  }, []);


  return (

    <View>
      <Text>Home</Text>
      
      {Array.from(files, (user, index) => (
                <Text  key={index}>{user}</Text>
            ))}
    </View>

  );
};


export default Home;
