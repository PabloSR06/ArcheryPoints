import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getDbConnection, insertUser, getUsers } from '../../utils/sqliteDb';
import { UserEditSyle } from '../../utils/styles/style';
import { generateExtId } from '../../utils/utils';

const UserInput = ({navigation}) => {
  const [name, setName] = useState('');
  const [extId, setExtId] = useState(generateExtId(7));

  const handleNameChange = (text) => {
    setName(text);
  };
  const handleExtIdChange = (text) => {
    setExtId(text);
  };

  async function handleSave() {
    try {
        var parms = {
            name: name,
            id_ext: extId
        };
        await insertUser(parms); 
        navigation.replace('User');
    } catch (error) {
        console.log(`Error saving user ${error}`);
    }
  }

  return (
    <View style={UserEditSyle.container}>
      <Text style={UserEditSyle.label}>Enter Your Name:</Text>
      <TextInput
        style={UserEditSyle.input}
        onChangeText={handleNameChange}
        value={name}
        placeholder="Your name"
      />
      <Text style={UserEditSyle.label}>Identificador externo:</Text>

      <TextInput
        style={UserEditSyle.input}
        onChangeText={handleExtIdChange}
        value={extId}
        placeholder="External Id"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default UserInput;
