import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getDbConnection, insertUser, getUsers } from '../../utils/sqliteDb';
import { Style } from '../../utils/styles/style';

const UserInput = () => {
  const [name, setName] = useState('');

  const handleNameChange = (text) => {
    setName(text);
  };

  async function handleSave( parms) {
    try {
        var parms = {
            name: name,
            id_ext: 0
        };
        console.log('User entered:', parms);
        const db = await getDbConnection(); 
        await insertUser(db, parms); 
    } catch (error) {
        console.log(`Error saving user ${error}`);
    }
  }

  return (
    <View style={Style.container}>
      <Text style={Style.label}>Enter Your Name:</Text>
      <TextInput
        style={Style.input}
        onChangeText={handleNameChange}
        value={name}
        placeholder="Your name"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default UserInput;
