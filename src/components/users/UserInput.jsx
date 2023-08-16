import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getDbConnection, insertUser, getUsers } from '../../utils/sqliteDb';

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
    <View style={styles.container}>
      <Text style={styles.label}>Enter Your Name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleNameChange}
        value={name}
        placeholder="Your name"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
});

export default UserInput;
