import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Table = ({ rounds, points, user }) => {
  const [tableData, setTableData] = useState(
    Array.from({ length: rounds }, () => Array.from({ length: points }, () => 0))
  );
  const userData = user;

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = value;
    setTableData(newData);
    console.log(tableData);
    console.log(userData);

  };


  return (
    <View> 
      <Text>Table for {user.name}</Text>
      <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.cell}></Text>
        {Array.from({ length: points }, (_, index) => (
          <Text key={index} style={styles.cell}>
            Tirada {index + 1}
          </Text>
        ))}
      </View>
      {tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.dataRow}>
          <Text style={styles.cell}>Ronda {rowIndex + 1}</Text>
          {rowData.map((cellData, colIndex) => (
            <TextInput
              key={colIndex}
              style={styles.inputCell}
              value={cellData.toString()}
              onChangeText={(value) =>
                handleCellChange(rowIndex, colIndex, parseInt(value, 10))
              }
              keyboardType="numeric"
            />
          ))}
        </View>
      ))}
    </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 5,
    marginBottom: 5,
  },
  dataRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  inputCell: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    padding: 5,
  },
});

export default Table;
