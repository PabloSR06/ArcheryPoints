import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import PartyTable from '../points/PartyTable';

const CreateParty = () => {
  const [rounds, setRounds] = useState('');
  const [points, setPoints] = useState('');

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
    return isValidRounds && isValidPoints;
  };

  const savePartyInfo = () => {
    const partyInfo = {
      rounds: parseInt(rounds),
      points: parseInt(points),
    };
    console.log('Saved Party Info:', partyInfo);
  };

  const clearInputs = () => {
    setRounds('');
    setPoints('');
  };

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
      
      <Button title="Start" onPress={handleSave} disabled={!isValidInput()} />

      <Stack.Screen name="OtraPantalla" component={PartyTable} />

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
