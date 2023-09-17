import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getDbConnection, insertUser, getUsers } from '../../utils/sqliteDb';
import { UserEditSyle } from '../../utils/styles/style';

const UserInput = ({navigation}) => {
  const [name, setName] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };

  async function handleSave() {
    try {
        var parms = {
            name: name,
            id_ext: 0
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
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default UserInput;
