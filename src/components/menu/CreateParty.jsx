import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { getAllUsers } from '../../utils/sqliteDb';
import RNFS, { writeFile } from 'react-native-fs';
import { writeJsonToFile } from '../../utils/filesDb';

const CreateParty = ({ navigation }) => {
  const [rounds, setRounds] = useState('');
  const [points, setPoints] = useState('');
  const [list, setList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoundsChange = (text) => {
    setRounds(text);
  };

  const handlePointsChange = (text) => {
    setPoints(text);
  };

  const handleSave = () => {
    if (isValidInput()) {
      savePartyInfo();
      clearInputs();
    } else {
      Alert.alert('Invalid Input', 'Please enter valid values.');
    }
  };

  const isValidInput = () => {
    const isValidRounds = Number.isInteger(Number(rounds)) && Number(rounds) > 0;
    const isValidPoints = Number.isInteger(Number(points)) && Number(points) > 0;
    return isValidRounds && isValidPoints && selectedUsers.length > 0;
  };

  const savePartyInfo = async () => {
    const partyInfo = {
      rounds: parseInt(rounds),
      points: parseInt(points),
      users: selectedUsers,
    };
    console.log('Saved Party Info:', partyInfo);

    var fileName = Date.now();
    await writeJsonToFile(fileName.toString(), partyInfo);
    navigation.navigate('NewPlay', fileName);

  };

  const clearInputs = () => {
    setRounds('');
    setPoints('');
  };


  const toggleUserSelection = (item) => {
    if (selectedUsers.some((x) => x.id === item.id)) {
      setSelectedUsers(selectedUsers.filter((x) => x.id !== item.id));
    } else {
      setSelectedUsers([...selectedUsers, item]);
    }
  };

  const renderUserList = ({ item }) => (
    <TouchableOpacity onPress={() => toggleUserSelection(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>{item.name}</Text>
        <Text>{selectedUsers.includes(item) ? ' (Selected)' : ''}</Text>
      </View>
    </TouchableOpacity>
  );

  async function loadUsers() {
    try {
      var list = await getAllUsers();
      setList(list);
    } catch (error) {
      console.log(`Error loading users ${error}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>How many rounds:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleRoundsChange}
        value={rounds}
        placeholder="Rounds"
        keyboardType="number-pad"
        inputMode="numeric"
      />
      <Text style={styles.label}>How many arrows:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handlePointsChange}
        value={points}
        placeholder="Arrows"
        keyboardType="number-pad"
        inputMode="numeric"
      />

      <View>
        <Text>List of Names:</Text>
        <FlatList
          data={list}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserList}
        />
        <Text>Selected: {selectedUsers.length}</Text>

      </View>

      <Button title="Start" onPress={handleSave} disabled={!isValidInput()} />

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

export default CreateParty;
