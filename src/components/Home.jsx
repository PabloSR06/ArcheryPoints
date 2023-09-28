import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { listFiles, readFileContent } from '../utils/filesDb';
import { Button, Icon, ListItem } from 'react-native-elements';
import { HomeStyle } from '../utils/styles/style';
import { ActivityIndicator } from 'react-native-paper';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

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

  const onTriggerPress = (index) => {
    console.log('onTriggerPress');
  }

  const onBackdropPress = (index) => {
    console.log('onBackdropPress');
  }

  const onOptionSelect = (value, index) => {
    alert(`Selected number: ${value}`);
    const list = [...this.state.list];
    list[index].isOpen = false;
    this.setState({ list });
  }

  const renderItem = ({ item, index }) => (
    <View  >
      <Text>sad</Text>
      <ListItem
        
        onPress={() => console.log('onPress')}
        key={index}
        iconStyle={{ color: 'red' }}
        title={
          <View>
            <Text style={{ fontWeight: 'bold' }}>adfgadfgadfgadfg</Text>
            <Text style={{ fontWeight: 'bold' }}>adfgadfgadfgadfg</Text>
            <Text style={{ fontWeight: 'bold' }}>adfgadfgadfgadfg</Text>
            <Text style={{ fontWeight: 'bold' }}>adfgadfgadfgadfg</Text>
            <Text style={{ fontWeight: 'bold' }}>adfgadfgadfgadfg</Text>
            <Text style={{ fontWeight: 'bold' }}>adfgadfgadfgadfg</Text>
            <Text style={{ fontWeight: 'bold' }}>adfgadfgadfgadfg</Text>
            
          </View>
        }
        subtitle={item}


      />
    </View>
  );
  const getMenuView = (index, isOpen) => {
    return (
      <MenuProvider style={{ flexDirection: 'column', padding: 30 }}>
        <Menu opened={isOpen}>
          <MenuTrigger
            onBackdropPress={() => onBackdropPress(index)}
            onSelect={value => onOptionSelect(value, index)}
          >
            <Icon
              onPress={() => onTriggerPress(index)}
              type="material"
              color="red"
              name="more-vert"
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1} text="One" />
            <MenuOption value={2}>
              <Text style={{ color: 'red' }}>Two</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true} text="Three" />
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
  }


  return (
    <View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={files}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
});



export default Home;
